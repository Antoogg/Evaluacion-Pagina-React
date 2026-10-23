import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

import InicioView from './pages/InicioView';
import LoginView from './pages/LoginView';
import RegistroView from './pages/RegistroView';
import RecuperacionView from './pages/RecuperacionView';
import ControlView from './pages/ControlView';

export default function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <div className="flex-grow-1">
        <Routes>
          <Route path="/" element={<InicioView />} />
          <Route path="/login" element={<LoginView />} />
          <Route path="/registro" element={<RegistroView />} />
          <Route path="/recuperar" element={<RecuperacionView />} />
          <Route path="/control" element={<ControlView />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}