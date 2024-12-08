import React, { useState } from 'react';

const RegistroUsuarios = ({ setUsuarios }) => {
  const [nuevoUsuario, setNuevoUsuario] = useState({
    usuario: '',
    nombre: '',
    rol: '',
    habilitado: true,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoUsuario({
      ...nuevoUsuario,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para guardar el nuevo usuario
    setUsuarios((prevUsuarios) => [...prevUsuarios, nuevoUsuario]);
    setNuevoUsuario({ usuario: '', nombre: '', rol: '', habilitado: true });
  };

  return (
    <div className="container my-4">
      <h3 className="text-uppercase mb-3">Registrar Nuevo Usuario</h3>
      <form onSubmit={handleSubmit}>
        <div className="row gy-3">
          {/* Campo Usuario */}
          <div className="col-md-6">
            <label className="form-label">Usuario</label>
            <input
              type="text"
              name="usuario"
              className="form-control"
              value={nuevoUsuario.usuario}
              onChange={handleInputChange}
              placeholder="Ingrese el nombre de usuario"
            />
          </div>

          {/* Campo Nombre */}
          <div className="col-md-6">
            <label className="form-label">Nombre</label>
            <input
              type="text"
              name="nombre"
              className="form-control"
              value={nuevoUsuario.nombre}
              onChange={handleInputChange}
              placeholder="Ingrese el nombre completo"
            />
          </div>

          {/* Campo Rol */}
          <div className="col-md-6">
            <label className="form-label">Rol</label>
            <input
              type="text"
              name="rol"
              className="form-control"
              value={nuevoUsuario.rol}
              onChange={handleInputChange}
              placeholder="Ingrese el rol del usuario"
            />
          </div>

          {/* Campo Habilitado */}
          <div className="col-md-6">
            <label className="form-label">Habilitado</label>
            <div className="form-check">
              <input
                type="checkbox"
                name="habilitado"
                className="form-check-input"
                id="habilitado"
                checked={nuevoUsuario.habilitado}
                onChange={(e) =>
                  setNuevoUsuario({ ...nuevoUsuario, habilitado: e.target.checked })
                }
              />
              <label htmlFor="habilitado" className="form-check-label">
                Usuario habilitado
              </label>
            </div>
          </div>

          {/* Botón de Registro */}
          <div className="col-12">
            <button type="submit" className="btn btn-success w-100">
              Registrar Usuario
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegistroUsuarios;
