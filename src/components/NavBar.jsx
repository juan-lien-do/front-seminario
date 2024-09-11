import React from "react";
import imagen from '../assets/icono2.png';
import { NavLink } from "react-router-dom";

export default function NavBar({ desloguearse }) {
  const handleLogout = () => {
    desloguearse();
  };

  return (
    <nav className="navbar navbar-expand-md bg-dark py-3" data-bs-theme="dark">
      <div className="container">
        <a className="navbar-brand d-flex align-items-center" href="#">
          <span className="bs-icon-sm bs-icon-rounded bs-icon-primary d-flex justify-content-center align-items-center me-2 bs-icon">
            <img className="img-fluid shadow-logo" src={imagen} alt="imagen de ejemplo" style={{width:"1.6em"}} />
          </span>
          <span>Inicio</span>
        </a>
        <button
          data-bs-toggle="collapse"
          className="navbar-toggler"
          data-bs-target="#navcol-5"
        >
          <span className="visually-hidden">Toggle navigation</span>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navcol-5">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
            <NavLink className="nav-link" to="/inventario">
              Inventario
            </NavLink>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Empleados
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Solicitudes
              </a>
            </li>
            <li className="nav-item"></li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Envíos
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Devoluciones
              </a>
            </li>
          </ul>
          <a href="#"></a>
          <button
            className="btn btn-primary ms-md-2"
            onClick={handleLogout} // Evento de click para desloguear
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </nav>
  );
}
