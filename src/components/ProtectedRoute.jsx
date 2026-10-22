import { Navigate, Outlet } from 'react-router-dom';
import { getSesion } from '../data/mockData';

export default function ProtectedRoute({ roles }) {
  const usuario = getSesion();

  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(usuario.rol)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}