# 📱 Shorts

En loiaAcademy hay dos tipos de Shorts: **«¿Para qué sirve?»**, uno por cada tema del temario, y **«Recién descubierto»**, sobre descubrimientos científicos recientes. Los dos son videos verticales y están en YouTube. Volvé al [inicio](README.md).

- [¿Para qué sirve?](#para-qué-sirve)
- [Recién descubierto](#recién-descubierto)
  - [Formato](#formato)
  - [Estructura](#estructura)
  - [Cada cuánto sale](#cada-cuánto-sale)
  - [Fuentes](#fuentes)
  - [Cómo se eligen los temas](#cómo-se-eligen-los-temas)
  - [Cómo se verifica cada dato](#cómo-se-verifica-cada-dato)

## ¿Para qué sirve?

Cada tema del temario tiene un Short que te muestra para qué sirve en la vida real. Por ejemplo:

- **Funciones lineales y gráficos en el plano cartesiano** (Matemática, 2º año): la tarifa del taxi, bajada de bandera más un monto por kilómetro.
- **Leyes de Newton** (Física, 2º año): por qué el cinturón de seguridad te salva en un choque.

Lo que tenés que saber:

- **No explica la matemática.** Termina con «si querés ver la matemática, tocá el video de abajo»: tocás ese video y llegás a la clase del tema.
- **Es la misma idea con la que arranca la clase.** Cada clase empieza con 30 a 60 segundos sobre para qué sirve el tema y después sigue en el pizarrón, paso a paso.
- **Podés ver de qué trata antes de mirarlo.** En el temario, **Para qué sirve** cuenta la idea del Short de cada tema. Lo encontrás en la [página](https://loiaconobruno.github.io/loiaAcademy/#temario) y en [data/temario.csv](data/temario.csv).

El recorrido, del Short a la clase, está en el [flujo de «¿Para qué sirve?»](mapas.md#flujo-del-short-para-qué-sirve).

## Recién descubierto

Shorts sobre descubrimientos científicos recientes, pensados para quienes están en la secundaria o en los primeros años de la facultad. En menos de 3 minutos vas a ver qué se descubrió, por qué importa y qué tenés que estudiar para entenderlo.

El recorrido, del descubrimiento a la clase, está en el [flujo de «Recién descubierto»](mapas.md#flujo-de-recién-descubierto).

### Formato

- Video vertical de YouTube, de hasta 3 minutos.
- Arranca con una pregunta simple y sigue a ritmo rápido, con humor y con gráficos o dibujos que acompañan cada idea.
- Subtítulos siempre.
- En pantalla, siempre: la fuente con su fecha y el crédito de cada imagen. Si el trabajo es un preprint, también se avisa.

### Estructura

Cada Short tiene seis partes, en este orden:

| Hasta | Parte |
|---:|---|
| 0:03 | **Arranque:** el dato más sorprendente, en una frase. |
| 0:30 | **Qué se descubrió:** qué, quién y cuándo. |
| 1:15 | **Cómo lo hicieron:** con una imagen o un dibujo. |
| 1:50 | **Por qué importa.** |
| 2:30 | **Qué hay que saber para entenderlo:** uno o dos conceptos, con la clase del temario que los explica. |
| 2:50 | **Cierre:** una pregunta abierta o «si esto te gustó, estudiá X». |

### Cada cuánto sale

- Uno cada dos semanas, entre las clases del temario. Cada uno termina recomendándote la clase que necesitás para entenderlo.
- **Semana Nobel, cada octubre:** Shorts sobre los premios de Medicina, Física y Química, dentro de las 48 horas del anuncio.

### Fuentes

Estas son las fuentes que se siguen. Las primeras sirven para enterarse; los datos se confirman siempre en la fuente original (mirá [cómo se verifica cada dato](#cómo-se-verifica-cada-dato)).

| Para qué | Fuentes |
|---|---|
| Enterarse de los descubrimientos | [phys.org](https://phys.org), [ScienceDaily](https://www.sciencedaily.com/) y [EurekAlert!](https://www.eurekalert.org/). Publican sobre todo comunicados de prensa: sirven de radar, no de fuente. |
| Entenderlos y contrastarlos | [Quanta Magazine](https://www.quantamagazine.org/), [APS Physics](https://physics.aps.org/), [Nature News](https://www.nature.com/news) y [Science News](https://www.sciencenews.org/). |
| En español | [Agencia SINC](https://www.agenciasinc.es/) y las noticias del [CONICET](https://www.conicet.gov.ar/). |

### Cómo se eligen los temas

Para elegir qué descubrimiento contar se usan estos criterios, y el que no los pasa queda afuera:

1. **Tiene revisión de pares o lo anuncia una institución reconocida.** La revisión de pares significa que otros científicos revisaron el trabajo antes de publicarlo. Si es un preprint, es decir, un trabajo que todavía no pasó esa revisión, va igual, pero se dice en pantalla.
2. **Se puede explicar con lo que se ve en la secundaria o en el CBC** (el Ciclo Básico Común de la UBA).
3. **Tiene algo para mostrar:** una imagen, un número que sorprenda o un experimento.
4. **Es reciente**, de los últimos tres meses, **o un premio lo vuelve actual.**
5. **Se conecta con un tema del temario.**
6. **Suma si tiene conexión argentina.**

### Cómo se verifica cada dato

Antes de que un descubrimiento llegue a un Short:

1. Se busca la fuente primaria: el paper con su DOI, el código que identifica a cada artículo científico, o el comunicado de la institución. Los medios sirven para encontrarla, no para citarlos.
2. Se registran dos fechas: la del hallazgo y la de la fuente.
3. Se revisa si tuvo revisión de pares.
4. Cada número que se dice en el Short tiene su fuente.
5. Se contrasta con una segunda fuente independiente.
6. Si el titular dice «cura» o «por primera vez», se busca esa afirmación en el paper.
7. Las imágenes se usan solo con permiso de uso y con el crédito en pantalla.
