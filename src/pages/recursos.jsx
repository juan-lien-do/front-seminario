import React, { useState, useEffect } from "react";
import ListadoRecursos from "../components/ListadoRecursos.jsx";
import { recursosService } from "../services/recursos.services.js";
import BuscadorRecursos from "../components/BuscadorRecursos.jsx";
import RegistroRecurso from "../components/RegistroRecurso.jsx";

export default function Recursos() {
  const [activo, setActivo] = useState(true);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(0)
  const [Recursos, setRecursos] = useState([]);
  const [recurso, setRecurso] = useState(null);
  const [mostrarRegistroRecurso, setMostrarRegistroRecurso] = useState(false);

  function handleTodos(){
    setCategoriaSeleccionada(0)
  }

  // esto esta al reves porque en realidad es la categoria que no queremos mostrar
  function handlePerifericos(){
    setCategoriaSeleccionada(2)
  }

  // esto esta al reves porque en realidad es la categoria que no queremos mostrar
  function handleComponentes(){
    setCategoriaSeleccionada(1)
  }

  // Función para buscar recursos
  async function Buscar() {
    const data = await recursosService.Buscar({ activo });
    setRecursos(data);
  }

  useEffect(() => {
    Buscar();
  }, []);

  // Función para agregar un nuevo recurso
  function agregarRecurso() {
    const nuevoRecurso = {
      id: 0,
      nombre: "",
      cantidad: 0,
      categoria: "",
      descripcion: "",
      existencias: [],
      activo: true,
    };
    setRecurso(nuevoRecurso);
    setMostrarRegistroRecurso(true);
  }

  // Función para modificar un recurso existente
  function modificarRecurso(recurso) {
    if (!recurso.activo) {
      alert("No puede modificarse un registro Inactivo.");
      return;
  }
    setRecurso(recurso);
    setMostrarRegistroRecurso(true);
  }

  // Función para guardar el recurso (tanto nuevo como modificado)
  async function guardarRecurso(data) {
    const resp = window.confirm(
      `¿Está seguro que quiere ${data.activo ? "desactivar" : "activar"} el registro?`
    );
    if (resp) {
      await recursosService.save(data);
      setMostrarRegistroRecurso(false);
      Buscar();
    }
  }

  // Función para desactivar un recurso
  async function desactivarRecurso(id) {
    await recursosService.desactivar(id);
    Buscar();
  }

  // Función para activar un recurso
  async function activarRecurso(id) {
    await recursosService.activar(id);
    Buscar();
  }

  // Si `mostrarRegistroRecurso` es verdadero, muestra el formulario de registro
  if (mostrarRegistroRecurso) {
    return (
      <RegistroRecurso
        guardar={guardarRecurso}
        volver={() => setMostrarRegistroRecurso(false)}
        recurso={recurso}
      />
    );
  }

  return (
    <>
      {/* Componente ListadoRecursos con funciones para modificar, activar y desactivar */}
      <BuscadorRecursos
        activo={activo}
        setActivo={setActivo}
        buscarRecursos={Buscar}
        agregarRecurso={agregarRecurso}
        handleComponentes={handleComponentes}
        handleTodos={handleTodos}
        handlePerifericos={handlePerifericos}
      />
      <ListadoRecursos
        Items={Recursos}
        modificar={modificarRecurso}
        activar={activarRecurso}
        desactivar={desactivarRecurso}
        categoriaSeleccionada={categoriaSeleccionada}
      />

      {/* Componente BuscadorRecursos */}
    </>
  );
}
