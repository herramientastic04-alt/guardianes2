// Panel del docente investigador: progreso, resultados por residuo, respuestas abiertas, videos y exportación
import { SESIONES, MOMENTOS, RESIDUOS, VIDEOS, CALIFICABLES as CALIF, NOMBRE_TIPO as NOMBRE_ACT } from './contenido.js';
import { avatarSVG } from './avatar.js';
import { medallaSVG, estrellasHTML, ICONO } from './iconos.js';
import { $, $$, h, esc, toast } from './actividades.js';
import { cerrarSesion } from './api.js';

const resultado = (pr) => {
  const acts = Object.values(pr?.actividades || {}).filter((a) => CALIF.includes(a.tipo));
  const ac = acts.reduce((x, a) => x + (a.aciertos || 0), 0), tot = acts.reduce((x, a) => x + (a.total || 0), 0);
  const pct = tot ? Math.round((100 * ac) / tot) : null;
  return { ac, tot, pct, estrellas: pct >= 85 ? 3 : pct >= 60 ? 2 : 1 };
};
const fecha = (iso) => (iso ? new Date(iso).toLocaleString('es-CO', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) : 'Sin registro');
const nombresResiduos = new Set(Object.values(RESIDUOS).map((r) => r.n));

export async function panelDocente(app, { api, E }) {
  app.innerHTML = `<section class="panel"><div class="panel-cab"><div><h1>Panel del docente investigador</h1><p class="sub">Progreso de los estudiantes en las tres misiones de la estrategia gamificada.</p></div>
    <div class="botones"><button class="btn secundario" id="recargar">Actualizar</button><button class="btn fantasma" id="csv1">${ICONO.descarga} Resultados por estudiante</button><button class="btn fantasma" id="csv2">${ICONO.descarga} Respuestas detalladas</button></div></div>
    <nav class="pestanas">${[['resumen', 'Resumen'], ['estudiantes', 'Estudiantes'], ['residuos', 'Análisis por residuo'], ['abiertas', 'Encuestas y reflexiones'], ['videos', 'Videos']]
      .map(([k, t], i) => `<button data-tab="${k}" class="${i === 0 ? 'activa' : ''}">${t}</button>`).join('')}</nav>
    <div id="contenido-panel"><div class="cargando">Cargando datos</div></div></section>`;
  let lista = []; let tab = 'resumen';
  const cargar = async () => {
    try { lista = (await api.estudiantes()).estudiantes; pintar(); }
    catch (e) { if (e.status === 401) { cerrarSesion(); E.rol = null; location.hash = '/docente'; } else $('#contenido-panel').innerHTML = `<p class="error">${esc(e.message)}</p>`; }
  };
  const pintar = () => { $$('.pestanas button').forEach((b) => b.classList.toggle('activa', b.dataset.tab === tab)); VISTAS[tab]($('#contenido-panel'), lista, { api, recargar: cargar }); };
  $$('.pestanas button').forEach((b) => (b.onclick = () => { tab = b.dataset.tab; pintar(); }));
  $('#recargar').onclick = cargar;
  $('#csv1').onclick = () => csvEstudiantes(lista);
  $('#csv2').onclick = () => csvRespuestas(lista);
  await cargar();
}

const VISTAS = {
  resumen(el, lista) {
    const n = lista.length;
    const porSesion = SESIONES.map((s) => {
      const comp = lista.filter((e) => e.progreso[s.id]?.completada);
      const pcts = comp.map((e) => resultado(e.progreso[s.id]).pct).filter((x) => x !== null);
      return { s, comp: comp.length, iniciada: lista.filter((e) => e.progreso[s.id]).length, prom: pcts.length ? Math.round(pcts.reduce((a, b) => a + b, 0) / pcts.length) : null };
    });
    const encuesta = (id) => { const c = {}; lista.forEach((e) => { const a = Object.values(e.progreso).map((p) => p.actividades?.[id]).find(Boolean); if (a) c[a.respuesta] = (c[a.respuesta] || 0) + 1; }); return c; };
    const barras = (obj) => { const tot = Object.values(obj).reduce((a, b) => a + b, 0) || 1; return Object.entries(obj).sort((a, b) => b[1] - a[1]).map(([k, v]) => `<div class="hbar"><span>${esc(k)}</span><i style="width:${(100 * v) / tot}%"></i><b>${v}</b></div>`).join('') || '<p class="vacio">Aún sin respuestas.</p>'; };
    el.innerHTML = `<div class="kpis"><div class="kpi"><b>${n}</b><span>Estudiantes registrados</span></div>
      ${porSesion.map((x) => `<div class="kpi" style="--c:${x.s.color}">${medallaSVG(x.s.id)}<b>${x.comp}<small> de ${n}</small></b><span>Completaron la misión ${x.s.numero}</span></div>`).join('')}</div>
      <div class="dos-col"><div class="caja-panel"><h3>Promedio de aciertos por misión</h3>${porSesion.map((x) => `<div class="vbar-fila"><span>Misión ${x.s.numero}</span><div class="vbar"><i style="width:${x.prom ?? 0}%;background:${x.s.color}"></i></div><b>${x.prom === null ? 'Sin datos' : x.prom + ' %'}</b></div>`).join('')}
        <p class="nota">Porcentaje de respuestas correctas al primer intento en las actividades calificables de cada misión. ${porSesion.map((x) => `Misión ${x.s.numero}, ${x.iniciada} iniciadas.`).join(' ')}</p></div>
      <div class="caja-panel"><h3>¿Qué hacen en la casa con los residuos?</h3>${barras(encuesta('s1_casa'))}<h3 class="mt">Predicción inicial de la caja de jugo</h3>${barras(encuesta('s3_prediccion'))}</div></div>`;
  },

  estudiantes(el, lista, { api, recargar }) {
    if (!lista.length) { el.innerHTML = '<p class="vacio">Todavía no hay estudiantes registrados.</p>'; return; }
    el.innerHTML = `<div class="tabla-envoltura"><table class="tabla"><thead><tr><th>Estudiante</th><th>Edad</th><th>Grado</th>${SESIONES.map((s) => `<th>Misión ${s.numero}</th>`).join('')}<th>Puntos</th><th>Última actividad</th><th></th></tr></thead><tbody>
      ${lista.map((e) => `<tr><td><div class="est">${avatarSVG(e.avatar)}<div><b>${esc(e.nombre)}</b><small>${esc(e.usuario)}</small></div></div></td><td>${e.edad}</td><td>${esc(e.grado)}</td>
        ${SESIONES.map((s) => { const pr = e.progreso[s.id]; const r = resultado(pr); return `<td><div class="celda-mision">${MOMENTOS.map(([m, t]) => `<i class="${pr?.momentos?.[m] ? 'si' : ''}" title="${t}"></i>`).join('')}${pr?.completada ? estrellasHTML(r.estrellas) : ''}<small>${r.pct === null ? '' : r.pct + ' %'}</small></div></td>`; }).join('')}
        <td><b>${Object.values(e.progreso).reduce((a, p) => a + (p.puntos || 0), 0)}</b></td><td><small>${fecha(e.actualizado)}</small></td>
        <td class="acc"><button class="btn pequeno" data-ver="${e.usuario}">Ver</button><button class="btn pequeno fantasma" data-clave="${e.usuario}">Clave</button><button class="btn pequeno peligro" data-borrar="${e.usuario}">Eliminar</button></td></tr>`).join('')}
      </tbody></table></div>`;
    $$('[data-ver]', el).forEach((b) => (b.onclick = () => detalle(lista.find((e) => e.usuario === b.dataset.ver))));
    $$('[data-clave]', el).forEach((b) => (b.onclick = async () => {
      const c = prompt(`Nueva clave de 4 números para ${b.dataset.clave}`);
      if (c === null) return;
      try { await api.nuevaClave(b.dataset.clave, c.trim()); toast('Clave actualizada'); } catch (e) { toast(e.message, 'mal'); }
    }));
    $$('[data-borrar]', el).forEach((b) => (b.onclick = async () => {
      if (!confirm(`¿Eliminar la cuenta de ${b.dataset.borrar} y todo su progreso?`)) return;
      try { await api.borrar(b.dataset.borrar); toast('Estudiante eliminado'); recargar(); } catch (e) { toast(e.message, 'mal'); }
    }));
  },

  residuos(el, lista) {
    const datos = {};
    lista.forEach((e) => Object.entries(e.progreso).forEach(([sid, pr]) => Object.values(pr.actividades || {}).forEach((a) => {
      if (!['clasificar', 'quiz', 'casos'].includes(a.tipo)) return;
      (a.respuestas || []).forEach((r) => {
        if (!nombresResiduos.has(r.item)) return;
        const d = (datos[r.item] = datos[r.item] || { n: 0, ok: 0, errores: {} });
        d.n++; if (r.correcto) d.ok++; else d.errores[r.elegido] = (d.errores[r.elegido] || 0) + 1;
      });
    })));
    const filas = Object.entries(datos).map(([item, d]) => ({ item, ...d, pct: Math.round((100 * d.ok) / d.n), error: Object.entries(d.errores).sort((a, b) => b[1] - a[1])[0] })).sort((a, b) => a.pct - b.pct);
    const correcto = Object.fromEntries(Object.values(RESIDUOS).map((r) => [r.n, r.r]));
    const NOM = { pap: 'Papel y cartón', tar: 'Tarros con residuos', bas: 'Basura', org: 'Orgánicos' };
    el.innerHTML = filas.length ? `<div class="caja-panel"><h3>Precisión por residuo al primer intento</h3><p class="nota">Reúne las respuestas de clasificación, preguntas y casos de las tres misiones. Los residuos aparecen del más difícil al más fácil.</p>
      <table class="tabla"><thead><tr><th>Residuo</th><th>Recipiente correcto</th><th>Precisión</th><th>Respuestas</th><th>Confusión más frecuente</th></tr></thead><tbody>
      ${filas.map((f) => `<tr><td><b>${esc(f.item)}</b></td><td>${NOM[correcto[f.item]]}</td><td><div class="vbar mini"><i style="width:${f.pct}%;background:${f.pct >= 85 ? '#2F8A3E' : f.pct >= 60 ? '#E9B949' : '#B5372A'}"></i></div> ${f.pct} %</td><td>${f.n}</td><td>${f.error ? `${esc(f.error[0])} (${f.error[1]})` : 'Ninguna'}</td></tr>`).join('')}
      </tbody></table></div>` : '<p class="vacio">Aún no hay respuestas de clasificación.</p>';
  },

  abiertas(el, lista) {
    const bloques = [];
    SESIONES.forEach((s) => {
      const conteo = {};
      lista.forEach((e) => Object.values(e.progreso[s.id]?.actividades || {}).forEach((a) => {
        const sumar = (preg, op) => { const c = (conteo[a.id + preg] = conteo[a.id + preg] || { t: NOMBRE_ACT[a.tipo], preg, ops: {}, n: 0 }); c.ops[op] = (c.ops[op] || 0) + 1; };
        if (a.tipo === 'encuesta') { sumar(a.pregunta, a.respuesta); conteo[a.id + a.pregunta].n++; }
        if (a.tipo === 'seleccion' && a.elegidos) { a.elegidos.forEach((x) => sumar(a.pregunta, x)); conteo[a.id + a.pregunta].n++; }
        if (a.tipo === 'escala') (a.respuestas || []).forEach((r) => { sumar(r.item, r.elegido); conteo[a.id + r.item].n++; });
      }));
      const graf = Object.values(conteo).map((c) => `<div class="agregado"><p><small>${esc(c.t)}</small><b>${esc(c.preg)}</b></p>${Object.entries(c.ops).sort((x, y) => y[1] - x[1]).map(([op, k]) => `<div class="vbar-fila ancha"><span>${esc(op)}</span><div class="vbar"><i style="width:${(100 * k) / c.n}%;background:#1E5A96"></i></div><span>${k} de ${c.n}</span></div>`).join('')}</div>`).join('');
      if (graf) bloques.push(`<div class="caja-panel"><h3>Misión ${s.numero}. Encuestas y autoevaluación</h3>${graf}</div>`);
      const items = [];
      lista.forEach((e) => Object.values(e.progreso[s.id]?.actividades || {}).forEach((a) => {
        if (a.tipo === 'reflexion') items.push(`<li><b>${esc(e.nombre)}</b><span>${esc(a.texto)}</span></li>`);
        if (a.tipo === 'compromiso') items.push(`<li><b>${esc(e.nombre)}</b><span>Compromisos: ${esc((a.elegidos || []).join('; '))}${a.propio ? '. Propio: ' + esc(a.propio) : ''}</span></li>`);
      }));
      bloques.push(`<div class="caja-panel"><h3>Misión ${s.numero}. Reflexiones y compromisos</h3>${items.length ? `<ul class="abiertas">${items.join('')}</ul>` : '<p class="vacio">Sin respuestas todavía.</p>'}</div>`);
    });
    el.innerHTML = bloques.join('');
  },

  videos(el, lista, { api }) {
    el.innerHTML = `<div class="caja-panel"><h3>Videos de las misiones</h3><p class="nota">Si un video deja de estar disponible, pega aquí el enlace o el código de otro video de YouTube y guarda los cambios.</p>
      <div class="videos-cfg">${Object.entries(VIDEOS).map(([k, v]) => `<label class="video-cfg"><img src="https://i.ytimg.com/vi/${v.id}/mqdefault.jpg" alt="" onerror="this.style.visibility='hidden'">
        <span><b>Misión ${v.sesion}. ${esc(v.titulo)}</b><input data-v="${k}" placeholder="${v.id}"></span></label>`).join('')}</div>
      <button class="btn primario" id="guardar-v">Guardar videos</button></div>`;
    api.config().then((cfg) => { $$('[data-v]', el).forEach((i) => { if (cfg[i.dataset.v]) i.value = cfg[i.dataset.v]; }); });
    $('#guardar-v', el).onclick = async () => {
      const videos = {};
      $$('[data-v]', el).forEach((i) => { const m = i.value.trim().match(/(?:v=|youtu\.be\/|embed\/|shorts\/)?([\w-]{11})(?:[?&].*)?$/); if (m) videos[i.dataset.v] = m[1]; });
      try { await api.guardarVideos(videos); toast('Videos guardados'); } catch (e) { toast(e.message, 'mal'); }
    };
  },
};

function detalle(e) {
  const modal = h(`<div class="modal"><div class="modal-caja"><button class="cerrar" aria-label="Cerrar">✕</button>
    <div class="est grande">${avatarSVG(e.avatar)}<div><h2>${esc(e.nombre)}</h2><small>${esc(e.usuario)}, ${e.edad} años, grado ${esc(e.grado)}. Registrado el ${fecha(e.creado)}</small></div></div>
    ${SESIONES.map((s) => {
      const pr = e.progreso[s.id]; const r = resultado(pr);
      if (!pr) return `<div class="det-mision"><h3>Misión ${s.numero}</h3><p class="vacio">Sin iniciar.</p></div>`;
      return `<div class="det-mision"><h3>Misión ${s.numero}. ${esc(s.titulo)} ${pr.completada ? estrellasHTML(r.estrellas) : ''}</h3>
        <p class="nota">${MOMENTOS.map(([m, t]) => `${t}: ${pr.momentos?.[m] ? fecha(pr.momentos[m]) : 'pendiente'}`).join('. ')}. Puntos: ${pr.puntos || 0}. ${r.pct === null ? '' : `Aciertos: ${r.ac} de ${r.tot} (${r.pct} %).`}</p>
        ${Object.values(pr.actividades || {}).map((a) => `<details><summary>${NOMBRE_ACT[a.tipo] || a.tipo}${a.total ? `, ${a.aciertos} de ${a.total}` : ''}</summary>
          ${a.respuestas ? `<ul class="resp">${a.respuestas.map((x) => x.correcto === undefined ? `<li>${esc(x.item)}. ${esc(x.elegido)}</li>` : `<li class="${x.correcto ? 'ok' : 'mal'}">${x.correcto ? '✓' : '✗'} ${esc(x.item)}. Eligió ${esc(x.elegido)}</li>`).join('')}</ul>` : ''}${a.tipo === 'sopa' ? `<p>Encontró ${a.encontradas} palabras con ${a.pistas} pistas.</p>` : ''}
          ${a.texto ? `<p>${esc(a.texto)}</p>` : ''}${a.respuesta ? `<p>${esc(a.pregunta)} ${esc(a.respuesta)}</p>` : ''}${a.elegidos ? `<p>${esc(a.elegidos.join('; '))}${a.propio ? '. ' + esc(a.propio) : ''}</p>` : ''}${a.movimientos ? `<p>Movimientos: ${a.movimientos}</p>` : ''}
        </details>`).join('')}</div>`;
    }).join('')}</div></div>`);
  document.body.appendChild(modal);
  const cerrar = () => modal.remove();
  $('.cerrar', modal).onclick = cerrar; modal.addEventListener('click', (ev) => { if (ev.target === modal) cerrar(); });
}

function descargarCSV(nombre, filas) {
  const txt = filas.map((f) => f.map((c) => `"${String(c ?? '').replace(/"/g, '""')}"`).join(';')).join('\r\n');
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob(['﻿' + txt], { type: 'text/csv;charset=utf-8' }));
  a.download = nombre; document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 300);
}
function csvEstudiantes(lista) {
  const cab = ['Nombre', 'Usuario', 'Edad', 'Grado', ...SESIONES.flatMap((s) => [`Mision ${s.numero} completada`, `Mision ${s.numero} aciertos`, `Mision ${s.numero} total`, `Mision ${s.numero} porcentaje`, `Mision ${s.numero} puntos`]), 'Puntos totales', 'Ultima actividad'];
  descargarCSV('resultados_por_estudiante.csv', [cab, ...lista.map((e) => [e.nombre, e.usuario, e.edad, e.grado,
    ...SESIONES.flatMap((s) => { const pr = e.progreso[s.id]; const r = resultado(pr); return [pr?.completada ? 'Si' : 'No', r.ac, r.tot, r.pct ?? '', pr?.puntos || 0]; }),
    Object.values(e.progreso).reduce((a, p) => a + (p.puntos || 0), 0), e.actualizado])]);
}
function csvRespuestas(lista) {
  const filas = [['Nombre', 'Usuario', 'Mision', 'Actividad', 'Item', 'Respuesta', 'Correcto', 'Fecha']];
  lista.forEach((e) => SESIONES.forEach((s) => Object.values(e.progreso[s.id]?.actividades || {}).forEach((a) => {
    if (a.respuestas) a.respuestas.forEach((r) => filas.push([e.nombre, e.usuario, s.numero, NOMBRE_ACT[a.tipo] || a.tipo, r.item, r.elegido, r.correcto === undefined ? '' : r.correcto ? 'Si' : 'No', a.fecha]));
    else filas.push([e.nombre, e.usuario, s.numero, NOMBRE_ACT[a.tipo] || a.tipo, a.pregunta || '', a.texto || a.respuesta || (a.elegidos || []).join('; ') || a.movimientos || (a.tipo === 'sopa' ? `${a.encontradas} palabras, ${a.pistas} pistas` : ''), '', a.fecha]);
  })));
  descargarCSV('respuestas_detalladas.csv', filas);
}
