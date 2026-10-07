# 🗺️ Mapas

Cómo se ordenan los 78 temas, cómo se conectan Matemática y Física, y cómo nace cada Short. Volvé al [inicio](README.md).

- [Recorrido por año](#recorrido-por-año)
- [Conexiones entre Matemática y Física](#conexiones-entre-matemática-y-física)
- [Flujo del Short «¿Para qué sirve?»](#flujo-del-short-para-qué-sirve)
- [Flujo de «Recién descubierto»](#flujo-de-recién-descubierto)

## Recorrido por año

Los 78 temas, año por año: 43 de Matemática y 35 de Física. La lista completa está en el temario de [Matemática](temario/matematica.md) y de [Física](temario/fisica.md).

```mermaid
flowchart LR
    classDef anio fill:#0A2237,stroke:#123248,color:#FFFFFF

    A1["<b>1º año</b><br/>16 temas<br/>🧮 9 · ⚛️ 7"]:::anio
    A2["<b>2º año</b><br/>15 temas<br/>🧮 8 · ⚛️ 7"]:::anio
    A3["<b>3º año</b><br/>13 temas<br/>🧮 7 · ⚛️ 6"]:::anio
    A4["<b>4º año</b><br/>13 temas<br/>🧮 7 · ⚛️ 6"]:::anio
    A5["<b>5º año</b><br/>11 temas<br/>🧮 6 · ⚛️ 5"]:::anio
    A6["<b>6º año</b><br/>10 temas<br/>🧮 6 · ⚛️ 4"]:::anio

    A1 --> A2 --> A3 --> A4 --> A5 --> A6
```

6º de Matemática ya es nivel preuniversitario: en la facultad esos temas se ven en Análisis II y Álgebra.

## Conexiones entre Matemática y Física

Cada flecha une un tema de Matemática con el tema de Física que lo usa. El número es el del temario.

- **Flecha azul:** a tiempo. Matemática lo enseña ese mismo año o antes.
- **Flecha naranja punteada:** desfasado. Física lo usa antes de que Matemática lo enseñe.
- **Borde naranja:** tema de Física que depende de un tema de Matemática posterior.

```mermaid
flowchart LR
    classDef mat fill:#E6F2FF,stroke:#007BFF,color:#0A2237
    classDef fis fill:#F0F4F8,stroke:#536679,color:#0A2237
    classDef desfasado fill:#F0F4F8,stroke:#CC7830,stroke-width:3px,color:#0A2237

    subgraph MAT["🧮 Matemática"]
        M4["4 · Proporcionalidad directa e inversa<br/>1º año"]:::mat
        M13["13 · Funciones lineales y plano cartesiano<br/>2º año"]:::mat
        M18["18 · Ecuaciones e inecuaciones de 1º y 2º grado<br/>3º año"]:::mat
        M19["19 · Funciones cuadráticas: la parábola<br/>3º año"]:::mat
        M21["21 · Trigonometría: seno, coseno y tangente<br/>3º año"]:::mat
        M26["26 · Funciones exponenciales y logarítmicas<br/>4º año"]:::mat
        M32["32 · Derivadas: máximos, mínimos y tasas<br/>5º año"]:::mat
        M33["33 · Integrales y área bajo la curva<br/>5º año"]:::mat
        M36["36 · Vectores en el plano<br/>5º año"]:::mat
    end

    subgraph FIS["⚛️ Física"]
        F3["3 · Movimiento: posición, velocidad y tiempo<br/>1º año"]:::fis
        F4["4 · Fuerzas y equilibrio<br/>1º año"]:::desfasado
        F8["8 · MRU y MRUV<br/>2º año"]:::desfasado
        F9["9 · Caída libre<br/>2º año"]:::desfasado
        F10["10 · Leyes de Newton<br/>2º año"]:::desfasado
        F19["19 · Ondas mecánicas y sonido<br/>3º año"]:::desfasado
        F20["20 · Óptica geométrica: reflexión y refracción<br/>3º año"]:::fis
        F21["21 · Electrostática: carga, campo y potencial<br/>4º año"]:::desfasado
        F27["27 · MAS y ondas electromagnéticas<br/>5º año"]:::fis
        F29["29 · Termodinámica: leyes y procesos<br/>5º año"]:::fis
        F33["33 · Radiactividad, fisión y fusión<br/>6º año"]:::fis
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

Seis temas de Física llegan antes que la matemática que necesitan. Si vas a ver uno de ellos, mirá primero la clase de Matemática: la lista está en el [temario de Física](temario/fisica.md#antes-de-estos-temas-mirá-la-matemática-que-usan).

## Flujo del Short «¿Para qué sirve?»

Un Short por cada tema del temario: muestra para qué sirve en la vida real y termina con «si querés ver la matemática, tocá el video de abajo». La idea de cada uno está en la columna **Para qué sirve** del temario.

```mermaid
flowchart TB
    classDef general fill:#F0F4F8,stroke:#536679,color:#0A2237
    classDef decision fill:#E6F2FF,stroke:#007BFF,color:#0A2237
    classDef terminator fill:#0A2237,stroke:#123248,color:#FFFFFF

    t(["Tema del temario"]):::terminator
    l["Grabar el video largo en horizontal<br/>empezando con 30 a 60 segundos<br/>sobre para qué sirve"]:::general
    v["El mismo día, repetir esa intro<br/>en vertical con el celular"]:::general
    s["Editar el Short ¿Para qué sirve?<br/>con el cierre al video largo"]:::general
    pl["Publicar el video largo"]:::general
    ps["Publicar el Short<br/>con el video largo como video relacionado"]:::general
    q{{"¿Quiere ver la matemática?"}}:::decision
    y(["Entra al video largo<br/>con la explicación completa"]):::terminator
    n(["Se queda con la idea<br/>y sigue con otro Short"]):::terminator

    t --> l
    l --> v
    v --> s
    l --> pl
    s --> ps
    pl --> ps
    ps --> q
    q -->|Sí| y
    q -->|No| n
```

## Flujo de «Recién descubierto»

Cómo un descubrimiento se convierte en un Short de loiaAcademy: del radar semanal al tema del temario que lo explica. Los criterios y la verificación, paso por paso, están en [shorts.md](shorts.md#recién-descubierto).

```mermaid
flowchart TB
    classDef general fill:#F0F4F8,stroke:#536679,color:#0A2237
    classDef decision fill:#E6F2FF,stroke:#007BFF,color:#0A2237
    classDef terminator fill:#0A2237,stroke:#123248,color:#FFFFFF

    r(["Radar semanal<br/>phys.org, ScienceDaily, EurekAlert!<br/>30 minutos, 3 candidatos"]):::terminator
    n(["Semana Nobel<br/>cada octubre"]):::terminator
    c{{"¿Pasa los criterios?<br/>revisión de pares, se explica<br/>con el secundario, es reciente"}}:::decision
    x(["Descartado"]):::terminator
    v["Verificar<br/>paper con DOI, dos fechas,<br/>segunda fuente, créditos"]:::general
    g["Guion con la plantilla<br/>gancho, descubrimiento, cómo,<br/>por qué importa, qué saber, cierre"]:::general
    p["Grabar y publicar el Short<br/>estilo Be Smart, hasta 3 minutos<br/>uno cada dos semanas"]:::general
    f(["Cierre con link al video largo<br/>del temario que lo explica"]):::terminator

    r --> c
    c -->|No| x
    c -->|Sí| v
    n --> v
    v --> g
    g --> p
    p --> f
```
