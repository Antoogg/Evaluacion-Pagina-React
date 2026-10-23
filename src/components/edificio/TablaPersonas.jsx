function FilaPersona({ persona }) {
<<<<<<< HEAD
  const dentro = persona.estado === 'Dentro';
  return (
    <tr>
      <td>{persona.nombre}</td>
      <td>{persona.rut}</td>
      <td>
        <span className={`badge text-bg-${dentro ? 'success' : 'secondary'}`}>{persona.estado}</span>
      </td>
      <td>{persona.hora}</td>
=======
  const esDentro = persona.estado === 'Dentro';
  
  return (
    <tr>
      <td className="fw-semibold text-dark">{persona.nombre}</td>
      <td className="text-secondary">{persona.rut}</td>
      <td>
        <span className={esDentro ? 'badge-status-dentro' : 'badge-status-fuera'}>
          {persona.estado}
        </span>
      </td>
      <td className="text-muted font-monospace">{persona.hora}</td>
>>>>>>> 12f8060be33b04fa33da1fd571bc2964a2aeb35e
    </tr>
  );
}

function TablaPersonas({ personas = [] }) {
  return (
<<<<<<< HEAD
    <div className="table-responsive">
      <table className="table table-striped table-hover align-middle">
        <thead className="table-dark">
          <tr><th>Nombre</th><th>RUT</th><th>Estado</th><th>Hora</th></tr>
        </thead>
        <tbody>
          {personas.length === 0 ? (
            <tr><td colSpan={4} className="text-center text-muted">Sin registros de personas</td></tr>
          ) : (
            personas.map((p) => <FilaPersona key={p.rut} persona={p} />)
          )}
        </tbody>
      </table>
    </div>
=======
    <table className="table table-hover align-middle mb-0 tabla-control">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>RUT</th>
          <th>Estado</th>
          <th>Hora</th>
        </tr>
      </thead>
      <tbody>
        {personas.length === 0 ? (
          <tr>
            <td colSpan={4} className="text-center py-4 text-muted fst-italic">
              Sin registros de personas en este edificio.
            </td>
          </tr>
        ) : (
          personas.map((p) => <FilaPersona key={p.rut} persona={p} />)
        )}
      </tbody>
    </table>
>>>>>>> 12f8060be33b04fa33da1fd571bc2964a2aeb35e
  );
}

export default TablaPersonas;