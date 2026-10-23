import { useState } from 'react';
import TablaPersonas from './TablaPersonas';

function EdificioItem({ id, nombre, personas, abierto, onToggle }) {
  const dentro = personas.filter((p) => p.estado === 'Dentro').length;

  return (
    <div className="accordion-item mb-3 border rounded shadow-sm overflow-hidden">
      <h2 className="accordion-header">
        <button
          type="button"
          className={`accordion-button fw-bold d-flex justify-content-between align-items-center ${abierto ? '' : 'collapsed'}`}
          aria-expanded={abierto}
          onClick={() => onToggle(id)}
        >
          <span className="me-auto text-dark">{id} - {nombre}</span>
          <span className={`badge me-3 ${dentro > 0 ? 'bg-success' : 'bg-secondary'}`}>
            {dentro} dentro
          </span>
        </button>
      </h2>
      <div className={`accordion-collapse collapse ${abierto ? 'show' : ''}`}>
        <div className="accordion-body p-0">
          <div className="table-responsive">
            <TablaPersonas personas={personas} />
          </div>
        </div>
      </div>
    </div>
  );
}

<<<<<<< HEAD
function PanelEdificios({ edificios, datos}){
  const [idAbierto, setIdAbierto] = useState(edificios[0]?.id ?? null);
const alternar = (id) => setIdAbierto((actual) => (actual === id ? null : id));
=======
function PanelEdificios({ edificios, datos }) {
  const [idAbierto, setIdAbierto] = useState(edificios[0]?.id ?? null);
  
  const alternar = (id) => setIdAbierto((actual) => (actual === id ? null : id));

>>>>>>> 12f8060be33b04fa33da1fd571bc2964a2aeb35e
  return (
    <div className="accordion" id="panelEdificios">
      {edificios.map((ed) => (
        <EdificioItem
          key={ed.id}
          id={ed.id}
          nombre={ed.nombre}
          personas={datos[ed.id] ?? []}
          abierto={idAbierto === ed.id}
          onToggle={alternar}
        />
      ))}
    </div>
  );
}

export default PanelEdificios;