import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';

const ENLACES = [
  { texto: 'Inicio', href: "/" },
  { texto: 'Control Entradas-Salidas', href: "/control" },
  { texto: 'Iniciar Sesión', href: "/login" },
  { texto: 'Crear Cuenta', href: "/registro" },
];

function Header({ enlaces = ENLACES }) {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const cerrarMenu = () => setMenuAbierto
  return (
    <header className="encabezado-principal">
      <div className="header-container-top">
        <div className="contenedor-logo">
          <Link to="/" className="enlace-logo">
            <h1 className="titulo-empresa">Acceso Seguro</h1>
            <span className="subtitulo-empresa">Soluciones de control de acceso y asistencia</span>
          </Link>
        </div>
        <button
          className="menu-toggle"
          onClick={() => setMenuAbierto(!menuAbierto)}
        >
          <span className={`hamburger ${menuAbierto ? 'abierto' : ''}`}></span>
        </button>
      </div>

      <nav className={`navegacion ${menuAbierto ? 'activo' : ''}`}>
        <ul>
          {enlaces.map((e) => (
            <li key={e.texto}>
              <NavLink to={e.href} className="enlace-nav">
                {e.texto}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <img src="src/assets/Logo2-removebg-preview.png" alt="Logo Acceso Seguro" className="img-logo" />
    </header>
  );
}

export default Header;