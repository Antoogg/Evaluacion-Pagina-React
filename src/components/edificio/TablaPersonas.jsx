function FilaPersona({ persona }) {
  const dentro = persona.estado === 'Dentro';
  return (
    <tr>
      <td>{persona.nombre}</td>
      <td>{persona.rut}</td>
      <td>
        <span className={`badge text-bg-${dentro ? 'success' : 'secondary'}`}>{persona.estado}</span>
      </td>
      <td>{persona.hora}</td>
    </tr>
  );
}

function TablaPersonas({ personas = [] }) {
  return (
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
  );
}

export default TablaPersonas;