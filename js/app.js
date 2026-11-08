/* loiaAcademy · arma el temario y los libros desde data/, con filtros y búsqueda.
   Sin frameworks ni paso de build: se sirve tal cual en GitHub Pages. */
(() => {
  'use strict';

  const MATERIAS = ['Matemática', 'Física'];
  const REPO = 'https://github.com/LoiaconoBruno/loiaAcademy/blob/main/';

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

  // Minúsculas y sin tildes (se quitan las marcas que deja NFD).
  function normalizar(texto) {
    return String(texto).normalize('NFD').replace(/\p{M}/gu, '').toLowerCase().replace(/\s+/g, ' ').trim();
  }

  // «Cálculo 1» → «calculo-1», para la URL.
  function aSlug(texto) {
    return normalizar(texto).replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  }

  // «¿Física 1?» → ['fisica', '1'], para buscar por palabras.
  function aPalabras(texto) {
    return normalizar(texto).split(/[^a-z0-9]+/).filter(Boolean);
  }

  // Un número tiene que ser igual («1» no trae «100%»); una palabra, el comienzo de otra («parab» trae «parábola»).
  function coincide(buscada, palabra) {
    return /^\d+$/.test(buscada) ? palabra === buscada : palabra.startsWith(buscada);
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

  // Los cursos salen del CSV, en el orden en que aparecen (Precálculo, Cálculo 1… y después los de Física).
  function prepararTemas(filas) {
    const validas = filas
      .map((f) => ({ ...f, materia: normalizarMateria(f.materia), curso: (f.curso || '').trim() }))
      .filter((f) => MATERIAS.includes(f.materia) && f.curso && f.tema);
    if (validas.length < filas.length) {
      const ignoradas = filas.length - validas.length;
      console.warn(`data/temario.csv: ${plural(ignoradas, 'fila ignorada', 'filas ignoradas')} (materia, curso o tema no reconocidos)`);
    }
    const cursos = [];
    for (const f of validas) {
      if (!cursos.some((c) => c.nombre === f.curso)) cursos.push({ nombre: f.curso, materia: f.materia, slug: aSlug(f.curso) });
    }
    const posicion = (nombre) => cursos.findIndex((c) => c.nombre === nombre);
    const temas = validas
      .map((f) => ({
        orden: Number(f.orden),
        tema: f.tema,
        materia: f.materia,
        curso: f.curso,
        eje: f.eje,
        para: f.para_que_sirve,
        video: f.link_video,
        short: f.link_short,
        palabras: aPalabras([f.tema, `eje ${f.eje}`, f.para_que_sirve, f.materia, f.curso].join(' ')),
      }))
      .sort((a, b) => posicion(a.curso) - posicion(b.curso) || a.orden - b.orden);
    return { temas, cursos };
  }

  function tarjetaTema(t) {
    const acciones = [];
    if (esLink(t.video)) {
      acciones.push(crear('a', { clase: 'boton boton--chico', href: t.video, 'aria-label': `Ver clase: ${t.tema}`, texto: 'Ver clase' }));
    }
    if (esLink(t.short)) {
      acciones.push(crear('a', { clase: 'boton boton--chico boton--claro', href: t.short, 'aria-label': `Ver Short: ${t.tema}`, texto: 'Ver Short' }));
    }
    return crear('li', { clase: 'tema', 'data-materia': t.materia, 'data-curso': t.curso },
      crear('h4', { clase: 'tema__titulo', texto: t.tema }),
      crear('ul', { clase: 'chips', role: 'list', 'aria-label': 'Datos del tema' },
        crear('li', { clase: 'chip chip--materia', texto: t.materia }),
        crear('li', { clase: 'chip', texto: t.curso }),
        t.eje ? crear('li', { clase: 'chip', texto: `Eje: ${t.eje}` }) : null),
      t.para ? crear('p', { clase: 'tema__para' }, crear('strong', { texto: 'Para qué sirve: ' }), t.para) : null,
      acciones.length ? crear('div', { clase: 'tema__acciones' }, acciones) : null);
  }

  const chevron = () => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'grupo__chevron');
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

  function iniciarTemario({ temas, cursos }, abiertosAlCargar = []) {
    if (!temas.length) throw new Error('data/temario.csv no tiene temas válidos');
    const form = document.getElementById('filtros');
    const buscador = document.getElementById('buscar');
    const lista = document.getElementById('lista-temario');
    const contador = document.getElementById('contador');
    const titulo = document.getElementById('resultado-titulo');
    const pildorasCurso = document.getElementById('cursos');

    // Las cifras del inicio salen del CSV, así no quedan desactualizadas.
    for (const cifra of document.querySelectorAll('[data-cifra="temas"]')) cifra.textContent = temas.length;
    for (const cifra of document.querySelectorAll('[data-cifra="cursos"]')) cifra.textContent = cursos.length;

    for (const span of document.querySelectorAll('.materia__cuenta')) {
      const materia = span.dataset.cuenta;
      const n = temas.filter((t) => !materia || t.materia === materia).length;
      span.textContent = plural(n, 'tema', 'temas');
    }

    // Una píldora por curso, en el orden del CSV.
    pildorasCurso.append(...cursos.map((c) => crear('span', { clase: 'pildora', 'data-materia': c.materia },
      crear('input', { type: 'radio', name: 'curso', id: `curso-${c.slug}`, value: c.nombre }),
      crear('label', { for: `curso-${c.slug}`, texto: c.nombre }))));
    const cursoDeURL = cursos.find((c) => c.slug === aSlug(new URLSearchParams(location.search).get('curso') || ''));
    if (cursoDeURL && valor('curso') === '') document.getElementById(`curso-${cursoDeURL.slug}`).checked = true;

    function valor(nombre) {
      return (form.querySelector(`input[name="${nombre}"]:checked`) || {}).value || '';
    }

    // Con una materia elegida, solo se ofrecen sus cursos.
    function ajustarCursos() {
      const materia = valor('materia');
      for (const pildora of pildorasCurso.querySelectorAll('.pildora[data-materia]')) {
        const oculta = Boolean(materia) && pildora.dataset.materia !== materia;
        pildora.hidden = oculta;
        const opcion = pildora.querySelector('input');
        if (oculta && opcion.checked) document.getElementById('curso-todos').checked = true;
      }
    }

    // La consulta que la página escribió por última vez. Un ancla del menú también dispara popstate,
    // pero deja la consulta igual.
    let consultaEnURL = location.search;
    let primeraVez = true;
    function guardarEnURL(materia, curso) {
      const nuevos = new URLSearchParams();
      if (materia) nuevos.set('materia', aSlug(materia));
      if (curso) nuevos.set('curso', aSlug(curso));
      if (buscador.value.trim()) nuevos.set('q', buscador.value.trim());
      const query = nuevos.toString();
      // Al cargar se respeta el ancla del link, aunque traiga parámetros de más (?materia=fisica&fbclid=…#libros).
      // Después, cambiar un filtro lleva al temario.
      const ancla = primeraVez || !query ? location.hash : '#temario';
      primeraVez = false;
      if (location.search === (query ? `?${query}` : '')) return;
      try {
        history.replaceState(null, '', `${location.pathname}${query ? `?${query}` : ''}${ancla}`);
        consultaEnURL = location.search;
      } catch (error) {
        // Safari limita las llamadas seguidas: la URL puede quedar atrasada, la lista no.
      }
    }

    function dibujar() {
      ajustarCursos();
      const materia = valor('materia');
      const curso = valor('curso');
      const palabras = aPalabras(buscador.value);
      const visibles = temas.filter((t) => (!materia || t.materia === materia)
        && (!curso || t.curso === curso)
        && palabras.every((p) => t.palabras.some((w) => coincide(p, w))));

      titulo.textContent = curso || (materia ? `Temario de ${materia}` : 'Todo el temario');
      const filtrado = Boolean(materia || curso || palabras.length);
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
          crear('p', { texto: 'No hay temas que coincidan con esa materia, ese curso o esa búsqueda.' }),
          limpiar));
        guardarEnURL(materia, curso);
        return;
      }

      const grupos = cursos.map((c) => [c, visibles.filter((t) => t.curso === c.nombre)]).filter(([, ts]) => ts.length);
      const abrirTodos = Boolean(curso || palabras.length) || grupos.length === 1;
      const abrirPrimero = window.matchMedia('(min-width: 1024px)').matches;
      const abiertos = abiertosAlCargar;
      abiertosAlCargar = [];
      lista.replaceChildren(...grupos.map(([c, ts], indice) => crear('details', { clase: 'grupo', open: abrirTodos || (abrirPrimero && indice === 0) || abiertos.includes(c.nombre) },
        crear('summary', {},
          crear('span', { clase: 'grupo__nombre', texto: c.nombre }),
          crear('span', { clase: 'grupo__meta' },
            crear('span', { clase: 'grupo__cuenta', texto: plural(ts.length, 'tema', 'temas') }),
            chevron())),
        crear('div', { clase: 'grupo__cuerpo' },
          crear('ul', { clase: 'temas', role: 'list' }, ts.map(tarjetaTema))))));
      guardarEnURL(materia, curso);
    }

    let espera;
    form.addEventListener('change', (evento) => {
      if (evento.target.name === 'materia' || evento.target.name === 'curso') dibujar();
    });
    buscador.addEventListener('input', () => {
      clearTimeout(espera);
      espera = setTimeout(dibujar, 250);
    });
    // Al volver atrás, los filtros vuelven a los de la URL. Si solo cambió el ancla, no se toca nada.
    addEventListener('popstate', () => {
      if (location.search === consultaEnURL) return;
      consultaEnURL = location.search;
      const params = new URLSearchParams(location.search);
      const materia = MATERIAS.find((m) => aSlug(m) === aSlug(params.get('materia') || '')) || '';
      const curso = cursos.find((c) => c.slug === aSlug(params.get('curso') || ''));
      const consulta = (params.get('q') || '').slice(0, 100);
      if (materia === valor('materia') && (curso ? curso.nombre : '') === valor('curso') && consulta === buscador.value.trim()) return;
      clearTimeout(espera);
      form.querySelector(`input[name="materia"][value="${materia}"]`).checked = true;
      document.getElementById(curso ? `curso-${curso.slug}` : 'curso-todos').checked = true;
      buscador.value = consulta;
      dibujar();
    });
    dibujar();
  }

  /* Libros */

  // Cada libro con una tapa dibujada en CSS (decorativa: el título y el autor también están en el texto).
  function dibujarLibros(filas) {
    const contenedor = document.getElementById('lista-libros');
    const libros = MATERIAS.flatMap((materia) => filas
      .filter((f) => normalizarMateria(f.materia) === materia && f['título'])
      .map((f) => ({ ...f, materia })));
    contenedor.replaceChildren(crear('ul', { clase: 'libros__lista', role: 'list' }, libros.map((l, i) =>
      crear('li', { clase: 'libro' },
        crear('div', { clase: 'libro__tapa', 'data-tono': String(i % 7), 'aria-hidden': 'true' },
          l.editorial ? crear('span', { clase: 'libro__tapa-editorial', texto: l.editorial }) : null,
          crear('span', { clase: 'libro__tapa-titulo', texto: l['título'] }),
          l.autor ? crear('span', { clase: 'libro__tapa-autor', texto: l.autor }) : null),
        crear('div', { clase: 'libro__info' },
          crear('p', { clase: 'libro__meta' },
            crear('span', { clase: 'chip chip--materia', texto: l.materia }),
            l.editorial ? crear('span', { clase: 'libro__editorial', texto: l.editorial }) : null),
          crear('h3', { texto: l['título'] }),
          l.autor ? crear('p', { clase: 'libro__autor', texto: l.autor }) : null,
          l.nota ? crear('p', { clase: 'libro__nota', texto: l.nota }) : null)))));
  }

  /* Arranque */

  iniciarMenu();

  // Los filtros de la URL (?materia=fisica&q=newton) se aplican enseguida, antes de que se pueda tocar el formulario.
  // El curso (?curso=fisica-1) se marca cuando el CSV crea sus píldoras.
  (() => {
    const form = document.getElementById('filtros');
    const params = new URLSearchParams(location.search);
    const materia = MATERIAS.find((m) => aSlug(m) === aSlug(params.get('materia') || ''));
    if (materia) form.querySelector(`input[name="materia"][value="${materia}"]`).checked = true;
    document.getElementById('buscar').value = (params.get('q') || '').slice(0, 100);
    form.addEventListener('submit', (evento) => evento.preventDefault());
  })();

  // Al recargar o volver atrás, el navegador restaura el scroll antes de que se dibuje el temario y lo recorta.
  // Se guarda la posición al salir y se restaura cuando todo está dibujado.
  const navegacion = performance.getEntriesByType('navigation')[0];
  const tipoNavegacion = (navegacion && navegacion.type) || 'navigate';
  // También se guardan los cursos abiertos: sin ellos, la misma posición cae en otro lugar.
  let yGuardado = null;
  let abiertosGuardados = [];
  try {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    const guardado = JSON.parse(sessionStorage.getItem('loiaAcademy:scroll') || 'null');
    if (tipoNavegacion !== 'navigate' && guardado && guardado.url === location.href) {
      yGuardado = guardado.y;
      if (Array.isArray(guardado.abiertos)) abiertosGuardados = guardado.abiertos;
    }
  } catch (error) {
    // Sin sessionStorage: queda el comportamiento del navegador.
  }
  addEventListener('pagehide', () => {
    try {
      const abiertos = [...document.querySelectorAll('#lista-temario details[open] .grupo__nombre')].map((n) => n.textContent);
      sessionStorage.setItem('loiaAcademy:scroll', JSON.stringify({ url: location.href, y: Math.round(scrollY), abiertos }));
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
    .then((filas) => iniciarTemario(prepararTemas(filas), abiertosGuardados))
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
  window.loiaAcademy = { parsearCSV, normalizar, aSlug, aPalabras, coincide };
})();
