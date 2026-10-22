const ENLACES = [
  { texto: 'Inicio', href: '/inicio/inicio.html' },
  { texto: 'Control Entradas-Salidas', href: '/registro/registro.html' },
  { texto: 'Iniciar Sesión', href: '/inicioSesion/login.html' },
  { texto: 'Crear Cuenta', href: '/creacionCuentas/creacion.html' },
];

function Header({enlaces = ENLACES}){
    return (
    <header className="encabezado-principal">
        <div className="contenedor-logo">
            <a href="ENLACES.LOGO" className="enlace-logo">
                <h1 className="titulo-empresa">Acceso Seguro</h1>
                <span className="subtitulo-empresa">Soluciones de control de acceso y asistencia</span>
            </a>
        </div>

        <nav className="navegacion">
            <ul>
                {enlaces.map((e) => (
                    <li  key={e.texto}>
                        <a href={e.href} class="enlace-nav">
                            {e.texto}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
        <img src="src/assets/Logo2-removebg-preview.png" alt="Logo Acceso Seguro" className="img-logo" />
    </header>
    );
}

export default Header;