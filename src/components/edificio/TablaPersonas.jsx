function FilaPersona({ persona }) {
  const claseEstado = persona.estado === 'Dentro' ? 'dentro' : 'fuera';
  return (
    <tr>
      <td>{persona.nombre}</td>
      <td>{persona.rut}</td>
      <td><strong className={`status ${claseEstado}`}>{persona.estado}</strong></td>
      <td>{persona.hora}</td>
    </tr>
  );
}


function TablaPersonas({ personas = [] }) {
  return (
    <table className="tabla-personas">
      <thead>
        <tr><th>Nombre</th><th>RUT</th><th>Estado</th><th>Hora</th></tr>
      </thead>
      <tbody>
        {personas.length === 0 ? (
          <tr className="fila-vacia"><td colSpan={4}>Sin registros de personas</td></tr>
        ) : (
          personas.map((p) => <FilaPersona key={p.rut} persona={p} />)
        )}
      </tbody>
    </table>
  );
}

export default TablaPersonas;
