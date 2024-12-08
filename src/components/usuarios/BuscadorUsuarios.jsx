import React, { useState } from 'react';

const BuscadorUsuarios = ({ usuarios, setUsuarios }) => {
  const [busqueda, setBusqueda] = useState('');
  const [estado, setEstado] = useState('todos'); // 'todos', 'activo', 'inactivo'

  const manejarBusqueda = () => {
    let usuariosFiltrados = usuarios;

    // Filtrar por estado
    if (estado !== 'todos') {
      const habilitado = estado === 'activo';
      usuariosFiltrados = usuariosFiltrados.filter(usuario => usuario.habilitado === habilitado);
    }

    // Filtrar por nombre o usuario
    if (busqueda) {
      usuariosFiltrados = usuariosFiltrados.filter(
        usuario =>
          usuario.usuario.toLowerCase().includes(busqueda.toLowerCase()) ||
          usuario.nombre.toLowerCase().includes(busqueda.toLowerCase())
      );
    }

    // Actualizar el estado con los usuarios filtrados
    setUsuarios(usuariosFiltrados);
  };

  return (
    <div className="container my-4">
      <h3 className="text-uppercase mb-3">Buscar Usuarios</h3>
      <div className="row gy-3">
        {/* Input de Búsqueda */}
        <div className="col-md-6">
          <label htmlFor="buscador" className="form-label">Buscar usuario:</label>
          <input
            id="buscador"
            type="text"
            className="form-control"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar por nombre o usuario"
          />
        </div>

        {/* Selector de Estado */}
        <div className="col-md-4">
          <label htmlFor="estado" className="form-label">Filtrar por estado:</label>
          <select
            id="estado"
            className="form-select"
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
          >
            <option value="todos">Todos</option>
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
          </select>
        </div>

        {/* Botón de Búsqueda */}
        <div className="col-md-2 d-flex align-items-end">
          <button className="btn btn-primary w-100" onClick={manejarBusqueda}>
            Buscar
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuscadorUsuarios;
