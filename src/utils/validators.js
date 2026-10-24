export function validarRut(rut) {
  if (typeof rut !== 'string') return false;
  return /^\d{7,8}[\dK]$/.test(normalizarRut(rut));
}

export function validarCorreo(email) {
  if (!email) return false;
  const dominiosPermitidos = ['@duoc.cl', '@profesor.duoc.cl', '@gmail.com'];
  return dominiosPermitidos.some(dominio => email.toLowerCase().endsWith(dominio));
}

export function validarClave(clave) {
  if (!clave) return false;
  return clave.length >= 4 && clave.length <= 10;
}

export function validarMovimiento({ nombre, rut, idEdificio }) {
  const errores = {}

  if (nombre.trim() == '') errores.nombre = 'Tienes que agregar un nombre.';

  const rutLimpio = rut.trim();
  if (rutLimpio == '') {
    errores.rut = 'Tienes que agregar un RUT.';
  } else if (rutLimpio.length !== 9) {
    errores.rut = 'El RUT debe tener 9 caracteres'
  }

  if (!idEdificio) errores.edificio = 'Tienes que escoger un edificio.';

  return errores
}

export const esEntrada = (tipo) => tipo.startsWith('Entrada');
