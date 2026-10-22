import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import FormInput from '../components/FormInput';
import { validarRut, validarCorreo, validarClave } from '../utils/validators';
import { crearUsuario } from '../data/mockData';

export default function RegistroView() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ rut: '', nombre: '', email: '', pass: '' });
  const [errores, setErrores] = useState({});
  const [mensaje, setMensaje] = useState({ texto: '', tipo: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrores({ ...errores, [e.target.name]: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMensaje({ texto: '', tipo: '' });
    const nuevosErrores = {};

    if (!validarRut(formData.rut)) nuevosErrores.rut = "RUT inválido";
    if (!formData.nombre.trim()) nuevosErrores.nombre = "El nombre es obligatorio";
    if (!validarCorreo(formData.email)) nuevosErrores.email = "Correo inválido (use @duoc.cl, @profesor.duoc.cl o @gmail.com)";
    if (!validarClave(formData.pass)) nuevosErrores.pass = "La clave debe tener entre 4 y 10 caracteres";

    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      return;
    }

    crearUsuario({ ...formData, rol: 'Empleado' });
    setMensaje({ texto: "Cuenta creada con éxito. Redirigiendo...", tipo: "exito" });
    
    setTimeout(() => {
      navigate('/login');
    }, 1500);
  };

  return (
    <div className="container" style={{ maxWidth: '500px', marginTop: '2rem' }}>
      <h1 className="text-center mb-4">Crear Cuenta</h1>

      {mensaje.texto && (
        <div className={`alert ${mensaje.tipo === 'exito' ? 'alert-success' : 'alert-danger'}`} role="alert">
          {mensaje.texto}
        </div>
      )}

      <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
        <FormInput
          label="RUT"
          name="rut"
          value={formData.rut}
          onChange={handleChange}
          error={errores.rut}
          placeholder="Ej: 123456789"
        />
        <FormInput
          label="Nombre Completo"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          error={errores.nombre}
          placeholder="Juan Pérez"
        />
        <FormInput
          label="Correo Electrónico"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={errores.email}
          placeholder="ejemplo@duoc.cl"
        />
        <FormInput
          label="Contraseña"
          name="pass"
          type="password"
          value={formData.pass}
          onChange={handleChange}
          error={errores.pass}
          placeholder="Mínimo 4 caracteres"
        />

        <button type="submit" className="btn btn-primary w-100 mt-3">
          Registrarse
        </button>
      </form>
      <div className="mt-3 text-center">
        ¿Ya tienes cuenta? <Link to="/login">Inicia Sesión</Link>
      </div>
    </div>
  );
}