import React, { useState, useEffect } from "react";
import ListadoUsuarios from "../components/usuarios/ListadoUsuarios";
import BuscadorUsuarios from "../components/usuarios/BuscadorUsuarios";
import RegistroUsuario from "../components/usuarios/RegistroUsuarios";
import { usuariosService } from "../services/usuarios.services";

const Usuarios = () => {
  const [nombre, setNombre] = useState('')
  const [activo, setActivo] = useState(true)
  const [usuario, setUsuario] = useState([]);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [mostrarRegistroUsuario, setMostrarRegistroUsuario] = useState(false);

  useEffect(() => {
    usuariosService.buscarUsuarios().then((data) => setUsuario(data));
  }, []);
  async function buscarUsuarios() {
    const data = await usuariosService.buscarUsuarios({ nombre, activo })
    setUsuarios(data)
  }
  console.log(usuario)
  function agregarUsuario() {
    const nuevoUsuario = {
        id_usuario: 0,
        nombre: "",
        nombre_usr: "",
        apellido_usr: "",
        email: "",
        password: "",
        isAdmin: false,
        esDriver: false,
        telefono: 0,
        esActivo: true,
        primer_login: 0,
    };
    setUsuario(nuevoUsuario);
    setMostrarRegistroUsuario(true);
}


  const cerrarFormulario = () => {
    setUsuarioSeleccionado(null);
  };

  function modificarUsuario(usuario) {
    if (!usuario.esActivo) {
        toast.error("No puede modificarse un registro inactivo")
        return;
    }
    setUsuario(usuario);
    setMostrarRegistroUsuario(true);
  }

  async function guardarUsuario(data) {
    if (await usuariosService.save(data)){
      setMostrarRegistroUsuario(false)
      buscarUsuarios()
    }
    
  }
  
  if (mostrarRegistroUsuario) {
    return (
      <RegistroUsuario
        guardar={guardarUsuario}
        volver={() => setMostrarRegistroUsuario(false)}
        usuario={usuario} />
    )
  }

  return (
    <div>
      <h2>Gestión de Usuarios</h2>
      <BuscadorUsuarios usuarios={usuario} setUsuarios={setUsuario} 
        nombre={nombre}
        setNombre={setNombre}
        activo={activo}
        setActivo={setActivo}
        buscarUsuarios={buscarUsuarios}
        />
      <ListadoUsuarios
        usuarios={usuario}
        abrirFormulario={agregarUsuario} 
        modificar={modificarUsuario}
        />
    </div>
  );
};

export default Usuarios;
