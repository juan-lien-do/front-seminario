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
  ];

  return (
    <div className="mx-auto mt-3">
      <h1 className="ms-3">Envíos</h1>
      <div className="ms-3 d-flex align-items-center">
        <select
          className="form-select me-2"
          onChange={(e) => onEstadoChange(e.target.value)}
          style={{ width: "200px" }}
        >
          <option value="">Todos los estados</option>
          {estadosEnvio.map((estado) => (
            <option key={estado.id} value={estado.id}>
              {estado.nombre}
            </option>
          ))}
        </select>
        <div className="form-check form-switch me-2">
          <input
            className="form-check-input"
            type="checkbox"
            id="completadosToggle"
            onChange={toggleCompletados}
            checked={completadosActivo}
          />
          <label className="form-check-label" htmlFor="completadosToggle">
            Completados
          </label>
        </div>
        <input
          type="text"
          placeholder="Buscar por nombre"
          className="form-control me-2"
          style={{ width: "200px" }}
          onChange={(e) => onNombreChange(e.target.value)}
        />
        <button
          type="button"
          className="btn btn-primary me-2"
          onClick={buscarEnvios}
          style={{ whiteSpace: "nowrap" }}
        >
          <i className="fa fa-search"></i> Buscar
        </button>
        <button
          className="btn btn-warning"
          onClick={handleRegistrarEnvio}
          style={{ whiteSpace: "nowrap" }}
        >
          <i className="fa fa-plus"></i> Registrar envío
        </button>
      </div>
    </div>
  );
}
