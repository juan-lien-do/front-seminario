import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function ListadoDevoluciones({ devoluciones, abrirModalDevolucion }) {
  const [showDescripcion, setShowDescripcion] = useState(false);
  const [textoDescripcion, setTextoDescripcion] = useState("");

  const handleDescripcionClose = () => setShowDescripcion(false);
  const handleDescripcionShow = () => setShowDescripcion(true);

  function verDescripcion(devolucion) {
    const descripcion = devolucion.detallesEnvioRecurso?.map((detalle) => {
      const recursoNombre = detalle.existenciaDTO?.nombreRecurso || "Recurso desconocido";
      const cantidad = detalle.cantidad || "Cantidad no especificada";
      const modelo = detalle.existenciaDTO?.modelo || "Modelo no especificado";
      const otroDetalle = detalle.existenciaDTO?.otroDetalle || "Sin detalles adicionales";

      return `Nombre del recurso: ${recursoNombre}, Cantidad: ${cantidad}, Modelo: ${modelo}, Otros detalles: ${otroDetalle}`;
    }).join(", ") || "No hay detalles disponibles";

    setTextoDescripcion(descripcion);
    handleDescripcionShow();
  }

  return (
    <div className="container-fluid">
      {/* Modal para la descripción */}
      <Modal show={showDescripcion} onHide={handleDescripcionClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Descripción del Detalle</Modal.Title>
        </Modal.Header>
        <Modal.Body>{textoDescripcion}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDescripcionClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="card" id="TableSorterCard">
        <div className="table-responsive">
          <table className="table table-hover table-sm table-bordered table-striped">
            <thead className="table-light">
              <tr>
                <th className="text-center">Empleado</th>
                <th className="text-center">Usuario</th>
                <th className="text-center">Fecha de Entrega</th>
                <th className="text-center">Detalles</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {devoluciones && devoluciones.map((devolucion) => (
                <tr key={devolucion.idEnvio}>
                  <td className="text-center">{devolucion.nombreEmpleado}</td>
                  <td className="text-center">{devolucion.nombreUsuario}</td>
                  <td className="text-center">{devolucion.fechaEntrega || "Fecha no disponible"}</td>
                  <td className="text-center">
                    {devolucion.detallesEnvioRecurso && devolucion.detallesEnvioRecurso.length > 0 ? (
                      <button
                        className="btn btn-info btn-sm"
                        onClick={() => verDescripcion(devolucion)}
                      >
                        Ver detalles
                      </button>
                    ) : (
                      <span>Sin detalles</span>
                    )}
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ListadoDevoluciones;
