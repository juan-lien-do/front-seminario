import { useState, useEffect } from 'react';
import { Toaster, toast } from 'sonner'
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import '@fortawesome/fontawesome-free/css/all.min.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './utils/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import axios from 'axios';
import NavBar from './components/NavBar';
import Inventario from './pages/Inventario';
import Empleados from './pages/Empleados';
import Home from './pages/Home';
import Recursos from './pages/recursos';


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
        <Toaster richColors closeButton expand={false}/>
        <Routes>
          <Route
            path="/"
            element={<LoginPage usuario={usuario} onLogin={handleLogin} />}
          />
          <Route
            path="/empleados"
            element={
              <ProtectedRoute isAllowed={!!usuario}>
                <NavBar desloguearse={handleLogout}/>
                <Empleados/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/home"
            element={
              <ProtectedRoute isAllowed={!!usuario}>
                <NavBar desloguearse={handleLogout}/>
                <Home usuario={usuario}/>
              </ProtectedRoute>
            }
          />


          <Route path='/inventario' element={
            <ProtectedRoute isAllowed={!!usuario}>
                <NavBar desloguearse={handleLogout}/>
                <Recursos/>
            </ProtectedRoute>
          } />
          
          <Route path="/*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
