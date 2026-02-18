import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Auth from './pages/Auth';
import Home from './pages/Home';
import SellItem from './pages/SellItem';
import ProductDetail from './pages/ProductDetail';
import Layout from './components/Layout';

export const AppContext = React.createContext(null);

function App() {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('studentMarketUser');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [products, setProducts] = useState(() => {
    try {
      const stored = localStorage.getItem('studentMarketListings');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('studentMarketTheme') || 'light';
  });

  function toggleTheme() {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    localStorage.setItem('studentMarketTheme', next);
  }

  return (
    <AppContext.Provider value={{ user, setUser, products, setProducts, theme, toggleTheme }}>
      <div className={`app-container ${theme}`}>
        <Routes>
          <Route
            path="/"
            element={user ? <Navigate to="/home" replace /> : <Auth />}
          />
          <Route element={<Layout />}>
            <Route
              path="/home"
              element={user ? <Home /> : <Navigate to="/" replace />}
            />
            <Route
              path="/sell"
              element={user ? <SellItem /> : <Navigate to="/" replace />}
            />
            <Route
              path="/product/:id"
              element={user ? <ProductDetail /> : <Navigate to="/" replace />}
            />
          </Route>
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
