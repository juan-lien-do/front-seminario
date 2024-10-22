import React, { useState, useEffect } from "react";
import ListadoRecursos from "../components/ListadoRecursos.jsx";
import { recursosService } from "../services/recursos.services.js";
import BuscadorRecursos from "../components/BuscadorRecursos.jsx";
import RegistroRecurso from "../components/RegistroRecurso.jsx";
import { toast } from "sonner";

export default function Recursos() {
  const [activo, setActivo] = useState(true);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(0)
  const [Recursos, setRecursos] = useState([]);
  const [recurso, setRecurso] = useState(null);
  const [mostrarRegistroRecurso, setMostrarRegistroRecurso] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

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
      toast.error("No puede modificarse un registro Inactivo.");
      return;
  }
    setRecurso(recurso);
    setMostrarRegistroRecurso(true);
  }

  // Función para guardar el recurso (tanto nuevo como modificado)
  async function guardarRecurso(data) {
    
    if (!(await recursosService.save(data))) {
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

  // Función para buscar recursos por nombre
  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      Buscar(); // Si el término está vacío, busca todos
    } else {
      const filteredRecursos = Recursos.filter(recurso =>
        recurso.nombre.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setRecursos(filteredRecursos);
    }
  };

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
      <BuscadorRecursos
        activo={activo}
        setActivo={setActivo}
        buscarRecursos={handleSearch} // Cambiar a handleSearch
        agregarRecurso={agregarRecurso}
        handleComponentes={handleComponentes}
        handleTodos={handleTodos}
        handlePerifericos={handlePerifericos}
        setSearchTerm={setSearchTerm}
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
