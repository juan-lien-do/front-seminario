import React, { useState } from "react";
import moment from "moment";
//import RecursosBuscar from "./ProductosBuscar";
import ListadoRecursos from "../components/ListadoRecursos.jsx";
//import RecursosRegistro from "./RecursosRegistro";
import { recursosService } from "../services/recursos.services.js";
import BuscadorRecursos from "../components/BuscadorRecursos.jsx";
import { useEffect} from "react";

function Recursos() {
  const [activo, setActivo] = useState(true);

  const [Items, setItems] = useState([]);
  const [Item, setItem] = useState(null);

  const [mostrarRegistroRecurso, setMostrarRegistroRecurso] = useState(false);

  async function Buscar() {
    console.warn(activo)
    const data = await recursosService.Buscar({activo});
    setItems(data);
  }
  useEffect(() => {
    Buscar();
  }, []);

  function Modificar(item) {
    if (!item.activo) {
      alert("No puede modificarse un registro Inactivo.");
      return;
    }
    setMostrarRegistroRecurso(true);
    setItem(item);
  }

  function Agregar() {
    setMostrarRegistroRecurso(true);
    setItem({
      id: 0,
      nombre: "",
      cantidad: 0,
      categoria: "",
      activo: true,
    });
  }

  async function desactivarRecurso(id) {
    await recursosService.desactivar(id);
    Buscar();
  }

  async function activarRecurso(id) {
    await recursosService.activar(id);
    Buscar();
  }

  async function guardarRecurso(data) {
    const resp = window.confirm(
      "Está seguro que quiere " +
        (empleado.activo ? "desactivar" : "activar") +
        " el registro?"
    );
    if (resp) {
      await recursosService.Guardar(data);
      setMostrarRegistroRecurso(false);
      buscarEmpleados();
    }
  }

  function Volver() {
    setMostrarRegistroRecurso(false);
  }

  {
    /* todavía no hay registro de recurso */
  }

  return (
    <>
      <BuscadorRecursos
        activo={activo}
        setActivo={setActivo}
        buscarRecursos={Buscar}
      />
      <ListadoRecursos
      Items={Items}
      activar={activarRecurso}
      desactivar={desactivarRecurso}
      />
      
    </>
  );
}
export default Recursos;
