import React, { useState, useEffect } from "react";
import ListadoUsuarios from "../components/usuarios/ListadoUsuarios";
import BuscadorUsuarios from "../components/usuarios/BuscadorUsuarios";
import RegistroUsuarios from "../components/usuarios/RegistroUsuarios";
import { usuariosService } from "../services/usuarios.services";

const Usuarios = () => {
  const [usuarios, setUsuario] = useState([]);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [esActivo, setActivo] = useState(true);
  const [mostrarRegistroUsuario, setMostrarRegistroUsuario] = useState(false);

  useEffect(() => {
    usuariosService.buscarUsuarios().then((data) => setUsuario(data));
  }, []);

  function agregarUsuario() {
    const nuevoUsuario = {
        idUsuario: 0,
        nombre: "",
        nombre_usuario: "",
        apellido_usuario: "",
        mail: "",
        password: "",
        es_activo: true,
        telefono: 0,
    };
    setUsuario(nuevoUsuario);
    setMostrarRegistroUsuario(true);
}

function modificarUsuario(usuario) {
  if (!usuario.esActivo) {
      toast.error("No puede modificarse un registro inactivo")
      return;
  }
  setUsuario(usuario);
  setMostrarRegistroUsuario(true);
}
  const cerrarFormulario = () => {
    setUsuarioSeleccionado(null);
  };

  return (
    <div>
      <h2>Gestión de Usuarios</h2>
      <BuscadorUsuarios usuarios={usuarios} setUsuarios={setUsuario} />
      {usuarioSeleccionado !== null ? (

        <RegistroUsuarios
          setUsuarios={setUsuario}
          usuario={usuarioSeleccionado}
          cerrarFormulario={cerrarFormulario}
        />
      ) : null}
      <ListadoUsuarios
        usuarios={usuarios}
        abrirFormulario={agregarUsuario} 
      />
    </div>
  );
};

export default Usuarios;
