export default function Footer() {
  return (
    <footer className="bg-dark text-white py-4 mt-auto">
      <div className="container">
        <div className="row gy-3 align-items-center text-center text-md-start">
          <div className="col-md-6">
            <h5 className="fw-bold mb-1 text-light">Acceso Seguro</h5>
            <p className="small text-secondary mb-0">
              Sistema de Gestión de Entradas, Salidas y Asistencia.
            </p>
          </div>
          <div className="col-md-6 text-md-end">
            <p className="small mb-1">
              <strong>Teléfono:</strong> +56 2 2345 6789
            </p>
            <p className="small mb-0">
              <strong>Dirección:</strong> Av. España 485, Santiago, Chile
            </p>
          </div>
        </div>
        <hr className="my-3 border-secondary" />
        <p className="mb-0 small text-center text-secondary">
          &copy; {new Date().getFullYear()} Acceso Seguro. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}