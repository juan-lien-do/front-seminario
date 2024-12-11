import React, { useState, useEffect } from "react";

const ModalUsuarios = ({ usuario, cerrarModal, setUsuarios }) => {
  const [formData, setFormData] = useState({
    usuario: "",
    nombre: "",
    rol: "",
    habilitado: true,
  });

  useEffect(() => {
    if (usuario) {

      setFormData({
        usuario: usuario.nombre || "",
        nombre: usuario.nombre_usr || "",
        apellido: usuario.apellido.usr || "",
        rol: usuario.rol || "",
        habilitado: usuario.esActivo || false,
      });
    } else {

      setFormData({
        usuario: "",
        nombre: "",
        apellido: "",
        rol: "",
        habilitado: true,
      });
    }
  }, [usuario]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    setFormData({ ...formData, habilitado: e.target.checked });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (usuario) {

      setUsuarios((prevUsuarios) =>
        prevUsuarios.map((u) =>
          u.id === usuario.id ? { ...u, ...formData } : u
        )
      );
    } else {

      setUsuarios((prevUsuarios) => [...prevUsuarios, { id: Date.now(), ...formData }]);
    }
    cerrarModal();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>{usuario ? "Editar Usuario" : "Agregar Usuario"}</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Usuario</label>
            <input
              type="text"
              name="usuario"
              value={formData.usuario}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Nombre</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Rol</label>
            <input
              type="text"
              name="rol"
              value={formData.rol}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>
              Habilitado
              <input
                type="checkbox"
                name="habilitado"
                checked={formData.habilitado}
                onChange={handleCheckboxChange}
              />
            </label>
          </div>
          <button type="submit">{usuario ? "Guardar Cambios" : "Registrar"}</button>
          <button type="button" onClick={cerrarModal}>
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalUsuarios;
