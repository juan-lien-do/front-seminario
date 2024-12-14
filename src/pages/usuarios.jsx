import React, { useState, useEffect } from "react";
import ListadoUsuarios from "../components/usuarios/ListadoUsuarios";
import BuscadorUsuarios from "../components/usuarios/BuscadorUsuarios";
import RegistroUsuario from "../components/usuarios/RegistroUsuarios";
import { usuariosService } from "../services/usuarios.services";
import { toast } from "sonner";

const Usuarios = () => {
  const [nombre, setNombre] = useState("");
  const [activo, setActivo] = useState("activo"); // 'activo' por defecto
  const [todosLosUsuarios, setTodosLosUsuarios] = useState([]); // Almacena todos los usuarios
  const [usuariosFiltrados, setUsuariosFiltrados] = useState([]);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [mostrarRegistroUsuario, setMostrarRegistroUsuario] = useState(false);

  useEffect(() => {
    cargarUsuarios();
  }, []);

  useEffect(() => {
    filtrarUsuarios(); // Filtrar usuarios cuando cambia 'nombre' o 'activo'
  }, [nombre, activo, todosLosUsuarios]);

  async function cargarUsuarios() {
    const data = await usuariosService.buscarUsuarios({ nombre: "", activo: "" }); // Cargar todos
    setTodosLosUsuarios(data || []); // Manejar caso de respuesta vacía
  }

  function filtrarUsuarios() {
    const usuariosFiltrados = todosLosUsuarios.filter((usuario) => {
      const coincideNombre =
        nombre === "" ||
        usuario.nombre_usr.toLowerCase().includes(nombre.toLowerCase()) ||
        usuario.nombre.toLowerCase().includes(nombre.toLowerCase());
      const coincideActivo =
        activo === "todos" ||
        (activo === "activo" && usuario.esActivo) ||
        (activo === "inactivo" && !usuario.esActivo);
      return coincideNombre && coincideActivo;
    });
    setUsuariosFiltrados(usuariosFiltrados);
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
      toast.error("No puede modificarse un usuario inactivo");
      return;
    }
    setUsuarioSeleccionado(usuario);
    setMostrarRegistroUsuario(true);
  }

  async function guardarUsuario(data) {
    if (await usuariosService.save(data)) {
      setMostrarRegistroUsuario(false);
      cargarUsuarios();
    }
  }

  async function desactivarUsuario(id) {
    await usuariosService.remove(id);
    cargarUsuarios();
  }

  async function activarUsuario(id) {
    await usuariosService.activar(id);
    cargarUsuarios();
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
        agregarUsuario={agregarUsuario}
      />
      <ListadoUsuarios
        usuarios={usuariosFiltrados}
        agregarUsuario={agregarUsuario}
        modificar={modificarUsuario}
        desactivar={desactivarUsuario}
        activar={activarUsuario}
      />
    </div>
  );
};

export default Usuarios;
