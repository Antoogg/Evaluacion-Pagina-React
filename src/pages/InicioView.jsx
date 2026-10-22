import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function InicioView() {
  const [hora, setHora] = useState(new Date());

  useEffect(() => {
    const intervalo = setInterval(() => {
      setHora(new Date());
    }, 1000);

    return () => clearInterval(intervalo);
  }, []);

  const formatearHora = (fecha) => {
    const horas = String(fecha.getHours()).padStart(2, "0");
    const minutos = String(fecha.getMinutes()).padStart(2, "0");
    const segundos = String(fecha.getSeconds()).padStart(2, "0");
    return `${horas}:${minutos}:${segundos}`;
  };

  return (
    <main className="container mt-4">
      <section className="text-center bg-light p-5 rounded-3 shadow-sm mb-5">
        <h2 className="display-5 fw-bold">Portal de Control de Acceso</h2>
        <p className="fs-5 fw-semibold" style={{ color: "#2e7d32" }}>
          Sistema Operativo • Servidor en línea
        </p>
        <div className="display-4 font-monospace fw-bold mt-3 text-dark">
          {formatearHora(hora)}
        </div>
      </section>

      <section className="row row-cols-1 row-cols-md-3 g-4">
        <article className="col">
          <div className="card h-100 shadow-sm text-center p-4">
            <h3 className="h5 fw-bold">Control de Entrada-Salida</h3>
            <p className="text-muted">Marcaje en tiempo real para empleados y visitantes.</p>
            <Link to="/control" className="btn btn-primary mt-auto">Ir a Control</Link>
          </div>
        </article>

        <article className="col">
          <div className="card h-100 shadow-sm text-center p-4">
            <h3 className="h5 fw-bold">Creación de Cuentas</h3>
            <p className="text-muted">Registro y edición de perfiles de usuario.</p>
            <Link to="/registro" className="btn btn-primary mt-auto">Crear Cuentas</Link>
          </div>
        </article>

        <article className="col">
          <div className="card h-100 shadow-sm text-center p-4">
            <h3 className="h5 fw-bold">Autenticación</h3>
            <p className="text-muted">Ingreso seguro para guardias y supervisores.</p>
            <Link to="/login" className="btn btn-primary mt-auto">Iniciar Sesión</Link>
          </div>
        </article>
      </section>
    </main>
  );
}