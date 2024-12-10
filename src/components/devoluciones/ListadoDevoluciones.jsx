import { useState } from "react";
import { Button } from "react-bootstrap";
import ModalDetallesEnvio from "../envios/ModalDetallesEnvio";

function ListadoDevoluciones({ devoluciones, abrirModalDevolucion, estadoSeleccionado }) {
  const [showDescripcion, setShowDescripcion] = useState(false);
  const [envioSeleccionado, setEnvioSeleccionado] = useState(null); // Para guardar el envio seleccionado

  const handleDescripcionClose = () => setShowDescripcion(false);
  const handleDescripcionShow = (devolucion) => {
    setEnvioSeleccionado(devolucion);
    setShowDescripcion(true); // Mostrar el modal con los detalles
  };

  const devolucionesFiltradas = devoluciones.filter((devolucion) => {
    const estadoActual = devolucion.listaCambiosEstado?.find((x) => !x.fechaFin)?.idEstadoEnvio;
  
    if (estadoSeleccionado === 4 || estadoSeleccionado === 5) {
      return estadoActual === 4 || estadoActual === 5;
    } else if (estadoSeleccionado === 6) {
      return estadoActual === 6;
    }
    return true; // Mostrar todos si no se especifica filtro
  });
  

  return (
    <div className="container-fluid">
      {/* Modal para los detalles del envío */}
      <ModalDetallesEnvio
        show={showDescripcion}
        handleClose={handleDescripcionClose}
        envio={envioSeleccionado}
      />

      <div className="card" id="TableSorterCard">
        <div className="table-responsive">
          <table className="table table-hover table-sm table-bordered table-striped">
            <thead className="table-light">
              <tr>
                <th className="text-center">Empleado</th>
                <th className="text-center">Usuario</th>
                <th className="text-center">Detalles</th>
                <th className="text-center">Devolucion</th>
              </tr>
            </thead>
            <tbody>
              {devolucionesFiltradas && devolucionesFiltradas.length > 0 ? (
                devolucionesFiltradas.map((devolucion) => (
                  <tr key={devolucion.idEnvio}>
                    <td className="text-center">{devolucion.nombreEmpleado}</td>
                    <td className="text-center">{devolucion.nombreUsuario}</td>
                    <td className="text-center">
                      <button
                        className="btn btn-info btn-sm"
                        onClick={() => handleDescripcionShow(devolucion)}
                      >
                        Ver detalles
                      </button>
                    </td>
                    <td className="text-center">
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => abrirModalDevolucion(devolucion)}
                      >
                        Confirmar Devolución
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">No hay devoluciones</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default ListadoDevoluciones;
