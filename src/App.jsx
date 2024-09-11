import { useState, useEffect } from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './utils/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import axios from 'axios';
import NavBar from './components/NavBar';
import Inventario from './pages/Inventario';

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
    console.log("Desloguear")
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<LoginPage usuario={usuario} onLogin={handleLogin} />}
          />
          <Route
            path="/home"
            element={
              <ProtectedRoute isAllowed={!!usuario}>
                <NavBar desloguearse={handleLogout}/>
                <div className=''>Hola {usuario?.nombre}</div>
              </ProtectedRoute>
            }
          />

          <Route path='/inventario' element={
            <ProtectedRoute isAllowed={!!usuario}>
                <NavBar desloguearse={handleLogout}/>
                <Inventario/>
            </ProtectedRoute>

          } />
          <Route path="/*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
