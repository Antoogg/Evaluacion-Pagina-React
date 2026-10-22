import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import FormInput from '../components/FormInput';
import { login } from '../data/mockData';

export default function LoginView() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [mensaje, setMensaje] = useState({ texto: '', tipo: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMensaje({ texto: '', tipo: '' });

    if (!formData.username.trim() || !formData.password.trim()) {
      setMensaje({ texto: "Por favor, completa todos los campos.", tipo: "error" });
      return;
    }

    const usuarioEncontrado = login(formData.username, formData.password);

    if (usuarioEncontrado) {
      setMensaje({ texto: `¡Bienvenido/a, ${usuarioEncontrado.nombre}! Redirigiendo...`, tipo: "exito" });
      
      setTimeout(() => {
        if (['Administrador', 'Guardia'].includes(usuarioEncontrado.rol)) {
          navigate('/control');
        } else {
          navigate('/');
        }
      }, 1500);
    } else {
      setMensaje({ texto: "RUT/Usuario o contraseña incorrectos.", tipo: "error" });
    }
  };

  return (
    <div className="container" style={{ maxWidth: '400px', marginTop: '2rem' }}>
      <h1 className="text-center mb-4">Inicio de Sesión</h1>

      {mensaje.texto && (
        <div className={`alert ${mensaje.tipo === 'exito' ? 'alert-success' : 'alert-danger'}`} role="alert">
          {mensaje.texto}
        </div>
      )}

      <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
        <FormInput
          label="Usuario o RUT"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="RUT (ej: 223162485) o Usuario"
        />

        <FormInput
          label="Contraseña"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Contraseña"
        />

        <div className="mb-3 text-end">
          <Link to="/recuperar" className="text-decoration-none">¿Olvidaste tu contraseña?</Link>
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Iniciar Sesión
        </button>
      </form>

      <div className="mt-3 text-center">
        ¿No tienes una cuenta? <Link to="/registro">Regístrate</Link>
      </div>
    </div>
  );
}