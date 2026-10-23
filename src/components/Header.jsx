import { Link, NavLink } from 'react-router-dom';

const ENLACES = [
  { texto: 'Inicio', href: "/" },
  { texto: 'Control Entradas-Salidas', href: "/control" },
  { texto: 'Iniciar Sesión', href: "/login" },
  { texto: 'Crear Cuenta', href: "/registro" },
];

function Header({ enlaces = ENLACES }) {
  return (
    <header className="encabezado-principal">
      <div className="contenedor-logo">
        <Link to="/" className="enlace-logo">
          <h1 className="titulo-empresa">Acceso Seguro</h1>
          <span className="subtitulo-empresa">Soluciones de control de acceso y asistencia</span>
        </Link>
      </div>

      <nav className="navegacion">
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