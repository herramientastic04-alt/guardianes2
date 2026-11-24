# Guardianes de la Separación

Recurso digital gamificado para fortalecer el hábito de separación de residuos sólidos en grado séptimo de la Institución Educativa Casas Bajas, vereda Santa Teresa, Cajibío, Cauca.

## Qué incluye

El recurso tiene tres misiones, una por sesión de clase. Cada misión se organiza en tres momentos y cada momento tiene exactamente 5 actividades interactivas, para un total de 45. Entre las actividades aparecen las lecturas, los videos de YouTube, las fotos y los diagramas que presentan el contenido. Durante cada momento una barra muestra en qué actividad va el estudiante.

**Misión 1. Conozco mi territorio y mis recipientes**
* Contenido: bienvenida, lectura sobre los residuos en la vereda con foto de la bodega, video sobre la quema de basura, código nacional de colores con diagrama y video, los cuatro recipientes del aula con diagrama y foto del punto de separación.
* Inicio: prueba de entrada, encuesta sobre la casa, verdadero o falso sobre la quema, selección de los residuos que produce cada estudiante y sopa de letras.
* Desarrollo: completar el código de colores, tarjetas para voltear, conectar recipientes, selección de papel y cartón y reto de clasificación con 10 residuos.
* Cierre: desafío final de 6 preguntas, adivina la palabra, encuesta del recipiente más difícil, autoevaluación con caritas y reflexión escrita. Medalla de bronce y diploma.

**Misión 2. Clasifico como guardián experto**
* Contenido: bienvenida, lectura sobre los tarros con residuos con diagrama de pasos y video, lectura sobre compostaje con el ciclo del compost y video.
* Inicio: repaso relámpago con reloj de 20 segundos, encuesta sobre la casa, selección de lo que entra en la botella, mitos de las botellas y ordenar los pasos de la botella.
* Desarrollo: dos grupos para separar lo que se descompone de lo que tarda cientos de años, ordenar el viaje de una cáscara, verdadero o falso, reto de clasificación con 12 residuos y memoria.
* Cierre: desafío final de 6 preguntas, completar frases, sopa de letras del compost, autoevaluación y reflexión. Medalla de plata y diploma.

**Misión 3. Resuelvo los residuos difíciles**
* Contenido: bienvenida, lectura sobre residuos de composición mixta con diagrama de capas y video.
* Inicio: predicción sobre la caja de jugo, adivina los materiales, verdadero o falso, selección de lo que va en basura y reto relámpago con reloj de 15 segundos.
* Desarrollo: detective de residuos con 6 casos, ordenar el camino de los residuos hasta la cabecera, dos grupos para separar lo que se lleva el vehículo de lo que se queda en el colegio, gran reto de clasificación con 12 residuos y memoria.
* Cierre: desafío final de 6 preguntas, completar el resumen del guardián, compromiso, autoevaluación y reflexión final. Medalla de oro, diploma de la misión y diploma final de Maestro Guardián.

Las actividades de preguntas, verdadero o falso, conectar, clasificar, dos grupos, selección con respuesta, completar, adivinar, ordenar y detective cuentan para los aciertos de cada misión. La encuesta, la autoevaluación, la sopa de letras, la memoria, las tarjetas, el compromiso y la reflexión suman puntos y quedan registradas para el docente, pero no afectan el porcentaje de aciertos.

Los estudiantes se registran con nombre, edad, grado, usuario y una clave de 4 números, y crean su avatar. Las misiones se desbloquean en orden. Cada respuesta suma puntos y al final de cada misión se entrega una medalla con una a tres estrellas y un diploma descargable en imagen.

La clasificación sigue el sistema de cuatro recipientes de la institución: papel y cartón, tarros con residuos, basura y orgánicos.

## Usuario del docente investigador

* Usuario: `docenteinvestigador`
* Clave inicial: `CasasBajas1927`

El panel docente muestra el resumen del grupo, la tabla de estudiantes con el avance de cada momento, el detalle de cada respuesta, el análisis de precisión por residuo, los resultados agrupados de encuestas y autoevaluaciones, las reflexiones y compromisos, y la configuración de los videos. También permite restablecer la clave de un estudiante, eliminar cuentas y descargar dos archivos CSV que se abren en Excel: resultados por estudiante y respuestas detalladas.

## Publicar en Netlify con base de datos

La base de datos funciona con Netlify Blobs, que se activa sola al publicar. Para que las funciones del servidor se publiquen, el proyecto debe subirse desde GitHub. La opción de arrastrar y soltar carpetas en Netlify publica solo la parte visual y el recurso quedaría en modo de demostración, sin guardar datos para el docente.

1. Entra a GitHub y crea un repositorio nuevo, por ejemplo `guardianes`.
2. En el repositorio elige la opción para subir archivos y arrastra todo el contenido de esta carpeta: `netlify.toml`, `package.json`, `LEEME.md` y las carpetas `netlify` y `public`.
3. Entra a Netlify, elige agregar un proyecto nuevo, importa un proyecto existente y selecciona GitHub y el repositorio.
4. Netlify lee el archivo `netlify.toml` y llena la configuración solo. Pulsa el botón para publicar.
5. Cuando termine, abre la dirección que entrega Netlify. Si el aviso amarillo de modo de demostración ya no aparece, la base de datos está activa.

## Cambiar la clave del docente

En Netlify abre la configuración del proyecto, busca las variables de entorno y crea estas variables:

* `DOCENTE_CLAVE` con la nueva clave del docente.
* `DOCENTE_USUARIO` si quieres otro nombre de usuario.
* `TOKEN_SECRETO` con una frase larga cualquiera, para firmar las sesiones. Es opcional.

Después vuelve a publicar el proyecto desde la sección de publicaciones para que los cambios tomen efecto.

## Cambiar videos o textos

Los videos se cambian desde la pestaña Videos del panel docente, pegando el enlace de YouTube. Los textos, preguntas y residuos de cada misión están en `public/js/contenido.js`.

## Vista rápida sin base de datos

Si arrastras la carpeta `public` a Netlify Drop, el recurso funciona en modo de demostración y guarda el progreso solo en el navegador del equipo. Sirve para revisar el diseño antes de publicarlo con GitHub.

## Privacidad

El recurso guarda solo nombre, edad, grado, usuario, avatar, clave cifrada y respuestas. Las claves se guardan con cifrado y no se muestran a nadie. El docente puede eliminar cualquier cuenta desde el panel.

## Créditos

Fuentes tipográficas Baloo 2 y Nunito con licencia SIL Open Font License, incluidas en `public/fonts`. Ilustraciones, avatares y diagramas hechos a medida para este recurso. Videos de YouTube de sus respectivos autores, enlazados sin descargarse.
