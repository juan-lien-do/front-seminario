import React, { useState, useEffect } from "react";
import ListadoUsuarios from "../components/usuarios/ListadoUsuarios";
import BuscadorUsuarios from "../components/usuarios/BuscadorUsuarios";
import ModalUsuarios from "../components/usuarios/ModalUsuarios";
import { usuariosService } from "../services/usuarios.services";

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [modalAbierto, setModalAbierto] = useState(false);

  useEffect(() => {
    usuariosService.buscarUsuarios().then((data) => setUsuarios(data));
  }, []);

  const abrirModal = (usuario = null) => {
    setUsuarioSeleccionado(usuario);
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setUsuarioSeleccionado(null);
    setModalAbierto(false);
  };

  return (
    <div>
      <h2>Gestión de Usuarios</h2>
      <BuscadorUsuarios usuarios={usuarios} setUsuarios={setUsuarios} />
      <ListadoUsuarios usuarios={usuarios} abrirModal={abrirModal} />
      {modalAbierto && (
        <ModalUsuarios
          usuario={usuarioSeleccionado}
          cerrarModal={cerrarModal}
          setUsuarios={setUsuarios}
        />
      )}
    </div>
  );
};

export default Usuarios;
