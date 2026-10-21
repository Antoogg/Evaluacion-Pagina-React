import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { ProductCard } from './components/ProductCard';
import Header from './components/Header';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [cart, setCart] = useState([]);

  const products = [
    { id: 1, title: 'Control de Acceso Biométrico', price: 150000, image: 'https://via.placeholder.com/400x200' },
    { id: 2, title: 'Tarjeta RFID de Proximidad', price: 2500, image: 'https://via.placeholder.com/400x200' },
    { id: 3, title: 'Cámara de Seguridad IP', price: 85000, image: 'https://via.placeholder.com/400x200' }
  ];

  const handleAddToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <>
    <Header />
    <div className="bg-light min-vh-100">
      <Navbar cartCount={cart.length} onNavigate={setCurrentView} />

      <main className="container my-4">
        {currentView === 'home' && (
          <section>
            <div className="p-4 mb-4 bg-white rounded-3 shadow-sm text-center">
              <h1 className="display-6 fw-bold">Portal de Control & Productos</h1>
              <p className="fs-5 text-muted">Soluciones de acceso y equipamiento para tu empresa.</p>
            </div>

            <div className="row row-cols-1 row-cols-md-3 g-4">
              {products.map((item) => (
                <div key={item.id} className="col">
                  <ProductCard product={item} onAddToCart={handleAddToCart} />
                </div>
              ))}
            </div>
          </section>
        )}

        {currentView === 'categories' && <h2 className="mt-4">Vista de Categorías</h2>}
        {currentView === 'offers' && <h2 className="mt-4">Vista de Ofertas</h2>}
        {currentView === 'cart' && <h2 className="mt-4">Carrito de Compras ({cart.length} ítems)</h2>}
      </main>
    </div>
    </>
  );
}

export default App;