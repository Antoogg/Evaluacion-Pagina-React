import { useState } from 'react';

export default function ControlView() {
  const [edificios, setEdificios] = useState({
    ED001: [
      { nombre: "Juan Pérez", rut: "223162485", estado: "Dentro", hora: "08:30" },
      { nombre: "María Gómez", rut: "719676767", estado: "Fuera", hora: "12:15" },
      { nombre: "Carlos Silva", rut: "267824045", estado: "Dentro", hora: "09:05" }
    ],
    ED002: [
      { nombre: "Ana Torres", rut: "172520432", estado: "Dentro", hora: "10:00" },
      { nombre: "Pedro Morales", rut: "1765202", estado: "Fuera", hora: "11:40" }
    ],
    ED003: [
      { nombre: "Fernandito Silva", rut: "2103020212", estado: "Dentro", hora: "10:00" },
      { nombre: "Anthony Miles", rut: "22030202", estado: "Fuera", hora: "11:40" }
    ],
    ED004: [
      { nombre: "Hernan Hernan", rut: "281654929", estado: "Dentro", hora: "13:00" },
      { nombre: "Pancho Floo", rut: "216202023", estado: "Fuera", hora: "13:50" }
    ]
  });

  const nombresEdificios = {
    ED001: "ED001 - Torre Central",
    ED002: "ED002 - Edificio Los Condes",
    ED003: "ED003 - Centro Empresarial Sur",
    ED004: "ED004 - Torre Norte"
  };

  const [formulario, setFormulario] = useState({
    nombre: '',
    rut: '',
    edificio: '',
    tipo: 'Entrada'
  });

  const [errores, setErrores] = useState({});

  const handleChange = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
    setErrores({ ...errores, [e.target.name]: '' }); // Limpiar error al escribir
  };

  const registrarMovimiento = (e) => {
    e.preventDefault();
    let nuevosErrores = {};
    let esValido = true;

    if (!formulario.nombre.trim()) {
      nuevosErrores.nombre = 'Tienes que agregar un nombre.';
      esValido = false;
    }

    if (!formulario.rut.trim()) {
      nuevosErrores.rut = 'Tienes que agregar un RUT.';
      esValido = false;
    } else if (formulario.rut.trim().length !== 9) {
      nuevosErrores.rut = 'El RUT debe tener 9 dígitos.';
      esValido = false;
    }

    if (!formulario.edificio) {
      nuevosErrores.edificio = 'Tienes que escoger un edificio.';
      esValido = false;
    }

    if (!esValido) {
      setErrores(nuevosErrores);
      return;
    }

    const esEntrada = formulario.tipo.includes('Entrada');
    const nuevoEstado = esEntrada ? 'Dentro' : 'Fuera';
    const horaFormateada = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });

    setEdificios(prevEdificios => {
      const listaActual = prevEdificios[formulario.edificio];
      const index = listaActual.findIndex(p => p.nombre.toLowerCase() === formulario.nombre.trim().toLowerCase());

      let nuevaLista = [...listaActual];

      if (index >= 0) {
        // Actualizar si ya existe
        nuevaLista[index] = {
          ...nuevaLista[index],
          rut: formulario.rut.trim(),
          estado: nuevoEstado,
          hora: horaFormateada
        };
      } else {
        // Agregar nuevo registro
        nuevaLista.push({
          nombre: formulario.nombre.trim(),
          rut: formulario.rut.trim(),
          estado: nuevoEstado,
          hora: horaFormateada
        });
      }

      return { ...prevEdificios, [formulario.edificio]: nuevaLista };
    });

    // Limpiar formulario
    setFormulario({ nombre: '', rut: '', edificio: formulario.edificio, tipo: 'Entrada' });
  };

  const contarDentro = (idEdificio) => {
    return edificios[idEdificio].filter(p => p.estado === 'Dentro').length;
  };

  return (
    <main className="container mt-4 mb-5">
      <div className="row">
        {/* Panel Izquierdo: Formulario */}
        <div className="col-lg-4 mb-4">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
              <h4 className="mb-0 fs-5">Registrar Movimiento</h4>
            </div>
            <div className="card-body">
              <form onSubmit={registrarMovimiento}>
                <div className="mb-3">
                  <label htmlFor="nombre" className="form-label small fw-bold">Nombre de la persona:</label>
                  <input type="text" className="form-control form-control-sm" name="nombre" value={formulario.nombre} onChange={handleChange} placeholder="Ingresar nombres" />
                  {errores.nombre && <span className="text-danger small">{errores.nombre}</span>}
                </div>

                <div className="mb-3">
                  <label htmlFor="rut" className="form-label small fw-bold">RUT de la persona:</label>
                  <input type="text" className="form-control form-control-sm" name="rut" value={formulario.rut} onChange={handleChange} placeholder="Ej: 123456789" />
                  {errores.rut && <span className="text-danger small">{errores.rut}</span>}
                </div>

                <div className="mb-3">
                  <label htmlFor="edificio" className="form-label small fw-bold">Edificio:</label>
                  <select className="form-select form-select-sm" name="edificio" value={formulario.edificio} onChange={handleChange}>
                    <option value="" disabled>Elige un edificio...</option>
                    {Object.entries(nombresEdificios).map(([id, nombre]) => (
                      <option key={id} value={id}>{nombre}</option>
                    ))}
                  </select>
                  {errores.edificio && <span className="text-danger small">{errores.edificio}</span>}
                </div>

                <div className="mb-4">
                  <label className="form-label small fw-bold d-block">Tipo de movimiento:</label>
                  <div className="btn-group w-100" role="group">
                    <input type="radio" className="btn-check" name="tipo" id="entrada" value="Entrada" checked={formulario.tipo === 'Entrada'} onChange={handleChange} />
                    <label className="btn btn-outline-success btn-sm" htmlFor="entrada">Entrada</label>

                    <input type="radio" className="btn-check" name="tipo" id="salida" value="Salida" checked={formulario.tipo === 'Salida'} onChange={handleChange} />
                    <label className="btn btn-outline-danger btn-sm" htmlFor="salida">Salida</label>
                  </div>
                </div>

                <button type="submit" className="btn btn-primary w-100 fw-bold">Registrar Movimiento</button>
              </form>
            </div>
          </div>
        </div>

        {/* Panel Derecho: Acordeón de Edificios */}
        <div className="col-lg-8">
          <div className="accordion shadow-sm" id="panelEdificios">
            {Object.entries(edificios).map(([id, personas], index) => (
              <div className="accordion-item" key={id}>
                <h2 className="accordion-header">
                  <button className={`accordion-button ${index !== 0 ? 'collapsed' : ''} fw-bold`} type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${id}`}>
                    <span className="me-auto">{nombresEdificios[id]}</span>
                    <span className="badge bg-secondary rounded-pill me-3">{contarDentro(id)} dentro</span>
                  </button>
                </h2>
                <div id={`collapse${id}`} className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`} data-bs-parent="#panelEdificios">
                  <div className="accordion-body p-0">
                    <div className="table-responsive">
                      <table className="table table-hover mb-0 text-center align-middle">
                        <thead className="table-light">
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
                              <td colSpan="4" className="text-muted py-3">Sin registros de personas</td>
                            </tr>
                          ) : (
                            personas.map((p, i) => (
                              <tr key={i}>
                                <td>{p.nombre}</td>
                                <td>{p.rut}</td>
                                <td>
                                  <span className={`badge ${p.estado === 'Dentro' ? 'bg-success' : 'bg-danger'}`}>
                                    {p.estado}
                                  </span>
                                </td>
                                <td>{p.hora}</td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}