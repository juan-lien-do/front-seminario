import { useState, useEffect } from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './utils/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import axios from 'axios';

function App() {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("usuario");
    if (storedUser) {
      setUsuario(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = (userData) => {
    setUsuario(userData);
    localStorage.setItem("usuario", JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUsuario(null);
    localStorage.removeItem("usuario");
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<LoginPage onLogin={handleLogin} />}
          />
          <Route
            path="/home"
            element={
              <ProtectedRoute isAllowed={!!usuario}>
                <div>Bienvenido a la página de inicio</div>
                <button onClick={handleLogout}>Cerrar sesión</button>
              </ProtectedRoute>
            }
          />
          <Route path="/*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
