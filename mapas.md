# 🗺️ Mapas

Cómo se ordenan los 78 temas, cómo se conectan Matemática y Física, y cómo te llevan los Shorts hasta cada clase. El temario completo, con filtros y búsqueda, está en la [página](https://loiaconobruno.github.io/loiaAcademy/#temario) y en [data/temario.csv](data/temario.csv). Volvé al [inicio](README.md).

- [Recorrido por año](#recorrido-por-año)
- [Conexiones entre Matemática y Física](#conexiones-entre-matemática-y-física)
- [Antes de estos temas, mirá la matemática que usan](#antes-de-estos-temas-mirá-la-matemática-que-usan)
- [Flujo del Short «¿Para qué sirve?»](#flujo-del-short-para-qué-sirve)
- [Flujo de «Recién descubierto»](#flujo-de-recién-descubierto)

## Recorrido por año

Los 78 temas, año por año: 43 de Matemática y 35 de Física.

```mermaid
flowchart LR
    classDef anio fill:#0A2237,stroke:#536679,stroke-width:2px,color:#FFFFFF

    A1["<b>1º año</b><br/>16 temas<br/>🧮 9 · ⚛️ 7"]:::anio
    A2["<b>2º año</b><br/>15 temas<br/>🧮 8 · ⚛️ 7"]:::anio
    A3["<b>3º año</b><br/>13 temas<br/>🧮 7 · ⚛️ 6"]:::anio
    A4["<b>4º año</b><br/>13 temas<br/>🧮 7 · ⚛️ 6"]:::anio
    A5["<b>5º año</b><br/>11 temas<br/>🧮 6 · ⚛️ 5"]:::anio
    A6["<b>6º año</b><br/>10 temas<br/>🧮 6 · ⚛️ 4"]:::anio

    A1 --> A2 --> A3 --> A4 --> A5 --> A6
```

Los temas de 6º de Matemática son de nivel preuniversitario: en la facultad se ven en Análisis II y Álgebra.

## Conexiones entre Matemática y Física

Cada flecha une un tema de Matemática con el tema de Física que lo usa. El número es el del temario.

- **Flecha azul:** a tiempo. Matemática lo enseña ese mismo año o antes.
- **Flecha naranja punteada:** desfasado. Física lo usa antes de que Matemática lo enseñe.
- **Borde naranja:** tema de Física que usa matemática de un año posterior.

```mermaid
flowchart LR
    classDef mat fill:#E6F2FF,stroke:#007BFF,color:#0A2237
    classDef fis fill:#F0F4F8,stroke:#536679,color:#0A2237
    classDef desfasado fill:#F0F4F8,stroke:#CC7830,stroke-width:3px,color:#0A2237

    subgraph MAT["🧮 Matemática"]
        M4["4 · Proporcionalidad directa e inversa<br/>1º año"]:::mat
        M13["13 · Funciones lineales y gráficos en el plano cartesiano<br/>2º año"]:::mat
        M18["18 · Ecuaciones y desigualdades de primer y segundo grado<br/>3º año"]:::mat
        M19["19 · Funciones cuadráticas: la parábola<br/>3º año"]:::mat
        M21["21 · Introducción a la trigonometría: seno, coseno y tangente<br/>3º año"]:::mat
        M26["26 · Funciones exponenciales y logarítmicas<br/>4º año"]:::mat
        M32["32 · Derivadas y sus aplicaciones: máximos, mínimos y tasas de cambio<br/>5º año"]:::mat
        M33["33 · Integrales básicas y áreas bajo curvas<br/>5º año"]:::mat
        M36["36 · Vectores en el plano<br/>5º año"]:::mat
    end

    subgraph FIS["⚛️ Física"]
        F3["3 · Movimiento: posición, velocidad y tiempo<br/>1º año"]:::fis
        F4["4 · Fuerzas y equilibrio<br/>1º año"]:::desfasado
        F8["8 · Movimiento rectilíneo uniforme y uniformemente acelerado (MRU y MRUV)<br/>2º año"]:::desfasado
        F9["9 · Caída libre<br/>2º año"]:::desfasado
        F10["10 · Leyes de Newton<br/>2º año"]:::desfasado
        F19["19 · Ondas mecánicas y sonido<br/>3º año"]:::desfasado
        F20["20 · Luz y óptica geométrica: reflexión y refracción<br/>3º año"]:::fis
        F21["21 · Electricidad estática: carga, campo y potencial eléctrico<br/>4º año"]:::desfasado
        F27["27 · Movimiento armónico simple y ondas electromagnéticas<br/>5º año"]:::fis
        F29["29 · Termodinámica: leyes y procesos<br/>5º año"]:::fis
        F33["33 · Física nuclear: radiactividad, fisión y fusión<br/>6º año"]:::fis
    end

    style MAT fill:#F7F9FB,stroke:#ECF0F5,color:#0A2237
    style FIS fill:#F7F9FB,stroke:#ECF0F5,color:#0A2237

    M4 --> F3
    M13 --> F8
    M21 --> F20
    M32 --> F27
    M33 --> F29
    M26 --> F33
    M18 -. 1 año antes .-> F8
    M19 -. 1 año antes .-> F9
    M21 -. 1 año antes .-> F10
    M26 -. 1 año antes .-> F19
    M36 -. 1 año antes .-> F21
    M36 -. 4 años antes .-> F4

    linkStyle 0,1,2,3,4,5 stroke:#007BFF,stroke-width:3px
    linkStyle 6,7,8,9,10,11 stroke:#CC7830,stroke-width:3px
```

## Antes de estos temas, mirá la matemática que usan

Seis temas de Física usan matemática que en el temario aparece en un año posterior. Si llegás a uno de ellos, conviene ver antes la clase de Matemática.

| Tema de Física | Usa este tema de Matemática | Que se ve |
|---|---|---|
| 4 · Fuerzas y equilibrio (1º) | 36 · Vectores en el plano (5º) | 4 años después |
| 8 · Movimiento rectilíneo uniforme y uniformemente acelerado (MRU y MRUV) (2º) | 18 · Ecuaciones y desigualdades de primer y segundo grado (3º) | 1 año después |
| 9 · Caída libre (2º) | 19 · Funciones cuadráticas: la parábola (3º) | 1 año después |
| 10 · Leyes de Newton (2º) | 21 · Introducción a la trigonometría: seno, coseno y tangente (3º) | 1 año después |
| 19 · Ondas mecánicas y sonido (3º) | 26 · Funciones exponenciales y logarítmicas (4º) | 1 año después |
| 21 · Electricidad estática: carga, campo y potencial eléctrico (4º) | 36 · Vectores en el plano (5º) | 1 año después |

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
    c{{"¿Pasa los criterios?<br/>revisión de pares,<br/>se explica con lo que<br/>se ve en la secundaria,<br/>es reciente"}}:::decision
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
