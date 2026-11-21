/* Prototipo Alianza Cinco — piezas comunes y lógica de cada página */
(function () {
  const C = window.CONFIG, Z = window.ZONAS, P = window.PROPIEDADES;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const params = new URLSearchParams(location.search);

  const ICONO_WA = '<svg viewBox="0 0 32 32" aria-hidden="true"><path fill="currentColor" d="M16.04 3C9.4 3 4 8.36 4 14.98c0 2.32.66 4.5 1.87 6.38L4 29l7.85-1.83A12.1 12.1 0 0 0 16.04 27C22.66 27 28 21.62 28 15S22.66 3 16.04 3Zm0 21.9c-1.9 0-3.7-.52-5.27-1.47l-.38-.22-4.66 1.09 1.11-4.48-.25-.4a9.8 9.8 0 0 1-1.52-5.24c0-5.47 4.47-9.92 9.97-9.92 5.48 0 9.94 4.45 9.94 9.92 0 5.47-4.46 10.72-8.94 10.72Zm5.47-7.43c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15s-.77.97-.94 1.17c-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.47 1.07 2.88 1.22 3.08.15.2 2.1 3.2 5.08 4.49.71.3 1.27.49 1.7.63.72.23 1.37.2 1.88.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z"/></svg>';

  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const zona = (id) => Z.find((z) => z.id === id) || Z[0];
  const centroDe = (p) => p.centro || zona(p.zona).centro;
  const num = (n) => Number(n).toLocaleString("es-MX", { maximumFractionDigits: 2 });
  const ops = (p) => p.precios.map((x) => x.op);
  const precioDe = (p, op) => p.precios.find((x) => x.op === op) || p.precios[0];
  const etiquetaOp = (p) => `${p.tipo} en ${ops(p).join(" y ")}`;
  const precioCorto = (x) => x.texto + (x.op === "renta" ? " al mes" : "");
  const waLink = (texto) => `https://wa.me/${C.whatsapp}?text=${encodeURIComponent(texto)}`;
  const mensajePropiedad = (p) =>
    `Hola, vi en la página de Alianza Cinco la propiedad ${p.clave} (${p.titulo}, ${precioCorto(p.precios[0])}) y me gustaría más información.`;
  const urlFicha = (p) => `propiedad.html?clave=${encodeURIComponent(p.clave)}`;
  const fotoPortada = (p) => p.mini[0] || p.fotos[0];

  function img(src, alt, extra = "") {
    return `<img src="${esc(src)}" alt="${esc(alt)}" loading="lazy" decoding="async" ${extra}>`;
  }

  function datosCortos(p) {
    const d = [];
    if (p.recamaras) d.push(`${p.recamaras} rec.`);
    if (p.banos) d.push(`${p.banos}${p.medios ? "½" : ""} baños`);
    if (p.construccion) d.push(`${num(p.construccion)} m² const.`);
    if (p.terreno) d.push(`${num(p.terreno)} m² terreno`);
    return d.map((x) => `<span>${x}</span>`).join("");
  }

  function tarjeta(p, op) {
    const x = precioDe(p, op);
    return `<a class="tarjeta" href="${urlFicha(p)}">
      <div class="tarjeta-foto">${img(fotoPortada(p), p.titulo)}<span class="etiqueta">${esc(etiquetaOp(p))}</span>
        <span class="num-fotos">${p.fotos.length} fotos</span></div>
      <div class="tarjeta-cuerpo">
        <span class="tarjeta-clave">${esc(p.clave)}</span>
        <div class="tarjeta-precio">${esc(x.texto)}${x.op === "renta" ? " <small>al mes</small>" : ""}</div>
        <div class="tarjeta-titulo">${esc(p.titulo)}</div>
        <div class="tarjeta-zona">${esc(p.colonia)} · ${esc(p.municipio)}</div>
        <div class="tarjeta-datos">${datosCortos(p)}</div>
      </div></a>`;
  }

  // Foto representativa de una zona: la primera casa con más fotos
  function fotoZona(id) {
    const ps = P.filter((p) => p.zona === id).sort((a, b) =>
      (b.tipoFiltro === "Casa") - (a.tipoFiltro === "Casa") || b.fotos.length - a.fotos.length);
    return ps.length ? ps[0] : null;
  }

  // ---------- Cabecera, pie y WhatsApp flotante ----------
  function piezasComunes() {
    const actual = document.body.dataset.pagina;
    const enlaces = [
      ["propiedades.html", "Propiedades", "propiedades"],
      ["zona.html", "Zonas", "zona"],
      ["cuanto-vale.html", "¿Cuánto vale tu propiedad?", "cuanto-vale"],
      ["nosotros.html", "Quiénes somos", "nosotros"],
    ];
    const saludo = waLink("Hola, vi la página de Alianza Cinco y me gustaría más información.");
    document.body.insertAdjacentHTML("afterbegin", `
      <div class="aviso-prototipo"><strong>Prototipo para revisión.</strong> Las propiedades son las publicadas en EasyBroker; logo y textos son provisionales.</div>
      <header class="cabecera"><div class="contenedor">
        <a class="logo" href="index.html" aria-label="Alianza Cinco, inicio">
          <span class="logo-marca">A5</span>
          <span class="logo-texto">Alianza Cinco<small>Inmobiliaria · Monterrey</small></span>
        </a>
        <button class="boton-menu" aria-label="Abrir menú" aria-expanded="false"><span></span><span></span><span></span></button>
        <nav class="menu">
          ${enlaces.map(([h, t, k]) => `<a href="${h}"${k === actual ? ' aria-current="page"' : ""}>${t}</a>`).join("")}
          <span class="idioma" title="Inglés: segunda etapa">ES · <span style="opacity:.5">EN</span></span>
          <a class="btn btn--wa" href="${saludo}" target="_blank" rel="noopener">${ICONO_WA} WhatsApp</a>
        </nav>
      </div></header>`);

    document.body.insertAdjacentHTML("beforeend", `
      <footer class="pie"><div class="contenedor">
        <div>
          <div class="logo"><span class="logo-marca">A5</span><span class="logo-texto">Alianza Cinco<small>Inmobiliaria · Monterrey</small></span></div>
          <p style="margin-top:16px;opacity:.85">${esc(C.lema)}</p>
        </div>
        <div>
          <h4>Contacto</h4>
          <a href="${saludo}" target="_blank" rel="noopener">WhatsApp ${esc(C.whatsappVisible)}</a>
          <a href="tel:+528115799003">Tel. ${esc(C.telefonoVisible)}</a>
          <a href="#"><span class="pendiente">Correo pendiente</span></a>
          <a href="#"><span class="pendiente">Redes pendientes</span></a>
        </div>
        <div>
          <h4>Explora</h4>
          <a href="propiedades.html?op=venta">Comprar</a>
          <a href="propiedades.html?op=renta">Rentar</a>
          <a href="cuanto-vale.html">Vender o rentar tu propiedad</a>
          <a href="zona.html">Guías de zonas</a>
        </div>
        <div class="pie-legal">© Alianza Cinco Inmobiliaria · <span class="pendiente">Aviso de privacidad pendiente</span></div>
      </div></footer>
      <a class="wa-flotante" href="${saludo}" target="_blank" rel="noopener" aria-label="Escríbenos por WhatsApp">${ICONO_WA}</a>`);

    const boton = $(".boton-menu"), menu = $(".menu");
    boton.addEventListener("click", () => {
      const abierto = menu.classList.toggle("abierto");
      boton.setAttribute("aria-expanded", abierto);
    });
  }

  function opcionesZona(sel, valor) {
    sel.innerHTML = `<option value="">Todas las zonas</option>` +
      Z.map((z) => `<option value="${z.id}"${z.id === valor ? " selected" : ""}>${esc(z.nombre)}</option>`).join("");
  }

  const TIPOS = ["Casa", "Departamento", "Terreno", "Quinta o rancho", "Comercial"];
  function opcionesTipo(sel, valor) {
    sel.innerHTML = `<option value="">Cualquier tipo</option>` +
      TIPOS.map((t) => `<option${t === valor ? " selected" : ""}>${t}</option>`).join("");
  }

  const RANGOS = {
    venta: [["", "Cualquier precio"], ["0-5000000", "Hasta $5 M"], ["5000000-10000000", "$5 M a $10 M"],
      ["10000000-20000000", "$10 M a $20 M"], ["20000000-40000000", "$20 M a $40 M"], ["40000000-", "Más de $40 M"]],
    renta: [["", "Cualquier precio"], ["0-30000", "Hasta $30 mil"], ["30000-60000", "$30 a $60 mil"], ["60000-", "Más de $60 mil"]],
  };
  function opcionesPrecio(sel, op, valor) {
    sel.innerHTML = RANGOS[op === "renta" ? "renta" : "venta"]
      .map(([v, t]) => `<option value="${v}"${v === valor ? " selected" : ""}>${t}</option>`).join("");
  }

  // ---------- Mapas (Leaflet) ----------
  function mapaBase(el, centro, zoom) {
    const m = L.map(el, { scrollWheelZoom: false }).setView(centro, zoom);
    const conCalles = /^(localhost|127\.0\.0\.1)$|\.github\.io$/.test(location.hostname);
    if (conCalles) {
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", { attribution: "© OpenStreetMap", maxZoom: 18 }).addTo(m);
    } else {
      m.getContainer().style.background = "#EDE5D6";
      Z.forEach((z) => L.circle(z.centro, { radius: 2600, color: "#7D5C2E", weight: 1, dashArray: "4 4", fillColor: "#fff", fillOpacity: .5, interactive: false })
        .bindTooltip(z.nombre, { permanent: true, direction: "center", className: "etiqueta-zona" }).addTo(m));
      m.attributionControl.setPrefix("Mapa simplificado (vista previa)");
    }
    return m;
  }

  // ---------- Páginas ----------
  const paginas = {
    portada() {
      const form = $("#buscador");
      opcionesZona($("[name=zona]", form));
      opcionesTipo($("[name=tipo]", form));
      const actualizarPrecio = () => opcionesPrecio($("[name=precio]", form), $("[name=op]:checked", form).value);
      $$("[name=op]", form).forEach((r) => r.addEventListener("change", actualizarPrecio));
      actualizarPrecio();

      // Foto de portada provisional: la de una propiedad destacada
      const heroProp = P.find((p) => p.destacada && p.tipoFiltro === "Casa") || P[0];
      $(".hero-fondo").insertAdjacentHTML("afterbegin", `<img class="hero-foto" src="${esc(heroProp.fotos[0])}" alt="">`);

      $("#destacadas").innerHTML = P.filter((p) => p.destacada).slice(0, 6).map((p) => tarjeta(p)).join("");
      $("#zonas").innerHTML = Z.map((z) => {
        const n = P.filter((p) => p.zona === z.id).length, f = fotoZona(z.id);
        return `<a class="zona-tarjeta" href="zona.html?z=${z.id}">${f ? img(fotoPortada(f), z.nombre) : ""}
          <div class="texto"><h3>${esc(z.nombre)}</h3><span>${n} propiedad${n === 1 ? "" : "es"}</span></div></a>`;
      }).join("");
      $("#total-props").textContent = P.length;
    },

    propiedades() {
      const f = $("#filtros");
      const estado = {
        op: params.get("op") || "venta", zona: params.get("zona") || "", tipo: params.get("tipo") || "",
        precio: params.get("precio") || "", rec: params.get("rec") || "",
      };
      $$(`[name=op]`, f).forEach((r) => (r.checked = r.value === estado.op));
      opcionesZona($("[name=zona]", f), estado.zona);
      opcionesTipo($("[name=tipo]", f), estado.tipo);
      opcionesPrecio($("[name=precio]", f), estado.op, estado.precio);
      $("[name=rec]", f).value = estado.rec;

      let mapa, capa;
      function pintar() {
        const lista = P.filter((p) => {
          if (!ops(p).includes(estado.op)) return false;
          if (estado.zona && p.zona !== estado.zona) return false;
          if (estado.tipo && p.tipoFiltro !== estado.tipo) return false;
          if (estado.rec && (p.recamaras || 0) < +estado.rec) return false;
          if (estado.precio) {
            const monto = precioDe(p, estado.op).monto;
            const [min, max] = estado.precio.split("-").map((x) => (x ? +x : null));
            if (min !== null && monto < min) return false;
            if (max !== null && monto > max) return false;
          }
          return true;
        });
        $("#conteo").textContent = `${lista.length} propiedad${lista.length === 1 ? "" : "es"} en ${estado.op}`;
        $("#resultados").innerHTML = lista.length ? `<div class="rejilla">${lista.map((p) => tarjeta(p, estado.op)).join("")}</div>`
          : `<div class="vacio"><h3>No encontramos propiedades con esos filtros</h3><p>Prueba con otra zona o escríbenos y te avisamos cuando llegue algo así.</p>
             <a class="btn btn--wa" target="_blank" rel="noopener" href="${waLink("Hola, busco una propiedad y no la encontré en la página. ¿Me ayudan?")}">${ICONO_WA} Avísame por WhatsApp</a></div>`;
        if (mapa) {
          capa.clearLayers();
          const porLugar = {};
          lista.forEach((p) => { const k = centroDe(p).join(); (porLugar[k] = porLugar[k] || []).push(p); });
          Object.values(porLugar).forEach((grupo) => {
            L.circle(centroDe(grupo[0]), { radius: 2200, color: "#B08A4E", fillColor: "#B08A4E", fillOpacity: .2, weight: 1.5 })
              .bindPopup(`<strong>${esc(zona(grupo[0].zona).nombre)}</strong><br>${grupo.slice(0, 6).map((p) =>
                `<a href="${urlFicha(p)}">${esc(p.titulo)}</a> · ${esc(precioDe(p, estado.op).texto)}`).join("<br>")}${grupo.length > 6 ? `<br>y ${grupo.length - 6} más` : ""}`)
              .addTo(capa);
          });
          if (lista.length) mapa.fitBounds(L.featureGroup(capa.getLayers()).getBounds(), { padding: [40, 40], maxZoom: 12 });
        }
        const q = new URLSearchParams(Object.entries(estado).filter(([, v]) => v));
        try { history.replaceState(null, "", "?" + q); } catch (e) { /* la vista previa puede no permitirlo */ }
      }

      f.addEventListener("change", (e) => {
        const n = e.target.name;
        estado[n] = e.target.value;
        if (n === "op") { estado.precio = ""; opcionesPrecio($("[name=precio]", f), estado.op, ""); }
        pintar();
      });
      $("#limpiar").addEventListener("click", () => {
        Object.assign(estado, { zona: "", tipo: "", precio: "", rec: "" });
        f.reset(); $$(`[name=op]`, f).forEach((r) => (r.checked = r.value === estado.op));
        opcionesPrecio($("[name=precio]", f), estado.op, "");
        pintar();
      });
      $(".boton-filtros").addEventListener("click", () => f.classList.toggle("abierto"));

      $$(".vista button").forEach((b) => b.addEventListener("click", () => {
        $$(".vista button").forEach((x) => x.classList.toggle("activo", x === b));
        const enMapa = b.dataset.vista === "mapa";
        $("#resultados").style.display = enMapa ? "none" : "";
        $("#mapa-listado").style.display = enMapa ? "block" : "none";
        if (enMapa && !mapa) { mapa = mapaBase("mapa-listado", [25.6, -100.3], 9); capa = L.layerGroup().addTo(mapa); pintar(); }
        if (enMapa) setTimeout(() => mapa.invalidateSize(), 50);
      }));
      pintar();
    },

    propiedad() {
      const p = P.find((x) => x.clave === params.get("clave")) || P[0];
      const z = zona(p.zona);
      document.title = `${p.titulo} · Alianza Cinco`;
      $("#miga").textContent = p.titulo;

      // Galería: fotos reales de EasyBroker
      const n = p.fotos.length;
      $("#galeria-pista").innerHTML = p.fotos.map((src, i) =>
        `<div style="background-image:url('${esc(p.mini[i] || src)}')">${img(src, `${p.titulo}, foto ${i + 1} de ${n}`, i === 0 ? 'fetchpriority="high"' : "")}</div>`).join("");
      $("#miniaturas").innerHTML = p.mini.map((src, i) =>
        `<button aria-label="Foto ${i + 1}" class="${i ? "" : "activa"}">${img(src, "")}</button>`).join("");
      const pista = $("#galeria-pista");
      const ir = (i) => pista.scrollTo({ left: i * pista.clientWidth, behavior: "smooth" });
      const actual = () => Math.round(pista.scrollLeft / pista.clientWidth);
      pista.addEventListener("scroll", () => {
        const i = actual();
        $("#contador").textContent = `${i + 1} / ${n}`;
        $$("#miniaturas button").forEach((b, j) => b.classList.toggle("activa", j === i));
        const activa = $$("#miniaturas button")[i];
        if (activa) activa.scrollIntoView({ block: "nearest", inline: "nearest" });
      });
      $(".galeria-flecha.izq").onclick = () => ir(Math.max(0, actual() - 1));
      $(".galeria-flecha.der").onclick = () => ir(Math.min(n - 1, actual() + 1));
      $$("#miniaturas button").forEach((b, i) => (b.onclick = () => ir(i)));
      $("#contador").textContent = `1 / ${n}`;

      // Panel de contacto
      const msgVisita = `Hola, me gustaría agendar una visita a la propiedad ${p.clave} (${p.titulo}).`;
      $("#panel").innerHTML = `
        <span class="etiqueta-op">${esc(etiquetaOp(p))}</span>
        ${p.precios.map((x) => `<div class="panel-precio">${esc(x.texto)}${p.precios.length > 1 || x.op === "renta" ? ` <small>${x.op === "renta" ? "renta al mes" : "venta"}</small>` : ""}</div>`).join("")}
        <div class="panel-clave">Clave: <strong>${esc(p.clave)}</strong></div>
        <a class="btn btn--wa btn--bloque" target="_blank" rel="noopener" href="${waLink(mensajePropiedad(p))}">${ICONO_WA} Preguntar por WhatsApp</a>
        <a class="btn btn--borde btn--bloque" target="_blank" rel="noopener" href="${waLink(msgVisita)}">Agendar visita</a>
        <div class="panel-asesora"><div class="asesora-foto">A5</div>
          <div><small>Te atiende</small><strong>Equipo Alianza Cinco</strong><small><span class="pendiente">¿asesora por propiedad?</span></small></div></div>
        <div class="compartir">¿Se la quieres enseñar a alguien?<br>
          <a target="_blank" rel="noopener" href="https://wa.me/?text=${encodeURIComponent(`${p.titulo} — ${precioCorto(p.precios[0])}\n${location.href}`)}">Mándasela por WhatsApp</a></div>`;
      $("#panel-movil").innerHTML = `
        <a class="btn btn--wa" target="_blank" rel="noopener" href="${waLink(mensajePropiedad(p))}">${ICONO_WA} WhatsApp</a>
        <a class="btn btn--tinta" target="_blank" rel="noopener" href="${waLink(msgVisita)}">Agendar visita</a>`;
      document.body.classList.add("con-panel");

      // Datos
      $("#titulo").textContent = p.titulo;
      $("#ubicacion").textContent = `${p.colonia}, ${p.municipio}`;
      const datos = [
        ["Tipo", p.tipo], ["Recámaras", p.recamaras], ["Baños", p.banos && `${p.banos}${p.medios ? ` y ${p.medios} medio${p.medios > 1 ? "s" : ""}` : ""}`],
        ["Estacionamientos", p.estac], ["Construcción", p.construccion && `${num(p.construccion)} m²`],
        ["Terreno", p.terreno && `${num(p.terreno)} m²`],
      ].filter(([, v]) => v);
      $("#datos").innerHTML = datos.map(([k, v]) => `<div><span>${k}</span><strong>${esc(v)}</strong></div>`).join("");
      $("#descripcion").textContent = p.descripcion;
      if (p.amenidades.length) $("#amenidades").innerHTML = p.amenidades.map((x) => `<li>${esc(x)}</li>`).join("");
      else $("#bloque-amenidades").remove();

      // Mapa aproximado (zona, nunca la dirección)
      const c = centroDe(p);
      const m = mapaBase("mapa-ficha", c, p.zona === "fuera" ? 10 : 12);
      L.circle(c, { radius: 2200, color: "#B08A4E", fillColor: "#B08A4E", fillOpacity: .2, weight: 2 }).addTo(m);

      // Parecidas: misma operación y tipo, misma zona primero, precio parecido
      const op = p.precios[0].op, monto = p.precios[0].monto;
      const parecidas = P.filter((x) => x.clave !== p.clave && ops(x).includes(op) && x.tipoFiltro === p.tipoFiltro)
        .sort((x, y) => (y.zona === p.zona) - (x.zona === p.zona) ||
          Math.abs(precioDe(x, op).monto - monto) - Math.abs(precioDe(y, op).monto - monto))
        .slice(0, 3);
      if (parecidas.length) $("#parecidas").innerHTML = parecidas.map((x) => tarjeta(x, op)).join("");
      else $("#bloque-parecidas").remove();
    },

    zona() {
      const id = params.get("z");
      const contenedor = $("#contenido-zona");
      if (!id) {
        $("#titulo-zonas").hidden = false;
        contenedor.innerHTML = `<div class="contenedor seccion" style="padding-top:8px"><div class="zonas">${Z.map((z) => {
          const f = fotoZona(z.id), n = P.filter((p) => p.zona === z.id).length;
          return `<a class="zona-tarjeta" href="zona.html?z=${z.id}">${f ? img(fotoPortada(f), z.nombre) : ""}<div class="texto"><h3>${esc(z.nombre)}</h3><span>${esc(z.corto)} · ${n}</span></div></a>`;
        }).join("")}</div></div>`;
        return;
      }
      const z = zona(id);
      document.title = `${z.nombre} · Guía de zona · Alianza Cinco`;
      const props = P.filter((p) => p.zona === z.id);
      const colonias = [...new Set(props.map((p) => p.colonia))].sort((a, b) => a.localeCompare(b, "es"));
      const f = fotoZona(z.id);
      contenedor.innerHTML = `
        <section class="zona-hero">${f ? `<img class="zona-hero-foto" src="${esc(f.fotos[0])}" alt="">` : ""}
          <div class="contenedor"><span class="eyebrow" style="color:var(--dorado-claro)">Guía de zona</span>
          <h1>Vivir en ${esc(z.nombre)}</h1><p style="max-width:560px;font-size:1.1rem">${esc(z.corto)}</p></div></section>
        <section class="seccion"><div class="contenedor dos-columnas">
          <div>
            <h2>Cómo es la zona</h2>
            <div class="texto-pendiente"><p><span class="pendiente">Texto pendiente</span></p>
              <p>Aquí va una descripción corta escrita con Alianza: qué tiene la zona (escuelas, plazas, accesos), para quién es ideal y rangos de precio. Es lo que ayuda a que la encuentren en Google.</p></div>
            <h3 style="margin-top:28px">Colonias donde tenemos propiedades</h3>
            <ul class="amenidades">${colonias.map((c) => `<li>${esc(c)}</li>`).join("")}</ul>
            <p style="margin-top:12px"><span class="pendiente">Agrupación de colonias provisional: la confirma Alianza</span></p>
          </div>
          <div><div id="mapa-zona" style="height:340px;border-radius:14px;overflow:hidden"></div></div>
        </div></section>
        <section class="seccion seccion--clara"><div class="contenedor">
          <div class="encabezado-seccion"><div><span class="eyebrow">${props.length} propiedades</span><h2>En ${esc(z.nombre)}</h2></div>
            <a class="btn btn--borde" href="propiedades.html?zona=${z.id}">Ver con filtros</a></div>
          <div class="rejilla">${props.map((p) => tarjeta(p)).join("")}</div>
        </div></section>`;
      const centros = [...new Set(props.map((p) => centroDe(p).join()))].map((k) => k.split(",").map(Number));
      const m = mapaBase("mapa-zona", z.centro, 11);
      const capa = L.featureGroup(centros.map((c) => L.circle(c, { radius: 2500, color: "#B08A4E", fillColor: "#B08A4E", fillOpacity: .15, weight: 2 }))).addTo(m);
      if (centros.length > 1) m.fitBounds(capa.getBounds(), { padding: [30, 30] });
    },

    "cuanto-vale"() {
      opcionesZona($("#cv-zona"));
      $("#cv-zona").options[0].textContent = "Elige la zona";
      $("#form-valor").addEventListener("submit", (e) => {
        e.preventDefault();
        e.target.style.display = "none";
        $("#confirmacion").style.display = "block";
      });
    },

    nosotros() {
      $("#zonas-trabajo").innerHTML = Z.map((z) => `<li><a href="zona.html?z=${z.id}" style="text-decoration:none">${esc(z.nombre)}</a></li>`).join("");
    },
  };

  document.addEventListener("DOMContentLoaded", () => {
    piezasComunes();
    const pg = paginas[document.body.dataset.pagina];
    if (pg) pg();
  });

  window.ALIANZA = { waLink, ICONO_WA };
})();
