import TablaPersonas from './TablaPersonas';

function EdificioItem({ id, nombre, personas, abierto, onToggle }) {
  const dentro = personas.filter((p) => p.estado === 'Dentro').length;

  return (
    <div className="accordion-item">
      <h2 className="accordion-header">
        <button
          type="button"
          className={`accordion-button fw-bold${abierto ? '' : ' collapsed'}`}
          aria-expanded={abierto}
          aria-controls={`collapse${id}`}
          onClick={() => onToggle(id)}
        >
          <span className="me-auto">{id} - {nombre}</span>
          <span className="badge text-bg-success me-3">{dentro} dentro</span>
        </button>
      </h2>
      <div id={`collapse${id}`} className={`accordion-collapse collapse${abierto ? ' show' : ''}`}>
        <div className="accordion-body p-0">
          <TablaPersonas personas={personas} />
        </div>
      </div>
    </div>
  );
}

function PanelEdificios({ edificios, datos, idAbierto, onToggle }) {
  return (
    <div className="accordion">
      {edificios.map((ed) => (
        <EdificioItem
          key={ed.id}
          id={ed.id}
          nombre={ed.nombre}
          personas={datos[ed.id] ?? []}
          abierto={idAbierto === ed.id}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
}

export default PanelEdificios;