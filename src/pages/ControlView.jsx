import { useState } from 'react';
import FormularioMovimiento from '../components/edificio/FormularioMovimiento';
import PanelEdificios from '../components/edificio/PanelEdificios';
import { EDIFICIOS, obtenerDatos, registrarMovimiento as registrarEnBD } from '../data/edificiosData';
import '../styles/control.css';

function ControlView() {
  const [datos, setDatos] = useState(obtenerDatos);
  const [idAbierto, setIdAbierto] = useState(EDIFICIOS[0].id);
  const [mensaje, setMensaje] = useState(null);

  const handleRegistrar = ({ nombre, rut, idEdificio, tipo }) => {
    const esEntrada = tipo.startsWith('Entrada');
    const estado = esEntrada ? 'Dentro' : 'Fuera';
    const hora = new Date().toLocaleTimeString('es-CL', {
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h23',
    });

    try {
      registrarEnBD(idEdificio, { nombre, rut, estado, hora });
      setDatos(obtenerDatos());
      setIdAbierto(idEdificio);
      setMensaje({ texto: `${nombre}: ${esEntrada ? 'entrada' : 'salida'} registrada.`, tipo: 'success' });
    } catch (error) {
      setMensaje({ texto: error.message, tipo: 'danger' });
    }
  };

  const personas = Object.values(datos).flat();
  const totalDentro = personas.filter((p) => p.estado === 'Dentro').length;

  return (
    <main className="container mt-4 mb-5">
      <div className="control-header-banner shadow-sm d-flex justify-content-between align-items-center flex-wrap gap-3">
        <div>
          <h2 className="h3 fw-bold mb-1">Panel de Control de Entradas y Salidas</h2>
          <p className="mb-0 text-white-50">Estado actual de accesos por edificio.</p>
        </div>
        <div className="d-flex gap-3">
          <div className="bg-white text-dark rounded px-3 py-2 text-center shadow-sm">
            <span className="d-block small text-muted fw-bold">DENTRO</span>
            <span className="fs-5 fw-bold text-success">{totalDentro}</span>
          </div>
          <div className="bg-white text-dark rounded px-3 py-2 text-center shadow-sm">
            <span className="d-block small text-muted fw-bold">PERSONAS</span>
            <span className="fs-5 fw-bold text-primary">{personas.length}</span>
          </div>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-lg-4">
          <FormularioMovimiento edificios={EDIFICIOS} onRegistrar={handleRegistrar} />
        </div>

        <div className="col-lg-8">
          {mensaje && (
            <div className={`alert alert-${mensaje.tipo}`} role="alert">
              {mensaje.texto}
            </div>
          )}
          <div className="card card-control p-4 shadow-sm">
            <h3 className="h5 fw-bold mb-3 text-dark border-bottom pb-2">Ocupación por edificios</h3>
            <PanelEdificios
              edificios={EDIFICIOS}
              datos={datos}
              idAbierto={idAbierto}
              onToggle={(id) => setIdAbierto((actual) => (actual === id ? null : id))}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

export default ControlView;