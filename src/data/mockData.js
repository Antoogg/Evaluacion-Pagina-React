let usuarios = [
  { rut: '223162485', nombre: 'Admin Sistema', email: 'admin@duoc.cl', pass: '1234', rol: 'Administrador' },
  { rut: '719676767', nombre: 'Guardia Seguridad', email: 'guardia@duoc.cl', pass: '1234', rol: 'Guardia' },
  { rut: '267824045', nombre: 'Empleado Ejemplo', email: 'empleado@duoc.cl', pass: '1234', rol: 'Empleado' }
];

let usuarioSesion = null;

export function login(username, password) {
  const encontrado = usuarios.find(u => (u.rut === username || u.email === username) && u.pass === password);
  if (encontrado) {
    usuarioSesion = encontrado;
    return encontrado;
  }
  return null;
}

export function getSesion() {
  return usuarioSesion;
}

export function getUsuarioLogueado() {
  return usuarioSesion;
}

export function logout() {
  usuarioSesion = null;
}

export function crearUsuario(nuevoUsuario) {
  usuarios.push(nuevoUsuario);
  return nuevoUsuario;
}