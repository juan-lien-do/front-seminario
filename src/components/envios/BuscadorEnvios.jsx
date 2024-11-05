import { useState } from "react";

export default function BuscadorEnvios({ handleRegistrarEnvio, onEstadoChange }) {
  // Estados posibles del envío
  const estadosEnvio = [
    { id: 1, nombre: "Pendiente" },
    { id: 2, nombre: "En preparación" },
    { id: 3, nombre: "Enviado" },
    { id: 4, nombre: "Entregado" },
  ];

  return (
    <div className="mx-auto mt-3">
      <h1 className="ms-3">Envíos</h1>
      <div className="ms-3">
        <select
          className="form-select mb-2"
          onChange={(e) => onEstadoChange(e.target.value)} // Llama a la función que cambia el estado
        >
          <option value="">Todos los estados</option>
          {estadosEnvio.map((estado) => (
            <option key={estado.id} value={estado.id}>
              {estado.nombre}
            </option>
          ))}
        </select>
      </div>
      <button
        type="button"
        className="btn btn-primary mx-1 ms-3"
        onClick={() => onEstadoChange("")} // Llamar a la función de cambio de estado sin filtro
      >
        <i className="fa fa-search"></i> Buscar
      </button>
      <button className="mx-auto btn btn-warning" onClick={handleRegistrarEnvio}>
        <i className="fa fa-plus"></i> Registrar envío
      </button>
    </div>
  );
}
