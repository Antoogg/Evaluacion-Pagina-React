function FilaPersona({ persona }) {
  const dentro = persona.estado === 'Dentro';
  return (
    <tr>
      <td>{persona.nombre}</td>
      <td>{persona.rut}</td>
      <td>
        <span className={dentro ? 'badge-status-dentro' : 'badge-status-fuera'}>{persona.estado}</span>
      </td>
      <td>{persona.hora}</td>
      <td>
        {persona.visitante
          ? <span className="badge text-bg-warning">Sí</span>
          : <span className="badge text-bg-info">No</span>}
      </td>
    </tr>
  );
}

function TablaPersonas({ personas = [] }) {
  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle mb-0 tabla-control">
        <thead className="table-dark">
          <tr><th>Nombre</th><th>RUT</th><th>Estado</th><th>Hora</th><th>¿Es visitante?</th></tr>
        </thead>
        <tbody>
          {personas.length === 0 ? (
            <tr><td colSpan={5} className="text-center text-muted">Sin registros de personas</td></tr>) : (
            personas.map((p) => <FilaPersona key={p.rut} persona={p} />)
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TablaPersonas;