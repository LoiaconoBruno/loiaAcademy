# loiaAcademy

**Matemática y física de secundaria, de 1º a 6º año, explicadas con pizarrón en YouTube.**

🌐 **Página:** https://loiaconobruno.github.io/loiaAcademy/<br>
▶️ **Canal:** [loiaAcademy en YouTube](https://www.youtube.com/channel/UC9-PBudeytymdwUbjK0-Law)

loiaAcademy es un canal de YouTube para entender matemática y física de secundaria, de 1º a 6º año. Cada tema tiene una clase larga con pizarrón, paso a paso y con todo el rigor, y un Short que muestra para qué sirve en la vida real. Además, hay Shorts sobre descubrimientos científicos recientes: qué se encontró, por qué importa y qué tenés que estudiar para entenderlo.

## Qué hay en la página

- **Los tres formatos:** clases, Shorts «¿Para qué sirve?» y Shorts «Recién descubierto».
- **El temario:** los 78 temas (43 de Matemática y 35 de Física), con filtros por materia y por año y una búsqueda. Cada tema muestra su año, su eje y para qué sirve.
- **Los libros** de referencia, por materia y año.

## Cómo está organizado el repo

| Archivo | Qué tiene |
|---|---|
| [index.html](index.html) | La página, en un solo archivo HTML. |
| [css/estilos.css](css/estilos.css) | Los estilos de la página. |
| [js/app.js](js/app.js) | Arma el temario y los libros desde `data/`, con los filtros y la búsqueda. |
| [data/temario.csv](data/temario.csv) | Los 78 temas: orden, tema, materia, año, eje, para qué sirve y los links a la clase y al Short. Es la única fuente del temario: la página lo lee y GitHub lo muestra como tabla. |
| [data/libros.csv](data/libros.csv) | Los libros: título, autor, materia, año, editorial y una nota. |
| [assets/img/](assets/img/) | Las imágenes de la página. |
| [mapas.md](mapas.md) | Cómo se conectan los temas de Matemática con los de Física, y cómo pasás de un Short a la clase que lo explica. |
| [shorts.md](shorts.md) | Cómo son los Shorts «¿Para qué sirve?» y «Recién descubierto»: formato, fuentes, criterios y cómo se verifica cada dato. |
| [LICENSE](LICENSE) | La licencia CC BY-NC-SA 4.0. |
| `.nojekyll` | Hace que GitHub Pages publique los archivos tal cual, sin procesarlos. |

La página es HTML, CSS y JavaScript, sin frameworks ni paso de build. Los datos están en `data/` y se pueden descargar como CSV.

## Licencia

El contenido se publica bajo [CC BY-NC-SA 4.0](LICENSE): podés compartirlo y adaptarlo sin fines comerciales, si citás a loiaAcademy y compartís tus cambios con la misma licencia.
