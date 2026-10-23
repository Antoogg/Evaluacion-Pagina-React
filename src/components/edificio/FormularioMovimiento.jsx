import { useState } from 'react';
import { validarMovimiento } from '../../utils/validators.js';

const TIPOS = [
  { valor: 'Entrada', etiqueta: 'Entrada', clase: 'btn-entrada' },
  { valor: 'EntradaVisitante', etiqueta: 'Entrada', sub: 'Visitante', clase: 'btn-entrada' },
  { valor: 'Salida', etiqueta: 'Salida', clase: 'btn-salida' },
  { valor: 'SalidaVisitante', etiqueta: 'Salida', sub: 'Visitante', clase: 'btn-salida' },
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
    <div className="movimiento">
      <h2>Registrar Movimiento</h2>
      <form className="datos" onSubmit={manejarEnvio} noValidate>
        <div className="contenedor-registro">
          <label htmlFor="nombre" className="form-label small">Nombre de la persona:</label>
          <input
            type="text" id="nombre" className="form-control form-control-sm"
            placeholder="Ingresar nombres" value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <span className="mensaje-error" id="errorNombre">{errores.nombre}</span>

          <label htmlFor="rut" className="form-label small">RUT de la persona:</label>
          <input
            type="text" id="rut" className="form-control form-control-sm"
            placeholder="Ingresar RUT (sin puntos ni guion)" value={rut}
            onChange={(e) => setRut(e.target.value)}
          />
          <span className="mensaje-error" id="errorRUT">{errores.rut}</span>

          <label htmlFor="selectEdificio">Edificio:</label>
          <select id="selectEdificio" value={idEdificio} onChange={(e) => setIdEdificio(e.target.value)}>
            <option value="" disabled hidden>Elige un edificio...</option>
            {edificios.map((ed) => (
              <option key={ed.id} value={ed.id}>{ed.id} - {ed.nombre}</option>
            ))}
          </select>
          <span className="mensaje-error" id="errorEdificio">{errores.edificio}</span>

          <label>Tipo de movimiento:</label>
          <div className="radioBtn">
            {TIPOS.map((t) => (
              <label key={t.valor} className={`btn-radio ${t.clase}`}>
                <input
                  type="radio" name="tipo_registro" value={t.valor}
                  checked={tipo === t.valor} onChange={() => setTipo(t.valor)}
                />
                <span>
                  {t.etiqueta}
                  {t.sub && (<><br />{t.sub}</>)}
                </span>
              </label>
            ))}
          </div>
        </div>
        <button type="submit" className="btn-registro" id="btn-registro">Registrar Movimiento</button>
      </form>
    </div>
  );
}

export default FormularioMovimiento;
