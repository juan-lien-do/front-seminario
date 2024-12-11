import { useState } from "react";

export default function BuscadorEnvios({ handleRegistrarEnvio, onEstadoChange, toggleCompletados, completadosActivo, buscarEnvios, onNombreChange }) {
  const estadosEnvio = [
    { id: 1, nombre: "Pendiente" },
    { id: 2, nombre: "En preparación" },
    { id: 3, nombre: "Enviado" },
    { id: 4, nombre: "Entregado" },
    { id: 5, nombre: "Devuelto Parcialmente" },
    { id: 6, nombre: "Devuelto Completo" },
    { id: 7, nombre: "Cancelado" },
    { id: 8, nombre: "Para Retiro"},
    { id: 9, nombre: "En Reparacion"},
  ];

  return (
    <div className="mx-auto mt-3">
      <h1 className="ms-3">Envíos</h1>
      <div className="container card py-3">
        <div className="row justify-content-center gx-3 gy-2"> {/* Agrega espaciado horizontal y vertical */}
          
          <div className="col-12 col-sm-6 col-md-4 col-lg-3">
            <select
              className="form-select"
              onChange={(e) => onEstadoChange(e.target.value)}
            >
              <option value="">Todos los estados</option>
              {estadosEnvio.map((estado) => (
                <option key={estado.id} value={estado.id}>
                  {estado.nombre}
                </option>
              ))}
            </select>
          </div>
  
          <div className="col-6 col-sm-3 col-md-3 col-lg-2 d-flex">
            <div className="form-check form-switch my-auto">
              <input
                className="form-check-input"
                type="checkbox"
                id="completadosToggle"
                onChange={toggleCompletados}
                checked={completadosActivo}
              />
              <label className="form-check-label ms-2" htmlFor="completadosToggle">
                Entregados
              </label>
            </div>
          </div>
  
          <div className="col-12 col-sm-6 col-md-4 col-lg-3">
            <input
              type="text"
              placeholder="Buscar por nombre"
              className="form-control"
              onChange={(e) => onNombreChange(e.target.value)}
            />
          </div>
  
          <div className="col-6 col-sm-3 col-md-2 col-lg-2">
            <button
              type="button"
              className="btn btn-primary w-100"
              onClick={buscarEnvios}
            >
              <i className="fa fa-search"></i> Buscar
            </button>
          </div>
  
          <div className="col-6 col-sm-3 col-md-2 col-lg-2">
            <button
              className="btn btn-warning w-100"
              onClick={handleRegistrarEnvio}
            >
              <i className="fa fa-plus"></i> Registrar envío
            </button>
          </div>
  
        </div>
      </div>
    </div>
  );
}  