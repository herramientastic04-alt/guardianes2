// Bloques de contenido y actividades interactivas de cada momento
import { RESIDUOS, RECIPIENTE_INFO, VIDEOS } from './contenido.js';
import { RECIPIENTES, recipienteSVG, residuoSVG, granitoSVG, ICONO } from './iconos.js';
import { avatarSVG } from './avatar.js';

export const $ = (sel, el = document) => el.querySelector(sel);
export const $$ = (sel, el = document) => [...el.querySelectorAll(sel)];
export const h = (html) => { const t = document.createElement('template'); t.innerHTML = html.trim(); return t.content.firstElementChild; };
export const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
export const mezclar = (arr) => { const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const parrafos = (t) => String(t).split('\n\n').map((p) => `<p>${esc(p)}</p>`).join('');
const KEYS = ['pap', 'tar', 'bas', 'org'];

// ------------------------------------------------------------------ sonidos suaves (sin archivos)
let audio;
export const sonido = {
  activo: (() => { try { return localStorage.getItem('gs_sonido') !== 'no'; } catch { return true; } })(),
  alternar() { this.activo = !this.activo; try { localStorage.setItem('gs_sonido', this.activo ? 'si' : 'no'); } catch {} return this.activo; },
  tono(notas, tipo = 'sine', dur = 0.12, vol = 0.08) {
    if (!this.activo) return;
    try {
      audio = audio || new (window.AudioContext || window.webkitAudioContext)();
      let t = audio.currentTime;
      for (const f of notas) {
        const o = audio.createOscillator(), g = audio.createGain();
        o.type = tipo; o.frequency.value = f; g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
        o.connect(g).connect(audio.destination); o.start(t); o.stop(t + dur); t += dur * 0.85;
      }
    } catch {}
  },
  bien() { this.tono([660, 880], 'triangle', 0.13); },
  mal() { this.tono([220, 180], 'sawtooth', 0.14, 0.04); },
  clic() { this.tono([520], 'sine', 0.05, 0.04); },
  fanfarria() { this.tono([523, 659, 784, 1047, 784, 1047], 'triangle', 0.16, 0.09); },
};

export function toast(texto, tipo = 'ok') {
  const t = h(`<div class="toast ${tipo}">${esc(texto)}</div>`);
  document.body.appendChild(t);
  requestAnimationFrame(() => t.classList.add('ver'));
  setTimeout(() => { t.classList.remove('ver'); setTimeout(() => t.remove(), 400); }, Math.max(2600, texto.length * 60));
}

export function confeti(n = 120) {
  const colores = ['#1E5A96', '#2F8A3E', '#E9B949', '#B5372A', '#8EC6E9'];
  const capa = h('<div class="confeti"></div>');
  for (let i = 0; i < n; i++) {
    const p = document.createElement('i');
    p.style.left = Math.random() * 100 + 'vw';
    p.style.background = colores[i % colores.length];
    p.style.animationDelay = Math.random() * 0.8 + 's';
    p.style.animationDuration = 2.4 + Math.random() * 1.8 + 's';
    p.style.transform = `rotate(${Math.random() * 360}deg)`;
    capa.appendChild(p);
  }
  document.body.appendChild(capa);
  setTimeout(() => capa.remove(), 5200);
}

// ------------------------------------------------------------------ diagramas
const chip = (k) => `<div class="chip-rec" style="--c:${RECIPIENTES[k].color}">${recipienteSVG(k)}<b>${RECIPIENTES[k].nombre}</b></div>`;
export const DIAGRAMAS = {
  codigo: () => `<div class="diag codigo">
    ${[['#FFFFFF', 'Blanco', 'Aprovechables limpios y secos', ['hoja', 'botellita', 'carton']], ['#3FA34D', 'Verde', 'Orgánicos aprovechables', ['banano', 'mandarina', 'pastel']], ['#2C333D', 'Negro', 'Residuos que ya no se aprovechan', ['papel_higienico', 'servilleta', 'chicle']]]
      .map(([c, n, d, ej], i) => `<div class="cod" style="--c:${c}"><div class="caneca ${i === 0 ? 'blanca' : ''}"><span>${n}</span></div><p>${d}</p><div class="mini">${ej.map((e) => residuoSVG(e)).join('')}</div></div>`).join('')}
  </div><p class="fuente">Fuente: Resolución 2184 de 2019 del Ministerio de Ambiente y Desarrollo Sostenible.</p>`,
  equivalencia: () => `<div class="diag equiv-caja"><div class="equiv-tit"><h5>Código nacional</h5><span></span><h5>Recipientes del aula</h5></div><div class="equiv">
    <div class="col"><div class="nac blanco">Blanco</div><div class="nac verde">Verde</div><div class="nac negro">Negro</div></div>
    <svg class="lineas" viewBox="0 0 100 300" preserveAspectRatio="none"><path d="M0 50 C55 50 45 37.5 100 37.5M0 50 C55 50 45 112.5 100 112.5M0 150 C55 150 45 262.5 100 262.5M0 250 C55 250 45 187.5 100 187.5" fill="none" stroke="#1E5A96" stroke-width="3" stroke-dasharray="6 6" vector-effect="non-scaling-stroke"/></svg>
    <div class="col">${chip('pap')}${chip('tar')}${chip('bas')}${chip('org')}</div></div></div>`,
  botella: () => `<div class="diag pasos">${[
    ['1', 'Busca una botella plástica limpia y seca, con su tapa.', 'botellita'],
    ['2', 'Revisa que la envoltura esté limpia y seca.', 'empaque_papas'],
    ['3', 'Dobla la envoltura y métela en la botella.', 'empaque_bombon'],
    ['4', 'Aprieta con un palito hasta que quede dura.', 'palo_helado'],
  ].map(([n, t, ic]) => `<div class="paso"><span class="num">${n}</span>${residuoSVG(ic)}<p>${t}</p></div>`).join('<div class="flecha">' + ICONO.flecha + '</div>')}</div>`,
  compost: () => `<div class="diag ciclo">
    <div class="eje">${granitoSVG('mini')}<b>Ciclo del compost</b></div>
    ${[['Cáscaras y restos', 'banano', 'n1'], ['Descomposición con lombrices', 'lombriz', 'n2'], ['Abono natural', 'tierra', 'n3'], ['Huerta y alimentos', 'planta', 'n4']]
      .map(([t, ic, c]) => `<div class="nodo ${c}">${residuoSVG(ic)}<span>${t}</span></div>`).join('')}
    <svg class="circulo" viewBox="0 0 200 200"><circle cx="100" cy="100" r="78" fill="none" stroke="#3FA34D" stroke-width="5" stroke-dasharray="10 10"/><path d="M178 92l2 14 10-10" fill="#3FA34D"/><path d="M22 108l-2-14-10 10" fill="#3FA34D"/></svg></div>`,
  capas: () => `<div class="diag capas">
    <div class="caja">${residuoSVG('caja_jugo')}</div>
    <div class="barras">
      <div class="capa" style="--w:70%;--c:#D9A86C"><span>Cartón 70 %</span></div>
      <div class="capa" style="--w:25%;--c:#8EC6E9"><span>Plástico 25 %</span></div>
      <div class="capa" style="--w:5%;--c:#AEB8C4"><span>Aluminio 5 %</span></div>
      <p>Las tres capas están pegadas entre sí. En el colegio no se pueden separar, por eso la caja de jugo va en <b>basura</b>.</p>
    </div></div>`,
  camino: () => `<div class="diag ruta">${[['Aula', 'hoja'], ['Grupo de aseo', 'palo_escoba'], ['Bodega', 'carton'], ['Vehículo', 'botellita'], ['Cabecera municipal', 'caja_colores']]
    .map(([t, ic], i) => `<div class="etapa"><span class="num">${i + 1}</span>${residuoSVG(ic)}<b>${t}</b></div>`).join('<div class="flecha">' + ICONO.flecha + '</div>')}</div>`,
};

// Clasificador genérico (recipientes o grupos) con arrastre y toque
function clasificador(el, b, ctx, zonas, items, tipo, ayuda) {
  const lista = mezclar(items);
  el.innerHTML = `<div class="actividad"><h3>${esc(b.titulo)}</h3><p class="enunciado">${ayuda}</p>
    <div class="marcador"><span data-cont>0 de ${lista.length}</span><span class="barra"><i data-barra></i></span></div>
    <div class="bandeja">${lista.map((it) => `<div class="residuo" data-id="${it.id}" tabindex="0">${residuoSVG(it.id)}<span>${esc(it.nombre)}</span></div>`).join('')}</div>
    <div class="canecas ${zonas.length === 2 ? 'dos' : ''}">${zonas.map((z) => `<div class="caneca-zona" data-k="${z.k}" style="--c:${z.color}">${z.icono}<b>${esc(z.nombre)}</b><span class="cuenta">0</span></div>`).join('')}</div>
    <div class="pista" data-pista hidden></div></div>`;
  const porId = Object.fromEntries(lista.map((it) => [it.id, it]));
  const nombreZona = Object.fromEntries(zonas.map((z) => [z.k, z.nombre]));
  const resp = {}; let colocados = 0; let elegido = null;
  const pista = $('[data-pista]', el);
  const soltar = (card, k) => {
    const it = porId[card.dataset.id]; const bien = it.correcta === k;
    if (!(it.id in resp)) resp[it.id] = { item: it.nombre, elegido: nombreZona[k], correcto: bien };
    pista.hidden = false;
    if (bien) {
      sonido.bien(); colocados++;
      const zona = $(`.caneca-zona[data-k="${k}"]`, el);
      zona.classList.add('recibe'); setTimeout(() => zona.classList.remove('recibe'), 500);
      $('.cuenta', zona).textContent = +$('.cuenta', zona).textContent + 1;
      card.classList.add('guardado'); setTimeout(() => card.remove(), 350);
      pista.className = 'pista ok'; pista.innerHTML = `<b>¡Correcto!</b> ${esc(it.pista)}`;
      $('[data-cont]', el).textContent = `${colocados} de ${lista.length}`;
      $('[data-barra]', el).style.width = (100 * colocados) / lista.length + '%';
      if (colocados === lista.length) {
        const ac = Object.values(resp).filter((x) => x.correcto).length;
        toast(`¡Reto superado! ${ac} de ${lista.length} al primer intento.`);
        ctx.listo({ actividad: { id: b.id, tipo, aciertos: ac, total: lista.length, respuestas: Object.values(resp) }, puntos: ac * 10, calificable: true });
      }
    } else {
      sonido.mal(); card.classList.add('error'); setTimeout(() => card.classList.remove('error'), 500);
      pista.className = 'pista mal'; pista.innerHTML = `<b>Ese no es su lugar.</b> Pista: ${esc(it.pista.split('.')[0])}.`;
    }
    card.classList.remove('sel'); elegido = null;
  };
  $$('.residuo', el).forEach((c) => c.addEventListener('click', () => {
    if (c.classList.contains('guardado')) return; sonido.clic(); elegido = c; $$('.residuo', el).forEach((x) => x.classList.toggle('sel', x === c));
  }));
  $$('.caneca-zona', el).forEach((z) => z.addEventListener('click', () => { if (elegido) soltar(elegido, z.dataset.k); }));
  let arr = null;
  el.addEventListener('pointerdown', (e) => {
    const c = e.target.closest('.residuo'); if (!c || c.classList.contains('guardado')) return;
    arr = { c, x: e.clientX, y: e.clientY, fantasma: null, movio: false };
  });
  const mover = (e) => {
    if (!arr) return;
    if (!arr.movio && Math.hypot(e.clientX - arr.x, e.clientY - arr.y) < 8) return;
    if (!arr.movio) { arr.movio = true; arr.fantasma = arr.c.cloneNode(true); arr.fantasma.classList.add('volando'); document.body.appendChild(arr.fantasma); arr.c.classList.add('arrastrando'); }
    e.preventDefault();
    arr.fantasma.style.left = e.clientX + 'px'; arr.fantasma.style.top = e.clientY + 'px';
    const bajo = document.elementFromPoint(e.clientX, e.clientY);
    $$('.caneca-zona', el).forEach((z) => z.classList.toggle('sobre', z.contains(bajo)));
  };
  const fin = (e) => {
    if (!arr) return;
    const { c, fantasma, movio } = arr; arr = null;
    if (!movio) return;
    fantasma.remove(); c.classList.remove('arrastrando');
    const bajo = document.elementFromPoint(e.clientX, e.clientY);
    const z = bajo && bajo.closest('.caneca-zona');
    $$('.caneca-zona', el).forEach((x) => x.classList.remove('sobre'));
    if (z && el.contains(z)) soltar(c, z.dataset.k);
  };
  window.addEventListener('pointermove', mover, { passive: false });
  window.addEventListener('pointerup', fin);
  const limpiar = new MutationObserver(() => { if (!document.body.contains(el) || !el.querySelector('.bandeja')) { window.removeEventListener('pointermove', mover); window.removeEventListener('pointerup', fin); limpiar.disconnect(); } });
  limpiar.observe(document.body, { childList: true, subtree: true });
}

// Sopa de letras reproducible (misma grilla para cada actividad)
function crearSopa(palabras, N, semilla) {
  let x = [...semilla].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);
  const rnd = () => ((x = (x * 1664525 + 1013904223) >>> 0) / 4294967296);
  for (let intento = 0; intento < 200; intento++) {
    const g = Array.from({ length: N }, () => Array(N).fill(''));
    const pos = {}; let ok = true;
    for (const w of [...palabras].sort((a, b) => b.length - a.length)) {
      let puesto = false;
      for (let t = 0; t < 300 && !puesto; t++) {
        const [df, dc] = [[0, 1], [1, 0], [1, 1], [0, 1], [1, 0]][Math.floor(rnd() * 5)];
        const f0 = Math.floor(rnd() * (N - df * (w.length - 1))), c0 = Math.floor(rnd() * (N - dc * (w.length - 1)));
        if ([...w].every((l, k) => !g[f0 + df * k][c0 + dc * k] || g[f0 + df * k][c0 + dc * k] === l)) {
          [...w].forEach((l, k) => (g[f0 + df * k][c0 + dc * k] = l));
          pos[w] = [...w].map((_, k) => [f0 + df * k, c0 + dc * k]); puesto = true;
        }
      }
      if (!puesto) { ok = false; break; }
    }
    if (!ok) continue;
    const abc = 'ABCDEFGHIJLMNOPRSTUVZ';
    for (let f = 0; f < N; f++) for (let c = 0; c < N; c++) if (!g[f][c]) g[f][c] = abc[Math.floor(rnd() * abc.length)];
    return { grilla: g, pos };
  }
  throw new Error('No se pudo crear la sopa de letras');
}

// ------------------------------------------------------------------ bloques
// Cada bloque recibe (contenedor, bloque, ctx) y llama ctx.listo(resultado) cuando el estudiante puede continuar.
export const BLOQUES = {
  bienvenida(el, b, ctx) {
    el.innerHTML = `<div class="bienvenida">
      <div class="personajes">${granitoSVG('granito flota', 'guiño')}<div class="avatar-grande">${avatarSVG(ctx.perfil.avatar)}</div></div>
      <div class="globo"><h3>${esc(b.titulo)}</h3><p>${esc(b.texto.replace('{nombre}', ctx.perfil.nombre.split(' ')[0]))}</p></div></div>`;
    ctx.listo();
  },

  texto(el, b, ctx) {
    el.innerHTML = `<article class="lectura"><h3>${esc(b.titulo)}</h3>
      <div class="lectura-grid ${b.imagen ? 'con-imagen' : ''}"><div>${parrafos(b.texto)}</div>
      ${b.imagen ? `<figure><img src="${b.imagen.src}" alt="${esc(b.imagen.pie)}" loading="lazy"><figcaption>${esc(b.imagen.pie)}</figcaption></figure>` : ''}</div>
      ${b.diagrama ? DIAGRAMAS[b.diagrama]() : ''}</article>`;
    ctx.listo({ puntos: 5 });
  },

  imagen(el, b, ctx) {
    el.innerHTML = `<article class="lectura"><h3>${esc(b.titulo)}</h3><figure class="foto-grande"><img src="${b.src}" alt="${esc(b.titulo)}" loading="lazy"></figure><p class="centro">${esc(b.texto)}</p></article>`;
    ctx.listo();
  },

  video(el, b, ctx) {
    const v = { ...VIDEOS[b.video] };
    if (ctx.videos && ctx.videos[b.video]) v.id = ctx.videos[b.video];
    el.innerHTML = `<article class="lectura"><h3>${esc(v.titulo)}</h3><p>${esc(b.texto)}</p>
      <div class="video" role="button" tabindex="0" aria-label="Reproducir video">
        <img src="https://i.ytimg.com/vi/${v.id}/hqdefault.jpg" alt="" loading="lazy" onerror="this.remove()">
        <div class="video-fondo">${granitoSVG('mini')}</div><span class="play">${ICONO.play}</span></div>
      <p class="pie-video">Si el video no carga, <a href="https://www.youtube.com/watch?v=${v.id}" target="_blank" rel="noopener">ábrelo en YouTube</a>.</p></article>`;
    const caja = $('.video', el);
    const reproducir = () => {
      caja.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${v.id}?autoplay=1&rel=0&modestbranding=1" title="${esc(v.titulo)}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
      caja.classList.add('activo');
    };
    caja.addEventListener('click', reproducir, { once: true });
    caja.addEventListener('keydown', (e) => { if (e.key === 'Enter') reproducir(); });
    ctx.listo({ puntos: 5 });
  },

  encuesta(el, b, ctx) {
    const ops = b.recipientes ? KEYS.map((k) => [k, RECIPIENTES[k].nombre]) : b.opciones.map((o, i) => [String(i), o]);
    el.innerHTML = `<div class="actividad"><h3>${esc(b.titulo)}</h3><p class="enunciado">${esc(b.pregunta)}</p>
      <div class="opciones ${b.recipientes ? 'con-recipientes' : ''}">${ops.map(([k, t]) => `<button class="opcion" data-k="${k}">${b.recipientes ? recipienteSVG(k) : ''}<span>${esc(t)}</span></button>`).join('')}</div>
      <p class="nota">No hay respuestas buenas o malas. Tu respuesta ayuda a tus profesores.</p></div>`;
    $$('.opcion', el).forEach((bt) => bt.addEventListener('click', () => {
      sonido.clic();
      $$('.opcion', el).forEach((x) => x.classList.toggle('elegida', x === bt));
      ctx.listo({ actividad: { id: b.id, tipo: 'encuesta', pregunta: b.pregunta, respuesta: $('span', bt).textContent }, puntos: 5 });
    }));
  },

  tarjetas(el, b, ctx) {
    el.innerHTML = `<div class="actividad"><h3>${esc(b.titulo)}</h3><div class="tarjetas">${KEYS.map((k) => `
      <button class="tarjeta" data-k="${k}" style="--c:${RECIPIENTES[k].color};--o:${RECIPIENTES[k].oscuro}">
        <div class="cara frente">${recipienteSVG(k)}<b>${RECIPIENTES[k].nombre}</b><small>Toca para ver</small></div>
        <div class="cara reverso"><b>${RECIPIENTES[k].nombre}</b><p>${RECIPIENTE_INFO[k].corto}</p><ul>${RECIPIENTE_INFO[k].ejemplos.map((e) => `<li>${e}</li>`).join('')}</ul></div>
      </button>`).join('')}</div><p class="nota" data-falta>Voltea las cuatro tarjetas para continuar.</p></div>`;
    const vistas = new Set();
    $$('.tarjeta', el).forEach((t) => t.addEventListener('click', () => {
      sonido.clic(); t.classList.toggle('volteada'); vistas.add(t.dataset.k);
      if (vistas.size === 4) { $('[data-falta]', el).textContent = '¡Muy bien! Ya conoces los cuatro recipientes.'; ctx.listo({ puntos: 10 }); }
    }));
  },

  emparejar(el, b, ctx) {
    const der = mezclar(KEYS);
    el.innerHTML = `<div class="actividad"><h3>${esc(b.titulo)}</h3><p class="enunciado">Toca un recipiente y después toca su descripción.</p>
      <div class="emparejar"><div class="izq">${KEYS.map((k) => `<button class="pieza rec" data-k="${k}" style="--c:${RECIPIENTES[k].color}">${recipienteSVG(k)}<span>${RECIPIENTES[k].nombre}</span></button>`).join('')}</div>
      <div class="der">${der.map((k) => `<button class="pieza desc" data-k="${k}">${RECIPIENTE_INFO[k].corto}</button>`).join('')}</div></div></div>`;
    let sel = null; const primeros = {}; let hechos = 0;
    $$('.pieza.rec', el).forEach((p) => p.addEventListener('click', () => { if (p.classList.contains('ok')) return; sonido.clic(); sel = p; $$('.pieza.rec', el).forEach((x) => x.classList.toggle('sel', x === p)); }));
    $$('.pieza.desc', el).forEach((p) => p.addEventListener('click', () => {
      if (!sel || p.classList.contains('ok')) return;
      const k = sel.dataset.k; const bien = p.dataset.k === k;
      if (!(k in primeros)) primeros[k] = { bien, elegido: RECIPIENTES[p.dataset.k].nombre };
      if (bien) {
        sonido.bien(); sel.classList.add('ok'); p.classList.add('ok'); sel.classList.remove('sel'); sel = null; hechos++;
        if (hechos === 4) {
          const ac = Object.values(primeros).filter((x) => x.bien).length;
          toast(`¡Completado! ${ac} de 4 al primer intento.`);
          ctx.listo({ actividad: { id: b.id, tipo: 'emparejar', aciertos: ac, total: 4, respuestas: KEYS.map((x) => ({ item: RECIPIENTES[x].nombre, elegido: 'Descripción de ' + primeros[x].elegido.toLowerCase(), correcto: primeros[x].bien })) }, puntos: ac * 10, calificable: true });
        }
      } else { sonido.mal(); p.classList.add('error'); setTimeout(() => p.classList.remove('error'), 500); }
    }));
  },

  clasificar(el, b, ctx) {
    const zonas = KEYS.map((k) => ({ k, nombre: RECIPIENTES[k].nombre, color: RECIPIENTES[k].color, icono: recipienteSVG(k) }));
    const items = b.residuos.map((id) => ({ id, nombre: RESIDUOS[id].n, correcta: RESIDUOS[id].r, pista: RESIDUOS[id].p }));
    clasificador(el, b, ctx, zonas, items, 'clasificar', 'Arrastra cada residuo a su recipiente. También puedes tocar el residuo y luego el recipiente.');
  },

  grupos(el, b, ctx) {
    const zonas = b.grupos.map((g) => ({ k: g.k, nombre: g.nombre, color: g.color, icono: recipienteSVG(g.icono) }));
    const items = b.items.map(([id, g]) => ({ id, nombre: RESIDUOS[id].n, correcta: g, pista: b.grupos.find((x) => x.k === g).pista }));
    clasificador(el, b, ctx, zonas, items, 'grupos', 'Arrastra o toca cada residuo y llévalo al grupo correcto.');
  },

  seleccion(el, b, ctx) {
    const califica = Array.isArray(b.correctos);
    const lista = mezclar(b.residuos);
    el.innerHTML = `<div class="actividad"><h3>${esc(b.titulo)}</h3><p class="enunciado">${esc(b.enunciado)}</p>
      <div class="seleccion">${lista.map((id) => `<button class="sel-item" data-id="${id}" aria-pressed="false">${residuoSVG(id)}<span>${RESIDUOS[id].n}</span><i class="marca">${ICONO.check}</i></button>`).join('')}</div>
      <div class="acciones-act"><span class="nota" data-n>0 seleccionados</span><button class="btn primario" data-ok disabled>${califica ? 'Comprobar' : 'Enviar mi respuesta'}</button></div><div class="retro" hidden></div></div>`;
    const actualizar = () => { const n = $$('.sel-item.on', el).length; $('[data-n]', el).textContent = `${n} seleccionado${n === 1 ? '' : 's'}`; $('[data-ok]', el).disabled = n === 0; };
    $$('.sel-item', el).forEach((it) => it.addEventListener('click', () => {
      if (el.querySelector('.seleccion.bloq')) return;
      sonido.clic(); it.classList.toggle('on'); it.setAttribute('aria-pressed', it.classList.contains('on')); actualizar();
    }));
    $('[data-ok]', el).addEventListener('click', () => {
      $('.seleccion', el).classList.add('bloq'); $('[data-ok]', el).disabled = true;
      const elegidos = $$('.sel-item.on', el).map((x) => x.dataset.id);
      if (!califica) {
        sonido.bien();
        const r = $('.retro', el); r.hidden = false; r.className = 'retro ok'; r.innerHTML = '<p><b>¡Gracias!</b> Tus respuestas ayudan a tus profesores a conocer los residuos del aula.</p>';
        ctx.listo({ actividad: { id: b.id, tipo: 'seleccion', pregunta: b.enunciado, elegidos: elegidos.map((x) => RESIDUOS[x].n) }, puntos: 10 });
        return;
      }
      const respuestas = []; let ac = 0;
      lista.forEach((id) => {
        const debe = b.correctos.includes(id), esta = elegidos.includes(id), bien = debe === esta;
        if (bien) ac++;
        respuestas.push({ item: RESIDUOS[id].n, elegido: esta ? 'Seleccionado' : 'Sin seleccionar', correcto: bien });
        const nodo = $(`.sel-item[data-id="${id}"]`, el); nodo.classList.add(bien ? 'bien' : 'mal'); if (debe) nodo.classList.add('era');
        if (!bien) nodo.insertAdjacentHTML('beforeend', `<em class="etiqueta">${debe ? 'Te faltó' : 'No va aquí'}</em>`);
      });
      ac === lista.length ? sonido.bien() : sonido.mal();
      const r = $('.retro', el); r.hidden = false; r.className = 'retro ' + (ac === lista.length ? 'ok' : 'mal');
      r.innerHTML = `<p><b>${ac} de ${lista.length} decisiones correctas.</b> ${ac === lista.length ? '¡Excelente ojo de guardián!' : 'Revisa las etiquetas. Los residuos en verde son los que sí debías tocar.'}</p>`;
      ctx.listo({ actividad: { id: b.id, tipo: 'seleccion', aciertos: ac, total: lista.length, respuestas }, puntos: ac * 4, calificable: true });
    });
  },

  sopa(el, b, ctx) {
    const N = b.tam || 10; const palabras = b.palabras.map((w) => w.toUpperCase());
    const { grilla, pos } = crearSopa(palabras, N, b.id);
    el.innerHTML = `<div class="actividad"><h3>${esc(b.titulo)}</h3><p class="enunciado">Toca la primera letra y luego la última letra de cada palabra. Pueden estar en horizontal, vertical o diagonal.</p>
      <div class="sopa-grid"><div class="sopa" style="--n:${N}" data-sol="${btoa(JSON.stringify(pos))}">${grilla.map((fila, f) => fila.map((l, c) => `<button class="letra" data-f="${f}" data-c="${c}">${l}</button>`).join('')).join('')}</div>
      <div class="palabras">${palabras.map((w) => `<span data-w="${w}">${w}</span>`).join('')}<button class="btn pequeno fantasma" data-pista>Pedir una pista</button></div></div></div>`;
    const halladas = new Set(); let inicio = null; let pistas = 0;
    const celda = (f, c) => $(`.letra[data-f="${f}"][data-c="${c}"]`, el);
    $$('.letra', el).forEach((bt) => bt.addEventListener('click', () => {
      const f = +bt.dataset.f, c = +bt.dataset.c;
      if (!inicio) { inicio = [f, c]; bt.classList.add('inicio'); sonido.clic(); return; }
      const [f0, c0] = inicio; celda(f0, c0).classList.remove('inicio'); inicio = null;
      const df = Math.sign(f - f0), dc = Math.sign(c - c0), largo = Math.max(Math.abs(f - f0), Math.abs(c - c0)) + 1;
      if (!(f === f0 || c === c0 || Math.abs(f - f0) === Math.abs(c - c0))) { sonido.mal(); return; }
      let txt = ''; const celdas = [];
      for (let k = 0; k < largo; k++) { const n = celda(f0 + df * k, c0 + dc * k); txt += n.textContent; celdas.push(n); }
      const w = palabras.find((x) => !halladas.has(x) && (x === txt || x === [...txt].reverse().join('')));
      if (!w) { sonido.mal(); celdas.forEach((n) => { n.classList.add("falla"); setTimeout(() => n.classList.remove("falla"), 400); }); return; }
      halladas.add(w); sonido.bien();
      const color = ['#8EC6E9', '#BFE3B4', '#F6DC8C', '#F4B9AE', '#D7C8F0', '#B9E4E0'][halladas.size % 6];
      celdas.forEach((n) => { n.classList.add('hallada'); n.style.setProperty('--h', color); });
      $(`[data-w="${w}"]`, el).classList.add('hallada');
      if (halladas.size === palabras.length) {
        toast('¡Encontraste todas las palabras!');
        ctx.listo({ actividad: { id: b.id, tipo: 'sopa', encontradas: palabras.length, pistas }, puntos: Math.max(10, palabras.length * 5 - pistas * 3) });
      }
    }));
    $('[data-pista]', el).addEventListener('click', () => {
      const falta = palabras.find((w) => !halladas.has(w)); if (!falta) return;
      pistas++; const [f, c] = pos[falta][0]; const n = celda(f, c); n.classList.add('pista-letra'); setTimeout(() => n.classList.remove('pista-letra'), 2200);
    });
  },

  completar(el, b, ctx) {
    const banco = mezclar([...b.frases.map((x) => x.r), ...(b.distractores || [])]);
    el.innerHTML = `<div class="actividad"><h3>${esc(b.titulo)}</h3><p class="enunciado">Toca una palabra del banco para llenar el espacio en blanco. Si te equivocas, toca el espacio para devolver la palabra.</p>
      <ol class="frases">${b.frases.map((x, i) => `<li>${esc(x.t).replace('___', `<button class="hueco" data-i="${i}" data-r="${btoa(unescape(encodeURIComponent(x.r)))}"></button>`)}</li>`).join('')}</ol>
      <div class="banco">${banco.map((w, i) => `<button class="ficha" data-k="${i}">${esc(w)}</button>`).join('')}</div>
      <div class="acciones-act"><span></span><button class="btn primario" data-ok disabled>Comprobar</button></div><div class="retro" hidden></div></div>`;
    const huecos = $$('.hueco', el);
    const revisar = () => { $('[data-ok]', el).disabled = huecos.some((h2) => !h2.dataset.k); };
    $$('.ficha', el).forEach((f) => f.addEventListener('click', () => {
      if (f.classList.contains('usada') || el.querySelector('.frases.bloq')) return;
      const libre = huecos.find((h2) => !h2.dataset.k); if (!libre) return;
      sonido.clic(); libre.textContent = f.textContent; libre.dataset.k = f.dataset.k; f.classList.add('usada'); revisar();
    }));
    huecos.forEach((h2) => h2.addEventListener('click', () => {
      if (!h2.dataset.k || el.querySelector('.frases.bloq')) return;
      $(`.ficha[data-k="${h2.dataset.k}"]`, el).classList.remove('usada'); h2.textContent = ''; delete h2.dataset.k; revisar();
    }));
    $('[data-ok]', el).addEventListener('click', () => {
      $('.frases', el).classList.add('bloq'); $('[data-ok]', el).disabled = true;
      let ac = 0; const respuestas = [];
      huecos.forEach((h2, i) => {
        const fr = b.frases[i]; const bien = h2.textContent === fr.r; if (bien) ac++;
        h2.classList.add(bien ? 'bien' : 'mal'); if (!bien) h2.insertAdjacentHTML('afterend', `<span class="correccion">${esc(fr.r)}</span>`);
        respuestas.push({ item: fr.t.replace('___', '...'), elegido: h2.textContent, correcto: bien });
      });
      ac === huecos.length ? sonido.bien() : sonido.mal();
      const r = $('.retro', el); r.hidden = false; r.className = 'retro ' + (ac === huecos.length ? 'ok' : 'mal');
      r.innerHTML = `<p><b>${ac} de ${huecos.length} espacios correctos.</b> ${ac === huecos.length ? '¡Muy bien!' : 'Revisa las palabras en verde, son las respuestas correctas.'}</p>`;
      ctx.listo({ actividad: { id: b.id, tipo: 'completar', aciertos: ac, total: huecos.length, respuestas }, puntos: ac * 8, calificable: true });
    });
  },

  adivina(el, b, ctx) {
    const norm = (t) => t.replace(/Ñ/g, '#').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/#/g, 'Ñ');
    let i = 0; let ac = 0; const respuestas = [];
    const pintar = () => {
      const p = b.palabras[i]; const W = p.w.toUpperCase(); const base = norm(W);
      let vidas = 6; const usadas = new Set();
      el.innerHTML = `<div class="actividad adivina"><div class="quiz-cab"><h3>${esc(b.titulo)}</h3><span class="contador">Palabra ${i + 1} de ${b.palabras.length}</span></div>
        <div class="pista-adivina">${granitoSVG('mini', 'piensa')}<p><b>Pista.</b> ${esc(p.pista)}</p></div>
        <div class="palabra" data-w="${btoa(unescape(encodeURIComponent(W)))}">${[...W].map((l, k) => `<span data-k="${k}"></span>`).join('')}</div>
        <div class="vidas">${Array.from({ length: 6 }, () => `<i>${residuoSVG('mandarina')}</i>`).join('')}</div>
        <div class="teclado">${'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.split('').map((l) => `<button data-l="${l}">${l}</button>`).join('')}</div><div class="retro" hidden></div></div>`;
      const terminar = (bien) => {
        if (bien) { ac++; sonido.bien(); } else sonido.mal();
        respuestas.push({ item: p.pista, elegido: bien ? W : 'Sin adivinar', correcto: bien });
        $$('.palabra span', el).forEach((s2, k) => (s2.textContent = W[k]));
        $$('.teclado button', el).forEach((x) => (x.disabled = true));
        const r = $('.retro', el); r.hidden = false; r.className = 'retro ' + (bien ? 'ok' : 'mal');
        const ultima = i === b.palabras.length - 1;
        r.innerHTML = `<p><b>${bien ? '¡La adivinaste!' : 'La palabra era'} ${esc(W)}.</b></p><button class="btn primario">${ultima ? 'Terminar' : 'Siguiente palabra'}</button>`;
        $('button', r).addEventListener('click', () => {
          if (!ultima) { i++; pintar(); return; }
          el.innerHTML = `<div class="actividad resultado-act">${granitoSVG('granito', 'guiño')}<h3>${ac} de ${b.palabras.length} palabras adivinadas</h3><p>Las palabras del guardián ya son parte de tu vocabulario.</p></div>`;
          ctx.listo({ actividad: { id: b.id, tipo: 'adivina', aciertos: ac, total: b.palabras.length, respuestas }, puntos: ac * 10, calificable: true });
        });
      };
      $$('.teclado button', el).forEach((bt) => bt.addEventListener('click', () => {
        const l = bt.dataset.l; bt.disabled = true; usadas.add(l);
        if (base.includes(l)) {
          bt.classList.add('si'); sonido.clic();
          [...base].forEach((x, k) => { if (x === l) $(`.palabra span[data-k="${k}"]`, el).textContent = W[k]; });
          if ([...base].every((x) => usadas.has(x) || x === ' ')) terminar(true);
        } else {
          bt.classList.add('no'); vidas--; sonido.tono([200], 'sine', 0.08, 0.04);
          const v = $$('.vidas i:not(.cae)', el).pop(); if (v) v.classList.add('cae');
          if (vidas === 0) terminar(false);
        }
      }));
    };
    pintar();
  },

  escala(el, b, ctx) {
    const caras = [
      `<svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="18" fill="#F4B9AE"/><circle cx="14" cy="16" r="2.4" fill="#1B2B40"/><circle cx="26" cy="16" r="2.4" fill="#1B2B40"/><path d="M13 28c4-4 10-4 14 0" fill="none" stroke="#1B2B40" stroke-width="2.4" stroke-linecap="round"/></svg>`,
      `<svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="18" fill="#F6DC8C"/><circle cx="14" cy="16" r="2.4" fill="#1B2B40"/><circle cx="26" cy="16" r="2.4" fill="#1B2B40"/><path d="M13 26h14" stroke="#1B2B40" stroke-width="2.4" stroke-linecap="round"/></svg>`,
      `<svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="18" fill="#BFE3B4"/><circle cx="14" cy="16" r="2.4" fill="#1B2B40"/><circle cx="26" cy="16" r="2.4" fill="#1B2B40"/><path d="M12 24c4 6 12 6 16 0" fill="none" stroke="#1B2B40" stroke-width="2.4" stroke-linecap="round"/></svg>`];
    el.innerHTML = `<div class="actividad"><h3>${esc(b.titulo)}</h3><p class="enunciado">Elige la carita que mejor describe lo que aprendiste. Sé sincero, esto te ayuda a mejorar.</p>
      <div class="escala">${b.afirmaciones.map((a, i) => `<div class="fila-escala" data-i="${i}"><p>${esc(a)}</p><div class="caras">${b.opciones.map((o, k) => `<button data-v="${k}" title="${esc(o)}">${caras[k]}<span>${esc(o)}</span></button>`).join('')}</div></div>`).join('')}</div>
      <div class="acciones-act"><span></span><button class="btn primario" data-ok disabled>Guardar mi autoevaluación</button></div></div>`;
    const resp = {};
    $$('.fila-escala', el).forEach((f) => $$('button', f).forEach((bt) => bt.addEventListener('click', () => {
      if (el.querySelector('.escala.bloq')) return;
      sonido.clic(); $$('button', f).forEach((x) => x.classList.toggle('on', x === bt)); resp[f.dataset.i] = +bt.dataset.v;
      $('[data-ok]', el).disabled = Object.keys(resp).length < b.afirmaciones.length;
    })));
    $('[data-ok]', el).addEventListener('click', () => {
      $('.escala', el).classList.add('bloq'); $('[data-ok]', el).disabled = true; $('[data-ok]', el).textContent = 'Autoevaluación guardada'; sonido.bien();
      ctx.listo({ actividad: { id: b.id, tipo: 'escala', respuestas: b.afirmaciones.map((a, i) => ({ item: a, elegido: b.opciones[resp[i]], valor: resp[i] + 1 })) }, puntos: 10 });
    });
  },

  quiz(el, b, ctx) {
    let i = 0; let ac = 0; const respuestas = [];
    let reloj = null;
    const pintar = () => {
      const p = b.preguntas[i];
      clearInterval(reloj);
      const opciones = p.recipientes ? KEYS.map((k) => ({ k, t: RECIPIENTES[k].nombre, ic: recipienteSVG(k) })) : p.opciones.map((t, j) => ({ k: j, t }));
      el.innerHTML = `<div class="actividad quiz"><div class="quiz-cab"><h3>${esc(b.titulo)}</h3><span class="contador">Pregunta ${i + 1} de ${b.preguntas.length}</span></div>
        <div class="quiz-cuerpo">${p.residuo ? `<div class="quiz-img">${residuoSVG(p.residuo)}</div>` : ''}<p class="enunciado grande">${esc(p.pregunta)}</p></div>
        <div class="opciones ${p.recipientes ? 'con-recipientes' : ''}">${opciones.map((o) => `<button class="opcion" data-k="${o.k}">${o.ic || ''}<span>${esc(o.t)}</span></button>`).join('')}</div>
        ${b.tiempo ? `<div class="reloj"><i></i><span>${b.tiempo}</span></div>` : ''}<div class="retro" hidden></div></div>`;
      const responder = (bt) => {
        if (el.querySelector('.opcion.bloq')) return;
        clearInterval(reloj);
        const elegido = bt ? (p.recipientes ? bt.dataset.k : +bt.dataset.k) : null;
        const bien = elegido === p.correcta;
        if (bien) { ac++; sonido.bien(); } else sonido.mal();
        respuestas.push({ item: p.residuo ? RESIDUOS[p.residuo].n : p.pregunta, elegido: bt ? $('span', bt).textContent : 'Sin responder a tiempo', correcto: bien });
        $$('.opcion', el).forEach((x) => { x.classList.add('bloq'); const k = p.recipientes ? x.dataset.k : +x.dataset.k; if (k === p.correcta) x.classList.add('correcta'); else if (x === bt) x.classList.add('incorrecta'); });
        const r = $('.retro', el); r.hidden = false; r.className = 'retro ' + (bien ? 'ok' : 'mal');
        const ultima = i === b.preguntas.length - 1;
        r.innerHTML = `<p><b>${bien ? '¡Excelente!' : bt ? 'Casi lo logras.' : '¡Se acabó el tiempo!'}</b> ${esc(p.explicacion)}</p><button class="btn primario">${ultima ? 'Ver resultado' : 'Siguiente pregunta'}</button>`;
        $('button', r).addEventListener('click', () => {
          if (!ultima) { i++; pintar(); return; }
          el.innerHTML = `<div class="actividad resultado-act">${granitoSVG('granito', ac / b.preguntas.length >= 0.6 ? 'guiño' : 'piensa')}<h3>${ac} de ${b.preguntas.length} respuestas correctas</h3><p>${ac === b.preguntas.length ? '¡Perfecto! Eres un gran guardián.' : 'Muy bien. Revisa las explicaciones y sigue adelante.'}</p></div>`;
          ctx.listo({ actividad: { id: b.id, tipo: 'quiz', aciertos: ac, total: b.preguntas.length, respuestas }, puntos: ac * 10, calificable: true });
        });
      };
      $$('.opcion', el).forEach((bt) => bt.addEventListener('click', () => responder(bt)));
      if (b.tiempo) {
        const fin = Date.now() + b.tiempo * 1000;
        reloj = setInterval(() => {
          if (!document.body.contains(el)) return clearInterval(reloj);
          const resta = Math.max(0, fin - Date.now());
          const rl = $('.reloj', el); if (!rl) return clearInterval(reloj);
          $('i', rl).style.width = (100 * resta) / (b.tiempo * 1000) + '%'; $('span', rl).textContent = Math.ceil(resta / 1000);
          rl.classList.toggle('urgente', resta < 5000);
          if (resta === 0) responder(null);
        }, 200);
      }
    };
    pintar();
  },

  vf(el, b, ctx) {
    let i = 0; let ac = 0; const respuestas = [];
    const pintar = () => {
      const a = b.afirmaciones[i];
      el.innerHTML = `<div class="actividad vf"><div class="quiz-cab"><h3>${esc(b.titulo)}</h3><span class="contador">${i + 1} de ${b.afirmaciones.length}</span></div>
        <div class="vf-tarjeta"><p>${esc(a.t)}</p></div>
        <div class="vf-botones"><button class="btn verdadero" data-v="1">${ICONO.check} Verdadero</button><button class="btn falso" data-v="0">✕ Falso</button></div><div class="retro" hidden></div></div>`;
      $$('.vf-botones .btn', el).forEach((bt) => bt.addEventListener('click', () => {
        if ($('.vf-botones', el).classList.contains('bloq')) return;
        $('.vf-botones', el).classList.add('bloq');
        const bien = (bt.dataset.v === '1') === a.v;
        if (bien) { ac++; sonido.bien(); } else sonido.mal();
        respuestas.push({ item: a.t, elegido: bt.dataset.v === '1' ? 'Verdadero' : 'Falso', correcto: bien });
        bt.classList.add(bien ? 'correcta' : 'incorrecta');
        const r = $('.retro', el); r.hidden = false; r.className = 'retro ' + (bien ? 'ok' : 'mal');
        const ultima = i === b.afirmaciones.length - 1;
        r.innerHTML = `<p><b>${a.v ? 'Es verdadero.' : 'Es falso.'}</b> ${esc(a.e)}</p><button class="btn primario">${ultima ? 'Terminar' : 'Siguiente'}</button>`;
        $('button', r).addEventListener('click', () => {
          if (!ultima) { i++; pintar(); return; }
          el.innerHTML = `<div class="actividad resultado-act">${granitoSVG('granito', 'guiño')}<h3>${ac} de ${b.afirmaciones.length} correctas</h3><p>Ya sabes separar los mitos de las verdades.</p></div>`;
          ctx.listo({ actividad: { id: b.id, tipo: 'vf', aciertos: ac, total: b.afirmaciones.length, respuestas }, puntos: ac * 10, calificable: true });
        });
      }));
    };
    pintar();
  },

  memoria(el, b, ctx) {
    const cartas = mezclar(b.pares.flatMap((id) => [{ par: id, html: residuoSVG(id), t: RESIDUOS[id].n }, { par: id, html: recipienteSVG(RESIDUOS[id].r), t: RECIPIENTES[RESIDUOS[id].r].nombre }]));
    el.innerHTML = `<div class="actividad"><h3>${esc(b.titulo)}</h3><p class="enunciado">Encuentra cada residuo con su recipiente. Voltea dos cartas a la vez.</p>
      <div class="memoria">${cartas.map((c, i) => `<button class="carta" data-i="${i}" data-par="${c.par}"><div class="dorso">${granitoSVG('mini')}</div><div class="cara-m">${c.html}<span>${esc(c.t)}</span></div></button>`).join('')}</div>
      <p class="nota" data-mov>Movimientos: 0</p></div>`;
    let abiertas = []; let mov = 0; let pares = 0; let errores = 0; let bloqueo = false;
    $$('.carta', el).forEach((c) => c.addEventListener('click', () => {
      if (bloqueo || c.classList.contains('abierta') || c.classList.contains('hecha')) return;
      sonido.clic(); c.classList.add('abierta'); abiertas.push(c);
      if (abiertas.length === 2) {
        mov++; $('[data-mov]', el).textContent = 'Movimientos: ' + mov;
        const [a, d] = abiertas;
        if (a.dataset.par === d.dataset.par) {
          sonido.bien(); a.classList.add('hecha'); d.classList.add('hecha'); abiertas = []; pares++;
          if (pares === b.pares.length) {
            toast(`¡Memoria completada en ${mov} movimientos!`);
            ctx.listo({ actividad: { id: b.id, tipo: 'memoria', movimientos: mov }, puntos: Math.max(10, 40 - errores * 3) });
          }
        } else {
          errores++; bloqueo = true; sonido.mal();
          setTimeout(() => { a.classList.remove('abierta'); d.classList.remove('abierta'); abiertas = []; bloqueo = false; }, 900);
        }
      }
    }));
  },

  ordenar(el, b, ctx) {
    let orden = mezclar(b.pasos.map((t, i) => ({ t, i })));
    if (orden.every((o, k) => o.i === k)) orden.reverse();
    const pintar = (revisado) => {
      el.innerHTML = `<div class="actividad"><h3>${esc(b.titulo)}</h3><p class="enunciado">${esc(b.pregunta)} Usa las flechas para subir o bajar cada paso.</p>
        <ol class="ordenar">${orden.map((o, k) => `<li class="${revisado ? (o.i === k ? 'ok' : 'mal') : ''}"><span class="num">${k + 1}</span><span class="txt">${esc(o.t)}</span>
          ${revisado ? '' : `<span class="mover"><button data-sube="${k}" aria-label="Subir" ${k === 0 ? 'disabled' : ''}>▲</button><button data-baja="${k}" aria-label="Bajar" ${k === orden.length - 1 ? 'disabled' : ''}>▼</button></span>`}</li>`).join('')}</ol>
        ${revisado ? '' : '<button class="btn primario" data-comprobar>Comprobar orden</button>'}<div class="retro" hidden></div></div>`;
      $$('[data-sube]', el).forEach((bt) => bt.addEventListener('click', () => { const k = +bt.dataset.sube; [orden[k - 1], orden[k]] = [orden[k], orden[k - 1]]; sonido.clic(); pintar(false); }));
      $$('[data-baja]', el).forEach((bt) => bt.addEventListener('click', () => { const k = +bt.dataset.baja; [orden[k + 1], orden[k]] = [orden[k], orden[k + 1]]; sonido.clic(); pintar(false); }));
      const comp = $('[data-comprobar]', el);
      if (comp) comp.addEventListener('click', () => {
        const ac = orden.filter((o, k) => o.i === k).length;
        ac === orden.length ? sonido.bien() : sonido.mal();
        pintar(true);
        const r = $('.retro', el); r.hidden = false; r.className = 'retro ' + (ac === orden.length ? 'ok' : 'mal');
        r.innerHTML = `<p><b>${ac} de ${orden.length} pasos en su lugar.</b> ${ac === orden.length ? '¡Orden perfecto!' : 'Este es el orden correcto.'}</p>${b.diagrama ? DIAGRAMAS[b.diagrama]() : (ac === orden.length ? '' : `<ol class="orden-correcto">${b.pasos.map((t) => `<li>${esc(t)}</li>`).join('')}</ol>`)}`;
        ctx.listo({ actividad: { id: b.id, tipo: 'ordenar', aciertos: ac, total: orden.length, respuestas: orden.map((o, k) => ({ item: o.t, elegido: 'Posición ' + (k + 1), correcto: o.i === k })) }, puntos: ac * 6, calificable: true });
      });
    };
    pintar(false);
  },

  casos(el, b, ctx) {
    let i = 0; let ac = 0; const respuestas = [];
    const pintar = () => {
      const c = b.casos[i]; const r = RESIDUOS[c.r];
      el.innerHTML = `<div class="actividad casos"><div class="quiz-cab"><h3>${esc(b.titulo)}</h3><span class="contador">Caso ${i + 1} de ${b.casos.length}</span></div>
        <div class="caso"><div class="lupa">${residuoSVG(c.r)}</div><p>${esc(c.t)}</p></div>
        <div class="opciones con-recipientes">${KEYS.map((k) => `<button class="opcion" data-k="${k}">${recipienteSVG(k)}<span>${RECIPIENTES[k].nombre}</span></button>`).join('')}</div><div class="retro" hidden></div></div>`;
      $$('.opcion', el).forEach((bt) => bt.addEventListener('click', () => {
        if (el.querySelector('.opcion.bloq')) return;
        const bien = bt.dataset.k === r.r;
        if (bien) { ac++; sonido.bien(); } else sonido.mal();
        respuestas.push({ item: r.n, elegido: RECIPIENTES[bt.dataset.k].nombre, correcto: bien });
        $$('.opcion', el).forEach((x) => { x.classList.add('bloq'); if (x.dataset.k === r.r) x.classList.add('correcta'); else if (x === bt) x.classList.add('incorrecta'); });
        const re = $('.retro', el); re.hidden = false; re.className = 'retro ' + (bien ? 'ok' : 'mal');
        const ultima = i === b.casos.length - 1;
        re.innerHTML = `<p><b>${bien ? 'Caso resuelto.' : 'Pista del detective.'}</b> ${esc(r.p)}</p><button class="btn primario">${ultima ? 'Cerrar el expediente' : 'Siguiente caso'}</button>`;
        $('button', re).addEventListener('click', () => {
          if (!ultima) { i++; pintar(); return; }
          el.innerHTML = `<div class="actividad resultado-act">${granitoSVG('granito', 'guiño')}<h3>${ac} de ${b.casos.length} casos resueltos</h3><p>Los residuos difíciles ya tienen menos secretos para ti.</p></div>`;
          ctx.listo({ actividad: { id: b.id, tipo: 'casos', aciertos: ac, total: b.casos.length, respuestas }, puntos: ac * 10, calificable: true });
        });
      }));
    };
    pintar();
  },

  reflexion(el, b, ctx) {
    el.innerHTML = `<div class="actividad"><h3>${esc(b.titulo)}</h3><div class="reflexion">${granitoSVG('granito', 'piensa')}<div><p class="enunciado">${esc(b.pregunta)}</p>
      <textarea rows="4" maxlength="600" placeholder="Escribe aquí con tus palabras"></textarea><p class="nota" data-n>Escribe al menos 15 caracteres.</p>
      <button class="btn primario" disabled>Guardar mi reflexión</button></div></div></div>`;
    const ta = $('textarea', el); const bt = $('button', el);
    ta.addEventListener('input', () => { bt.disabled = ta.value.trim().length < 15; $('[data-n]', el).textContent = ta.value.trim().length >= 15 ? '¡Listo para guardar!' : 'Escribe al menos 15 caracteres.'; });
    bt.addEventListener('click', () => {
      bt.disabled = true; ta.disabled = true; bt.textContent = 'Reflexión guardada'; sonido.bien();
      ctx.listo({ actividad: { id: b.id, tipo: 'reflexion', pregunta: b.pregunta, texto: ta.value.trim() }, puntos: 20 });
    });
  },

  compromiso(el, b, ctx) {
    el.innerHTML = `<div class="actividad"><h3>${esc(b.titulo)}</h3><p class="enunciado">Elige por lo menos tres compromisos que vas a cumplir como guardián.</p>
      <div class="compromisos">${b.opciones.map((o, i) => `<label class="comp"><input type="checkbox" value="${i}"><span class="caja">${ICONO.check}</span><span>${esc(o)}</span></label>`).join('')}</div>
      <input class="campo" maxlength="140" placeholder="Escribe un compromiso propio (opcional)"><button class="btn primario" disabled>Firmar mi compromiso</button></div>`;
    const bt = $('button.btn', el);
    const revisar = () => { bt.disabled = $$('input[type=checkbox]:checked', el).length < 3; };
    $$('input[type=checkbox]', el).forEach((c) => c.addEventListener('change', () => { sonido.clic(); revisar(); }));
    bt.addEventListener('click', () => {
      const elegidos = $$('input[type=checkbox]:checked', el).map((c) => b.opciones[+c.value]);
      const propio = $('input.campo', el).value.trim();
      bt.disabled = true; bt.textContent = 'Compromiso firmado'; sonido.bien();
      $$('input', el).forEach((x) => (x.disabled = true));
      ctx.listo({ actividad: { id: b.id, tipo: 'compromiso', elegidos, propio }, puntos: 20 });
    });
  },
};
