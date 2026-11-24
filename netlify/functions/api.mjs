// Guardianes de la Separación. Servicio de datos del recurso (Netlify Functions + Netlify Blobs).
// Rutas disponibles bajo /api
import crypto from 'node:crypto';
import { getStore } from '@netlify/blobs';

export const config = { path: '/api/*' };

const DOCENTE_USUARIO = (process.env.DOCENTE_USUARIO || 'docenteinvestigador').toLowerCase();
const DOCENTE_CLAVE = process.env.DOCENTE_CLAVE || 'CasasBajas1927';
const DURACION_TOKEN = 1000 * 60 * 60 * 24 * 30; // 30 días

// ---------------------------------------------------------------- almacenamiento
// Netlify entrega credenciales nuevas a la base de datos en cada solicitud. Por eso el almacén
// se crea dentro de cada solicitud y nunca se guarda entre una solicitud y otra.
const espera = (ms) => new Promise((r) => setTimeout(r, ms));
async function reintentar(fn, intentos = 3) {
  for (let k = 1; ; k++) {
    try { return await fn(); } catch (e) {
      if (k >= intentos) throw e;
      console.warn(`Reintento ${k} tras error de la base de datos: ${e?.message}`);
      await espera(250 * 3 ** (k - 1));
    }
  }
}
async function enLotes(lista, tam, fn) {
  const out = [];
  for (let k = 0; k < lista.length; k += tam) out.push(...(await Promise.all(lista.slice(k, k + tam).map(fn))));
  return out;
}
let _local;
async function almacen() {
  if (process.env.LOCAL_BLOBS_DIR) {
    if (_local) return _local;
    // modo de prueba local: archivos JSON en una carpeta
    const fs = await import('node:fs/promises');
    const path = await import('node:path');
    const dir = process.env.LOCAL_BLOBS_DIR;
    await fs.mkdir(dir, { recursive: true });
    const archivo = (k) => path.join(dir, encodeURIComponent(k) + '.json');
    // FALLOS_PRUEBA solo se usa en pruebas locales para simular una base de datos que falla a ratos
    const p = +(process.env.FALLOS_PRUEBA || 0);
    const quizas = () => { if (p && Math.random() < p) throw new Error('Fallo simulado de prueba'); };
    _local = {
      async get(k) { quizas(); return this._get(k); },
      async set(k, v) { quizas(); return this._set(k, v); },
      async _get(k) { try { return JSON.parse(await fs.readFile(archivo(k), 'utf8')); } catch { return null; } },
      async _set(k, v) { await fs.writeFile(archivo(k), JSON.stringify(v)); },
      async del(k) { try { await fs.unlink(archivo(k)); } catch {} },
      async keys(prefijo) {
        const todos = await fs.readdir(dir);
        return todos.map((f) => decodeURIComponent(f.replace(/\.json$/, ''))).filter((k) => k.startsWith(prefijo));
      },
    };
    if (p) { const base = _local; _local = { get: (k) => reintentar(() => base.get(k)), set: (k, v) => reintentar(() => base.set(k, v)), del: base.del, keys: base.keys }; }
    return _local;
  }
  // Lectura con consistencia fuerte; si el entorno no la ofrece, se usa la lectura normal.
  const crear = () => getStore(lecturaFuerte ? { name: 'guardianes-separacion', consistency: 'strong' } : { name: 'guardianes-separacion' });
  let s = crear();
  const op = (fn) => reintentar(async () => {
    try { return await fn(s); } catch (e) {
      if (e?.name === 'BlobsConsistencyError' && lecturaFuerte) { lecturaFuerte = false; s = crear(); return fn(s); }
      throw e;
    }
  });
  return {
    get: (k) => op(async (x) => (await x.get(k, { type: 'json' })) ?? null),
    set: (k, v) => op((x) => x.setJSON(k, v)),
    del: (k) => op((x) => x.delete(k)),
    keys: (prefijo) => op(async (x) => {
      const out = [];
      for await (const pagina of x.list({ prefix: prefijo, paginate: true })) out.push(...pagina.blobs.map((b) => b.key));
      return out;
    }),
  };
}
let lecturaFuerte = true;

// ---------------------------------------------------------------- utilidades
const json = (data, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' } });
const error = (mensaje, status = 400) => json({ error: mensaje }, status);

// La frase secreta de las sesiones sí se guarda en memoria: es un dato propio, no una credencial de Netlify.
let _secreto;
async function secreto(st) {
  if (process.env.TOKEN_SECRETO) return process.env.TOKEN_SECRETO;
  if (_secreto) return _secreto;
  let c = await st.get('config/secreto');
  if (!c) {
    await st.set('config/secreto', { valor: crypto.randomBytes(32).toString('hex') });
    c = await st.get('config/secreto');
  }
  return (_secreto = c.valor);
}
const b64 = (s) => Buffer.from(s).toString('base64url');
async function firmar(st, datos) {
  const cuerpo = b64(JSON.stringify({ ...datos, exp: Date.now() + DURACION_TOKEN }));
  const firma = crypto.createHmac('sha256', await secreto(st)).update(cuerpo).digest('base64url');
  return `${cuerpo}.${firma}`;
}
async function verificar(st, req) {
  const h = req.headers.get('authorization') || '';
  const token = h.startsWith('Bearer ') ? h.slice(7) : '';
  const [cuerpo, firma] = token.split('.');
  if (!cuerpo || !firma) return null;
  const esperada = crypto.createHmac('sha256', await secreto(st)).update(cuerpo).digest('base64url');
  if (esperada.length !== firma.length || !crypto.timingSafeEqual(Buffer.from(esperada), Buffer.from(firma))) return null;
  try {
    const d = JSON.parse(Buffer.from(cuerpo, 'base64url').toString());
    return d.exp > Date.now() ? d : null;
  } catch { return null; }
}
function hashClave(clave, sal = crypto.randomBytes(16).toString('hex')) {
  return { sal, hash: crypto.scryptSync(String(clave), sal, 32).toString('hex') };
}
function claveValida(clave, guardado) {
  const { hash } = hashClave(clave, guardado.sal);
  return crypto.timingSafeEqual(Buffer.from(hash, 'hex'), Buffer.from(guardado.hash, 'hex'));
}
const normalizarUsuario = (u) =>
  String(u || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9.]/g, '').slice(0, 24);
const limpio = (t, max = 80) => String(t ?? '').replace(/[<>]/g, '').trim().slice(0, max);

function perfilPublico(e) {
  return { usuario: e.usuario, nombre: e.nombre, edad: e.edad, grado: e.grado, avatar: e.avatar, creado: e.creado,
    actualizado: e.actualizado, progreso: e.progreso || {} };
}

async function leerCuerpo(req) { try { return await req.json(); } catch { return {}; } }

// ---------------------------------------------------------------- manejador
export default async (req) => {
  const url = new URL(req.url);
  const ruta = url.pathname.replace(/^\/api\/?/, '').replace(/\/$/, '');
  const metodo = req.method;

  try {
    if (ruta === 'salud') return json({ ok: true, servicio: 'guardianes', fecha: new Date().toISOString() });
    const st = await almacen();

    // configuración pública (videos personalizados por el docente)
    if (ruta === 'config' && metodo === 'GET') {
      try { return json((await st.get('config/videos')) || {}); } catch (e) { console.error('Error al leer config:', e?.name, e?.message); return json({}); }
    }

    // registro de estudiantes
    if (ruta === 'registro' && metodo === 'POST') {
      const b = await leerCuerpo(req);
      const usuario = normalizarUsuario(b.usuario);
      const nombre = limpio(b.nombre, 60);
      const edad = parseInt(b.edad, 10);
      if (!nombre || nombre.length < 3) return error('Escribe tu nombre completo.');
      if (!usuario || usuario.length < 3) return error('El usuario debe tener al menos 3 letras o números.');
      if (usuario === DOCENTE_USUARIO) return error('Ese usuario está reservado.');
      if (!(edad >= 8 && edad <= 20)) return error('Selecciona una edad válida.');
      if (!/^\d{4}$/.test(String(b.clave || ''))) return error('La clave debe tener 4 números.');
      const existente = await st.get(`est/${usuario}`);
      if (existente) {
        // si el mismo estudiante reintenta el registro, se le deja entrar en lugar de mostrar un error
        if (existente.nombre === nombre && claveValida(String(b.clave), existente.clave))
          return json({ token: await firmar(st, { u: usuario, r: 'est' }), perfil: perfilPublico(existente) });
        return error('Ese usuario ya existe. Prueba con otro.', 409);
      }
      const ahora = new Date().toISOString();
      const est = { usuario, nombre, edad, grado: limpio(b.grado || '7°', 6), avatar: b.avatar || {}, clave: hashClave(b.clave),
        creado: ahora, actualizado: ahora, progreso: {} };
      const token = await firmar(st, { u: usuario, r: 'est' });
      await st.set(`est/${usuario}`, est);
      return json({ token, perfil: perfilPublico(est) });
    }

    // ingreso de estudiantes
    if (ruta === 'ingreso' && metodo === 'POST') {
      const b = await leerCuerpo(req);
      const usuario = normalizarUsuario(b.usuario);
      const est = usuario && (await st.get(`est/${usuario}`));
      if (!est || !claveValida(String(b.clave || ''), est.clave)) return error('Usuario o clave incorrectos.', 401);
      return json({ token: await firmar(st, { u: usuario, r: 'est' }), perfil: perfilPublico(est) });
    }

    // ingreso del docente investigador
    if (ruta === 'docente/ingreso' && metodo === 'POST') {
      const b = await leerCuerpo(req);
      if (String(b.usuario || '').trim().toLowerCase() !== DOCENTE_USUARIO || String(b.clave || '') !== DOCENTE_CLAVE)
        return error('Datos de docente incorrectos.', 401);
      return json({ token: await firmar(st, { u: DOCENTE_USUARIO, r: 'doc' }) });
    }

    const sesion = await verificar(st, req);
    if (!sesion) return error('Debes iniciar sesión.', 401);

    // ------------------------------------------------ rutas del estudiante
    if (sesion.r === 'est') {
      const clave = `est/${sesion.u}`;
      const est = await st.get(clave);
      if (!est) return error('Tu cuenta ya no existe.', 401);

      if (ruta === 'yo' && metodo === 'GET') return json({ perfil: perfilPublico(est) });

      if (ruta === 'avatar' && metodo === 'PUT') {
        const b = await leerCuerpo(req);
        est.avatar = b.avatar || est.avatar;
        est.actualizado = new Date().toISOString();
        await st.set(clave, est);
        return json({ perfil: perfilPublico(est) });
      }

      if (ruta === 'progreso' && metodo === 'POST') {
        const b = await leerCuerpo(req);
        const s = String(b.sesion || '');
        if (!['s1', 's2', 's3'].includes(s)) return error('Sesión inválida.');
        const p = (est.progreso[s] = est.progreso[s] || { momentos: {}, actividades: {}, puntos: 0 });
        if (b.momento) p.momentos[b.momento] = new Date().toISOString();
        if (b.actividad) p.actividades[b.actividad.id] = { ...b.actividad, fecha: new Date().toISOString() };
        if (b.puntosMomento && typeof b.puntosMomento === 'object') {
          p.puntosMomento = { ...(p.puntosMomento || {}) };
          for (const [k, v] of Object.entries(b.puntosMomento)) if (['inicio', 'desarrollo', 'cierre'].includes(k)) p.puntosMomento[k] = Math.max(0, Math.min(2000, Math.round(+v || 0)));
          p.puntos = Object.values(p.puntosMomento).reduce((x, y) => x + y, 0);
        }
        if (b.completada) {
          p.completada = p.completada || new Date().toISOString();
          p.medalla = b.medalla || p.medalla;
          p.aciertos = b.aciertos; p.total = b.total;
        }
        est.actualizado = new Date().toISOString();
        await st.set(clave, est);
        return json({ perfil: perfilPublico(est) });
      }
    }

    // ------------------------------------------------ rutas del docente
    if (sesion.r === 'doc') {
      if (ruta === 'docente/estudiantes' && metodo === 'GET') {
        const claves = await st.keys('est/');
        const lista = (await enLotes(claves, 8, (k) => st.get(k))).filter(Boolean).map(perfilPublico);
        lista.sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'));
        return json({ estudiantes: lista });
      }
      const m = ruta.match(/^docente\/estudiantes\/([a-z0-9.]+)(\/clave)?$/);
      if (m) {
        const k = `est/${m[1]}`;
        const est = await st.get(k);
        if (!est) return error('Estudiante no encontrado.', 404);
        if (metodo === 'DELETE' && !m[2]) { await st.del(k); return json({ ok: true }); }
        if (metodo === 'PUT' && m[2]) {
          const b = await leerCuerpo(req);
          if (!/^\d{4}$/.test(String(b.clave || ''))) return error('La nueva clave debe tener 4 números.');
          est.clave = hashClave(b.clave);
          await st.set(k, est);
          return json({ ok: true });
        }
      }
      if (ruta === 'docente/config' && metodo === 'PUT') {
        const b = await leerCuerpo(req);
        const videos = {};
        for (const [id, v] of Object.entries(b.videos || {})) {
          const vid = String(v || '').trim();
          if (/^[\w-]{11}$/.test(vid)) videos[id] = vid;
        }
        await st.set('config/videos', videos);
        return json(videos);
      }
    }
    return error('Ruta no encontrada.', 404);
  } catch (e) {
    console.error(`Error en /api/${ruta}:`, e?.name, e?.message);
    return json({ error: 'El servidor tardó en responder. Tu avance está a salvo, intenta de nuevo en unos segundos.', codigo: String(e?.name || 'Error') }, 503);
  }
};
