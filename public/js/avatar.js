// Creador de avatares personalizables (SVG)
const T = '#1B2B40';
export const OPCIONES = {
  piel: ['#F7D3B5', '#E8B48F', '#C98E62', '#9C6640', '#6B4428'],
  peinado: [
    ['corto', 'Corto'], ['rizado', 'Rizado'], ['largo', 'Largo'], ['colas', 'Colitas'], ['afro', 'Afro'], ['rapado', 'Rapado'],
  ],
  pelo: ['#1F1B18', '#4A2E1E', '#7B4B2A', '#C98B3C', '#8B2E2E'],
  camisa: ['#1E5A96', '#2F8A3E', '#E9B949', '#B5372A', '#8EC6E9', '#6C4AB6'],
  accesorio: [
    ['ninguno', 'Ninguno'], ['gorra', 'Gorra'], ['lentes', 'Lentes'], ['flor', 'Flor'], ['sombrero', 'Sombrero'], ['audifonos', 'Audífonos'],
  ],
  fondo: ['#DCEFD6', '#DDEBF7', '#FBF0CF', '#F6DCD8', '#E8E1F5'],
  gesto: [['feliz', 'Feliz'], ['sonrisa', 'Tranquilo'], ['asombro', 'Asombrado']],
};
export const AVATAR_INICIAL = { piel: '#E8B48F', peinado: 'corto', pelo: '#4A2E1E', camisa: '#1E5A96', accesorio: 'ninguno', fondo: '#DDEBF7', gesto: 'feliz' };

let uid = 0;
export function avatarSVG(a = AVATAR_INICIAL, cls = 'avatar') {
  a = { ...AVATAR_INICIAL, ...(a || {}) };
  const id = 'av' + (++uid) + Math.random().toString(36).slice(2, 6);
  const P = a.pelo, K = a.piel;
  const st = `stroke="${T}" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round"`;
  let atras = '', frente = '';
  switch (a.peinado) {
    case 'largo':
      atras = `<path d="M30 52c-2-30 62-30 60 0l4 42c-14 8-50 8-68 0z" fill="${P}" ${st}/>`;
      frente = `<path d="M34 52c0-20 12-28 28-28 14 0 24 10 24 26-10-2-18-8-22-16-6 10-18 16-30 18z" fill="${P}" ${st}/>`;
      break;
    case 'colas':
      atras = `<circle cx="28" cy="58" r="11" fill="${P}" ${st}/><circle cx="92" cy="58" r="11" fill="${P}" ${st}/>`;
      frente = `<path d="M35 52c-2-22 14-30 26-30s28 8 25 30c-4-8-12-14-24-14s-22 6-27 14z" fill="${P}" ${st}/>`;
      break;
    case 'afro':
      atras = `<circle cx="60" cy="46" r="36" fill="${P}" ${st}/>`;
      frente = `<path d="M36 46c4-10 12-14 24-14s20 4 24 14c-8-4-16-6-24-6s-16 2-24 6z" fill="${P}"/>`;
      break;
    case 'rizado':
      frente = [[38, 40], [46, 32], [56, 28], [66, 28], [76, 32], [83, 40], [42, 48], [80, 48]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="9" fill="${P}" ${st}/>`).join('');
      break;
    case 'rapado':
      frente = `<path d="M36 50c0-18 10-26 24-26s24 8 24 26c-8-6-16-9-24-9s-16 3-24 9z" fill="${P}" opacity=".55"/>`;
      break;
    default:
      frente = `<path d="M35 52c-3-22 13-30 27-30 16 0 27 10 24 30-6-10-14-14-24-14-11 0-20 5-27 14z" fill="${P}" ${st}/><path d="M58 24c6 2 10 6 12 12" fill="none" stroke="#fff" stroke-opacity=".25" stroke-width="3"/>`;
  }
  let ojos, boca;
  if (a.gesto === 'asombro') {
    ojos = `<circle cx="51" cy="56" r="4.4" fill="${T}"/><circle cx="69" cy="56" r="4.4" fill="${T}"/><circle cx="52.4" cy="54.6" r="1.4" fill="#fff"/><circle cx="70.4" cy="54.6" r="1.4" fill="#fff"/>`;
    boca = `<ellipse cx="60" cy="69" rx="4" ry="5" fill="#7A2E2E" ${st}/>`;
  } else if (a.gesto === 'sonrisa') {
    ojos = `<circle cx="51" cy="56" r="3.4" fill="${T}"/><circle cx="69" cy="56" r="3.4" fill="${T}"/><circle cx="52.2" cy="54.8" r="1.1" fill="#fff"/><circle cx="70.2" cy="54.8" r="1.1" fill="#fff"/>`;
    boca = `<path d="M53 67c4 4 10 4 14 0" fill="none" ${st}/>`;
  } else {
    ojos = `<path d="M47 57c2.5-4 6.5-4 9 0M64 57c2.5-4 6.5-4 9 0" fill="none" ${st}/>`;
    boca = `<path d="M52 65c3 8 13 8 16 0z" fill="#FFFFFF" ${st}/>`;
  }
  let acc = '';
  switch (a.accesorio) {
    case 'gorra':
      acc = `<path d="M35 44c0-16 12-24 26-24s25 8 25 24z" fill="#B5372A" ${st}/><path d="M60 44h36c-2 6-8 8-14 8H60z" fill="#8E2A20" ${st}/><circle cx="61" cy="22" r="3" fill="#E9B949"/>`; break;
    case 'lentes':
      acc = `<circle cx="51" cy="56" r="8" fill="#fff" fill-opacity=".25" ${st}/><circle cx="69" cy="56" r="8" fill="#fff" fill-opacity=".25" ${st}/><path d="M59 56h2M43 54l-7-3M77 54l7-3" ${st}/>`; break;
    case 'flor':
      acc = `<g transform="translate(84 38)">${[0, 72, 144, 216, 288].map((r) => `<ellipse rx="5" ry="8" transform="rotate(${r}) translate(0 -7)" fill="#F7A1C4" ${st}/>`).join('')}<circle r="4.5" fill="#E9B949" ${st}/></g>`; break;
    case 'sombrero':
      acc = `<ellipse cx="60" cy="38" rx="40" ry="8" fill="#E2C38A" ${st}/><path d="M42 38c0-16 8-22 18-22s18 6 18 22z" fill="#E2C38A" ${st}/><path d="M42 33h36" stroke="#1B2B40" stroke-width="4"/>`; break;
    case 'audifonos':
      acc = `<path d="M34 58c-4-30 56-30 52 0" fill="none" stroke="#2C333D" stroke-width="5" stroke-linecap="round"/><rect x="28" y="52" width="10" height="16" rx="5" fill="#E63946" ${st}/><rect x="82" y="52" width="10" height="16" rx="5" fill="#E63946" ${st}/>`; break;
  }
  return `<svg class="${cls}" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs><clipPath id="${id}"><circle cx="60" cy="60" r="58"/></clipPath></defs>
    <circle cx="60" cy="60" r="58" fill="${a.fondo}"/>
    <g clip-path="url(#${id})">
      ${atras}
      <path d="M18 124c2-24 20-36 42-36s40 12 42 36z" fill="${a.camisa}" ${st}/>
      <path d="M50 89l10 12 10-12" fill="none" stroke="#fff" stroke-opacity=".7" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      <rect x="52" y="74" width="16" height="18" rx="7" fill="${K}" ${st}/>
      <circle cx="36" cy="58" r="6" fill="${K}" ${st}/><circle cx="84" cy="58" r="6" fill="${K}" ${st}/>
      <ellipse cx="60" cy="56" rx="24" ry="26" fill="${K}" ${st}/>
      ${frente}
      <path d="M46 49c3-2 7-2 9 0M65 49c3-2 7-2 9 0" fill="none" stroke="${T}" stroke-width="2" stroke-linecap="round" opacity=".7"/>
      ${ojos}${boca}
      <circle cx="45" cy="64" r="4" fill="#F28C8C" opacity=".45"/><circle cx="75" cy="64" r="4" fill="#F28C8C" opacity=".45"/>
      ${acc}
    </g>
    <circle cx="60" cy="60" r="58" fill="none" stroke="${T}" stroke-opacity=".12" stroke-width="2"/>
  </svg>`;
}

export function avatarAleatorio() {
  const r = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const v = (arr) => (Array.isArray(arr[0]) ? r(arr)[0] : r(arr));
  return { piel: v(OPCIONES.piel), peinado: v(OPCIONES.peinado), pelo: v(OPCIONES.pelo), camisa: v(OPCIONES.camisa),
    accesorio: v(OPCIONES.accesorio), fondo: v(OPCIONES.fondo), gesto: v(OPCIONES.gesto) };
}
