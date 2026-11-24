// Ilustraciones SVG del recurso: residuos, recipientes, mascota y medallas.
const T = '#1B2B40'; // tinta
const S = `stroke="${T}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"`;
const svg = (inner, vb = '0 0 100 100', cls = '') => `<svg class="${cls}" viewBox="${vb}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${inner}</svg>`;

const R = {
  banano: `<path d="M50 22c-2 18 4 30 4 30l-8 2s-8-12-4-32z" fill="#7A5A2A" ${S}/>
    <path d="M46 50c-12 6-22 18-26 30 10 0 22-8 28-20z" fill="#F6D24A" ${S}/>
    <path d="M54 50c12 6 22 18 26 30-10 0-22-8-28-20z" fill="#F6D24A" ${S}/>
    <path d="M46 52c-2 14 0 28 4 36 4-8 6-22 4-36z" fill="#FBE27A" ${S}/>
    <path d="M28 76c6-2 10-6 14-12M72 76c-6-2-10-6-14-12" fill="none" stroke="#C9A227" stroke-width="2"/>`,
  uvas: `<path d="M52 18c0 8-2 12-6 16" fill="none" ${S}/><path d="M54 22c8-6 16-4 20 0-6 6-14 6-20 0z" fill="#5FA041" ${S}/>
    ${[[40,40],[56,40],[32,54],[48,54],[64,54],[40,68],[56,68],[48,82]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="9" fill="#7B3F8F" ${S}/><circle cx="${x-3}" cy="${y-3}" r="2.5" fill="#C9A0DC"/>`).join('')}`,
  palo_helado: `<rect x="40" y="14" width="20" height="74" rx="10" fill="#E2B77A" ${S}/><path d="M50 26v20M46 54v14M54 60v16" stroke="#B58A4C" stroke-width="2.5" stroke-linecap="round"/>`,
  tierra: `<path d="M12 80c6-20 22-34 38-34s32 14 38 34z" fill="#8B5E3C" ${S}/>
    <circle cx="34" cy="68" r="3" fill="#5B3A22"/><circle cx="52" cy="60" r="3.5" fill="#5B3A22"/><circle cx="66" cy="72" r="3" fill="#5B3A22"/><circle cx="46" cy="74" r="2.5" fill="#C9A27A"/>
    <path d="M70 30l14-10M76 38l12-4M64 26l4-12" stroke="#B08968" stroke-width="3" stroke-linecap="round"/>`,
  mandarina: `<path d="M22 60c0-18 12-30 28-30 6 0 10 2 14 4-8 4-12 12-10 22 2 12 12 18 22 18-6 8-16 12-26 12-16 0-28-12-28-26z" fill="#F28C28" ${S}/>
    <path d="M60 30c10-6 22-2 26 8-8-2-16 2-20 8z" fill="#F6A94B" ${S}/><circle cx="36" cy="58" r="2" fill="#C9661A"/><circle cx="44" cy="72" r="2" fill="#C9661A"/><circle cx="30" cy="70" r="2" fill="#C9661A"/>`,
  pastel: `<path d="M16 72l60-40 8 40z" fill="#F5D7A1" ${S}/><path d="M16 72h68v12H16z" fill="#E8B96A" ${S}/>
    <path d="M22 68l54-36 4 14c-10 2-16 8-26 10s-22 8-32 12z" fill="#FFF4E6" ${S}/><circle cx="70" cy="28" r="7" fill="#D63A3A" ${S}/><path d="M70 21c2-6 6-8 10-8" fill="none" ${S}/>`,
  virutas: `<path d="M20 80l40-40 12 12-40 40z" fill="#F4C542" ${S}/><path d="M60 40l14-6-6 14z" fill="#E8C9A0" ${S}/><path d="M71 35l5-2-2 5z" fill="${T}"/>
    <path d="M20 80l-6 8 8-2" fill="#F29C9C" ${S}/>
    <path d="M70 70c8-4 14 2 10 8s-12 2-8-4M52 84c6-6 14-2 12 4" fill="#E8C9A0" ${S}/>`,
  servilleta: `<path d="M18 26h64v54H18z" fill="#FFFFFF" ${S}/><path d="M18 26l64 54" stroke="#D9DEE5" stroke-width="2"/>
    <ellipse cx="40" cy="58" rx="10" ry="7" fill="#C98A4B" opacity=".75"/><ellipse cx="64" cy="40" rx="6" ry="5" fill="#E07A5F" opacity=".7"/><circle cx="54" cy="66" r="3.5" fill="#F2D16B"/>`,
  piedras: `<path d="M10 82c10-12 24-16 40-16s30 4 40 16z" fill="#8B5E3C" ${S}/>
    <ellipse cx="34" cy="62" rx="14" ry="10" fill="#9AA5B1" ${S}/><ellipse cx="62" cy="58" rx="12" ry="9" fill="#B8C1CC" ${S}/><ellipse cx="50" cy="74" rx="9" ry="6" fill="#7D8794" ${S}/>`,
  mango: `<path d="M30 30c18-14 44-6 48 18 4 22-14 38-34 36-18-2-26-20-24-32 0-10 4-16 10-22z" fill="#F7B733" ${S}/>
    <path d="M30 30c10 4 16 12 18 24" fill="none" stroke="#E07B39" stroke-width="3"/><path d="M60 22c4-8 12-10 18-8-2 6-8 10-16 10z" fill="#5FA041" ${S}/>`,
  palillos: `<path d="M18 84l62-66" stroke="${T}" stroke-width="9" stroke-linecap="round"/><path d="M18 84l62-66" stroke="#E2B77A" stroke-width="5" stroke-linecap="round"/>
    <path d="M30 86l56-54" stroke="${T}" stroke-width="9" stroke-linecap="round"/><path d="M30 86l56-54" stroke="#D6A35F" stroke-width="5" stroke-linecap="round"/>`,
  caja_colores: `${['#D63A3A','#F4C542','#2F8A3E','#1E5A96','#7B3F8F'].map((c,i)=>`<path d="M${26+i*10} 40l4-14 4 14z" fill="${c}" ${S}/><rect x="${26+i*10}" y="38" width="8" height="12" fill="${c}" ${S}/>`).join('')}
    <path d="M18 46h64v38H18z" fill="#4C8FD1" ${S}/><path d="M18 46l8 10h48l6-10" fill="#2E6DAD" ${S}/><path d="M34 70h32" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round"/>`,
  hoja: `<path d="M24 14h40l14 14v58H24z" fill="#FFFFFF" ${S}/><path d="M64 14v14h14" fill="#E6EEF7" ${S}/>
    ${[36,46,56,66,76].map(y=>`<path d="M30 ${y}h42" stroke="#8EC6E9" stroke-width="2"/>`).join('')}<path d="M34 14v72" stroke="#F29C9C" stroke-width="2"/>
    <path d="M38 44c6-6 10 6 16 0s10 6 14 0M38 64c8-4 14 4 22 0" fill="none" stroke="#1E5A96" stroke-width="2.5" stroke-linecap="round"/>`,
  bolsa_papel: `<path d="M24 30h52l4 56H20z" fill="#C8955C" ${S}/><path d="M24 30l6-10h40l6 10" fill="#B07A41" ${S}/><path d="M36 44c0 8 28 8 28 0" fill="none" ${S}/>`,
  carton: `<path d="M14 36l36-14 36 14v38l-36 14-36-14z" fill="#D9A86C" ${S}/><path d="M14 36l36 14 36-14M50 50v38" fill="none" ${S}/>
    <path d="M22 50l20 8M22 60l20 8" stroke="#B07A41" stroke-width="2.5" stroke-linecap="round"/>`,
  empaque_bombon: `<path d="M30 38l-18-10 6 22-6 22 18-10" fill="#E63946" ${S}/><path d="M70 38l18-10-6 22 6 22-18-10" fill="#E63946" ${S}/>
    <rect x="28" y="34" width="44" height="32" rx="14" fill="#F25C66" ${S}/><path d="M38 44c6 8 18 8 24 0" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round"/><circle cx="40" cy="58" r="3" fill="#FFD6DA"/>`,
  empaque_papas: `<path d="M24 18l6 4 6-4 6 4 6-4 6 4 6-4 6 4 6-4v64l-6 4-6-4-6 4-6-4-6 4-6-4-6 4-6-4z" fill="#F4C542" ${S}/>
    <ellipse cx="50" cy="52" rx="16" ry="12" fill="#F9E3A3" ${S}/><path d="M42 50c4-2 8 2 12 0M44 56c4 2 8-2 12 0" stroke="#C9A227" stroke-width="2" fill="none"/>
    <rect x="30" y="26" width="40" height="8" rx="3" fill="#D63A3A"/>`,
  bolsa_jugo: `<path d="M28 26h44l-4 58H32z" fill="#FFE6C7" ${S}/><path d="M30 46h40l-2 38H32z" fill="#F7A440" opacity=".9"/><path d="M28 26h44" ${S}/>
    <path d="M58 26l6-14 8 2" fill="none" stroke="#1E5A96" stroke-width="4" stroke-linecap="round"/><circle cx="44" cy="62" r="6" fill="#FFFFFF" opacity=".6"/>`,
  empaque_chiles: `<path d="M24 18l6 4 6-4 6 4 6-4 6 4 6-4 6 4 6-4v64l-6 4-6-4-6 4-6-4-6 4-6-4-6 4-6-4z" fill="#D63A3A" ${S}/>
    <path d="M38 64c0-14 10-24 24-24-2 14-12 26-24 24z" fill="#F28C28" ${S}/><path d="M60 40c2-4 6-6 8-4" fill="none" stroke="#2F8A3E" stroke-width="3" stroke-linecap="round"/>`,
  botellita: `<rect x="42" y="12" width="16" height="10" rx="2" fill="#2F8A3E" ${S}/><path d="M42 22h16l6 12v48a6 6 0 0 1-6 6H42a6 6 0 0 1-6-6V34z" fill="#DDF1FB" ${S}/>
    <path d="M37 50h26v28H37z" fill="#F28C28" opacity=".85"/><rect x="36" y="44" width="28" height="12" fill="#FFFFFF" ${S}/><circle cx="50" cy="66" r="5" fill="#F6D24A"/>`,
  pitillo: `<path d="M36 88l8-58 18-14" fill="none" stroke="${T}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M36 88l8-58 18-14" fill="none" stroke="#FFFFFF" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M37 80l2-14M40 60l2-14M45 28l6-5" stroke="#E63946" stroke-width="5" stroke-linecap="round"/>`,
  empaque_galletas: `<path d="M12 36l8 4-8 4 8 4-8 4 8 4-8 4h76l-8-4 8-4-8-4 8-4-8-4 8-4z" fill="#1E5A96" ${S}/>
    <circle cx="40" cy="48" r="10" fill="#C8955C" ${S}/><circle cx="62" cy="48" r="10" fill="#C8955C" ${S}/><circle cx="38" cy="45" r="1.8" fill="${T}"/><circle cx="43" cy="51" r="1.8" fill="${T}"/><circle cx="60" cy="45" r="1.8" fill="${T}"/><circle cx="65" cy="51" r="1.8" fill="${T}"/>`,
  empaque_pasabocas: `<path d="M24 18l6 4 6-4 6 4 6-4 6 4 6-4 6 4 6-4v64l-6 4-6-4-6 4-6-4-6 4-6-4-6 4-6-4z" fill="#F28C28" ${S}/>
    <path d="M36 46c6-8 14 4 22-4M38 60c8-6 14 6 24-2" fill="none" stroke="#FFE08A" stroke-width="6" stroke-linecap="round"/><rect x="30" y="26" width="40" height="8" rx="3" fill="#2F8A3E"/>`,
  envase_yogurt: `<path d="M26 28h48l-6 58H32z" fill="#FFFFFF" ${S}/><rect x="22" y="20" width="56" height="10" rx="3" fill="#C9CED6" ${S}/>
    <path d="M30 46h40l-2 22H32z" fill="#F7A1C4"/><circle cx="50" cy="57" r="6" fill="#FFFFFF"/><path d="M36 76h28" stroke="#E7EBF0" stroke-width="3"/>`,
  caja_jugo: `<path d="M30 30l20-8 20 8v56H30z" fill="#7BC67E" ${S}/><path d="M30 30l20 8 20-8M50 38v48" fill="none" stroke="#3B8F43" stroke-width="2.5"/>
    <path d="M30 48h20v20H30z" fill="#FFFFFF" opacity=".85"/><circle cx="40" cy="58" r="6" fill="#F28C28"/><path d="M56 22l4-14h8" fill="none" stroke="#E63946" stroke-width="4" stroke-linecap="round"/><path d="M30 30l20-8 20 8v56H30z" fill="none" ${S}/>`,
  vaso: `<path d="M26 20h48l-8 66H34z" fill="#E9F6FF" ${S}/><path d="M28 34h44" stroke="#8EC6E9" stroke-width="3"/><path d="M40 40l-3 36" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round"/>`,
  palo_escoba: `<path d="M20 82l46-46" stroke="${T}" stroke-width="13" stroke-linecap="round"/><path d="M20 82l46-46" stroke="#2F8A3E" stroke-width="8" stroke-linecap="round"/>
    <path d="M62 30l8 2 4-6 4 8 6-2-4 8 6 4-10 2" fill="#E2B77A" ${S}/>`,
  bolsa_sucia: `<path d="M26 34c-4 18 0 38 4 50h40c6-14 8-32 2-50z" fill="#EEF2F6" ${S}/><path d="M34 34l-4-18 10 6 10-8 10 8 10-6-4 18" fill="#EEF2F6" ${S}/>
    <ellipse cx="44" cy="60" rx="8" ry="5" fill="#9B7653" opacity=".7"/><ellipse cx="60" cy="72" rx="5" ry="4" fill="#9B7653" opacity=".6"/><path d="M40 44c6 4 14 4 20 0" fill="none" stroke="#C9CED6" stroke-width="2.5"/>`,
  chicle: `<path d="M24 60c-4-14 8-26 20-22 6-10 22-8 26 2 12 0 18 14 10 24-2 12-18 16-26 10-10 6-26 2-30-14z" fill="#F7A1C4" ${S}/>
    <path d="M38 56c6-4 12 2 18-2" fill="none" stroke="#E46FA2" stroke-width="3" stroke-linecap="round"/><circle cx="62" cy="52" r="3" fill="#FFFFFF" opacity=".7"/>`,
  cabello: `<path d="M18 60c10-26 24 10 34-14s20 18 30-6M16 70c14-16 24 8 36-8s22 12 32-4M24 50c8-10 16 4 24-6" fill="none" stroke="#5B3A22" stroke-width="3.5" stroke-linecap="round"/>
    <path d="M30 76c10-6 18 4 28-2s16 2 22-4" fill="none" stroke="#3D2616" stroke-width="3" stroke-linecap="round"/>`,
  plato_icopor: `<ellipse cx="50" cy="56" rx="38" ry="22" fill="#FFFFFF" ${S}/><ellipse cx="50" cy="54" rx="26" ry="13" fill="#F3F5F8" ${S}/>
    <ellipse cx="44" cy="54" rx="9" ry="4" fill="#E07A5F" opacity=".7"/><ellipse cx="58" cy="57" rx="6" ry="3" fill="#F2D16B"/>`,
  lombriz: `<path d="M10 82c10-12 24-16 40-16s30 4 40 16z" fill="#8B5E3C" ${S}/><path d="M24 62c6-16 18-16 22-4s16 12 20-2 14-10 16 2" fill="none" stroke="${T}" stroke-width="11" stroke-linecap="round"/>
    <path d="M24 62c6-16 18-16 22-4s16 12 20-2 14-10 16 2" fill="none" stroke="#F29C9C" stroke-width="6.5" stroke-linecap="round"/><circle cx="82" cy="58" r="1.8" fill="${T}"/>`,
  planta: `<path d="M14 84c8-10 22-14 36-14s28 4 36 14z" fill="#8B5E3C" ${S}/><path d="M50 72V40" ${S} fill="none"/>
    <path d="M50 52c-4-14-16-20-30-18 2 14 14 22 30 18z" fill="#3FA34D" ${S}/><path d="M50 44c4-16 18-22 32-18-2 16-16 22-32 18z" fill="#5FBF5F" ${S}/>`,
  papel_higienico: `<ellipse cx="38" cy="34" rx="16" ry="8" fill="#FFFFFF" ${S}/><ellipse cx="38" cy="34" rx="5" ry="2.5" fill="#C9CED6"/>
    <path d="M22 34v38c0 4 7 8 16 8s16-4 16-8V34" fill="#FFFFFF" ${S}/><path d="M54 50h26v34H54" fill="#FFFFFF" ${S}/><path d="M60 60h14M60 70h14" stroke="#D9DEE5" stroke-width="2"/>`,
};

// Recipientes del aula
export const RECIPIENTES = {
  pap: { nombre: 'Papel y cartón', color: '#8EC6E9', oscuro: '#2F6E9E', nacional: 'Blanco', simbolo: `<path d="M42 44h16l6 6v20H42z" fill="#FFFFFF" ${S}/><path d="M46 56h12M46 62h12" stroke="#2F6E9E" stroke-width="2"/>` },
  tar: { nombre: 'Tarros con residuos', color: '#E9B949', oscuro: '#9A7212', nacional: 'Blanco', simbolo: `<rect x="46" y="38" width="8" height="5" fill="#2F8A3E" ${S}/><path d="M46 43h8l3 6v20a3 3 0 0 1-3 3h-8a3 3 0 0 1-3-3V49z" fill="#FFFFFF" ${S}/><path d="M45 56h10" stroke="#E63946" stroke-width="3"/>` },
  bas: { nombre: 'Basura', color: '#5B6472', oscuro: '#2C333D', nacional: 'Negro', simbolo: `<path d="M42 48h16l-2 22H44z" fill="#FFFFFF" ${S}/><path d="M40 48h20M46 44h8" ${S}/>` },
  org: { nombre: 'Orgánicos', color: '#3FA34D', oscuro: '#1F6B2C', nacional: 'Verde', simbolo: `<path d="M50 70c-12-6-12-22 4-30 8 10 6 24-4 30z" fill="#FFFFFF" ${S}/><path d="M50 70c0-8 2-16 4-22" stroke="#3FA34D" stroke-width="2.5"/>` },
};
export function recipienteSVG(k, cls = '') {
  const r = RECIPIENTES[k];
  return svg(`<path d="M22 30h56l-6 58a4 4 0 0 1-4 4H32a4 4 0 0 1-4-4z" fill="${r.color}" ${S}/>
    <rect x="16" y="20" width="68" height="12" rx="5" fill="${r.color}" ${S}/><rect x="40" y="13" width="20" height="8" rx="3" fill="${r.oscuro}" ${S}/>
    <path d="M34 40l3 44M66 40l-3 44" stroke="${T}" stroke-opacity=".18" stroke-width="3"/>${r.simbolo}`, '0 0 100 100', cls);
}
export function residuoSVG(id, cls = '') { return svg(R[id] || '', '0 0 100 100', cls); }

// Mascota guía: Granito, el grano de café
export function granitoSVG(cls = '', gesto = 'feliz') {
  const boca = gesto === 'piensa' ? `<path d="M44 66c4 2 8 2 12 0" fill="none" ${S}/>` : `<path d="M40 62c4 8 16 8 20 0z" fill="#FFFFFF" ${S}/>`;
  const ojos = gesto === 'guiño'
    ? `<path d="M36 48c3-3 7-3 10 0" fill="none" ${S}/><circle cx="62" cy="48" r="5" fill="${T}"/><circle cx="63.5" cy="46.5" r="1.6" fill="#fff"/>`
    : `<circle cx="40" cy="48" r="5" fill="${T}"/><circle cx="41.5" cy="46.5" r="1.6" fill="#fff"/><circle cx="62" cy="48" r="5" fill="${T}"/><circle cx="63.5" cy="46.5" r="1.6" fill="#fff"/>`;
  return svg(`<ellipse cx="51" cy="92" rx="26" ry="5" fill="#1B2B40" opacity=".12"/>
    <path d="M24 70l-10 6M78 70l10 6" stroke="#6B3E22" stroke-width="5" stroke-linecap="round"/>
    <ellipse cx="51" cy="54" rx="30" ry="36" fill="#8A5530" ${S}/>
    <path d="M51 20c-8 14 8 22 0 36s8 22 0 34" fill="none" stroke="#5E3519" stroke-width="3.5" stroke-linecap="round"/>
    <ellipse cx="51" cy="54" rx="30" ry="36" fill="none" ${S}/>
    <ellipse cx="51" cy="56" rx="22" ry="20" fill="#B97B4B" opacity=".55"/>
    ${ojos}${boca}<circle cx="32" cy="58" r="4" fill="#F28C8C" opacity=".6"/><circle cx="70" cy="58" r="4" fill="#F28C8C" opacity=".6"/>
    <path d="M52 18c4-10 16-14 24-10-4 10-14 14-24 10z" fill="#3FA34D" ${S}/><path d="M54 17c6-3 12-5 18-7" stroke="#1F6B2C" stroke-width="2" stroke-linecap="round"/>`, '0 0 102 100', cls);
}

// Medallas por sesión
export const MEDALLAS = {
  s1: { nombre: 'Explorador de la separación', metal: '#CD8B52', brillo: '#F0B888', cinta: '#1E5A96' },
  s2: { nombre: 'Guardián clasificador', metal: '#AEB8C4', brillo: '#E3E9F0', cinta: '#2F8A3E' },
  s3: { nombre: 'Maestro guardián', metal: '#E3B132', brillo: '#FBE39A', cinta: '#B5372A' },
};
export function medallaSVG(s, cls = '', apagada = false) {
  const m = MEDALLAS[s]; const n = s.slice(1);
  const f = apagada ? 'filter="url(#gris)"' : '';
  return svg(`<defs><filter id="gris"><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncA type="linear" slope=".45"/></feComponentTransfer></filter></defs>
    <g ${f}><path d="M34 6h14l8 34H42z" fill="${m.cinta}" ${S}/><path d="M66 6H52l-8 34h14z" fill="${m.cinta}" ${S}/>
    <path d="M38 6h6l7 30" stroke="#FFFFFF" stroke-opacity=".5" stroke-width="2.5" fill="none"/>
    <circle cx="50" cy="64" r="28" fill="${m.metal}" ${S}/><circle cx="50" cy="64" r="20" fill="${m.brillo}" stroke="${m.metal}" stroke-width="3"/>
    <path d="M50 49l4.4 9 9.9 1.4-7.2 7 1.7 9.8L50 71.6l-8.8 4.6 1.7-9.8-7.2-7 9.9-1.4z" fill="${m.metal}" ${S}/>
    <text x="50" y="99" text-anchor="middle" font-family="Baloo 2, sans-serif" font-weight="800" font-size="13" fill="${T}">${n}</text></g>`, '0 0 100 104', cls);
}
export function estrellasHTML(n) {
  return `<span class="estrellas" aria-label="${n} estrellas">${[1, 2, 3].map((i) => `<svg viewBox="0 0 24 24" class="${i <= n ? 'on' : ''}"><path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9z"/></svg>`).join('')}</span>`;
}
export const ICONO = {
  sonido: svg(`<path d="M14 38h14l18-14v52L28 62H14z" fill="currentColor"/><path d="M62 36c6 8 6 20 0 28M72 28c12 12 12 32 0 44" fill="none" stroke="currentColor" stroke-width="7" stroke-linecap="round"/>`),
  mudo: svg(`<path d="M14 38h14l18-14v52L28 62H14z" fill="currentColor"/><path d="M62 38l22 24M84 38L62 62" stroke="currentColor" stroke-width="7" stroke-linecap="round"/>`),
  salir: svg(`<path d="M40 20H22v60h18" fill="none" stroke="currentColor" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/><path d="M44 50h38M66 34l16 16-16 16" fill="none" stroke="currentColor" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>`),
  candado: svg(`<rect x="22" y="44" width="56" height="42" rx="8" fill="currentColor"/><path d="M34 44V32a16 16 0 0 1 32 0v12" fill="none" stroke="currentColor" stroke-width="8"/>`),
  check: svg(`<path d="M20 52l20 20 40-44" fill="none" stroke="currentColor" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>`),
  play: svg(`<path d="M32 20l48 30-48 30z" fill="currentColor"/>`),
  descarga: svg(`<path d="M50 14v48M30 44l20 20 20-20" fill="none" stroke="currentColor" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/><path d="M18 74v10h64V74" fill="none" stroke="currentColor" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>`),
  imprimir: svg(`<path d="M28 36V16h44v20" fill="none" stroke="currentColor" stroke-width="8" stroke-linejoin="round"/><rect x="14" y="36" width="72" height="34" rx="8" fill="currentColor"/><rect x="30" y="58" width="40" height="28" fill="#fff" stroke="currentColor" stroke-width="7"/>`),
  flecha: svg(`<path d="M20 50h56M56 30l20 20-20 20" fill="none" stroke="currentColor" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>`),
  atras: svg(`<path d="M80 50H24M44 30L24 50l20 20" fill="none" stroke="currentColor" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>`),
  editar: svg(`<path d="M20 80l6-22 40-40 16 16-40 40z" fill="currentColor"/><path d="M58 26l16 16" stroke="#fff" stroke-width="5"/>`),
  libro: svg(`<path d="M12 24c14-6 26-4 38 4v54c-12-8-24-10-38-4zM88 24c-14-6-26-4-38 4v54c12-8 24-10 38-4z" fill="currentColor"/>`),
  rayo: svg(`<path d="M56 8L22 56h24l-6 36 36-50H52z" fill="currentColor"/>`),
  bandera: svg(`<path d="M24 92V10" stroke="currentColor" stroke-width="8" stroke-linecap="round"/><path d="M28 14h50l-10 16 10 16H28z" fill="currentColor"/>`),
};
export { svg };
