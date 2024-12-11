import React, { useState, useEffect } from "react";
import ListadoUsuarios from "../components/usuarios/ListadoUsuarios";
import BuscadorUsuarios from "../components/usuarios/BuscadorUsuarios";
import RegistroUsuario from "../components/usuarios/RegistroUsuarios";
import { usuariosService } from "../services/usuarios.services";
import { toast } from 'sonner';

const Usuarios = () => {
  const [nombre, setNombre] = useState('');
  const [activo, setActivo] = useState(true); // true por defecto, asumiendo que se filtra por usuarios activos
  const [usuario, setUsuario] = useState([]);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [mostrarRegistroUsuario, setMostrarRegistroUsuario] = useState(false);

  // Buscar usuarios al inicializar y cuando cambian los criterios
  useEffect(() => {
    buscarUsuarios();
  }, [nombre, activo]); // Dependencias: nombre y activo

  async function buscarUsuarios() {
    const data = await usuariosService.buscarUsuarios({ nombre, activo });
    setUsuario(data);
  }

  function agregarUsuario() {
    const nuevoUsuario = {
      id_usuario: 0,
      nombre_usr: "",
      apellido_usr: "",
      mail: "",
      observaciones: "",
      cuil: "",
      telefono: 0,
    };
    setUsuarioSeleccionado(nuevoUsuario);
    setMostrarRegistroUsuario(true);
  }

  function modificarUsuario(usuario) {
    if (!usuario.esActivo) {
      toast.error("No puede modificarse un registro inactivo");
      return;
    }
    setUsuarioSeleccionado(usuario);
    setMostrarRegistroUsuario(true);
  }

  async function guardarUsuario(data) {
    if (await usuariosService.save(data)) {
      setMostrarRegistroUsuario(false);
      buscarUsuarios();
    }
  }

  async function desactivarUsuario(id) {
    await usuariosService.remove(id);
    buscarUsuarios();
  }

  async function activarUsuario(id) {
    await usuariosService.activar(id);
    buscarUsuarios();
  }

  if (mostrarRegistroUsuario) {
    return (
      <RegistroUsuario
        guardar={guardarUsuario}
        volver={() => setMostrarRegistroUsuario(false)}
        usuario={usuarioSeleccionado}
      />
    );
  }

  return (
    <div>
      <h2>Gestión de Usuarios</h2>
      <BuscadorUsuarios
        nombre={nombre}
        setNombre={setNombre}
        activo={activo}
        setActivo={setActivo}
        buscarUsuarios={buscarUsuarios}
        agregarUsuario={agregarUsuario}
      />
      <ListadoUsuarios
        usuarios={usuario}
        agregarUsuario={agregarUsuario}
        modificar={modificarUsuario}
        desactivar={desactivarUsuario}
        activar={activarUsuario}
      />
    </div>
  );
};

export default Usuarios;
