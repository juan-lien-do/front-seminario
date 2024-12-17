import React, { useState, useEffect } from "react";
import ListadoRecursos from "../components/recursos/ListadoRecursos.jsx";
import { recursosService } from "../services/recursos.services.js";
import BuscadorRecursos from "../components/recursos/BuscadorRecursos.jsx";
import RegistroRecurso from "../components/recursos/RegistroRecurso.jsx";
import { toast } from "sonner";
import LoaderBloque from "../components/LoaderBloque.jsx";

export default function Recursos() {
  const [activo, setActivo] = useState(true);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(0);
  const [Recursos, setRecursos] = useState([]);
  const [recurso, setRecurso] = useState(null);
  const [mostrarRegistroRecurso, setMostrarRegistroRecurso] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [estaCargando, setEstaCargado] = useState(true);

  function handleTodos() {
    setCategoriaSeleccionada(0);
  }

  function handlePerifericos() {
    setCategoriaSeleccionada(2);
  }

  function handleComponentes() {
    setCategoriaSeleccionada(1);
  }

  // Función para buscar recursos
  async function Buscar() {
    setEstaCargado(true);
    const data = await recursosService.Buscar({ activo });
    console.log("Datos obtenidos:", data);
    const recursosFiltrados = data.filter(
      (recurso) =>
        (categoriaSeleccionada === 0 || recurso.categoria === categoriaSeleccionada) &&
        recurso.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setRecursos(recursosFiltrados);
    setEstaCargado(false);
  }

  useEffect(() => {
    Buscar();
  }, [activo, categoriaSeleccionada, searchTerm]);

  function agregarRecurso() {
    const nuevoRecurso = {
      idRecurso: 0,
      nombre: "",
      descripcion: "",
      categoria: 1,
      activo: true,
    };
    setRecurso(nuevoRecurso);
    setMostrarRegistroRecurso(true);
  }

  function modificarRecurso(recurso) {
    if (!recurso.activo) {
      toast.error("No puede modificarse un registro inactivo");
      return;
    }
    setRecurso(recurso);
    setMostrarRegistroRecurso(true);
  }

  async function guardarRecurso(data) {
    if (!(await recursosService.save(data))) {
      setMostrarRegistroRecurso(false);
      Buscar();
    }
  }

  async function desactivarRecurso(id) {
    await recursosService.desactivar(id);
    Buscar();
  }

  async function activarRecurso(id) {
    await recursosService.activar(id);
    Buscar();
  }

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
        buscarRecursos={Buscar}
        agregarRecurso={agregarRecurso}
        handleTodos={handleTodos}
        handleComponentes={handleComponentes}
        handlePerifericos={handlePerifericos}
        setSearchTerm={setSearchTerm}
        categoriaSeleccionada={categoriaSeleccionada}
      />
      {estaCargando ? (
        <LoaderBloque texto={"Cargando recursos..."} />
      ) : (
        <ListadoRecursos
          Items={Recursos}
          activar={activarRecurso}
          desactivar={desactivarRecurso}
          modificar={modificarRecurso}
          categoriaSeleccionada={categoriaSeleccionada}
          Buscar={Buscar}
        />
      )}
    </>
  );
}