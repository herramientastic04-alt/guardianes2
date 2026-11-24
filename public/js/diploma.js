// Diploma descargable por sesión (se dibuja en un lienzo y se descarga como imagen PNG)
import { medallaSVG, MEDALLAS } from './iconos.js';
import { avatarSVG } from './avatar.js';

const cargar = (src) => new Promise((ok) => { const i = new Image(); i.onload = () => ok(i); i.onerror = () => ok(null); i.src = src; });
const svgImg = (svgTxt) => cargar('data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgTxt.replace('<svg ', '<svg width="400" height="400" ')));

export async function dibujarDiploma({ perfil, sesion, porcentaje, estrellas, final }) {
  try { await Promise.all([document.fonts.load('800 60px "Baloo 2"'), document.fonts.load('700 30px "Nunito"'), document.fonts.load('400 30px "Nunito"')]); } catch {}
  const W = 1600, H = 1130;
  const c = document.createElement('canvas'); c.width = W; c.height = H;
  const x = c.getContext('2d');
  // fondo con textura suave
  x.fillStyle = '#FFFFFF'; x.fillRect(0, 0, W, H);
  x.fillStyle = 'rgba(30,90,150,.06)';
  for (let i = 0; i < W; i += 22) for (let j = 0; j < H; j += 22) { x.beginPath(); x.arc(i, j, 1.6, 0, 7); x.fill(); }
  // marcos
  x.lineWidth = 18; x.strokeStyle = '#1E5A96'; x.strokeRect(34, 34, W - 68, H - 68);
  x.lineWidth = 4; x.strokeStyle = '#E9B949'; x.strokeRect(62, 62, W - 124, H - 124);
  x.lineWidth = 2; x.strokeStyle = '#2F8A3E'; x.strokeRect(74, 74, W - 148, H - 148);
  // esquinas
  const hoja = (cx, cy, rot) => { x.save(); x.translate(cx, cy); x.rotate(rot); x.fillStyle = '#2F8A3E';
    x.beginPath(); x.ellipse(0, 0, 34, 14, 0, 0, 7); x.fill(); x.fillStyle = '#E9B949'; x.beginPath(); x.ellipse(26, 18, 22, 9, 0.7, 0, 7); x.fill(); x.restore(); };
  hoja(118, 118, 0.6); hoja(W - 118, 118, 2.5); hoja(118, H - 118, -0.6); hoja(W - 118, H - 118, 3.7);

  const escudo = await cargar('img/escudo.png');
  if (escudo) { const h = 170, w = (h * escudo.width) / escudo.height; x.drawImage(escudo, W / 2 - w / 2, 92, w, h); }
  x.textAlign = 'center';
  x.fillStyle = '#143E6B'; x.font = '800 30px "Nunito", sans-serif';
  x.fillText('INSTITUCIÓN EDUCATIVA CASAS BAJAS', W / 2, 300);
  x.fillStyle = '#2F8A3E'; x.font = 'italic 400 22px "Nunito", sans-serif';
  x.fillText('Ciencia y Trabajo. Vereda Santa Teresa, Cajibío, Cauca', W / 2, 334);

  x.fillStyle = '#1E5A96'; x.font = '800 76px "Baloo 2", sans-serif';
  x.fillText(final ? 'Diploma de Maestro Guardián' : 'Diploma de Guardián', W / 2, 428);
  x.fillStyle = '#1B2B40'; x.font = '600 28px "Nunito", sans-serif';
  x.fillText('de la Separación de Residuos Sólidos', W / 2, 470);
  x.font = '400 26px "Nunito", sans-serif'; x.fillText('Se otorga con orgullo a', W / 2, 540);

  // nombre
  let tam = 74; x.font = `800 ${tam}px "Baloo 2", sans-serif`;
  while (x.measureText(perfil.nombre).width > 980 && tam > 40) { tam -= 4; x.font = `800 ${tam}px "Baloo 2", sans-serif`; }
  x.fillStyle = '#B5372A'; x.fillText(perfil.nombre, W / 2, 630);
  x.strokeStyle = '#E9B949'; x.lineWidth = 3; x.beginPath(); x.moveTo(W / 2 - 430, 656); x.lineTo(W / 2 + 430, 656); x.stroke();

  x.fillStyle = '#1B2B40'; x.font = '400 27px "Nunito", sans-serif';
  const lineas = final
    ? ['por completar las tres misiones de la estrategia gamificada', 'y demostrar que sabe separar los residuos del aula en los cuatro recipientes.']
    : [`por completar la Misión ${sesion.numero}. ${sesion.titulo},`, `y ganar la medalla ${MEDALLAS[sesion.id].nombre}.`];
  lineas.forEach((l, i) => x.fillText(l, W / 2, 712 + i * 40));
  x.font = '700 26px "Nunito", sans-serif'; x.fillStyle = '#2F8A3E';
  x.fillText(`Aciertos ${porcentaje} %   ${'★'.repeat(estrellas)}${'☆'.repeat(3 - estrellas)}`, W / 2, 812);

  // medalla y avatar
  const meds = final ? ['s1', 's2', 's3'] : [sesion.id];
  for (let i = 0; i < meds.length; i++) {
    const m = await svgImg(medallaSVG(meds[i]));
    const tamM = final ? 104 : 190; const total = meds.length * tamM + (meds.length - 1) * 14;
    const x0 = final ? W / 2 - total / 2 : W - 160 - total; const y0 = final ? 832 : 820 - tamM;
    if (m) x.drawImage(m, x0 + i * (tamM + 14), y0, tamM, tamM * 1.04);
  }
  const av = await svgImg(avatarSVG(perfil.avatar));
  if (av) x.drawImage(av, 118, 650, 165, 165);

  // pie y firmas
  const fecha = new Date().toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric' });
  x.font = '400 22px "Nunito", sans-serif'; x.fillStyle = '#1B2B40';
  x.strokeStyle = '#1B2B40'; x.lineWidth = 1.5;
  [[W / 2 - 400, 'Docente investigador'], [W / 2 + 400, 'Rectoría']].forEach(([cx, t]) => {
    x.beginPath(); x.moveTo(cx - 170, 960); x.lineTo(cx + 170, 960); x.stroke(); x.fillText(t, cx, 992);
  });
  x.fillText(`Expedido el ${fecha}`, W / 2, 992);
  x.font = 'italic 400 19px "Nunito", sans-serif'; x.fillStyle = '#5B6472';
  x.fillText('Estrategia gamificada para fortalecer el hábito de separación de residuos sólidos. Grado séptimo.', W / 2, 1036);
  return c;
}

export async function descargarDiploma(opciones) {
  const c = await dibujarDiploma(opciones);
  const nombre = (opciones.final ? 'diploma_final_' : `diploma_mision${opciones.sesion.numero}_`) + opciones.perfil.usuario + '.png';
  await new Promise((ok) => c.toBlob((b) => {
    const a = document.createElement('a'); a.href = URL.createObjectURL(b); a.download = nombre; document.body.appendChild(a); a.click();
    setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); ok(); }, 300);
  }, 'image/png'));
}

export async function imprimirDiploma(opciones) {
  const c = await dibujarDiploma(opciones);
  const w = window.open('', '_blank');
  if (!w) return;
  w.document.write(`<title>Diploma</title><style>@page{size:landscape;margin:0}body{margin:0}img{width:100%}</style><img src="${c.toDataURL('image/png')}" onload="setTimeout(()=>print(),300)">`);
  w.document.close();
}
