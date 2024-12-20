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
import Envios from './pages/Envios';
import UnderConstruction from './pages/UnderConstruction';
import Devoluciones from './pages/devoluciones';
import Solicitudes from './pages/Solicitudes';
import Usuarios from './pages/usuarios';
import RegistroContraseña from './components/usuarios/RegistroContraseña';




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
        <Toaster richColors closeButton expand={false} position="top-right"/>
        <Routes>
          <Route
            path="/"
            element={<LoginPage usuario={usuario} onLogin={handleLogin} />}
          />
          <Route
            path="/empleados"
            element={
              <ProtectedRoute isAllowed={!!usuario}>
                <NavBar desloguearse={handleLogout} usuario={usuario} />
                <Empleados />
              </ProtectedRoute>
            }
          />


          <Route
            path="/envios"
            element={
              <ProtectedRoute isAllowed={!!usuario}>
                <NavBar desloguearse={handleLogout} usuario={usuario}/>
                <Envios/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/home"
            element={
              <ProtectedRoute isAllowed={!!usuario}>
                <NavBar desloguearse={handleLogout} usuario={usuario}/>
                <Home usuario={usuario}/>
              </ProtectedRoute>
            }
          />


          <Route path='/inventario' element={
            <ProtectedRoute isAllowed={!!usuario} >
                <NavBar desloguearse={handleLogout} usuario={usuario}/>
                <Inventario/> 
            </ProtectedRoute>
          } />

          <Route path='/devoluciones' element={
            <ProtectedRoute isAllowed={!!usuario}>
                <NavBar desloguearse={handleLogout} usuario={usuario}/>
                <Devoluciones/> 
            </ProtectedRoute>
          } />

          <Route path='/underconstruction' element={
            <ProtectedRoute isAllowed={!!usuario}>
                <NavBar desloguearse={handleLogout} usuario={usuario}/>
                <UnderConstruction/> 
            </ProtectedRoute>
          } />

          <Route path='/solicitudes' element={
            <ProtectedRoute isAllowed={!!usuario}>
                <NavBar desloguearse={handleLogout} usuario={usuario}/>
                <Solicitudes/>
            </ProtectedRoute>
          } />
          
          <Route path='/usuarios' element={
            <ProtectedRoute isAllowed={!!usuario}>
                <NavBar desloguearse={handleLogout} usuario={usuario}/>
                <Usuarios/>
            </ProtectedRoute>
          } />
          
          <Route path="/*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
