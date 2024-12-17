import { useState } from "react";
import ModalDetallesEnvio from "./ModalDetallesEnvio";
import ModalEstadosEnvio from "./ModalEstadosEnvio.jsx";
import ModalGaleriaFotos from "./ModalGaleriaFotos.jsx";
import envioServices from "../../services/envios.services.js";
import { Pagination } from "react-bootstrap";

export default function ListadoEnvios({ envios, recargarEnvios }) {
  const [show, setShow] = useState(false);
  const [showEstados, setShowEstados] = useState(false);
  const [showFotos, setShowFotos] = useState(false);
  const [envio, setEnvio] = useState(null);
  const [fotos, setFotos] = useState([]);
  const [nuevasFotos, setNuevasFotos] = useState([]);
  const [enviosLocal, setEnviosLocal] = useState(envios);

  // paginacion

  const [paginaActual, setPaginaActual] = useState(1)
  const itemsPorPagina = 10;

  // paginación
  const indexOfLastItem = paginaActual * itemsPorPagina;
  const indexOfFirstItem = indexOfLastItem - itemsPorPagina;
  const currentEnvios = enviosLocal.slice(indexOfFirstItem, indexOfLastItem);
  const handlePageChange = (pageNumber) => setPaginaActual(pageNumber);

  const cantidadPaginas = Math.ceil(enviosLocal.length / itemsPorPagina);
  const paginationItems = []; // este es un array de objetos de DOM
  for (let i = 1; i <= cantidadPaginas; i++) {
    paginationItems.push(
      <Pagination.Item 
        key={i} 
        active={i === paginaActual} 
        onClick={() => handlePageChange(i)}
      >
        {i}
      </Pagination.Item>
    );
  }



  // Estados posibles
  const estadosEnvio = [
    { id: 1, nombre: "Pendiente" },
    { id: 2, nombre: "En preparación" },
    { id: 3, nombre: "Enviado" },
    { id: 4, nombre: "Entregado" },
    { id: 5, nombre: "Devuelto Parcialmente" },
    { id: 6, nombre: "Devuelto Completo" },
    { id: 7, nombre: "Cancelado" },
    { id: 8, nombre: "Para Retiro" },
    { id: 9, nombre: "En Reparación" },
  ];

  const transicionesPosibles = [
    {id: 1, transiciones:[2, 9, 7]},
    {id: 2, transiciones:[9, 7, 8]},
    {id: 3, transiciones:[4, 7, 8]},
    {id: 4, transiciones:[]},
    {id: 5, transiciones:[]},
    {id: 6, transiciones:[]},
    {id: 7, transiciones:[]},
    {id: 8, transiciones:[3, 4, 7]},
    {id: 9, transiciones:[7, 8]},
  ]

  const manejarCambio = (e) => {
    const nuevoEstado = parseInt(e.target.value);
    setEstadoActual(null); // Restablece temporalmente el valor
    setTimeout(() => setEstadoActual(nuevoEstado), 0);
    actualizarEstado(envio.idEnvio, nuevoEstado);
  };

  function handleClose() {
    setShow(false);
    setShowEstados(false);
    setShowFotos(false);
    setEnvio(null);
    setFotos([]);
    setNuevasFotos([]);
  }

  function handleShow(envio) {
    setShow(true);
    setEnvio(envio);
  }

  function handleShowEstados(envio) {
    setShowEstados(true);
    setEnvio(envio);
  }

  async function actualizarEstado(envioId, nuevoEstado) {
    try {
      console.log(envioId + "-" + nuevoEstado)
      // Actualizar el estado localmente primero
      const fechaActual = new Date().toISOString(); // Fecha actual en formato ISO
      const enviosActualizados = enviosLocal.map((envio) =>
        envio.idEnvio === envioId ? { ...envio, estado: nuevoEstado, fecha: fechaActual } : envio
      );
      setEnviosLocal(enviosActualizados);

      // Hacer la solicitud al servidor
      await envioServices.actualizarEstado(envioId, nuevoEstado);
      recargarEnvios(); // Recargar envíos después de actualizar el estado en el servidor
      console.log(`Estado actualizado: Envío ${envioId}, Estado ${nuevoEstado}, Fecha ${fechaActual}`);
    } catch (error) {
      console.error("Error al actualizar el estado del envío:", error);
      // Revertir el cambio en caso de error
      recargarEnvios();
    }
  }

  function handleShowFotos(envio) {
    console.log("Abrir modal de fotos para el envío:", envio);
    setShowFotos(true);
    setEnvio(envio);

    // Hacer la solicitud para obtener las fotos usando el idEnvio
    envioServices
      .obtenerFotos(envio.idEnvio)
      .then((response) => {
        console.log("Respuesta del backend:", response); // Verifica la estructura de la respuesta

        // Comprobamos si la respuesta tiene la estructura esperada
        if (response && Array.isArray(response)) {
          const fotosProcesadas = response.map((foto) => ({
            url: `data:image/jpeg;base64,${foto.base64Decode}`,
            nombreArchivo: foto.nombreArchivo,
          }));

          console.log("Fotos obtenidas:", fotosProcesadas);
          setFotos(fotosProcesadas);
        } else {
          console.error("Estructura de respuesta inesperada:", response);
        }
      })
      .catch((error) => {
        console.error("Error al obtener fotos:", error);
      });
  }

  function formatearFecha(fechaISO) {
    const fecha = new Date(fechaISO);
    const dia = String(fecha.getDate()).padStart(2, '0');
    const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // Los meses van de 0 a 11
    const año = fecha.getFullYear();
    const horas = String(fecha.getHours()).padStart(2, '0');
    const minutos = String(fecha.getMinutes()).padStart(2, '0');
    const segundos = String(fecha.getSeconds()).padStart(2, '0');
    return `${dia}/${mes}/${año} ${horas}:${minutos}:${segundos}`;
  }

  return (
    <div className="mt-3 table-responsive">
      <ModalDetallesEnvio show={show} handleClose={handleClose} envio={envio} />
      <ModalEstadosEnvio show={showEstados} handleClose={handleClose} envio={envio} />
      <ModalGaleriaFotos show={showFotos} handleClose={handleClose} envio={envio} />
      <table className="table table-hover table-sm table-bordered table-striped">
        <thead className="table-light">
          <tr>
            <th className="text-center">ID</th>
            <th className="text-center">Empleado</th>
            <th className="text-center">Usuario</th>
            <th className="text-center">Cambiar estado</th>
            <th className="text-center">Último estado</th>
            <th className="text-center">Detalles</th>
            <th className="text-center">Fotos</th>
          </tr>
        </thead>
        <tbody>
          {currentEnvios.map((envio) => {
            const estadoActual = envio?.listaCambiosEstado?.filter((x) => !x.fechaFin).at(0)?.idEstadoEnvio;
            const esEntregado = estadoActual === 4;
            const transicionPosible = transicionesPosibles.find(x => x.id === estadoActual).transiciones;


            return (
              <tr
                key={envio.idEnvio}
                className={esEntregado ? "table-success" : ""}
              >
              <td className="text-center">{envio.idEnvio}</td>
                <td className="text-center">
                  {envio?.nombreEmpleado} - <code>{envio?.cuilEmpleado}</code>
                </td>
                <td className="text-center">{envio.nombreUsuario}</td>
                <td className="text-center">
                  {
                    transicionPosible.length === 0
                    ?
                    <select disabled className="form-select" defaultValue={estadoActual}>
                      estadoActual
                    </select>
                    :


                  <select
                    value={estadoActual || ""}
                    onChange={(e) =>
                    {
                      console.log(`Cambiando estado a ${e.target.value}`);
                      actualizarEstado(envio.idEnvio, parseInt(e.target.value))
                    }
                    }
                    className="form-select"
                  >
                    <option value="" >Seleccionar estado...</option>
                    {estadosEnvio
                      .filter(x => transicionPosible.includes(x.id))
                      .map((estado) => (
                      <option key={estado.id} value={estado.id}>
                        {estado.nombre}
                      </option>
                    ))}
                  </select>
                  }
                </td>
                <td className="text-center">
                  {estadosEnvio.find(x => x.id === estadoActual).nombre} {" - "}
                  {envio?.listaCambiosEstado?.filter((x) => !x.fechaFin).at(0)
                    ?.fechaInicio ? formatearFecha(envio.listaCambiosEstado.filter((x) => !x.fechaFin).at(0).fechaInicio) : "N/A"}
                </td>
                <td className="text-center">
                  <button
                    className="btn btn-info me-1"
                    onClick={() => handleShow(envio)}
                  >
                    Detalles
                  </button>
                  <button
                    className="btn btn-warning me-2"
                    title="Modificar"
                    onClick={() => handleShowEstados(envio)}
                  >
                    Estados anteriores
                  </button>
                </td>
                <td className="text-center">
                  <button
                    className="btn btn-primary"
                    onClick={() => handleShowFotos(envio)}
                  >
                    Ver Fotos
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <Pagination className="justify-content-center mt-3">
        {paginationItems}
      </Pagination>
    </div>
  );
}