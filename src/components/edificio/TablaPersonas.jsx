function FilaPersona({ persona }) {
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
    </tr>
  );
}

function TablaPersonas({ personas = [] }) {
  return (
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
  );
}

export default TablaPersonas;