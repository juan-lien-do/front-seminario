import React, { useState, useEffect } from "react";
import ListadoUsuarios from "../components/usuarios/ListadoUsuarios";
import BuscadorUsuarios from "../components/usuarios/BuscadorUsuarios";
import RegistroUsuario from "../components/usuarios/RegistroUsuarios";
import { usuariosService } from "../services/usuarios.services";
import { toast } from 'sonner'
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
    setUsuario(data)
  }
  useEffect(() => {
    buscarUsuarios();
  }, [])
  
  function agregarUsuario() {
    const nuevoUsuario = {
      id_usuario: 0, // Asegúrate de que id_usuario sea 0 para que se detecte como nuevo
      nombre_usr: null,
      apellido_usr: null,
      mail: null,
      observaciones: null,
      telefono: null,
    };
    setUsuarioSeleccionado(nuevoUsuario); // Usar el estado dedicado al formulario
    setMostrarRegistroUsuario(true);
  }


  function modificarUsuario(usuario) {
    if (!usuario.esActivo) {
      toast.error("No puede modificarse un registro inactivo")
      return;
  }
    console.log(usuario)
    setUsuario(usuario)
    setMostrarRegistroUsuario(true)
  }


  async function guardarUsuario(data) {
    if (await usuariosService.save(data)){
      setMostrarRegistroUsuario(false)
      buscarUsuarios()
    }
    
  }

  async function desactivarUsuario(id) {
    await usuariosService.remove(id)
    buscarUsuarios()
  }

  async function activarUsuario(id) {
    await usuariosService.activar(id)
    buscarUsuarios()
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
        agregarUsuario = {agregarUsuario}
        />
      <ListadoUsuarios
        usuarios={usuario}
        abrirFormulario={agregarUsuario} 
        modificar={modificarUsuario}
        desactivar={desactivarUsuario}
        activar={activarUsuario}

        />
    </div>
  );
};

export default Usuarios;
