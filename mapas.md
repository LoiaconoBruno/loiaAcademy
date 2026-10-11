# 🗺️ Mapas

Cómo se ordenan los 78 temas por curso, cómo se conectan Matemática y Física, y cómo te llevan los Shorts hasta cada clase. El temario completo, con filtros y búsqueda, está en la [página](https://loiaconobruno.github.io/loiaAcademy/#temario) y en [data/temario.csv](data/temario.csv). Volvé al [inicio](README.md).

- [Recorrido por curso](#recorrido-por-curso)
- [Conexiones entre Matemática y Física](#conexiones-entre-matemática-y-física)
- [Qué matemática usan algunos temas de Física](#qué-matemática-usan-algunos-temas-de-física)
- [Flujo del Short «¿Para qué sirve?»](#flujo-del-short-para-qué-sirve)
- [Flujo de «Recién descubierto»](#flujo-de-recién-descubierto)

## Recorrido por curso

Los 78 temas, curso por curso: 43 de Matemática y 35 de Física.

```mermaid
flowchart TB
    classDef curso fill:#0A2237,stroke:#536679,stroke-width:2px,color:#FFFFFF

    subgraph MAT["🧮 Matemática · 43 temas"]
        direction LR
        PRE["<b>Precálculo</b><br/>28 temas"]:::curso
        C1["<b>Cálculo 1</b><br/>4 temas"]:::curso
        C2["<b>Cálculo 2</b><br/>2 temas"]:::curso
        AGA["<b>Álgebra y<br/>geometría analítica</b><br/>5 temas"]:::curso
        PYE["<b>Probabilidad<br/>y estadística</b><br/>4 temas"]:::curso
        PRE --> C1 --> C2
        PRE --> AGA
        PRE --> PYE
    end

    subgraph FIS["⚛️ Física · 35 temas"]
        direction LR
        INT["<b>Introducción<br/>a la física</b><br/>7 temas"]:::curso
        F1["<b>Física 1</b><br/>7 temas"]:::curso
        F2["<b>Física 2</b><br/>9 temas"]:::curso
        F3["<b>Física 3</b><br/>7 temas"]:::curso
        FM["<b>Física moderna</b><br/>5 temas"]:::curso
        INT --> F1 --> F2 --> F3 --> FM
    end

    MAT ~~~ FIS

    style MAT fill:#F7F9FB,stroke:#ECF0F5,color:#0A2237
    style FIS fill:#F7F9FB,stroke:#ECF0F5,color:#0A2237
```

## Conexiones entre Matemática y Física

Cada flecha une un tema de Matemática con el tema de Física que lo usa. El número es el del temario.

```mermaid
flowchart LR
    classDef mat fill:#E6F2FF,stroke:#007BFF,color:#0A2237
    classDef fis fill:#F0F4F8,stroke:#536679,color:#0A2237

    subgraph MAT["🧮 Matemática"]
        M4["4 · Proporcionalidad directa e inversa<br/>Precálculo"]:::mat
        M13["13 · Funciones lineales y gráficos en el plano cartesiano<br/>Precálculo"]:::mat
        M18["18 · Ecuaciones y desigualdades de primer y segundo grado<br/>Precálculo"]:::mat
        M19["19 · Funciones cuadráticas: la parábola<br/>Precálculo"]:::mat
        M21["21 · Introducción a la trigonometría: seno, coseno y tangente<br/>Precálculo"]:::mat
        M26["26 · Funciones exponenciales y logarítmicas<br/>Precálculo"]:::mat
        M32["32 · Derivadas y sus aplicaciones: máximos, mínimos y tasas de cambio<br/>Cálculo 1"]:::mat
        M33["33 · Integrales básicas y áreas bajo curvas<br/>Cálculo 1"]:::mat
        M36["36 · Vectores en el plano<br/>Álgebra y geometría analítica"]:::mat
    end

    subgraph FIS["⚛️ Física"]
        F3["3 · Movimiento: posición, velocidad y tiempo<br/>Introducción a la física"]:::fis
        F4["4 · Fuerzas y equilibrio<br/>Introducción a la física"]:::fis
        F8["8 · Movimiento rectilíneo uniforme y uniformemente acelerado (MRU y MRUV)<br/>Física 1"]:::fis
        F9["9 · Caída libre<br/>Física 1"]:::fis
        F10["10 · Leyes de Newton<br/>Física 1"]:::fis
        F19["19 · Ondas mecánicas y sonido<br/>Física 2"]:::fis
        F20["20 · Luz y óptica geométrica: reflexión y refracción<br/>Física 2"]:::fis
        F21["21 · Electricidad estática: carga, campo y potencial eléctrico<br/>Física 3"]:::fis
        F27["27 · Movimiento armónico simple y ondas electromagnéticas<br/>Física 2"]:::fis
        F29["29 · Termodinámica: leyes y procesos<br/>Física 2"]:::fis
        F33["33 · Física nuclear: radiactividad, fisión y fusión<br/>Física moderna"]:::fis
    end

    style MAT fill:#F7F9FB,stroke:#ECF0F5,color:#0A2237
    style FIS fill:#F7F9FB,stroke:#ECF0F5,color:#0A2237

    M4 --> F3
    M36 --> F4
    M13 --> F8
    M18 --> F8
    M19 --> F9
    M21 --> F10
    M26 --> F19
    M21 --> F20
    M36 --> F21
    M32 --> F27
    M33 --> F29
    M26 --> F33

    linkStyle default stroke:#007BFF,stroke-width:2px
```

## Qué matemática usan algunos temas de Física

Si vas a ver uno de estos temas de Física, te conviene tener vista antes la clase de Matemática que usa.

| Tema de Física | Curso | Usa este tema de Matemática | Curso |
|---|---|---|---|
| 3 · Movimiento: posición, velocidad y tiempo | Introducción a la física | 4 · Proporcionalidad directa e inversa | Precálculo |
| 4 · Fuerzas y equilibrio | Introducción a la física | 36 · Vectores en el plano | Álgebra y geometría analítica |
| 8 · Movimiento rectilíneo uniforme y uniformemente acelerado (MRU y MRUV) | Física 1 | 13 · Funciones lineales y gráficos en el plano cartesiano | Precálculo |
| 8 · Movimiento rectilíneo uniforme y uniformemente acelerado (MRU y MRUV) | Física 1 | 18 · Ecuaciones y desigualdades de primer y segundo grado | Precálculo |
| 9 · Caída libre | Física 1 | 19 · Funciones cuadráticas: la parábola | Precálculo |
| 10 · Leyes de Newton | Física 1 | 21 · Introducción a la trigonometría: seno, coseno y tangente | Precálculo |
| 19 · Ondas mecánicas y sonido | Física 2 | 26 · Funciones exponenciales y logarítmicas | Precálculo |
| 20 · Luz y óptica geométrica: reflexión y refracción | Física 2 | 21 · Introducción a la trigonometría: seno, coseno y tangente | Precálculo |
| 21 · Electricidad estática: carga, campo y potencial eléctrico | Física 3 | 36 · Vectores en el plano | Álgebra y geometría analítica |
| 27 · Movimiento armónico simple y ondas electromagnéticas | Física 2 | 32 · Derivadas y sus aplicaciones: máximos, mínimos y tasas de cambio | Cálculo 1 |
| 29 · Termodinámica: leyes y procesos | Física 2 | 33 · Integrales básicas y áreas bajo curvas | Cálculo 1 |
| 33 · Física nuclear: radiactividad, fisión y fusión | Física moderna | 26 · Funciones exponenciales y logarítmicas | Precálculo |

## Flujo del Short «¿Para qué sirve?»

Un Short por cada tema del temario: muestra para qué sirve en la vida real y termina con «si querés ver la matemática, tocá el video de abajo». En el temario, **Para qué sirve** te adelanta de qué trata cada uno.

```mermaid
flowchart TB
    classDef general fill:#F0F4F8,stroke:#536679,color:#0A2237
    classDef decision fill:#E6F2FF,stroke:#007BFF,color:#0A2237
    classDef terminator fill:#0A2237,stroke:#536679,stroke-width:2px,color:#FFFFFF

    t(["Un tema del temario"]):::terminator
    s["El Short<br/>«¿Para qué sirve?»<br/>te muestra para qué<br/>sirve en la vida real,<br/>sin explicar<br/>la matemática"]:::general
    c["Termina con «si querés<br/>ver la matemática,<br/>tocá el video de abajo»"]:::general
    q{{"¿Querés ver<br/>la matemática?"}}:::decision
    k["Tocás el video de abajo<br/>y llegás a la clase<br/>del tema"]:::general
    i["La clase arranca con<br/>30 a 60 segundos sobre<br/>para qué sirve el tema"]:::general
    y(["Sigue la explicación<br/>completa en el pizarrón,<br/>paso a paso"]):::terminator
    n(["Te quedás con la idea<br/>y seguís con otro Short"]):::terminator

    t --> s
    s --> c
    c --> q
    q -->|"Sí"| k
    q -->|"No"| n
    k --> i
    i --> y
```

## Flujo de «Recién descubierto»

Cómo llega un descubrimiento a un Short, qué controles pasa antes y a qué clase del temario te lleva. Los criterios y la verificación, paso por paso, están en [shorts.md](shorts.md#recién-descubierto).

```mermaid
flowchart TB
    classDef general fill:#F0F4F8,stroke:#536679,color:#0A2237
    classDef decision fill:#E6F2FF,stroke:#007BFF,color:#0A2237
    classDef terminator fill:#0A2237,stroke:#536679,stroke-width:2px,color:#FFFFFF

    d(["Un descubrimiento<br/>aparece en phys.org,<br/>ScienceDaily<br/>o EurekAlert!"]):::terminator
    nb(["Semana Nobel,<br/>cada octubre:<br/>Medicina, Física<br/>y Química"]):::terminator
    c{{"¿Pasa los criterios?<br/>revisión de pares,<br/>se explica con lo que<br/>se ve en el ingreso<br/>o en los primeros<br/>años de la facultad,<br/>es reciente"}}:::decision
    x(["Queda afuera"]):::terminator
    v["Se verifica cada dato:<br/>paper con DOI,<br/>dos fechas,<br/>segunda fuente,<br/>crédito de las imágenes"]:::general
    s["Mirás el Short:<br/>hasta 3 minutos,<br/>con subtítulos,<br/>la fuente y su fecha<br/>en pantalla"]:::general
    p["Te cuenta qué<br/>se descubrió,<br/>cómo lo hicieron,<br/>por qué importa y qué<br/>hay que saber<br/>para entenderlo"]:::general
    f(["Al final, te deja<br/>el link a la clase<br/>del temario que lo explica"]):::terminator

    d --> c
    c -->|"No"| x
    c -->|"Sí"| v
    nb --> v
    v --> s
    s --> p
    p --> f
```
