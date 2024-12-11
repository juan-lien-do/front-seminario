import { useState } from "react";
import ModalDetallesEnvio from "./ModalDetallesEnvio";
import ModalEstadosEnvio from "./ModalEstadosEnvio.jsx"
import envioServices from "../../services/envios.services.js";

export default function ListadoEnvios({ envios }) {
  const [show, setShow] = useState(false);
  const [showEstados, setShowEstados] = useState(false);
  const [envio, setEnvio] = useState(null);

  // Estados posibles
  const estadosEnvio = [
    { id: 1, nombre: "Pendiente" },
    { id: 2, nombre: "En preparación" },
    { id: 3, nombre: "Enviado" },
    { id: 4, nombre: "Entregado" }, 
    { id: 5, nombre: "Devuelto Parcialmente" },
    { id: 6, nombre: "Devuelto Completo" },
    { id: 7, nombre: "Cancelado" },
    { id: 8, nombre: "Para Retiro"},
    { id: 9, nombre: "En Reparacion"},
  ];

  function handleClose() {
    setShow(false);
    setShowEstados(false)
    setEnvio(null)
  }

  function handleShow(envio) {
    setShow(true);
    setEnvio(envio);
  }

  function handleShowEstados(envio){
    setShowEstados(true)
    setEnvio(envio)
  }

  // Función para actualizar el estado del envío
  async function actualizarEstado(envioId, nuevoEstado) {
    try {
      console.log(nuevoEstado)
      const fechaActual = new Date().toISOString(); // Fecha actual en formato ISO
      await envioServices.actualizarEstado(envioId, nuevoEstado); // Enviamos solo la URL con idEnvio y nuevoEstado
      // Aquí podrías recargar los envíos o modificar el estado localmente
      console.log(`Estado actualizado: Envío ${envioId}, Estado ${nuevoEstado}, Fecha ${fechaActual}`);
    } catch (error) {
      console.error("Error al actualizar el estado del envío:", error);
    }
  }

  return (
    <div className="mt-3 table-responsive">
      <ModalDetallesEnvio show={show} handleClose={handleClose} envio={envio} />
      <ModalEstadosEnvio show={showEstados} handleClose={handleClose} envio={envio} />
      <table className="table table-hover table-sm table-bordered table-striped">
        <thead className="table-light">
          <tr>
            <th className="text-center">Empleado</th>
            <th className="text-center">Usuario</th>
            <th className="text-center">Último Estado</th>
            <th className="text-center">Fecha</th>
            <th className="text-center">Detalles</th>
          </tr>
        </thead>
        <tbody>
          {envios.map((envio) => {
            // Verificamos si el estado actual del envío es "Entregado" (id: 4)
            const estadoActual = envio?.listaCambiosEstado?.filter((x) => !x.fechaFin).at(0)?.idEstadoEnvio;
            const esEntregado = estadoActual === 4; // Verificamos si el estado es "Entregado"
            
            return (
              <tr
                key={envio.idEnvio}
                className={esEntregado ? "table-success" : ""} // Si es entregado, aplicamos la clase "table-success"
              >
                <td className="text-center">
                  {envio?.nombreEmpleado} - <code>{envio?.cuilEmpleado}</code>
                </td>
                <td className="text-center">{envio.nombreUsuario}</td>
                <td className="text-center">
                  <select
                    value={estadoActual || ""}
                    onChange={(e) =>
                      actualizarEstado(envio.idEnvio, parseInt(e.target.value)) // Convertimos el valor a entero
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
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
