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

  return (
    <main className="container mt-4 mb-5">
      <div className="row">
        <div className="col-lg-4 mb-4">
          <FormularioMovimiento edificios={EDIFICIOS} onRegistrar={handleRegistrar} />
        </div>

        <div className="col-lg-8">
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
        </div>
      </div>
    </main>
  );
}

export default ControlView;