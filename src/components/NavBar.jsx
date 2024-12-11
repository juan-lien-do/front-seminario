import React from "react";
import imagen from "../assets/icono2.png";
import { NavLink } from "react-router-dom";

export default function NavBar({ desloguearse, usuario }) {
  const handleLogout = () => {
    desloguearse();
  };

  return (
    <nav className="navbar navbar-expand-md bg-dark py-3" data-bs-theme="dark">
      <div className="container">
        <NavLink
          className="nav-link navbar-brand d-flex align-items-center"
          to="/home"
        >
          <span className="bs-icon-sm bs-icon-rounded bs-icon-primary d-flex justify-content-center align-items-center me-2 bs-icon">
            <img
              className="img-fluid shadow-logo"
              src={imagen}
              alt="imagen de ejemplo"
              style={{ width: "1.6em" }}
            />
          </span>
          <span>Inicio</span>
        </NavLink>

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
                <i className="fa-solid fa-boxes-stacked"></i> Inventario
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/empleados">
                <i className="fa-solid fa-user-tie"></i> Empleados
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/solicitudes">
                <i className="fa-solid fa-file-invoice"></i> Solicitudes
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/envios">
                <i className="fa-solid fa-paper-plane"></i> Envíos
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/devoluciones">
                <i className="fa-solid fa-parachute-box"></i> Devoluciones
              </NavLink>
            </li>
            {usuario?.isAdmin === true && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/usuarios">
                  <i className="fa-solid fa-user-tie"></i> Usuarios
                </NavLink>
              </li>
            )}
          </ul>
          <button
            className="btn btn-primary ms-md-2 mt-2 mt-md-0"
            onClick={handleLogout}
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </nav>
  );
}
