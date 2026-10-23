import { useState } from 'react';
import TablaPersonas from './TablaPersonas';

function EdificioItem({ id, nombre, personas, abierto, onToggle }) {
  const dentro = personas.filter((p) => p.estado === 'Dentro').length;

  return (
    <div className="accordion-item mb-2 border rounded overflow-hidden">
      <h2 className="accordion-header">
        <button
          type="button"
          className={`accordion-button fw-bold d-flex justify-content-between align-items-center${abierto ? '' : ' collapsed'}`}
          aria-expanded={abierto}
          aria-controls={`collapse${id}`}
          onClick={() => onToggle(id)}
        >
          <span className="me-auto">{id} - {nombre}</span>
          <small className="badge-contador me-3" id={`contador-${id}`}>{dentro} dentro</small>
        </button>
      </h2>
      <div id={`collapse${id}`} className={`accordion-collapse collapse${abierto ? ' show' : ''}`}>
        <div className="accordion-body p-0">
          <div className="table-responsive" id={`tbody-${id}`}>
            <TablaPersonas personas={personas} />
          </div>
        </div>
      </div>
    </div>
  );
}

function PanelEdificios({ edificios, datos}){
  const [idAbierto, setIdAbierto] = useState(edificios[0]?.id ?? null);
const alternar = (id) => setIdAbierto((actual) => (actual === id ? null : id));
  return (
    <div className="accordion" id="panelEdificios">
      {edificios.map((ed) => (
        <EdificioItem
          key={ed.id} id ={ed.id} nombre={ed.nombre}
          personas={datos[ed.id]??[]}
          abierto={idAbierto === ed.id} onToggle={alternar}
        />
      ))}
    </div>
  )
}

export default PanelEdificios