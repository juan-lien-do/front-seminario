import React from "react";
import imagen from "../assets/icono2.png";
import { NavLink } from "react-router-dom";

export default function NavBar({ desloguearse }) {
  const handleLogout = () => {
    desloguearse();
  };

  return (
    <nav className="navbar navbar-expand-md bg-dark py-3" data-bs-theme="dark">
      <div className="container">
        {/* Logo y enlace "Inicio" */}
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

        {/* Botón para colapsar en pantallas pequeñas */}
        <button
          data-bs-toggle="collapse"
          className="navbar-toggler"
          data-bs-target="#navcol-5"
        >
          <span className="visually-hidden">Toggle navigation</span>
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menú colapsable */}
        <div className="collapse navbar-collapse" id="navcol-5">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/inventario">
                <i class="fa-solid fa-boxes-stacked"></i> {" "}
                Inventario
              </NavLink>
             </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/empleados">
                <i class="fa-solid fa-user-tie"></i> {" "}
                Empleados
              </NavLink>
            </li>
            {
            /*
            
            */
            }
            <li className="nav-item">
              <NavLink className="nav-link" to="/solicitudes">
                <i class="fa-solid fa-file-invoice"></i> {" "}
                Solicitudes
              </NavLink>

            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/envios">
                <i class="fa-solid fa-paper-plane"></i> {" "}
                Envíos
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/underconstruction">
              <i class="fa-solid fa-parachute-box"></i>{" "}
                Devoluciones
              </NavLink>

            </li>
          </ul>
          {/* Botón "Cerrar Sesión" */}
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
