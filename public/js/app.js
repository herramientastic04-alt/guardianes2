// Guardianes de la Separación. Aplicación principal (rutas, registro, mapa de misiones y sesiones)
import { api, detectarServidor, MODO_DEMO, sesionGuardada, guardarSesion, cerrarSesion, hayPendientes } from './api.js';
import { SESIONES, MOMENTOS, NIVELES, CALIFICABLES, TIPOS_ACTIVIDAD, NOMBRE_TIPO } from './contenido.js';
import { avatarSVG, OPCIONES, AVATAR_INICIAL, avatarAleatorio } from './avatar.js';
import { granitoSVG, medallaSVG, MEDALLAS, estrellasHTML, ICONO, residuoSVG, recipienteSVG } from './iconos.js';
import { BLOQUES, $, $$, h, esc, sonido, toast, confeti } from './actividades.js';
import { descargarDiploma, imprimirDiploma } from './diploma.js';
import { panelDocente } from './docente.js';

const app = $('#app');
const E = { perfil: null, rol: null, videos: {} };

// ------------------------------------------------------------------ utilidades
const puntosTotales = (p) => Object.values(p?.progreso || {}).reduce((a, s) => a + (s.puntos || 0), 0);
const nivel = (pts) => [...NIVELES].reverse().find(([min]) => pts >= min)[1];
export const resultadoSesion = (prog) => {
  const acts = Object.values(prog?.actividades || {}).filter((a) => CALIFICABLES.includes(a.tipo));
  const ac = acts.reduce((x, a) => x + (a.aciertos || 0), 0), tot = acts.reduce((x, a) => x + (a.total || 0), 0);
  const pct = tot ? Math.round((100 * ac) / tot) : 0;
  return { aciertos: ac, total: tot, porcentaje: pct, estrellas: pct >= 85 ? 3 : pct >= 60 ? 2 : 1 };
};
const disponible = (i) => i === 0 || !!E.perfil?.progreso?.[SESIONES[i - 1].id]?.completada;
function ir(ruta) { if (location.hash === '#' + ruta) render(); else location.hash = ruta; }
function errorEn(el, e) { el.textContent = e.message || 'Ocurrió un problema.'; el.hidden = false; sonido.mal(); }

function cabecera() {
  const p = E.perfil; const pts = puntosTotales(p);
  $('#cabecera').innerHTML = `
    <a class="marca" href="#/">${'<img src="img/escudo.png" alt="Escudo de la Institución Educativa Casas Bajas">'}<span><b>Guardianes de la Separación</b><small>Institución Educativa Casas Bajas</small></span></a>
    <div class="acciones">
      ${p ? `<a class="chip-usuario" href="#/mapa">${avatarSVG(p.avatar)}<span><b>${esc(p.nombre.split(' ')[0])}</b><small>${nivel(pts)} con ${pts} puntos</small></span></a>
        <a class="icono-btn" href="#/logros" title="Mis logros">${medallaSVG('s3')}</a>` : ''}
      ${E.rol === 'doc' ? '<a class="btn pequeno" href="#/panel">Panel docente</a>' : ''}
      <button class="icono-btn" id="btn-sonido" title="Sonido">${sonido.activo ? ICONO.sonido : ICONO.mudo}</button>
      ${p || E.rol === 'doc' ? `<button class="icono-btn" id="btn-salir" title="Salir">${ICONO.salir}</button>` : ''}
    </div>`;
  $('#btn-sonido').onclick = () => { sonido.alternar(); cabecera(); };
  const s = $('#btn-salir'); if (s) s.onclick = () => { cerrarSesion(); E.perfil = null; E.rol = null; ir('/'); };
}

// ------------------------------------------------------------------ vistas públicas
function vistaInicio() {
  if (E.perfil) return ir('/mapa');
  app.innerHTML = `<section class="portada">
    <div class="portada-texto">
      <span class="etiqueta">Recurso digital gamificado para grado 7°</span>
      <h1>Guardianes de la <em>Separación</em></h1>
      <p>Tres misiones para aprender a separar los residuos del aula en sus cuatro recipientes, ganar medallas y obtener tu diploma de guardián del territorio.</p>
      <div class="botones"><a class="btn primario grande" href="#/registro">Crear mi cuenta</a><a class="btn secundario grande" href="#/ingreso">Ya tengo cuenta</a></div>
      <a class="enlace-docente" href="#/docente">Ingreso del docente investigador</a>
    </div>
    <div class="portada-arte">
      <img class="escudo-grande" src="img/escudo.png" alt="Escudo de la Institución Educativa Casas Bajas">
      ${granitoSVG('granito saluda flota')}
    </div></section>
    <section class="misiones-previa">${SESIONES.map((s) => `<div class="previa" style="--c:${s.color}">${medallaSVG(s.id)}<div><small>Misión ${s.numero}</small><h3>${s.titulo}</h3><p>${s.resumen}</p></div></div>`).join('')}</section>
    <section class="recipientes-previa">${['pap', 'tar', 'bas', 'org'].map((k) => recipienteSVG(k)).join('')}<p>Papel y cartón, tarros con residuos, basura y orgánicos. Los cuatro recipientes de nuestra aula.</p></section>`;
}

function vistaRegistro() {
  const datos = { avatar: { ...AVATAR_INICIAL, ...avatarAleatorio() } };
  app.innerHTML = `<section class="tarjeta-form ancha">
    <div class="pasos-form"><span class="activo">1. Mis datos</span><span>2. Mi avatar</span></div>
    <form id="f1" class="form" autocomplete="off">
      <h2>Crea tu cuenta de guardián</h2><p class="sub">Solo necesitamos unos datos básicos.</p>
      <label>Nombre y apellido<input name="nombre" required maxlength="60" placeholder="Ejemplo: Ana María Ruiz"></label>
      <div class="fila"><label>Edad<select name="edad" required>${Array.from({ length: 9 }, (_, i) => i + 10).map((n) => `<option ${n === 12 ? 'selected' : ''}>${n}</option>`).join('')}</select></label>
        <label>Grado<select name="grado">${['6°', '7°', '8°', '9°', '10°', '11°'].map((g) => `<option ${g === '7°' ? 'selected' : ''}>${g}</option>`).join('')}</select></label></div>
      <label>Usuario para entrar<input name="usuario" required maxlength="24" placeholder="Ejemplo: anaruiz"><small>Solo letras y números, sin espacios.</small></label>
      <label>Clave de 4 números<input name="clave" required inputmode="numeric" pattern="\\d{4}" maxlength="4" placeholder="4 números" type="password"><small>Apréndela muy bien. La necesitarás para volver.</small></label>
      <p class="error" hidden></p>
      <button class="btn primario grande">Siguiente, elegir mi avatar</button>
    </form></section>`;
  const f = $('#f1');
  f.nombre.addEventListener('input', () => {
    const partes = f.nombre.value.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z ]/g, '').trim().split(/\s+/);
    if (!f.usuario.dataset.tocado) f.usuario.value = (partes[0] || '') + (partes[1] || '');
  });
  f.usuario.addEventListener('input', () => { f.usuario.dataset.tocado = 1; f.usuario.value = f.usuario.value.toLowerCase().replace(/[^a-z0-9.]/g, ''); });
  f.clave.addEventListener('input', () => { f.clave.value = f.clave.value.replace(/\D/g, '').slice(0, 4); });
  f.addEventListener('submit', (e) => {
    e.preventDefault();
    const err = $('.error', f);
    if (f.nombre.value.trim().length < 3) return errorEn(err, { message: 'Escribe tu nombre completo.' });
    if (f.usuario.value.length < 3) return errorEn(err, { message: 'El usuario debe tener al menos 3 letras o números.' });
    if (!/^\d{4}$/.test(f.clave.value)) return errorEn(err, { message: 'La clave debe tener exactamente 4 números.' });
    Object.assign(datos, { nombre: f.nombre.value.trim(), edad: f.edad.value, grado: f.grado.value, usuario: f.usuario.value, clave: f.clave.value });
    editorAvatar(datos.avatar, async (av, boton, errEl) => {
      datos.avatar = av; boton.disabled = true; boton.textContent = 'Creando tu cuenta';
      try {
        const r = await api.registro(datos);
        guardarSesion(r.token, 'est'); E.perfil = r.perfil; E.rol = 'est';
        sonido.fanfarria(); confeti(60); toast('¡Bienvenido, guardián!'); ir('/mapa');
      } catch (e2) { boton.disabled = false; boton.textContent = 'Comenzar mi aventura'; errorEn(errEl, e2); if (e2.status === 409) setTimeout(vistaRegistro, 1800); }
    }, true);
  });
}

function editorAvatar(inicial, alGuardar, enRegistro = false) {
  const a = { ...AVATAR_INICIAL, ...inicial };
  const grupo = (clave, titulo, vals, tipo) => `<div class="grupo-op"><h4>${titulo}</h4><div class="ops">${vals.map((v) => {
    const [val, txt] = Array.isArray(v) ? v : [v, ''];
    return tipo === 'color' ? `<button type="button" class="muestra" data-c="${clave}" data-v="${val}" style="--m:${val}" aria-label="${titulo}"></button>`
      : `<button type="button" class="op-txt" data-c="${clave}" data-v="${val}">${txt}</button>`;
  }).join('')}</div></div>`;
  app.innerHTML = `<section class="tarjeta-form ancha editor">
    ${enRegistro ? '<div class="pasos-form"><span>1. Mis datos</span><span class="activo">2. Mi avatar</span></div>' : ''}
    <h2>${enRegistro ? 'Crea tu avatar de guardián' : 'Edita tu avatar'}</h2>
    <div class="editor-grid">
      <div class="vista-avatar"><div class="av-prev"></div><button type="button" class="btn secundario" id="azar">Sorpréndeme</button></div>
      <div class="controles">
        ${grupo('piel', 'Tono de piel', OPCIONES.piel, 'color')}${grupo('peinado', 'Peinado', OPCIONES.peinado)}${grupo('pelo', 'Color de cabello', OPCIONES.pelo, 'color')}
        ${grupo('camisa', 'Camiseta', OPCIONES.camisa, 'color')}${grupo('accesorio', 'Accesorio', OPCIONES.accesorio)}${grupo('gesto', 'Gesto', OPCIONES.gesto)}${grupo('fondo', 'Fondo', OPCIONES.fondo, 'color')}
      </div></div>
    <p class="error" hidden></p>
    <div class="botones"><button class="btn primario grande" id="guardar-av">${enRegistro ? 'Comenzar mi aventura' : 'Guardar avatar'}</button></div></section>`;
  const pintar = () => {
    $('.av-prev').innerHTML = avatarSVG(a);
    $$('[data-c]').forEach((b) => b.classList.toggle('sel', a[b.dataset.c] === b.dataset.v));
  };
  $$('[data-c]').forEach((b) => b.addEventListener('click', () => { a[b.dataset.c] = b.dataset.v; sonido.clic(); pintar(); }));
  $('#azar').onclick = () => { Object.assign(a, avatarAleatorio()); sonido.clic(); pintar(); };
  $('#guardar-av').onclick = (e) => alGuardar({ ...a }, e.currentTarget, $('.error'));
  pintar();
}

function vistaIngreso() {
  app.innerHTML = `<section class="tarjeta-form"><form id="fi" class="form">${granitoSVG('granito centro')}
    <h2>¡Hola de nuevo, guardián!</h2>
    <label>Usuario<input name="usuario" required autocomplete="username" placeholder="Tu usuario"></label>
    <label>Clave de 4 números<input name="clave" required type="password" inputmode="numeric" maxlength="4" placeholder="4 números"></label>
    <p class="error" hidden></p><button class="btn primario grande">Entrar</button>
    <p class="centro pequeno">¿Aún no tienes cuenta? <a href="#/registro">Créala aquí</a>. Si olvidaste tu clave, pídele a tu docente que la cambie.</p></form></section>`;
  const f = $('#fi');
  f.addEventListener('submit', async (e) => {
    e.preventDefault(); const b = $('button', f); b.disabled = true;
    try { const r = await api.ingreso(f.usuario.value, f.clave.value); guardarSesion(r.token, 'est'); E.perfil = r.perfil; E.rol = 'est'; sonido.bien(); ir('/mapa'); sincronizar(); }
    catch (e2) { b.disabled = false; errorEn($('.error', f), e2); }
  });
}

function vistaDocenteIngreso() {
  app.innerHTML = `<section class="tarjeta-form"><form id="fd" class="form"><img class="escudo-form" src="img/escudo.png" alt="">
    <h2>Ingreso del docente investigador</h2><p class="sub">Consulta el progreso y los resultados de los estudiantes.</p>
    <label>Usuario<input name="usuario" required value="docenteinvestigador" autocomplete="username"></label>
    <label>Clave<input name="clave" required type="password" autocomplete="current-password"></label>
    <p class="error" hidden></p><button class="btn primario grande">Entrar al panel</button></form></section>`;
  const f = $('#fd');
  f.addEventListener('submit', async (e) => {
    e.preventDefault();
    try { const r = await api.docenteIngreso(f.usuario.value, f.clave.value); guardarSesion(r.token, 'doc'); E.rol = 'doc'; E.perfil = null; ir('/panel'); }
    catch (e2) { errorEn($('.error', f), e2); }
  });
}

// ------------------------------------------------------------------ mapa de misiones
function vistaMapa() {
  const p = E.perfil; const pts = puntosTotales(p);
  const completadas = SESIONES.filter((s) => p.progreso[s.id]?.completada).length;
  app.innerHTML = `<section class="saludo">
      <div class="saludo-av">${avatarSVG(p.avatar)}<a class="editar" href="#/avatar" title="Editar avatar">${ICONO.editar}</a></div>
      <div><h1>¡Hola, ${esc(p.nombre.split(' ')[0])}!</h1><p>Eres <b>${nivel(pts)}</b>. Llevas <b>${pts}</b> puntos y ${completadas} de 3 medallas.</p>
        <div class="progreso-total"><i style="width:${(100 * completadas) / 3}%"></i></div></div>
      <div class="estante">${SESIONES.map((s) => medallaSVG(s.id, '', !p.progreso[s.id]?.completada)).join('')}</div>
    </section>
    <section class="mapa">
      <svg class="camino" viewBox="0 0 1000 200" preserveAspectRatio="none"><path d="M60 150 C250 20 380 190 520 100 S820 20 950 120" fill="none" stroke="#E9B949" stroke-width="8" stroke-dasharray="4 18" stroke-linecap="round"/></svg>
      ${SESIONES.map((s, i) => {
        const pr = p.progreso[s.id] || {}; const abierta = disponible(i); const r = resultadoSesion(pr);
        const hechos = MOMENTOS.filter(([m]) => pr.momentos?.[m]).length;
        return `<article class="mision ${abierta ? '' : 'bloqueada'} ${pr.completada ? 'completa' : ''}" style="--c:${s.color}">
          <div class="mision-num">${pr.completada ? ICONO.check : abierta ? s.numero : ICONO.candado}</div>
          <small>Misión ${s.numero}</small><h3>${s.titulo}</h3><p>${s.resumen}</p>
          <div class="momentos-mini">${MOMENTOS.map(([m, t]) => `<span class="${pr.momentos?.[m] ? 'hecho' : ''}">${t}</span>`).join('')}</div>
          ${pr.completada ? `<div class="logro">${estrellasHTML(r.estrellas)}<span>${r.porcentaje} % de aciertos</span></div>` : ''}
          ${abierta ? `<a class="btn ${pr.completada ? 'secundario' : 'primario'}" href="#/mision/${s.numero}">${pr.completada ? 'Repasar misión' : hechos ? 'Continuar misión' : 'Comenzar misión'}</a>`
            : `<span class="btn deshabilitado">Completa la misión ${s.numero - 1}</span>`}
        </article>`;
      }).join('')}
    </section>`;
}

// ------------------------------------------------------------------ desarrollo de una misión
async function vistaMision(n) {
  const s = SESIONES[n - 1];
  if (!s || !disponible(n - 1)) return ir('/mapa');
  const pr = E.perfil.progreso[s.id] || {};
  let mi = MOMENTOS.findIndex(([m]) => !pr.momentos?.[m]); if (mi < 0) mi = 0;
  presentarMomento(s, mi);
}

function presentarMomento(s, mi) {
  const [clave, nombre] = MOMENTOS[mi];
  const desc = { inicio: 'Activa lo que sabes y conoce el tema de la misión.', desarrollo: 'Aprende con lecturas, videos y retos interactivos.', cierre: 'Demuestra lo aprendido y gana tu medalla.' }[clave];
  const acts = s.momentos[clave].filter((b) => TIPOS_ACTIVIDAD.includes(b.tipo));
  app.innerHTML = `<section class="portal" style="--c:${s.color}">
    ${stepper(s, mi)}
    <div class="portal-cuerpo">${granitoSVG('granito flota')}<small>Misión ${s.numero}. ${esc(s.titulo)}</small><h1>${nombre}</h1><p>${desc} Te esperan ${acts.length} actividades.</p>
    <ol class="portal-acts">${acts.map((b, k) => `<li><span>${k + 1}</span>${esc(NOMBRE_TIPO[b.tipo])}</li>`).join('')}</ol>
    <button class="btn primario grande" id="empezar">Empezar ${nombre.toLowerCase()}</button></div></section>`;
  sonido.tono([392, 523], 'triangle', 0.12);
  $('#empezar').onclick = () => correrMomento(s, mi);
}

function stepper(s, mi) {
  const pr = E.perfil.progreso[s.id] || {};
  return `<ol class="stepper">${MOMENTOS.map(([m, t], i) => `<li class="${i === mi ? 'actual' : ''} ${pr.momentos?.[m] ? 'hecho' : ''}"><span>${pr.momentos?.[m] && i !== mi ? ICONO.check : i + 1}</span>${t}</li>`).join('')}</ol>`;
}

function correrMomento(s, mi) {
  const [clave] = MOMENTOS[mi];
  const bloques = s.momentos[clave];
  const puntos = {}; let i = 0;
  const CONTENIDO = ['bienvenida', 'texto', 'imagen', 'video'];
  const indices = bloques.map((b, k) => (TIPOS_ACTIVIDAD.includes(b.tipo) ? k : -1)).filter((k) => k >= 0);
  const hechas = new Set();
  const pintarRuta = () => {
    const b = bloques[i]; const n = indices.indexOf(i);
    $('#chipAct').innerHTML = n >= 0 ? `${ICONO.bandera} Actividad ${n + 1} de ${indices.length}` : `${ICONO.libro} ${b.tipo === 'video' ? 'Video para aprender' : b.tipo === 'bienvenida' ? 'Bienvenida' : 'Lectura para aprender'}`;
    $('#puntosActs').innerHTML = indices.map((k, m) => `<i class="${hechas.has(k) ? 'hecha' : ''} ${k === i ? 'actual' : ''}" title="Actividad ${m + 1}"></i>`).join('');
  };
  app.innerHTML = `<section class="sesion" style="--c:${s.color}">
    <div class="sesion-cab"><a class="volver" href="#/mapa">${ICONO.atras} Mapa</a><div><small>Misión ${s.numero}</small><b>${esc(s.titulo)}</b></div><span class="pts" id="pts"></span></div>
    ${stepper(s, mi)}
    <div class="barra-pasos"><i id="barra"></i></div>
    <div class="ruta-acts"><span class="chip-actividad" id="chipAct"></span><span class="puntos-acts" id="puntosActs"></span></div>
    <div class="lienzo" id="lienzo"></div>
    <div class="nav-pasos"><button class="btn fantasma" id="ant">${ICONO.atras} Anterior</button><span id="cuenta"></span><button class="btn primario" id="sig" disabled>Continuar ${ICONO.flecha}</button></div>
  </section>`;
  const actualizarPts = () => { $('#pts').innerHTML = `${ICONO.rayo} ${Object.values(puntos).reduce((a, b) => a + b, 0)} puntos en este momento`; };
  const pintar = () => {
    const b = bloques[i]; const lienzo = $('#lienzo');
    lienzo.className = 'lienzo entra'; void lienzo.offsetWidth; lienzo.classList.add('ver');
    $('#barra').style.width = (100 * i) / bloques.length + '%';
    $('#cuenta').textContent = `Paso ${i + 1} de ${bloques.length}`;
    $('#sig').disabled = true;
    $('#ant').style.visibility = i > 0 && CONTENIDO.includes(bloques[i - 1].tipo) && CONTENIDO.includes(b.tipo) ? 'visible' : 'hidden';
    actualizarPts(); pintarRuta();
    BLOQUES[b.tipo](lienzo, b, {
      perfil: E.perfil, videos: E.videos,
      listo: async (res = {}) => {
        if (res.puntos) { puntos[i] = res.puntos; actualizarPts(); }
        if (TIPOS_ACTIVIDAD.includes(b.tipo)) { hechas.add(i); pintarRuta(); }
        $('#sig').disabled = false;
        if (res.actividad) {
          try {
            const r = await api.progreso({ sesion: s.id, actividad: res.actividad, puntosMomento: { [clave]: Object.values(puntos).reduce((a, x) => a + x, 0) } });
            E.perfil = r.perfil; cabecera();
          } catch (e) { toast(e.transitorio ? 'Tu respuesta quedó guardada en este equipo y se enviará con la siguiente actividad.' : e.message, e.transitorio ? 'aviso' : 'mal'); }
        }
      },
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  $('#ant').onclick = () => { if (i > 0) { i--; pintar(); } };
  $('#sig').onclick = async () => {
    sonido.clic();
    if (i < bloques.length - 1) { i++; pintar(); return; }
    $('#sig').disabled = true;
    const total = Object.values(puntos).reduce((a, x) => a + x, 0);
    try {
      const r = await api.progreso({ sesion: s.id, momento: clave, puntosMomento: { [clave]: total } });
      E.perfil = r.perfil;
      if (clave === 'cierre') {
        const res = resultadoSesion(E.perfil.progreso[s.id]);
        const r2 = await api.progreso({ sesion: s.id, completada: true, medalla: MEDALLAS[s.id].nombre, aciertos: res.aciertos, total: res.total });
        E.perfil = r2.perfil; cabecera(); ir('/premio/' + s.numero);
      } else { cabecera(); toast(`¡${MOMENTOS[mi][1]} completado! Ganaste ${total} puntos.`); presentarMomento(s, mi + 1); }
    } catch (e) { $('#sig').disabled = false; toast(e.message || 'No se pudo guardar. Intenta de nuevo.', 'mal'); }
  };
  pintar();
}

// ------------------------------------------------------------------ premios y logros
function opcionesDiploma(s, final = false) {
  if (final) {
    const rs = SESIONES.map((x) => resultadoSesion(E.perfil.progreso[x.id]));
    const ac = rs.reduce((a, r) => a + r.aciertos, 0), tot = rs.reduce((a, r) => a + r.total, 0);
    const pct = tot ? Math.round((100 * ac) / tot) : 0;
    return { perfil: E.perfil, sesion: SESIONES[2], porcentaje: pct, estrellas: pct >= 85 ? 3 : pct >= 60 ? 2 : 1, final: true };
  }
  const r = resultadoSesion(E.perfil.progreso[s.id]);
  return { perfil: E.perfil, sesion: s, porcentaje: r.porcentaje, estrellas: r.estrellas };
}

function vistaPremio(n) {
  const s = SESIONES[n - 1]; const pr = E.perfil.progreso[s.id];
  if (!pr?.completada) return ir('/mapa');
  const r = resultadoSesion(pr); const m = MEDALLAS[s.id];
  const todas = SESIONES.every((x) => E.perfil.progreso[x.id]?.completada);
  app.innerHTML = `<section class="premio" style="--c:${s.color}">
    <div class="rayos"></div>
    <div class="medalla-gigante">${medallaSVG(s.id)}</div>
    <small>Misión ${s.numero} completada</small><h1>${m.nombre}</h1>
    ${estrellasHTML(r.estrellas)}
    <div class="datos-premio"><div><b>${r.porcentaje} %</b><span>de aciertos</span></div><div><b>${r.aciertos} de ${r.total}</b><span>respuestas correctas</span></div><div><b>${pr.puntos || 0}</b><span>puntos de la misión</span></div></div>
    <div class="botones">
      <button class="btn primario grande" id="dip">${ICONO.descarga} Descargar mi diploma</button>
      <button class="btn secundario" id="imp">${ICONO.imprimir} Imprimir</button>
      ${todas ? `<button class="btn dorado" id="final">${ICONO.descarga} Diploma final de Maestro Guardián</button>` : ''}
    </div>
    <a class="btn fantasma" href="#/mapa">${n < 3 ? 'Ir a la siguiente misión' : 'Volver al mapa'} ${ICONO.flecha}</a></section>`;
  sonido.fanfarria(); confeti(160);
  $('#dip').onclick = () => descargarDiploma(opcionesDiploma(s));
  $('#imp').onclick = () => imprimirDiploma(opcionesDiploma(s));
  const f = $('#final'); if (f) f.onclick = () => descargarDiploma(opcionesDiploma(s, true));
}

function vistaLogros() {
  const p = E.perfil;
  const todas = SESIONES.every((x) => p.progreso[x.id]?.completada);
  app.innerHTML = `<section class="logros"><h1>Mis logros</h1><p class="sub">Aquí están tus medallas y tus diplomas. Puedes descargarlos cuando quieras.</p>
    <div class="vitrina">${SESIONES.map((s) => {
      const pr = p.progreso[s.id]; const r = resultadoSesion(pr);
      return `<article class="vitrina-item ${pr?.completada ? '' : 'pendiente'}">${medallaSVG(s.id, '', !pr?.completada)}<h3>${MEDALLAS[s.id].nombre}</h3><small>Misión ${s.numero}</small>
        ${pr?.completada ? `${estrellasHTML(r.estrellas)}<p>${r.porcentaje} % de aciertos</p><button class="btn secundario" data-dip="${s.numero}">${ICONO.descarga} Diploma</button>` : '<p>Por conquistar</p>'}</article>`;
    }).join('')}</div>
    ${todas ? `<div class="final-box">${granitoSVG('granito flota')}<div><h2>¡Eres Maestro Guardián!</h2><p>Completaste las tres misiones.</p><button class="btn dorado grande" id="final">${ICONO.descarga} Descargar diploma final</button></div></div>` : ''}</section>`;
  $$('[data-dip]').forEach((b) => (b.onclick = () => descargarDiploma(opcionesDiploma(SESIONES[b.dataset.dip - 1]))));
  const f = $('#final'); if (f) f.onclick = () => descargarDiploma(opcionesDiploma(null, true));
}

// ------------------------------------------------------------------ enrutador
async function render() {
  const ruta = location.hash.replace(/^#/, '') || '/';
  cabecera();
  app.classList.remove('ancho');
  const est = ['/mapa', '/avatar', '/logros'].includes(ruta) || /^\/(mision|premio)\//.test(ruta);
  if (est && !E.perfil) return ir('/ingreso');
  if (ruta === '/panel' && E.rol !== 'doc') return ir('/docente');
  if (ruta === '/') vistaInicio();
  else if (ruta === '/registro') vistaRegistro();
  else if (ruta === '/ingreso') vistaIngreso();
  else if (ruta === '/docente') vistaDocenteIngreso();
  else if (ruta === '/mapa') vistaMapa();
  else if (ruta === '/logros') vistaLogros();
  else if (ruta === '/avatar') editorAvatar(E.perfil.avatar, async (av, boton, errEl) => {
    boton.disabled = true;
    try { const r = await api.avatar(av); E.perfil = r.perfil; toast('Avatar actualizado'); ir('/mapa'); } catch (e) { boton.disabled = false; errorEn(errEl, e); }
  });
  else if (ruta.startsWith('/mision/')) vistaMision(+ruta.split('/')[2]);
  else if (ruta.startsWith('/premio/')) vistaPremio(+ruta.split('/')[2]);
  else if (ruta === '/panel') { app.classList.add('ancho'); panelDocente(app, { api, E }); }
  else vistaInicio();
}

// Envía en segundo plano las respuestas que quedaron guardadas en el equipo cuando el servidor no respondió
async function sincronizar() {
  if (!hayPendientes()) return;
  try { const r = await api.enviarPendientes(); if (r && r.perfil) { E.perfil = r.perfil; cabecera(); if (location.hash === '#/mapa') render(); } } catch {}
}

async function iniciar() {
  await detectarServidor();
  if (MODO_DEMO) {
    document.body.insertAdjacentHTML('afterbegin', '<div class="aviso-demo">Modo de demostración. El progreso se guarda solo en este equipo. Publica el recurso en Netlify para usar la base de datos.</div>');
  }
  try { E.videos = await api.config(); } catch { E.videos = {}; }
  const { token, rol } = sesionGuardada();
  if (token && rol === 'est') {
    try { E.perfil = (await api.yo()).perfil; E.rol = 'est'; sincronizar(); }
    catch (e) { if (e.transitorio) setTimeout(() => toast('El servidor tardó en responder. Recarga la página en unos segundos.', 'aviso'), 600); else cerrarSesion(); }
  }
  if (token && rol === 'doc') E.rol = 'doc';
  window.addEventListener('hashchange', render);
  render();
}
iniciar();
