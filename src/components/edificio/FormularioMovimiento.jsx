import { useState } from 'react';
import { validarMovimiento } from '../../utils/validators.js';

const TIPOS = [
  { valor: 'Entrada', etiqueta: 'Entrada', color: 'success' },
  { valor: 'EntradaVisitante', etiqueta: 'Entrada Visitante', color: 'success' },
  { valor: 'Salida', etiqueta: 'Salida', color: 'danger' },
  { valor: 'SalidaVisitante', etiqueta: 'Salida Visitante', color: 'danger' },
];

function FormularioMovimiento({ edificios, onRegistrar }) {
  const [nombre, setNombre] = useState('');
  const [rut, setRut] = useState('');
  const [idEdificio, setIdEdificio] = useState('');
  const [tipo, setTipo] = useState('Entrada');
  const [errores, setErrores] = useState({});

  const manejarEnvio = (e) => {
    e.preventDefault();
    const nuevosErrores = validarMovimiento({ nombre, rut, idEdificio });
    setErrores(nuevosErrores);
    if (Object.keys(nuevosErrores).length > 0) return;

    onRegistrar({ nombre: nombre.trim(), rut: rut.trim(), idEdificio, tipo });
    setNombre('');
    setRut('');
  };

  return (
    <form onSubmit={manejarEnvio} noValidate>
      <div className="mb-3">
        <label htmlFor="nombre" className="form-label fw-bold small">Nombre Completo</label>
        <input
          type="text"
          id="nombre"
          className={`form-control ${errores.nombre ? 'is-invalid' : ''}`}
          placeholder="Ej: Juan Pérez"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        {errores.nombre && <div className="invalid-feedback">{errores.nombre}</div>}
      </div>

      <div className="mb-3">
        <label htmlFor="rut" className="form-label fw-bold small">RUT</label>
        <input
          type="text"
          id="rut"
          className={`form-control ${errores.rut ? 'is-invalid' : ''}`}
          placeholder="Sin puntos ni guion (ej: 123456789)"
          value={rut}
          onChange={(e) => setRut(e.target.value)}
        />
        {errores.rut && <div className="invalid-feedback">{errores.rut}</div>}
      </div>

      <div className="mb-3">
        <label htmlFor="selectEdificio" className="form-label fw-bold small">Edificio</label>
        <select
          id="selectEdificio"
          className={`form-select ${errores.edificio ? 'is-invalid' : ''}`}
          value={idEdificio}
          onChange={(e) => setIdEdificio(e.target.value)}
        >
          <option value="" disabled hidden>Selecciona un edificio...</option>
          {edificios.map((ed) => (
            <option key={ed.id} value={ed.id}>{ed.id} - {ed.nombre}</option>
          ))}
        </select>
        {errores.edificio && <div className="invalid-feedback">{errores.edificio}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label fw-bold small d-block">Tipo de Movimiento</label>
        <div className="row g-2">
          {TIPOS.map((t) => (
            <div className="col-6" key={t.valor}>
              <input
                type="radio"
                className="btn-check"
                name="tipo_registro"
                id={`btn-radio-${t.valor}`}
                value={t.valor}
                checked={tipo === t.valor}
                onChange={() => setTipo(t.valor)}
              />
              <label
                className={`btn btn-outline-${t.color} w-100`}
                htmlFor={`btn-radio-${t.valor}`}
              >
                {t.etiqueta}
              </label>
            </div>
          ))}
        </div>
      </div>

      <button type="submit" className="btn btn-primary w-100 fw-bold mt-2">
        Registrar Movimiento
      </button>
    </form>
  );
}

export default FormularioMovimiento;
