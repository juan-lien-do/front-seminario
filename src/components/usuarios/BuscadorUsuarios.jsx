import React from "react";

const BuscadorUsuarios = ({ nombre, setNombre, activo, setActivo, agregarUsuario }) => {
  return (
    <div className="container-fluid mt-4">
      <div className="row g-3">
        <div className="col-md-6">
          <label htmlFor="nombre" className="form-label">Buscar por nombre o usuario:</label>
          <input
            type="text"
            id="nombre"
            className="form-control"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Buscar por nombre o usuario"
          />
        </div>

        <div className="col-md-4">
          <label htmlFor="activo" className="form-label">Filtrar por estado:</label>
          <select
            id="activo"
            className="form-select"
            value={activo}
            onChange={(e) => setActivo(e.target.value)}
          >
            <option value="todos">Todos</option>
            <option value="activo">Activos</option>
            <option value="inactivo">Inactivos</option>
          </select>
        </div>

        <div className="col-md-2 d-flex align-items-end">
          <button
            type="button"
            className="btn btn-outline-primary w-100"
            onClick={agregarUsuario}
          >
            Agregar Usuario
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuscadorUsuarios;