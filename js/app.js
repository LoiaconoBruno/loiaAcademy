/* loiaAcademy · arma el temario y los libros desde data/, con filtros y búsqueda.
   Sin frameworks ni paso de build: se sirve tal cual en GitHub Pages. */
(() => {
  'use strict';

  const ANIOS = ['1º', '2º', '3º', '4º', '5º', '6º'];
  const MATERIAS = ['Matemática', 'Física'];
  const REPO = 'https://github.com/LoiaconoBruno/loiaAcademy/blob/main/';
  const NOTA_6_MATEMATICA = 'Los temas de 6º de Matemática son de nivel preuniversitario: en la facultad se ven en Análisis II y Álgebra.';

  // CSV según RFC 4180: campos entre comillas con comas, comillas dobles ("") y saltos de línea adentro.
  function parsearCSV(texto) {
    const filas = [];
    let fila = [];
    let campo = '';
    let enComillas = false;
    if (texto.charCodeAt(0) === 0xfeff) texto = texto.slice(1);
    for (let i = 0; i < texto.length; i++) {
      const c = texto[i];
      if (enComillas) {
        if (c === '"' && texto[i + 1] === '"') {
          campo += '"';
          i++;
        } else if (c === '"') {
          enComillas = false;
        } else {
          campo += c;
        }
      } else if (c === '"' && campo.trim() === '') {
        campo = '';
        enComillas = true;
      } else if (c === ',') {
        fila.push(campo);
        campo = '';
      } else if (c === '\n' || c === '\r') {
        if (c === '\r' && texto[i + 1] === '\n') i++;
        fila.push(campo);
        filas.push(fila);
        fila = [];
        campo = '';
      } else {
        campo += c;
      }
    }
    if (campo !== '' || fila.length) {
      fila.push(campo);
      filas.push(fila);
    }
    return filas.filter((f) => !(f.length === 1 && f[0].trim() === ''));
  }

  function aObjetos(filas) {
    const [encabezado, ...resto] = filas;
    const claves = encabezado.map((h) => h.trim());
    return resto.map((f) => Object.fromEntries(claves.map((k, j) => [k, (f[j] || '').trim()])));
  }

  // Minúsculas y sin tildes. NFD (no NFKD) para que «º» no se convierta en «o».
  function normalizar(texto) {
    return String(texto).replace(/°/g, 'º').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/\s+/g, ' ').trim();
  }

  // «1°» (signo de grado) es un error de tipeo común: se toma como «1º».
  function normalizarAnio(texto) {
    return String(texto || '').replace(/°/g, 'º').trim();
  }

  function separarAnios(texto) {
    return [...new Set(String(texto || '').split(',').map(normalizarAnio))].filter((a) => ANIOS.includes(a));
  }

  function normalizarMateria(texto) {
    return MATERIAS.find((m) => normalizar(m) === normalizar(texto || '')) || String(texto || '').trim();
  }

  function esLink(url) {
    return /^https?:\/\/\S+$/i.test(url);
  }

  function crear(etiqueta, atributos = {}, ...hijos) {
    const nodo = document.createElement(etiqueta);
    for (const [clave, valor] of Object.entries(atributos)) {
      if (clave === 'clase') nodo.className = valor;
      else if (clave === 'texto') nodo.textContent = valor;
      else if (valor === true) nodo.setAttribute(clave, '');
      else if (valor !== false && valor != null) nodo.setAttribute(clave, valor);
    }
    for (const hijo of hijos.flat()) {
      if (hijo == null || hijo === false) continue;
      nodo.append(typeof hijo === 'string' ? document.createTextNode(hijo) : hijo);
    }
    return nodo;
  }

  function plural(n, singular, pluralTexto) {
    return `${n} ${n === 1 ? singular : pluralTexto}`;
  }

  function cargarCSV(ruta) {
    return fetch(ruta).then((respuesta) => {
      if (!respuesta.ok) throw new Error(`${ruta}: ${respuesta.status}`);
      return respuesta.text();
    }).then((texto) => aObjetos(parsearCSV(texto)));
  }

  function mostrarError(contenedor, que, archivo) {
    contenedor.replaceChildren(
      crear('p', { clase: 'aviso' },
        `No se pudo cargar ${que}. Podés ver el archivo en `,
        crear('a', { href: REPO + archivo, texto: archivo }),
        '.')
    );
  }

  /* Menú en celular */

  function iniciarMenu() {
    const boton = document.querySelector('.menu-boton');
    const nav = document.getElementById('menu');
    if (!boton || !nav) return;
    const abrir = (abierto) => {
      boton.setAttribute('aria-expanded', String(abierto));
      nav.classList.toggle('nav--abierta', abierto);
    };
    boton.addEventListener('click', () => abrir(boton.getAttribute('aria-expanded') !== 'true'));
    nav.addEventListener('click', (evento) => {
      if (evento.target.closest('a')) abrir(false);
    });
    document.addEventListener('keydown', (evento) => {
      if (evento.key !== 'Escape' || boton.getAttribute('aria-expanded') !== 'true') return;
      const enMenu = evento.target === boton || nav.contains(evento.target) || evento.target === document.body;
      if (!enMenu) return;
      abrir(false);
      boton.focus();
    });
  }

  /* Temario */

  function prepararTemas(filas) {
    const validas = filas
      .map((f) => ({ ...f, materia: normalizarMateria(f.materia), anio: normalizarAnio(f['año']) }))
      .filter((f) => MATERIAS.includes(f.materia) && ANIOS.includes(f.anio) && f.tema);
    if (validas.length < filas.length) {
      const ignoradas = filas.length - validas.length;
      console.warn(`data/temario.csv: ${plural(ignoradas, 'fila ignorada', 'filas ignoradas')} (materia, año o tema no reconocidos)`);
    }
    return validas
      .map((f) => ({
        orden: Number(f.orden),
        tema: f.tema,
        materia: f.materia,
        anio: f.anio,
        eje: f.eje,
        para: f.para_que_sirve,
        video: f.link_video,
        short: f.link_short,
        busqueda: normalizar([f.tema, `eje ${f.eje}`, f.para_que_sirve, f.materia, `${f.anio} año`].join(' ')),
      }))
      .sort((a, b) => ANIOS.indexOf(a.anio) - ANIOS.indexOf(b.anio)
        || MATERIAS.indexOf(a.materia) - MATERIAS.indexOf(b.materia)
        || a.orden - b.orden);
  }

  function tarjetaTema(t) {
    const acciones = [];
    if (esLink(t.video)) {
      acciones.push(crear('a', { clase: 'boton boton--chico', href: t.video, 'aria-label': `Ver clase: ${t.tema}`, texto: 'Ver clase' }));
    }
    if (esLink(t.short)) {
      acciones.push(crear('a', { clase: 'boton boton--chico boton--claro', href: t.short, 'aria-label': `Ver Short: ${t.tema}`, texto: 'Ver Short' }));
    }
    return crear('li', { clase: 'tema', 'data-materia': t.materia, 'data-anio': t.anio },
      crear('h4', { clase: 'tema__titulo', texto: t.tema }),
      crear('ul', { clase: 'chips', role: 'list', 'aria-label': 'Datos del tema' },
        crear('li', { clase: 'chip chip--materia', texto: t.materia }),
        crear('li', { clase: 'chip', texto: `${t.anio} año` }),
        t.eje ? crear('li', { clase: 'chip', texto: `Eje: ${t.eje}` }) : null),
      t.para ? crear('p', { clase: 'tema__para' }, crear('strong', { texto: 'Para qué sirve: ' }), t.para) : null,
      acciones.length ? crear('div', { clase: 'tema__acciones' }, acciones) : null);
  }

  const chevron = () => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'anio__chevron');
    svg.setAttribute('width', '20');
    svg.setAttribute('height', '20');
    svg.setAttribute('viewBox', '0 0 20 20');
    svg.setAttribute('aria-hidden', 'true');
    const camino = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    camino.setAttribute('d', 'M5 7.5l5 5 5-5');
    camino.setAttribute('fill', 'none');
    camino.setAttribute('stroke', 'currentColor');
    camino.setAttribute('stroke-width', '2');
    camino.setAttribute('stroke-linecap', 'round');
    camino.setAttribute('stroke-linejoin', 'round');
    svg.append(camino);
    return svg;
  };

  function iniciarTemario(temas) {
    if (!temas.length) throw new Error('data/temario.csv no tiene temas válidos');
    const form = document.getElementById('filtros');
    const buscador = document.getElementById('buscar');
    const lista = document.getElementById('lista-temario');
    const contador = document.getElementById('contador');
    const titulo = document.getElementById('resultado-titulo');

    for (const span of document.querySelectorAll('.materia__cuenta')) {
      const materia = span.dataset.cuenta;
      const n = temas.filter((t) => !materia || t.materia === materia).length;
      span.textContent = plural(n, 'tema', 'temas');
    }

    const valor = (nombre) => (form.querySelector(`input[name="${nombre}"]:checked`) || {}).value || '';

    function guardarEnURL(materia, anio) {
      const nuevos = new URLSearchParams();
      if (materia) nuevos.set('materia', normalizar(materia));
      if (anio) nuevos.set('anio', anio.replace('º', ''));
      if (buscador.value.trim()) nuevos.set('q', buscador.value.trim());
      const query = nuevos.toString();
      try {
        history.replaceState(null, '', `${location.pathname}${query ? `?${query}#temario` : location.hash}`);
      } catch (error) {
        // Safari limita las llamadas seguidas: la URL puede quedar atrasada, la lista no.
      }
    }

    function dibujar() {
      const materia = valor('materia');
      const anio = valor('anio');
      const consulta = normalizar(buscador.value);
      const palabras = consulta ? consulta.split(' ') : [];
      const visibles = temas.filter((t) => (!materia || t.materia === materia)
        && (!anio || t.anio === anio)
        && palabras.every((p) => t.busqueda.includes(p)));

      titulo.textContent = materia ? `Temario de ${materia}` : 'Todo el temario';
      const filtrado = Boolean(materia || anio || palabras.length);
      const cuenta = filtrado
        ? `${plural(visibles.length, 'tema', 'temas')} de ${temas.length}`
        : plural(temas.length, 'tema', 'temas');
      // Solo si cambia: así el lector de pantalla no repite el mismo número.
      if (contador.textContent !== cuenta) contador.textContent = cuenta;

      if (!visibles.length) {
        const limpiar = crear('button', { clase: 'boton boton--claro', type: 'button', texto: 'Limpiar filtros' });
        limpiar.addEventListener('click', () => {
          form.reset();
          dibujar();
          buscador.focus();
        });
        lista.replaceChildren(crear('div', { clase: 'vacio' },
          crear('p', { texto: 'No hay temas que coincidan con esa materia, ese año o esa búsqueda.' }),
          limpiar));
        guardarEnURL(materia, anio);
        return;
      }

      const grupos = ANIOS.map((a) => [a, visibles.filter((t) => t.anio === a)]).filter(([, ts]) => ts.length);
      const abrirTodos = Boolean(anio || palabras.length) || grupos.length === 1;
      const abrirPrimero = window.matchMedia('(min-width: 1024px)').matches;
      lista.replaceChildren(...grupos.map(([a, ts], indice) => {
        const nota = a === '6º' && ts.some((t) => t.materia === 'Matemática')
          ? crear('p', { clase: 'anio__nota', texto: NOTA_6_MATEMATICA })
          : null;
        return crear('details', { clase: 'anio', open: abrirTodos || (abrirPrimero && indice === 0) },
          crear('summary', {},
            crear('span', { clase: 'anio__nombre', texto: `${a} año` }),
            crear('span', { clase: 'anio__cuenta', texto: plural(ts.length, 'tema', 'temas') }),
            chevron()),
          crear('div', { clase: 'anio__cuerpo' },
            nota,
            crear('ul', { clase: 'temas', role: 'list' }, ts.map(tarjetaTema))));
      }));
      guardarEnURL(materia, anio);
    }

    let espera;
    form.addEventListener('change', (evento) => {
      if (evento.target.name === 'materia' || evento.target.name === 'anio') dibujar();
    });
    buscador.addEventListener('input', () => {
      clearTimeout(espera);
      espera = setTimeout(dibujar, 250);
    });
    dibujar();
  }

  /* Libros */

  function formatearAnios(texto) {
    const anios = separarAnios(texto).sort((a, b) => ANIOS.indexOf(a) - ANIOS.indexOf(b));
    if (!anios.length) return '';
    const indices = anios.map((a) => ANIOS.indexOf(a));
    const seguidos = indices.every((n, j) => j === 0 || n === indices[j - 1] + 1);
    if (anios.length === 1) return `${anios[0]} año`;
    if (anios.length === 2) return `${anios[0]} y ${anios[1]} año`;
    if (seguidos) return `${anios[0]} a ${anios[anios.length - 1]} año`;
    return `${anios.slice(0, -1).join(', ')} y ${anios[anios.length - 1]} año`;
  }

  function listarAnios(anios) {
    if (anios.length === 1) return anios[0];
    return `${anios.slice(0, -1).join(', ')} y ${anios[anios.length - 1]}`;
  }

  function dibujarLibros(filas) {
    const contenedor = document.getElementById('lista-libros');
    const grupos = MATERIAS.map((materia) => {
      const libros = filas.filter((f) => normalizarMateria(f.materia) === materia && f['título']);
      if (!libros.length) return null;
      const cubiertos = new Set(libros.flatMap((l) => separarAnios(l['año'])));
      const faltan = ANIOS.filter((a) => !cubiertos.has(a));
      return crear('div', { clase: 'libros__grupo' },
        crear('h3', { texto: materia }),
        crear('ul', { clase: 'grilla grilla--libros', role: 'list' }, libros.map((l) => {
          const autoria = [l.autor, l.editorial].filter(Boolean).join(' · ');
          const anios = formatearAnios(l['año']);
          return crear('li', { clase: 'tarjeta libro' },
            crear('h4', { texto: l['título'] }),
            autoria ? crear('p', { clase: 'libro__autor', texto: autoria }) : null,
            anios ? crear('ul', { clase: 'chips', role: 'list', 'aria-label': 'Años' }, crear('li', { clase: 'chip', texto: anios })) : null,
            l.nota ? crear('p', { clase: 'libro__nota', texto: l.nota }) : null);
        })),
        faltan.length
          ? crear('p', { clase: 'libros__aviso', texto: `Para ${listarAnios(faltan)} año de ${materia} no hay libro recomendado.` })
          : null);
    }).filter(Boolean);
    contenedor.replaceChildren(...grupos);
  }

  /* Arranque */

  iniciarMenu();

  // Los filtros de la URL (?materia=fisica&anio=2&q=newton) se aplican enseguida, antes de que se pueda tocar el formulario.
  (() => {
    const form = document.getElementById('filtros');
    const params = new URLSearchParams(location.search);
    const marcar = (nombre, v) => {
      const opcion = [...form.querySelectorAll(`input[name="${nombre}"]`)].find((i) => i.value === v);
      if (opcion) opcion.checked = true;
    };
    marcar('materia', MATERIAS.find((m) => normalizar(m) === normalizar(params.get('materia') || '')) || '');
    marcar('anio', ANIOS.find((a) => a === `${params.get('anio')}º`) || '');
    document.getElementById('buscar').value = (params.get('q') || '').slice(0, 100);
    form.addEventListener('submit', (evento) => evento.preventDefault());
  })();

  // Al recargar o volver atrás, el navegador restaura el scroll antes de que se dibuje el temario y lo recorta.
  // Se guarda la posición al salir y se restaura cuando todo está dibujado.
  const navegacion = performance.getEntriesByType('navigation')[0];
  const tipoNavegacion = (navegacion && navegacion.type) || 'navigate';
  let yGuardado = null;
  try {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    const guardado = JSON.parse(sessionStorage.getItem('loiaAcademy:scroll') || 'null');
    if (tipoNavegacion !== 'navigate' && guardado && guardado.url === location.href) yGuardado = guardado.y;
  } catch (error) {
    // Sin sessionStorage: queda el comportamiento del navegador.
  }
  addEventListener('pagehide', () => {
    try {
      sessionStorage.setItem('loiaAcademy:scroll', JSON.stringify({ url: location.href, y: Math.round(scrollY) }));
    } catch (error) {
      // Sin sessionStorage.
    }
  });

  // Si la persona ya se movió, no la llevamos a ningún lado.
  let semovio = false;
  for (const tipo of ['wheel', 'touchstart', 'keydown', 'mousedown']) {
    addEventListener(tipo, () => { semovio = true; }, { once: true, passive: true });
  }

  const temarioListo = cargarCSV('data/temario.csv')
    .then((filas) => iniciarTemario(prepararTemas(filas)))
    .catch(() => {
      document.getElementById('temario').classList.add('temario--sin-datos');
      mostrarError(document.getElementById('lista-temario'), 'el temario', 'data/temario.csv');
    });

  const librosListo = cargarCSV('data/libros.csv')
    .then(dibujarLibros)
    .catch(() => mostrarError(document.getElementById('lista-libros'), 'la lista de libros', 'data/libros.csv'));

  // El navegador salta al ancla (#libros) antes de que se dibujen el temario y los libros, que la empujan
  // hacia abajo. Cuando terminan, se vuelve al ancla. Un link con filtros y sin ancla lleva al temario.
  Promise.allSettled([temarioListo, librosListo]).then(() => {
    if (semovio) return;
    if (yGuardado !== null) {
      scrollTo({ top: yGuardado, behavior: 'instant' });
      return;
    }
    let id = location.hash.slice(1);
    try {
      id = decodeURIComponent(id);
    } catch (error) {
      id = '';
    }
    const destino = (id && document.getElementById(id))
      || (location.search && tipoNavegacion === 'navigate' && document.getElementById('temario'));
    if (destino) destino.scrollIntoView({ behavior: 'instant', block: 'start' });
  }).finally(() => {
    // Desde acá, el scroll suave de los links internos y la restauración normal del navegador.
    document.documentElement.classList.add('listo');
    try {
      if ('scrollRestoration' in history) history.scrollRestoration = 'auto';
    } catch (error) {
      // Nada que hacer.
    }
  });

  // Para las pruebas: el parser y la normalización, sin tocar la página.
  window.loiaAcademy = { parsearCSV, normalizar, formatearAnios };
})();
