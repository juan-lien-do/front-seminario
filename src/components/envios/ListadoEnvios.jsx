import { useState } from "react";
import ModalDetallesEnvio from "./ModalDetallesEnvio";
import ModalEstadosEnvio from "./ModalEstadosEnvio.jsx";
import ModalGaleriaFotos from "./ModalGaleriaFotos.jsx";
import envioServices from "../../services/envios.services.js";

export default function ListadoEnvios({ envios, recargarEnvios }) {
  const [show, setShow] = useState(false);
  const [showEstados, setShowEstados] = useState(false);
  const [showFotos, setShowFotos] = useState(false);
  const [envio, setEnvio] = useState(null);
  const [fotos, setFotos] = useState([]);
  const [nuevasFotos, setNuevasFotos] = useState([]);
  const [enviosLocal, setEnviosLocal] = useState(envios);

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

  return (
    <div className="mt-3 table-responsive">
      <ModalDetallesEnvio show={show} handleClose={handleClose} envio={envio} />
      <ModalEstadosEnvio show={showEstados} handleClose={handleClose} envio={envio} />
      <ModalGaleriaFotos show={showFotos} handleClose={handleClose} envio={envio} />
      <table className="table table-hover table-sm table-bordered table-striped">
        <thead className="table-light">
          <tr>
            <th className="text-center">Empleado</th>
            <th className="text-center">Usuario</th>
            <th className="text-center">Último Estado</th>
            <th className="text-center">Fecha</th>
            <th className="text-center">Detalles</th>
            <th className="text-center">Fotos</th>
          </tr>
        </thead>
        <tbody>
          {enviosLocal.map((envio) => {
            const estadoActual = envio?.listaCambiosEstado?.filter((x) => !x.fechaFin).at(0)?.idEstadoEnvio;
            const esEntregado = estadoActual === 4;

            return (
              <tr
                key={envio.idEnvio}
                className={esEntregado ? "table-success" : ""}
              >
                <td className="text-center">
                  {envio?.nombreEmpleado} - <code>{envio?.cuilEmpleado}</code>
                </td>
                <td className="text-center">{envio.nombreUsuario}</td>
                <td className="text-center">
                  <select
                    value={estadoActual || ""}
                    onChange={(e) =>
                      actualizarEstado(envio.idEnvio, parseInt(e.target.value))
                    }
                    className="form-select"
                  >
                    {estadosEnvio.map((estado) => (
                      <option key={estado.id} value={estado.id}>
                        {estado.nombre}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="text-center">
                  {
                    envio?.listaCambiosEstado?.filter((x) => !x.fechaFin).at(0)
                      ?.fechaInicio || "N/A"
                  }
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
    </div>
  );
}