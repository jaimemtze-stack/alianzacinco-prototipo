/*
 * Datos del PROTOTIPO.
 * Todo lo marcado "ejemplo" se reemplaza por el inventario real de EasyBroker en la versión final.
 * Nada de aquí es un dato real de una propiedad de Alianza.
 */
window.CONFIG = {
  // Por confirmar con Alianza: ¿este número (el de Sofía en la demo) o el 81 1579 9003?
  whatsapp: "528134328189",
  whatsappVisible: "81 3432 8189",
  telefonoVisible: "(52) 81 1579 9003",
  lema: "Tu inversión, mi compromiso",
};

// Zonas: lista inicial del BRIEF. Por confirmar con Alianza cómo agrupan sus colonias.
// Las coordenadas son el centro aproximado de cada zona (solo para dibujar el mapa).
window.ZONAS = [
  { id: "carretera-nacional", nombre: "Carretera Nacional", corto: "Zona sur", centro: [25.565, -100.245], tono: 2,
    colonias: ["El Uro", "Laderas", "La Herradura", "Sierra Alta", "El Vergel"] },
  { id: "san-pedro", nombre: "San Pedro", corto: "San Pedro Garza García", centro: [25.655, -100.385], tono: 1,
    colonias: [] },
  { id: "san-jeronimo", nombre: "San Jerónimo", corto: "Poniente de Monterrey", centro: [25.678, -100.365], tono: 3,
    colonias: [] },
  { id: "valle-poniente", nombre: "Valle Poniente", corto: "Poniente", centro: [25.648, -100.445], tono: 4,
    colonias: [] },
  { id: "cumbres", nombre: "Cumbres", corto: "Norponiente", centro: [25.735, -100.405], tono: 5,
    colonias: [] },
  { id: "santa-catarina", nombre: "Santa Catarina", corto: "Poniente", centro: [25.673, -100.47], tono: 6,
    colonias: [] },
  { id: "santiago", nombre: "Santiago", corto: "Quintas y campo", centro: [25.425, -100.15], tono: 2,
    colonias: [] },
];

window.ASESORAS = [
  { id: "ana-isa", nombre: "Ana Isa" },
  { id: "ana-paula", nombre: "Ana Paula" },
];

// Propiedades de EJEMPLO (precios y datos inventados solo para ver el diseño).
window.PROPIEDADES = [
  { clave: "EB-EJEMPLO1", tipo: "Casa", op: "venta", zona: "carretera-nacional", colonia: "El Uro",
    titulo: "Casa de ejemplo con jardín en El Uro", precio: 9800000, recamaras: 4, banos: 4.5, estac: 3,
    construccion: 420, terreno: 380, fotos: 8, tono: 1, asesora: "ana-isa", destacada: true,
    amenidades: ["Jardín", "Terraza", "Cuarto de servicio", "Seguridad 24 h", "Vista a la montaña"] },
  { clave: "EB-EJEMPLO2", tipo: "Departamento", op: "renta", zona: "san-pedro", colonia: "Valle Oriente",
    titulo: "Departamento de ejemplo amueblado", precio: 38000, recamaras: 2, banos: 2, estac: 2,
    construccion: 120, terreno: null, fotos: 10, tono: 4, asesora: "ana-paula", destacada: true,
    amenidades: ["Amueblado", "Gimnasio", "Alberca", "Seguridad 24 h", "Elevador"] },
  { clave: "EB-EJEMPLO3", tipo: "Terreno", op: "venta", zona: "carretera-nacional", colonia: "Sierra Alta",
    titulo: "Terreno de ejemplo con vista", precio: 6500000, recamaras: null, banos: null, estac: null,
    construccion: null, terreno: 600, fotos: 5, tono: 3, asesora: "ana-isa", destacada: true,
    amenidades: ["Fraccionamiento privado", "Vista a la montaña"] },
  { clave: "EB-EJEMPLO4", tipo: "Casa", op: "venta", zona: "san-jeronimo", colonia: "San Jerónimo",
    titulo: "Casa de ejemplo de un piso", precio: 7200000, recamaras: 3, banos: 3, estac: 2,
    construccion: 310, terreno: 300, fotos: 9, tono: 5, asesora: "ana-paula", destacada: true,
    amenidades: ["Jardín", "Cocina integral", "Estudio"] },
  { clave: "EB-EJEMPLO5", tipo: "Casa", op: "renta", zona: "valle-poniente", colonia: "Valle Poniente",
    titulo: "Casa de ejemplo en privada", precio: 55000, recamaras: 3, banos: 3.5, estac: 2,
    construccion: 280, terreno: 220, fotos: 7, tono: 2, asesora: "ana-isa", destacada: true,
    amenidades: ["Privada con caseta", "Roof garden", "Área de juegos"] },
  { clave: "EB-EJEMPLO6", tipo: "Quinta", op: "venta", zona: "santiago", colonia: "Santiago",
    titulo: "Quinta de ejemplo junto al río", precio: 12500000, recamaras: 5, banos: 5, estac: 6,
    construccion: 500, terreno: 3500, fotos: 12, tono: 6, asesora: "ana-paula", destacada: true,
    amenidades: ["Alberca", "Palapa", "Asador", "Árboles frutales", "Cuarto de servicio"] },
  { clave: "EB-EJEMPLO7", tipo: "Departamento", op: "venta", zona: "valle-poniente", colonia: "Valle Poniente",
    titulo: "Departamento de ejemplo con vista", precio: 5400000, recamaras: 2, banos: 2, estac: 2,
    construccion: 110, terreno: null, fotos: 8, tono: 4, asesora: "ana-isa", destacada: false,
    amenidades: ["Alberca", "Gimnasio", "Seguridad 24 h"] },
  { clave: "EB-EJEMPLO8", tipo: "Casa", op: "venta", zona: "cumbres", colonia: "Cumbres",
    titulo: "Casa de ejemplo en Cumbres", precio: 4300000, recamaras: 3, banos: 2.5, estac: 2,
    construccion: 210, terreno: 160, fotos: 6, tono: 3, asesora: "ana-paula", destacada: false,
    amenidades: ["Privada", "Jardín", "Cocina integral"] },
  { clave: "EB-EJEMPLO9", tipo: "Oficina", op: "renta", zona: "san-pedro", colonia: "Del Valle",
    titulo: "Oficina de ejemplo", precio: 27000, recamaras: null, banos: 1, estac: 2,
    construccion: 85, terreno: null, fotos: 5, tono: 5, asesora: "ana-isa", destacada: false,
    amenidades: ["Elevador", "Recepción", "Seguridad 24 h"] },
  { clave: "EB-EJEMPLO10", tipo: "Casa", op: "venta", zona: "santa-catarina", colonia: "Santa Catarina",
    titulo: "Casa de ejemplo en Santa Catarina", precio: 3900000, recamaras: 3, banos: 2.5, estac: 2,
    construccion: 190, terreno: 150, fotos: 6, tono: 6, asesora: "ana-paula", destacada: false,
    amenidades: ["Privada", "Patio", "Cuarto de lavado"] },
];
