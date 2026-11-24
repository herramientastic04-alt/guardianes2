// Contenido pedagógico de las tres misiones. Los textos visibles evitan guiones y puntos medios.

export const RECIPIENTE_INFO = {
  pap: { corto: 'Hojas, cuadernos viejos, cajas y bolsas de papel o cartón, siempre limpios y secos.',
    ejemplos: ['Hoja de cuaderno rayada', 'Caja de colores dañada', 'Bolsa de papel', 'Trozo de caja de cartón'] },
  tar: { corto: 'Botellas plásticas que llenamos con envolturas y empaques plásticos pequeños, limpios y secos.',
    ejemplos: ['Empaque de bombón', 'Empaque de papas', 'Bolsita plástica de jugo', 'Pitillo'] },
  bas: { corto: 'Residuos sucios, grandes o hechos de varios materiales unidos, que no caben en las botellas.',
    ejemplos: ['Vaso plástico', 'Plato de icopor', 'Caja de jugo', 'Papel higiénico'] },
  org: { corto: 'Restos naturales que se descomponen y vuelven a la tierra: cáscaras, comida, madera y tierra.',
    ejemplos: ['Cáscara de banano', 'Servilleta con comida', 'Virutas de lápiz', 'Polvo y tierra del barrido'] },
};

// Catálogo de residuos con el criterio del sistema de separación de la institución
export const RESIDUOS = {
  banano: { n: 'Cáscara de banano', r: 'org', p: 'Es un resto de fruta. Se descompone y se convierte en abono para la huerta.' },
  uvas: { n: 'Cáscaras de uva', r: 'org', p: 'Los restos de fruta son orgánicos porque vuelven a la tierra.' },
  palo_helado: { n: 'Palo de helado de madera', r: 'org', p: 'Es madera, un material natural que se descompone con el tiempo.' },
  tierra: { n: 'Polvo y tierra del barrido', r: 'org', p: 'La tierra y el polvo regresan al suelo, por eso van con los orgánicos.' },
  mandarina: { n: 'Cáscara de mandarina', r: 'org', p: 'Las cáscaras de fruta van siempre al recipiente de orgánicos.' },
  pastel: { n: 'Pedazo de pastel', r: 'org', p: 'Es comida. Los restos de alimentos son orgánicos.' },
  virutas: { n: 'Virutas de lápiz', r: 'org', p: 'Las virutas son madera del lápiz, un material natural que se descompone.' },
  servilleta: { n: 'Servilleta con restos de comida', r: 'org', p: 'En nuestro colegio la servilleta con comida va a orgánicos, porque el papel suave y la comida se descomponen juntos.' },
  piedras: { n: 'Piedritas con tierra', r: 'org', p: 'Las piedritas y la tierra que entran con los zapatos regresan al suelo.' },
  mango: { n: 'Cáscara de mango', r: 'org', p: 'Es un resto de fruta que sirve para hacer abono.' },
  palillos: { n: 'Palillos de madera', r: 'org', p: 'Los palillos son de madera natural, por eso van a orgánicos.' },
  caja_colores: { n: 'Caja de colores dañada', r: 'pap', p: 'Es cartón limpio y seco. Va en papel y cartón.' },
  hoja: { n: 'Hoja de cuaderno rayada', r: 'pap', p: 'El papel limpio y seco se aprovecha, aunque esté rayado.' },
  bolsa_papel: { n: 'Bolsa de papel', r: 'pap', p: 'Es papel. Si está limpia y seca va en papel y cartón.' },
  carton: { n: 'Trozo de caja de cartón', r: 'pap', p: 'El cartón limpio y seco va en papel y cartón.' },
  empaque_bombon: { n: 'Empaque de bombón', r: 'tar', p: 'Es una envoltura plástica pequeña. Se guarda dentro de la botella.' },
  empaque_papas: { n: 'Empaque de papas', r: 'tar', p: 'Los empaques metalizados de mecato se doblan y se meten en la botella.' },
  bolsa_jugo: { n: 'Bolsita plástica de jugo', r: 'tar', p: 'Es plástico flexible. Vacía y seca, entra en la botella.' },
  empaque_chiles: { n: 'Empaque de chiles', r: 'tar', p: 'Es un empaque plástico de mecato. Va a tarros con residuos.' },
  botellita: { n: 'Envase plástico de jugo', r: 'tar', p: 'En nuestro colegio este envase plástico pequeño va a tarros con residuos.' },
  pitillo: { n: 'Pitillo', r: 'tar', p: 'El pitillo es plástico delgado. Cabe en la botella y se compacta.' },
  empaque_galletas: { n: 'Empaque de galletas', r: 'tar', p: 'Es una envoltura plástica de mecato. Se guarda en la botella.' },
  empaque_pasabocas: { n: 'Empaque de pasabocas', r: 'tar', p: 'Los empaques de pasabocas van doblados dentro de la botella.' },
  envase_yogurt: { n: 'Envase de yogurt', r: 'bas', p: 'Es rígido y queda con restos de yogurt. Va en basura.' },
  caja_jugo: { n: 'Caja de jugo', r: 'bas', p: 'Parece cartón, pero tiene capas de cartón, plástico y aluminio pegadas. Va en basura.' },
  vaso: { n: 'Vaso plástico', r: 'bas', p: 'Es grande para la botella y casi siempre queda sucio. Va en basura.' },
  palo_escoba: { n: 'Pedazo de palo de escoba', r: 'bas', p: 'Está pintado o forrado y es grande. En nuestro colegio va en basura.' },
  bolsa_sucia: { n: 'Bolsa plástica sucia', r: 'bas', p: 'Al estar sucia ya no sirve para la botella. Va en basura.' },
  chicle: { n: 'Chicle', r: 'bas', p: 'El chicle es pegajoso y ensucia otros materiales. Va en basura.' },
  cabello: { n: 'Cabello de la escoba', r: 'bas', p: 'El cabello se demora mucho en descomponerse. En nuestro colegio va en basura.' },
  plato_icopor: { n: 'Plato de icopor', r: 'bas', p: 'El icopor no se aprovecha aquí y suele quedar con comida. Va en basura.' },
  papel_higienico: { n: 'Papel higiénico usado', r: 'bas', p: 'Es un residuo sanitario. Siempre va en basura.' },
};

// Videos por defecto. El docente puede cambiarlos desde su panel.
export const VIDEOS = {
  v1: { id: 'MdBV3Q5KwNQ', titulo: 'Riesgos de quemar basura', sesion: 1 },
  v2: { id: 's0rGTj8duKo', titulo: 'Nuevo código de colores para los residuos en Colombia', sesion: 1 },
  v3: { id: 'lT3jBXwbCmQ', titulo: '¿Cómo llenar una botella con plásticos?', sesion: 2 },
  v4: { id: 'gH9B9aknu88', titulo: 'Transforma los residuos orgánicos de tu finca en abono', sesion: 2 },
  v5: { id: 'PTbvSYTg4R0', titulo: 'Separación de residuos y Resolución 2184 de 2019', sesion: 3 },
};

const q = (id, pregunta, opciones, correcta, explicacion, img) => ({ id, pregunta, opciones, correcta, explicacion, img });
const qr = (id, residuo, pregunta) => ({ id, pregunta: pregunta || `¿En qué recipiente va: ${RESIDUOS[residuo].n.toLowerCase()}?`, residuo, recipientes: true,
  correcta: RESIDUOS[residuo].r, explicacion: RESIDUOS[residuo].p });

// Cada momento tiene 5 actividades interactivas, acompañadas de lecturas, videos y diagramas.
const ESCALA = ['Todavía no', 'Casi', '¡Sí, lo logro!'];

export const SESIONES = [
  {
    id: 's1', numero: 1, titulo: 'Conozco mi territorio y mis recipientes', color: '#1E5A96',
    resumen: 'Descubre qué pasa con los residuos en la vereda y aprende los cuatro recipientes del aula.',
    momentos: {
      inicio: [
        { tipo: 'bienvenida', titulo: 'Bienvenida a la Misión 1',
          texto: 'Hola, {nombre}. Soy Granito, el guardián del café de Casas Bajas. Durante tres misiones vamos a aprender a separar los residuos del aula como verdaderos guardianes del territorio. Cada misión tiene un inicio, un desarrollo y un cierre, con cinco actividades en cada momento. Al terminar ganarás una medalla y un diploma con tu nombre.' },
        { tipo: 'quiz', id: 's1_entrada', titulo: 'Prueba de entrada', preguntas: [
          q('a', '¿Qué pasa con los residuos del colegio?', ['Se queman en el patio', 'Se guardan en la bodega y un vehículo los lleva a la cabecera', 'Se entierran en la huerta', 'Se los lleva la quebrada'], 1,
            'Los residuos se guardan en estopas dentro de la bodega hasta que un vehículo los lleva a la cabecera municipal.'),
          qr('b', 'uvas'), qr('c', 'hoja'),
        ] },
        { tipo: 'encuesta', id: 's1_casa', titulo: 'Cuéntanos de tu casa', pregunta: 'En tu casa, ¿qué hacen con la mayoría de los residuos?',
          opciones: ['Los queman', 'Los entierran o los llevan a la huerta', 'Los separan y los guardan', 'Los recoge un carro'] },
        { tipo: 'texto', titulo: '¿Qué pasa con los residuos en nuestra vereda?', imagen: { src: 'img/bodega.jpg', pie: 'Bodega del colegio donde esperan los residuos' },
          texto: 'En la vereda Santa Teresa todavía falta un sistema formal de recolección de residuos. Por eso muchas familias queman la basura o la entierran en la huerta. El humo de la quema tiene gases que afectan los pulmones y ensucian el aire que todos respiramos.\n\nEn el colegio los residuos se guardan en estopas dentro de la bodega, hasta que un vehículo los lleva a la cabecera municipal más o menos cada tres meses. Cuando llegan mezclados, la bodega huele mal, aparecen animales y el grupo de aseo debe separarlos otra vez. Separar bien desde el aula es el primer paso para cuidar nuestro territorio.' },
        { tipo: 'video', video: 'v1', texto: 'Mira el video con atención y piensa qué pasa con el aire, el suelo y la salud cuando se queman residuos cerca de las casas.' },
        { tipo: 'vf', id: 's1_vf_quema', titulo: '¿Verdadero o falso? Lo que pasa en mi vereda', afirmaciones: [
          { t: 'El humo de la quema de basura contamina el aire que respiramos.', v: true, e: 'La quema libera gases y partículas que afectan los pulmones.' },
          { t: 'Si los residuos llegan mezclados a la bodega, aparecen malos olores y animales.', v: true, e: 'La mezcla de orgánicos con otros residuos produce olores que atraen animales.' },
          { t: 'En la vereda un carro recoge la basura de las casas todos los días.', v: false, e: 'En la vereda falta un sistema formal de recolección. Al colegio llega un vehículo más o menos cada tres meses.' },
          { t: 'Separar bien desde el aula ahorra trabajo al grupo de aseo.', v: true, e: 'Si cada residuo llega a su recipiente, nadie tiene que separarlo otra vez al final de la jornada.' },
        ] },
        { tipo: 'seleccion', id: 's1_genero', titulo: 'Mis residuos de cada día', enunciado: '¿Cuáles de estos residuos produces en un día de clase? Toca todos los que quieras.',
          residuos: ['banano', 'empaque_papas', 'hoja', 'vaso', 'empaque_bombon', 'caja_jugo', 'mandarina', 'virutas', 'botellita', 'servilleta'] },
        { tipo: 'sopa', id: 's1_sopa', titulo: 'Sopa de letras de mi vereda', palabras: ['QUEMA', 'BODEGA', 'VEREDA', 'SEPARAR', 'AIRE', 'SUELO'] },
      ],
      desarrollo: [
        { tipo: 'texto', titulo: 'El código de colores de Colombia', diagrama: 'codigo',
          texto: 'Desde 2021 en Colombia los residuos se separan en la fuente con tres colores. El blanco es para los residuos aprovechables limpios y secos, como plástico, vidrio, metales, papel y cartón. El verde es para los residuos orgánicos aprovechables, como cáscaras de frutas y restos de comida. El negro es para los residuos que ya no se pueden aprovechar, como el papel higiénico.' },
        { tipo: 'video', video: 'v2', texto: 'Este video explica el código nacional de colores. Después verás cómo nuestro colegio lo adaptó a la vereda.' },
        { tipo: 'completar', id: 's1_completar', titulo: 'Completa el código de colores', frases: [
          { t: 'El color ___ es para los residuos aprovechables limpios y secos.', r: 'blanco' },
          { t: 'El color ___ es para las cáscaras y los restos de comida.', r: 'verde' },
          { t: 'El color ___ es para los residuos que ya no se aprovechan.', r: 'negro' },
          { t: 'En nuestra aula usamos ___ recipientes.', r: 'cuatro' },
          { t: 'Las envolturas limpias y secas se guardan dentro de una ___.', r: 'botella' },
        ], distractores: ['azul', 'tres'] },
        { tipo: 'texto', titulo: 'Los cuatro recipientes de nuestra aula', diagrama: 'equivalencia',
          texto: 'El vehículo que llega a la vereda solo recoge algunos materiales, por eso el colegio adaptó el código nacional a cuatro recipientes. Los tarros con residuos son botellas plásticas donde guardamos envolturas pequeñas, limpias y secas, para que ocupen menos espacio. Los orgánicos se quedan en el colegio y se descomponen en un espacio especial.' },
        { tipo: 'tarjetas', titulo: 'Toca cada recipiente para descubrir qué recibe' },
        { tipo: 'imagen', src: 'img/punto.jpg', titulo: 'Puntos de separación del colegio', texto: 'En los espacios comunes también hay recipientes. Fíjate siempre en su nombre antes de botar un residuo.' },
        { tipo: 'emparejar', id: 's1_emparejar', titulo: 'Conecta cada recipiente con su descripción' },
        { tipo: 'seleccion', id: 's1_papel', titulo: '¿Cuáles son papel y cartón?', enunciado: 'Toca todos los residuos que van en papel y cartón. Cuidado, algunos parecen papel pero no lo son.',
          residuos: ['hoja', 'servilleta', 'caja_colores', 'caja_jugo', 'carton', 'papel_higienico', 'bolsa_papel', 'empaque_galletas'], correctos: ['hoja', 'caja_colores', 'carton', 'bolsa_papel'] },
        { tipo: 'clasificar', id: 's1_clasificar', titulo: 'Reto de clasificación',
          residuos: ['banano', 'empaque_bombon', 'envase_yogurt', 'empaque_papas', 'caja_colores', 'uvas', 'caja_jugo', 'hoja', 'palo_helado', 'bolsa_jugo'] },
      ],
      cierre: [
        { tipo: 'quiz', id: 's1_final', titulo: 'Desafío final de la Misión 1', preguntas: [
          q('a', '¿Cuántos recipientes usamos en el aula para separar los residuos?', ['Dos', 'Tres', 'Cuatro', 'Cinco'], 2,
            'En el aula usamos cuatro: papel y cartón, tarros con residuos, basura y orgánicos.'),
          qr('b', 'mango'), qr('c', 'empaque_bombon'),
          q('d', '¿Por qué la caja de jugo va en basura y no en papel y cartón?', ['Porque tiene capas de cartón, plástico y aluminio pegadas', 'Porque es pequeña', 'Porque es de colores', 'Porque pesa poco'], 0,
            'La caja de jugo parece cartón, pero sus capas están pegadas y no se pueden separar en el colegio.'),
          qr('e', 'hoja'),
          q('f', '¿Qué color del código nacional corresponde a los residuos orgánicos?', ['Blanco', 'Verde', 'Negro', 'Azul'], 1,
            'El verde es para los orgánicos aprovechables, como cáscaras y restos de comida.'),
        ] },
        { tipo: 'adivina', id: 's1_adivina', titulo: 'Adivina la palabra', palabras: [
          { w: 'CARTÓN', pista: 'Material de las cajas que va con el papel.' },
          { w: 'ORGÁNICOS', pista: 'Recipiente verde para cáscaras y restos de comida.' },
          { w: 'BOTELLA', pista: 'Allí guardamos las envolturas plásticas limpias y secas.' },
        ] },
        { tipo: 'encuesta', id: 's1_dificil', titulo: 'Tu opinión cuenta', pregunta: '¿Qué recipiente te pareció más difícil de entender hoy?', recipientes: true },
        { tipo: 'escala', id: 's1_escala', titulo: '¿Cómo me fue en la Misión 1?', opciones: ESCALA, afirmaciones: [
          'Reconozco los cuatro recipientes del aula', 'Sé qué color del código nacional corresponde a cada tipo de residuo',
          'Entiendo por qué es dañino quemar la basura', 'Puedo explicarle a un compañero dónde va cada residuo'] },
        { tipo: 'reflexion', id: 's1_reflexion', titulo: 'Mi reflexión', pregunta: 'Piensa en un residuo que antes botabas en el recipiente equivocado. ¿Cuál es y dónde va ahora?' },
      ],
    },
  },
  {
    id: 's2', numero: 2, titulo: 'Clasifico como guardián experto', color: '#2F8A3E',
    resumen: 'Aprende a llenar los tarros con residuos y a convertir los orgánicos en abono para la huerta.',
    momentos: {
      inicio: [
        { tipo: 'bienvenida', titulo: 'Bienvenida a la Misión 2',
          texto: '¡Qué bien verte de nuevo, {nombre}! En la primera misión conociste los cuatro recipientes. Hoy vas a convertirte en experto en dos de ellos, los tarros con residuos y los orgánicos. Primero un repaso relámpago contra el reloj.' },
        { tipo: 'quiz', id: 's2_repaso', titulo: 'Repaso relámpago', tiempo: 20, preguntas: [qr('a', 'banano'), qr('b', 'caja_jugo'), qr('c', 'empaque_papas'), qr('d', 'caja_colores')] },
        { tipo: 'encuesta', id: 's2_casa', titulo: 'Cuéntanos de tu casa', pregunta: 'En tu casa, ¿guardan los plásticos dentro de botellas?',
          opciones: ['Sí, siempre', 'A veces', 'Nunca', 'No sabía que se podía'] },
        { tipo: 'texto', titulo: 'Tarros con residuos, botellas que guardan plásticos', diagrama: 'botella',
          texto: 'Las envolturas de dulces, papas, galletas y otros mecatos son plásticos flexibles muy livianos que el viento lleva a las quebradas. En nuestro colegio los guardamos dentro de botellas plásticas. Así ocupan menos espacio en la bodega y el vehículo puede llevarlos sin que se riegue nada.\n\nPara que la botella sirva, los empaques deben estar limpios y secos. Con un palito se aprietan hasta que la botella quede dura como un ladrillo. Una botella bien llenada puede guardar los empaques de todo un salón durante varios días.' },
        { tipo: 'video', video: 'v3', texto: 'Observa cómo se llena una botella y qué plásticos se pueden guardar dentro.' },
        { tipo: 'seleccion', id: 's2_botella', titulo: '¿Qué entra en la botella?', enunciado: 'Toca todos los residuos que sí pueden entrar en la botella de tarros con residuos.',
          residuos: ['empaque_papas', 'vaso', 'empaque_bombon', 'bolsa_sucia', 'empaque_galletas', 'envase_yogurt', 'pitillo', 'plato_icopor', 'bolsa_jugo'],
          correctos: ['empaque_papas', 'empaque_bombon', 'empaque_galletas', 'pitillo', 'bolsa_jugo'] },
        { tipo: 'vf', id: 's2_vf_botella', titulo: 'Mitos de las botellas', afirmaciones: [
          { t: 'Los empaques deben entrar limpios y secos a la botella.', v: true, e: 'Así la botella se conserva y evita malos olores.' },
          { t: 'Se puede echar agua a la botella para que pese más.', v: false, e: 'El agua daña los empaques y produce malos olores.' },
          { t: 'La botella está lista cuando queda dura como un ladrillo.', v: true, e: 'Una botella bien apretada guarda más empaques y es fácil de transportar.' },
          { t: 'Un vaso plástico entero debe ir dentro de la botella.', v: false, e: 'El vaso es grande y suele quedar sucio, por eso va en basura.' },
        ] },
        { tipo: 'ordenar', id: 's2_ordenar_botella', titulo: 'Paso a paso de la botella', pregunta: 'Ordena los pasos para llenar bien una botella de tarros con residuos.',
          pasos: ['Busco una botella plástica limpia, seca y con tapa', 'Reviso que la envoltura esté limpia y seca', 'Doblo la envoltura y la meto en la botella',
            'Aprieto con un palito hasta que quede dura', 'Tapo la botella y la llevo al recipiente de tarros'] },
      ],
      desarrollo: [
        { tipo: 'texto', titulo: 'Los orgánicos vuelven a la tierra', diagrama: 'compost',
          texto: 'Nuestro colegio tiene énfasis en agroecología, y los residuos orgánicos son un tesoro para la huerta. Las cáscaras, los restos de comida, la madera de los palillos, las virutas del lápiz y la tierra del barrido se descomponen con la ayuda de lombrices, hongos y bacterias. Después de unas semanas se transforman en compost, un abono natural que alimenta las plantas.\n\nCuando los orgánicos se mezclan con plásticos, el compost se daña y la bodega se llena de malos olores. Por eso cada cáscara debe llegar sola a su recipiente verde.' },
        { tipo: 'video', video: 'v4', texto: 'Este video muestra cómo una finca transforma sus residuos orgánicos en abono. Piensa si en tu casa se podría hacer algo parecido.' },
        { tipo: 'grupos', id: 's2_grupos', titulo: '¿Se descompone o tarda cientos de años?',
          grupos: [{ k: 'si', nombre: 'Se descompone', color: '#3FA34D', icono: 'org', pista: 'Es un material natural que los seres vivos transforman en abono.' },
            { k: 'no', nombre: 'Tarda cientos de años', color: '#5B6472', icono: 'bas', pista: 'Es plástico o un material sintético que tarda muchísimo en degradarse.' }],
          items: [['banano', 'si'], ['pitillo', 'no'], ['virutas', 'si'], ['vaso', 'no'], ['servilleta', 'si'], ['chicle', 'no'], ['mandarina', 'si'], ['plato_icopor', 'no'], ['palillos', 'si'], ['empaque_papas', 'no']] },
        { tipo: 'ordenar', id: 's2_ordenar_compost', titulo: 'El viaje de una cáscara', pregunta: 'Ordena lo que le pasa a una cáscara hasta convertirse en abono.',
          pasos: ['Separo la cáscara en el recipiente de orgánicos', 'El grupo de aseo la lleva al espacio de descomposición', 'Lombrices, hongos y bacterias transforman los restos',
            'Después de unas semanas se forma el abono', 'El abono alimenta las plantas de la huerta'] },
        { tipo: 'vf', id: 's2_vf', titulo: '¿Verdadero o falso?', afirmaciones: [
          { t: 'Las envolturas plásticas deben estar limpias y secas antes de entrar a la botella.', v: true, e: 'Si entran sucias o mojadas, la botella se daña y huele mal.' },
          { t: 'El vaso plástico va en tarros con residuos porque es de plástico.', v: false, e: 'El vaso es grande para la botella y casi siempre queda sucio. Va en basura.' },
          { t: 'Las virutas del lápiz son madera, por eso son orgánicas.', v: true, e: 'La madera es un material natural que se descompone.' },
          { t: 'Quemar los residuos es una buena forma de eliminarlos.', v: false, e: 'La quema libera gases tóxicos que dañan el aire y la salud.' },
          { t: 'La servilleta con restos de comida va con los orgánicos en nuestro colegio.', v: true, e: 'El papel suave y la comida se descomponen juntos.' },
          { t: 'Las cáscaras de fruta pueden convertirse en abono para la huerta.', v: true, e: 'Con el compostaje las cáscaras se vuelven abono natural.' },
        ] },
        { tipo: 'clasificar', id: 's2_clasificar', titulo: 'Reto de clasificación experto',
          residuos: ['empaque_chiles', 'mandarina', 'pastel', 'botellita', 'virutas', 'servilleta', 'vaso', 'piedras', 'pitillo', 'empaque_pasabocas', 'palo_escoba', 'bolsa_sucia'] },
        { tipo: 'memoria', id: 's2_memoria', titulo: 'Memoria de guardianes', pares: ['virutas', 'pitillo', 'vaso', 'carton'] },
      ],
      cierre: [
        { tipo: 'quiz', id: 's2_final', titulo: 'Desafío final de la Misión 2', preguntas: [
          qr('a', 'tierra'), qr('b', 'vaso'), qr('c', 'virutas'), qr('d', 'pitillo'), qr('e', 'servilleta'),
          q('f', '¿Cuándo está lista una botella de tarros con residuos?', ['Cuando tiene la mitad de empaques', 'Cuando está dura y bien apretada', 'Cuando tiene agua', 'Cuando la tapa no cierra'], 1,
            'La botella está lista cuando queda dura como un ladrillo y sus empaques están limpios y secos.'),
        ] },
        { tipo: 'completar', id: 's2_completar', titulo: 'Completa la idea del guardián', frases: [
          { t: 'Antes de entrar a la botella, los empaques deben estar limpios y ___.', r: 'secos' },
          { t: 'Con un palito se aprieta la botella hasta que quede ___.', r: 'dura' },
          { t: 'Las cáscaras se transforman en ___ para la huerta.', r: 'abono' },
          { t: 'Las lombrices, los hongos y las ___ descomponen los orgánicos.', r: 'bacterias' },
          { t: 'El vaso plástico va en ___ porque casi siempre queda sucio.', r: 'basura' },
        ], distractores: ['mojados', 'blanda'] },
        { tipo: 'sopa', id: 's2_sopa', titulo: 'Sopa de letras del compost', palabras: ['ABONO', 'LOMBRIZ', 'HUERTA', 'CASCARA', 'BOTELLA', 'PLASTICO'] },
        { tipo: 'escala', id: 's2_escala', titulo: '¿Cómo me fue en la Misión 2?', opciones: ESCALA, afirmaciones: [
          'Sé llenar correctamente una botella con envolturas', 'Sé qué residuos sirven para hacer abono',
          'Diferencio un vaso plástico de una envoltura para la botella', 'Puedo enseñar en mi casa a separar los orgánicos'] },
        { tipo: 'reflexion', id: 's2_reflexion', titulo: 'Mi reflexión', pregunta: '¿Qué podrías hacer en tu casa o en tu finca con los residuos orgánicos?' },
      ],
    },
  },
  {
    id: 's3', numero: 3, titulo: 'Resuelvo los residuos difíciles', color: '#B5372A',
    resumen: 'Conviértete en detective de los residuos de composición mixta y sigue su camino hasta la cabecera.',
    momentos: {
      inicio: [
        { tipo: 'bienvenida', titulo: 'Bienvenida a la Misión 3',
          texto: '{nombre}, llegaste a la misión final. Hoy vas a investigar los residuos más difíciles, esos que confunden a muchos estudiantes. Al terminar recibirás la medalla de oro y tu diploma de Maestro guardián.' },
        { tipo: 'encuesta', id: 's3_prediccion', titulo: 'Antes de empezar', pregunta: 'Sin mirar las pistas, ¿dónde crees que va la caja de jugo?', recipientes: true },
        { tipo: 'texto', titulo: 'Los residuos de composición mixta', diagrama: 'capas',
          texto: 'Algunos residuos están hechos de varios materiales pegados, o quedan sucios después de usarlos. A esos los llamamos residuos de composición mixta. La caja de jugo es el ejemplo más famoso, porque por fuera parece cartón, pero por dentro tiene capas muy delgadas de plástico y aluminio que protegen la bebida. Según su fabricante, este tipo de envase tiene en promedio 70 % de cartón, 25 % de plástico y 5 % de aluminio.\n\nComo esas capas no se pueden separar en el colegio, la caja de jugo va en basura. Lo mismo pasa con el vaso plástico sucio, el plato de icopor y el papel higiénico.' },
        { tipo: 'adivina', id: 's3_adivina', titulo: 'Adivina los materiales', palabras: [
          { w: 'ALUMINIO', pista: 'Metal muy delgado que hay dentro de la caja de jugo.' },
          { w: 'ICOPOR', pista: 'Material blanco y liviano de algunos platos desechables.' },
          { w: 'PLÁSTICO', pista: 'Capa que protege la bebida dentro de la caja de jugo.' },
        ] },
        { tipo: 'video', video: 'v5', texto: 'Repasa el código nacional y fíjate en los ejemplos de residuos que ya no se pueden aprovechar.' },
        { tipo: 'vf', id: 's3_vf', titulo: '¿Mixto o sencillo?', afirmaciones: [
          { t: 'La caja de jugo tiene capas de cartón, plástico y aluminio pegadas.', v: true, e: 'Por eso en el colegio va en basura.' },
          { t: 'Una hoja de cuaderno limpia está hecha de un solo material.', v: true, e: 'Es papel, y si está limpia y seca va en papel y cartón.' },
          { t: 'En el colegio el plato de icopor va en papel y cartón.', v: false, e: 'El icopor no se aprovecha aquí y suele quedar con comida. Va en basura.' },
          { t: 'El papel higiénico usado siempre va en basura.', v: true, e: 'Es un residuo sanitario y nunca se aprovecha.' },
        ] },
        { tipo: 'seleccion', id: 's3_basura', titulo: '¿Cuáles van en basura?', enunciado: 'Toca todos los residuos que van en el recipiente de basura.',
          residuos: ['caja_jugo', 'hoja', 'plato_icopor', 'banano', 'papel_higienico', 'empaque_papas', 'chicle', 'virutas', 'cabello'],
          correctos: ['caja_jugo', 'plato_icopor', 'papel_higienico', 'chicle', 'cabello'] },
        { tipo: 'quiz', id: 's3_relampago', titulo: 'Reto relámpago', tiempo: 15, preguntas: [qr('a', 'servilleta'), qr('b', 'cabello'), qr('c', 'palillos'), qr('d', 'botellita')] },
      ],
      desarrollo: [
        { tipo: 'casos', id: 's3_casos', titulo: 'Detective de residuos', casos: [
          { t: 'Después del almuerzo te limpias la boca con una servilleta que queda con restos de arroz.', r: 'servilleta' },
          { t: 'Al barrer el salón, en la escoba queda enredado mucho cabello.', r: 'cabello' },
          { t: 'Terminas un jugo en caja durante el descanso.', r: 'caja_jugo' },
          { t: 'Compras salchipapas en un plato de icopor. ¿Dónde va el plato?', r: 'plato_icopor' },
          { t: 'Con las salchipapas te dieron palillos de madera. ¿Dónde van los palillos?', r: 'palillos' },
          { t: 'Encuentras piedritas con tierra que entraron al salón con los zapatos.', r: 'piedras' },
        ] },
        { tipo: 'ordenar', id: 's3_ordenar', titulo: 'El camino de los residuos', diagrama: 'camino', pregunta: 'Ordena los pasos que sigue un residuo desde el aula hasta la cabecera municipal.',
          pasos: ['Separo el residuo en el recipiente correcto del aula', 'El grupo de aseo revisa y vacía los recipientes al final de la jornada',
            'Los residuos se guardan en estopas dentro de la bodega', 'El vehículo contratado los recoge más o menos cada tres meses',
            'Los residuos llegan a la cabecera municipal de Cajibío'] },
        { tipo: 'grupos', id: 's3_grupos', titulo: '¿Se va en el vehículo o se queda en el colegio?',
          grupos: [{ k: 'veh', nombre: 'Se va en el vehículo', color: '#1E5A96', icono: 'tar', pista: 'El vehículo lleva a la cabecera el papel, el cartón, las botellas con empaques y la basura.' },
            { k: 'col', nombre: 'Se queda en el colegio', color: '#3FA34D', icono: 'org', pista: 'Los orgánicos se quedan en el colegio y se descomponen en un espacio especial.' }],
          items: [['hoja', 'veh'], ['banano', 'col'], ['carton', 'veh'], ['mandarina', 'col'], ['empaque_papas', 'veh'], ['virutas', 'col'], ['vaso', 'veh'], ['tierra', 'col'], ['caja_jugo', 'veh'], ['servilleta', 'col']] },
        { tipo: 'clasificar', id: 's3_clasificar', titulo: 'Gran reto de clasificación',
          residuos: ['mango', 'empaque_galletas', 'bolsa_papel', 'carton', 'chicle', 'palillos', 'tierra', 'cabello', 'plato_icopor', 'papel_higienico', 'caja_jugo', 'empaque_bombon'] },
        { tipo: 'memoria', id: 's3_memoria', titulo: 'Memoria de residuos difíciles', pares: ['caja_jugo', 'palillos', 'empaque_galletas', 'bolsa_papel'] },
      ],
      cierre: [
        { tipo: 'quiz', id: 's3_final', titulo: 'Desafío final de la Misión 3', preguntas: [
          qr('a', 'cabello'), qr('b', 'chicle'), qr('c', 'plato_icopor'), qr('d', 'palillos'), qr('e', 'papel_higienico'),
          q('f', '¿Qué hace el vehículo que contrata el colegio?', ['Recoge los orgánicos cada semana', 'Lleva papel, cartón, botellas con empaques y basura a la cabecera cada tres meses', 'Quema los residuos en la vereda', 'Recoge solo el papel'], 1,
            'El vehículo lleva a la cabecera municipal el papel, el cartón, las botellas con empaques y la basura.'),
        ] },
        { tipo: 'completar', id: 's3_completar', titulo: 'Mi resumen de guardián', frases: [
          { t: 'La caja de jugo va en basura porque tiene capas de cartón, plástico y ___.', r: 'aluminio' },
          { t: 'La servilleta con restos de comida va en ___.', r: 'orgánicos' },
          { t: 'El cabello de la escoba va en ___.', r: 'basura' },
          { t: 'Una hoja limpia y seca va en papel y ___.', r: 'cartón' },
          { t: 'Los residuos llegan a la cabecera municipal en el ___ contratado.', r: 'vehículo' },
        ], distractores: ['vidrio', 'río'] },
        { tipo: 'compromiso', id: 's3_compromiso', titulo: 'Mi compromiso de guardián', opciones: [
          'Revisaré el nombre del recipiente antes de botar un residuo', 'Llenaré botellas con envolturas limpias y secas',
          'Llevaré las cáscaras de mi casa a la huerta o al compost', 'Explicaré a mi familia por qué conviene evitar la quema de basura',
          'Ayudaré a los monitores ambientales del salón', 'Recordaré a mis compañeros dónde va cada residuo'] },
        { tipo: 'escala', id: 's3_escala', titulo: '¿Cómo me fue en la Misión 3?', opciones: ESCALA, afirmaciones: [
          'Sé por qué la caja de jugo va en basura', 'Resuelvo casos de residuos difíciles',
          'Conozco el camino de los residuos hasta la cabecera', 'Me comprometo a separar bien todos los días'] },
        { tipo: 'reflexion', id: 's3_reflexion', titulo: 'Mi reflexión final', pregunta: '¿Cuál fue el residuo más difícil para ti y qué aprendiste de él?' },
      ],
    },
  },
];

export const MOMENTOS = [['inicio', 'Inicio'], ['desarrollo', 'Desarrollo'], ['cierre', 'Cierre']];
export const NIVELES = [[0, 'Aprendiz'], [150, 'Explorador'], [400, 'Guardián'], [700, 'Maestro guardián']];

// Tipos de bloque que cuentan como actividad del momento
export const TIPOS_ACTIVIDAD = ['quiz', 'encuesta', 'vf', 'seleccion', 'sopa', 'completar', 'tarjetas', 'emparejar', 'clasificar', 'adivina', 'escala', 'reflexion',
  'ordenar', 'grupos', 'memoria', 'casos', 'compromiso'];

// Actividades que cuentan para los aciertos de cada misión
export const CALIFICABLES = ['emparejar', 'clasificar', 'quiz', 'vf', 'ordenar', 'casos', 'completar', 'adivina', 'seleccion', 'grupos'];

// Nombre visible de cada tipo de actividad
export const NOMBRE_TIPO = {
  quiz: 'Preguntas', encuesta: 'Encuesta', vf: 'Verdadero o falso', seleccion: 'Selección', sopa: 'Sopa de letras', completar: 'Completar frases',
  tarjetas: 'Tarjetas', emparejar: 'Conecta', clasificar: 'Clasificación', adivina: 'Adivina la palabra', escala: 'Autoevaluación', reflexion: 'Reflexión',
  ordenar: 'Ordenar pasos', grupos: 'Dos grupos', memoria: 'Memoria', casos: 'Detective', compromiso: 'Compromiso',
};
