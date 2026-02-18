import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Auth from './pages/Auth';
import Home from './pages/Home';
import SellItem from './pages/SellItem';
import Layout from './components/Layout';

const DEFAULT_PRODUCTS = [
  {
    id: 1,
    photoUrl: 'https://images.unsplash.com/photo-1517963879433-6ad2171073fb?w=600',
    title: "Paire d'haltères 10 kg",
    price: 15,
    category: 'Other',
    description: "Haltères en fonte, très bon état. Idéal pour s'entraîner à la maison.",
    seller: 'alex_b',
    university: 'UTC Compiègne',
    createdAt: Date.now() - 86400000 * 2,
  },
  {
    id: 2,
    photoUrl: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=600',
    title: 'Bureau étudiant blanc',
    price: 45,
    category: 'Furniture',
    description: 'Bureau compact, parfait pour une chambre étudiante. Quelques légères rayures.',
    seller: 'marie_l',
    university: 'Sorbonne',
    createdAt: Date.now() - 86400000,
  },
  {
    id: 3,
    photoUrl: 'https://images.unsplash.com/photo-1524117074681-31bd4de22ad3?w=600',
    title: 'Lampe de bureau LED',
    price: 12,
    category: 'Electronics',
    description: 'Lampe LED réglable, 3 modes de luminosité, port USB intégré.',
    seller: 'tom_k',
    university: 'Université de Lille',
    createdAt: Date.now() - 3600000,
  },
];

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
      return stored ? JSON.parse(stored) : DEFAULT_PRODUCTS;
    } catch {
      return DEFAULT_PRODUCTS;
    }
  });

  return (
    <AppContext.Provider value={{ user, setUser, products, setProducts }}>
      <div className="app-container">
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
          </Route>
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
