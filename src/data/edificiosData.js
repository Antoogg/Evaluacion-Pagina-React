
export const EDIFICIOS = [
  { id: 'ED001', nombre: 'Torre Central' },
  { id: 'ED002', nombre: 'Edificio Los Condes' },
  { id: 'ED003', nombre: 'Centro Empresarial Sur' },
  { id: 'ED004', nombre: 'Torre Norte' },
];

const DATOS_EDIFICIO = {
  ED001: [
    { nombre: 'Juan Pérez', rut: '223162485', estado: 'Dentro', hora: '08:30' },
    { nombre: 'María Gómez', rut: '719676766', estado: 'Fuera', hora: '12:15' },
    { nombre: 'Carlos Silva', rut: '267824045', estado: 'Dentro', hora: '09:05' },
  ],
  ED002: [
    { nombre: 'Ana Torres', rut: '17252043K', estado: 'Dentro', hora: '10:00' },
    { nombre: 'Pedro Morales', rut: '176520288', estado: 'Fuera', hora: '11:40' },
  ],
  ED003: [
    { nombre: 'Fernandito Silva', rut: '213020218', estado: 'Dentro', hora: '10:00' },
    { nombre: 'Anthony Miles', rut: '212030201', estado: 'Fuera', hora: '11:40' },
  ],
  ED004: [
    { nombre: 'Hernan Hernan', rut: '281654926', estado: 'Dentro', hora: '13:00' },
    { nombre: 'Pancho Floo', rut: '216202023', estado: 'Fuera', hora: '13:50' },
  ],
};

const clonar = (valor) => structuredClone(valor);
let db = clonar(DATOS_EDIFICIO);

function asegurarEdificio(idEdificio) {
  if (!Array.isArray(db[idEdificio])) {
    throw new Error(`El edificio ${idEdificio} no existe`);
  }
}

export const obtenerDatos = () => clonar(db);

export function obtenerPersonas(idEdificio) {
  asegurarEdificio(idEdificio);
  return clonar(db[idEdificio]);
}

export function crearPersona(idEdificio, persona) {
  asegurarEdificio(idEdificio);
  if (db[idEdificio].some((p) => p.rut === persona.rut)) {
    throw new Error(`El RUT ${persona.rut} ya existe en ${idEdificio}`);
  }
  db[idEdificio].push({ ...persona });
  return { ...persona };
}

export function actualizarPersona(idEdificio, rut, cambios) {
  asegurarEdificio(idEdificio);
  const indice = db[idEdificio].findIndex((p) => p.rut === rut);
  if (indice === -1) throw new Error(`No existe la persona con RUT ${rut}`);
  db[idEdificio][indice] = { ...db[idEdificio][indice], ...cambios };
  return { ...db[idEdificio][indice] };
}

export function eliminarPersona(idEdificio, rut) {
  asegurarEdificio(idEdificio);
  const antes = db[idEdificio].length;
  db[idEdificio] = db[idEdificio].filter((p) => p.rut !== rut);
  return db[idEdificio].length < antes;
}

export function registrarMovimiento(idEdificio, { nombre, rut, estado, hora }) {
  asegurarEdificio(idEdificio);
  const existe = db[idEdificio].some((p) => p.rut === rut);
  return existe
    ? actualizarPersona(idEdificio, rut, { nombre, estado, hora })
    : crearPersona(idEdificio, { nombre, rut, estado, hora });
}

export function reiniciarDatos() {
  db = clonar(DATOS_EDIFICIO);
}
