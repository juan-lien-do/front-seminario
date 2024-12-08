import React, { useState, useEffect } from "react";

const ModalUsuarios = ({ usuario, cerrarModal, setUsuarios }) => {
  const [datosUsuario, setDatosUsuario] = useState({
    usuario: "",
    nombre: "",
    rol: "",
    habilitado: true,
  });

  useEffect(() => {
    if (usuario) {
      setDatosUsuario(usuario);
    } else {
      setDatosUsuario({ usuario: "", nombre: "", rol: "", habilitado: true });
    }
  }, [usuario]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDatosUsuario((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (usuario) {
      // Actualizar usuario existente
      setUsuarios((prevUsuarios) =>
        prevUsuarios.map((u) =>
          u.id === usuario.id ? { ...u, ...datosUsuario } : u
        )
      );
    } else {
      // Registrar nuevo usuario
      setUsuarios((prevUsuarios) => [
        ...prevUsuarios,
        { id: Date.now(), ...datosUsuario },
      ]);
    }
    cerrarModal();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>{usuario ? "Editar Usuario" : "Registrar Usuario"}</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Usuario</label>
            <input
              type="text"
              className="form-control"
              name="usuario"
              value={datosUsuario.usuario}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input
              type="text"
              className="form-control"
              name="nombre"
              value={datosUsuario.nombre}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Rol</label>
            <input
              type="text"
              className="form-control"
              name="rol"
              value={datosUsuario.rol}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-check mb-3">
            <input
              type="checkbox"
              className="form-check-input"
              name="habilitado"
              checked={datosUsuario.habilitado}
              onChange={(e) =>
                setDatosUsuario((prevState) => ({
                  ...prevState,
                  habilitado: e.target.checked,
                }))
              }
            />
            <label className="form-check-label">Habilitado</label>
          </div>
          <div className="d-flex justify-content-end gap-2">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={cerrarModal}
            >
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary">
              {usuario ? "Guardar Cambios" : "Registrar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalUsuarios;
