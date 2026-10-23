import { useState } from 'react';
import FormularioMovimiento from '../components/edificio/FormularioMovimiento';
import PanelEdificios from '../components/edificio/PanelEdificios';
import { EDIFICIOS, obtenerDatos, registrarMovimiento as registrarEnBD } from '../data/edificiosData';

function ControlView() {
  const [datos, setDatos] = useState(obtenerDatos);
  const [idAbierto, setIdAbierto] = useState(EDIFICIOS[0].id);
  const [mensaje, setMensaje] = useState(null); // { texto, tipo }

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
      setIdAbierto(idEdificio); // abre el acordeón del edificio donde se registró
      setMensaje({ texto: `${nombre}: ${esEntrada ? 'entrada' : 'salida'} registrada.`, tipo: 'success' });
    } catch (error) {
      setMensaje({ texto: error.message, tipo: 'danger' });
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
<<<<<<< HEAD
          {mensaje && (
            <div className={`alert alert-${mensaje.tipo}`} role="alert">
              {mensaje.texto}
            </div>
          )}
          <PanelEdificios
            edificios={EDIFICIOS}
            datos={datos}
            idAbierto={idAbierto}
            onToggle={(id) => setIdAbierto((actual) => (actual === id ? null : id))}
          />
=======
          <div className="card card-control p-4 shadow-sm">
            <h3 className="h5 fw-bold mb-3 text-dark border-bottom pb-2">Ocupación por Edificios</h3>
            <PanelEdificios edificios={EDIFICIOS} datos={datos} />
          </div>
>>>>>>> 12f8060be33b04fa33da1fd571bc2964a2aeb35e
        </div>
      </div>
    </main>
  );
}

export default ControlView;