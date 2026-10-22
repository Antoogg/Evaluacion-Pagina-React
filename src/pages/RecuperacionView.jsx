import { useState } from 'react';
import { Link } from 'react-router-dom';
import FormInput from '../components/FormInput';
import { validarCorreo } from '../utils/validators';

export default function RecuperacionView() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setMensaje('');

    if (!validarCorreo(email)) {
      setError("Correo inválido (use @duoc.cl, @profesor.duoc.cl o @gmail.com)");
      return;
    }

    setMensaje("Se han enviado las instrucciones a tu correo.");
  };

  return (
    <div className="container" style={{ maxWidth: '400px', marginTop: '2rem' }}>
      <h1 className="text-center mb-4">Recuperar Contraseña</h1>

      {mensaje && <div className="alert alert-success">{mensaje}</div>}

      <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
        <FormInput
          label="Correo Electrónico"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={error}
          placeholder="ejemplo@duoc.cl"
        />
        <button type="submit" className="btn btn-primary w-100">
          Enviar Instrucciones
        </button>
      </form>
      <div className="mt-3 text-center">
        <Link to="/login">Volver al inicio de sesión</Link>
      </div>
    </div>
  );
}