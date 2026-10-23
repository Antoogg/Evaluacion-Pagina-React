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

  return (
    <main className="container mt-4 mb-5">
      <div className="row">
        <div className="col-lg-4 mb-4">
          <FormularioMovimiento edificios={EDIFICIOS} onRegistrar={handleRegistrar} />
        </div>

        <div className="col-lg-8">
          <PanelEdificios edificios={EDIFICIOS} datos={datos} />
        </div>
      </div>
    </main>
  );
}

export default ControlView;