import { useState } from 'react';
import FormularioMovimiento from '../components/edificio/FormularioMovimiento';
import PanelEdificios from '../components/edificio/TablaPersonas';
import { EDIFICIOS, obtenerDatos, registrarMovimiento as registrarEnBD } from '../data/edificiosData';

function ControlView() {
  const [datos, setDatos] = useState(obtenerDatos());

  const handleRegistrar = ({ nombre, rut, idEdificio, tipo }) => {
    const esEntrada = tipo.includes('Entrada');
    const estado = esEntrada ? 'Dentro' : 'Fuera';
    const hora = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });

    try {
      registrarEnBD(idEdificio, { nombre, rut, estado, hora });
      setDatos(obtenerDatos());
    } catch (error) {
      console.error(error.message);
    }
  };

  // Métricas rápidas para mejorar la interfaz del panel
  const totalRegistros = Object.values(datos).flat().length;
  const totalDentro = Object.values(datos).flat().filter(p => p.estado === 'Dentro').length;

  return (
    <main className="container mt-4 mb-5">
      {/* Banner Superior */}
      <div className="control-header-banner shadow-sm d-flex justify-content-between align-items-center flex-wrap gap-3">
        <div>
          <h2 className="h3 fw-bold mb-1">Panel de Control de Entradas y Salidas</h2>
          <p className="mb-0 text-white-50">Gestiona accesos e historial en tiempo real por edificio.</p>
        </div>
        <div className="d-flex gap-3">
          <div className="bg-white text-dark rounded px-3 py-2 text-center shadow-sm">
            <span className="d-block small text-muted fw-bold">DENTRO</span>
            <span className="fs-5 fw-bold text-success">{totalDentro}</span>
          </div>
          <div className="bg-white text-dark rounded px-3 py-2 text-center shadow-sm">
            <span className="d-block small text-muted fw-bold">TOTAL REGISTROS</span>
            <span className="fs-5 fw-bold text-primary">{totalRegistros}</span>
          </div>
        </div>
      </div>

      <div className="row g-4">
        {/* Formulario de registro */}
        <div className="col-lg-4">
          <div className="card card-control p-4 shadow-sm">
            <h3 className="h5 fw-bold mb-3 text-dark border-bottom pb-2">Registrar Marcaje</h3>
            <FormularioMovimiento edificios={EDIFICIOS} onRegistrar={handleRegistrar} />
          </div>
        </div>

        {/* Listado y tablas por edificio */}
        <div className="col-lg-8">
          <div className="card card-control p-4 shadow-sm">
            <h3 className="h5 fw-bold mb-3 text-dark border-bottom pb-2">Ocupación por Edificios</h3>
            <PanelEdificios edificios={EDIFICIOS} datos={datos} />
          </div>
        </div>
      </div>
    </main>
  );
}

export default ControlView;