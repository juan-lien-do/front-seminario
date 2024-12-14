import { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";

function ModalDevoluciones({ show, handleClose, envio, onConfirmDevolucion }) {
  const [productosSeleccionados, setProductosSeleccionados] = useState({
    recursos: {},
    computadoras: {},
  });

  useEffect(() => {
    if (show) {
      setProductosSeleccionados({
        recursos: envio?.detallesEnvioRecurso?.reduce((acc, det) => {
          if (det?.esDevuelto === 1 || det?.esDevuelto === true) {
            acc[det.idDetalleRecurso] = true;
          }
          return acc;
        }, {}),
        computadoras: envio?.detallesEnvioComputadora?.reduce((acc, det) => {
          if (det?.esDevuelto === 1 || det?.esDevuelto === true) {
            acc[det.idDetalleComputadora] = true;
          }
          return acc;
        }, {}),
      });
    }
  }, [show, envio]);

  const handleCheckboxChange = (tipo, id, devuelto) => {
    if (devuelto === 1 || devuelto === true) return;

    setProductosSeleccionados((prev) => ({
      ...prev,
      [tipo]: {
        ...prev[tipo],
        [id]: !prev[tipo][id],
      },
    }));
  };

  const confirmarDevolucion = async () => {
    const recursosADevolver = envio.detallesEnvioRecurso.filter(
      (det) =>
        productosSeleccionados.recursos[det.idDetalleRecurso] &&
        (det.esDevuelto !== 1 && det.esDevuelto !== true)
    );

    const computadorasADevolver = envio.detallesEnvioComputadora.filter(
      (det) =>
        productosSeleccionados.computadoras[det.idDetalleComputadora] &&
        (det.esDevuelto !== 1 && det.esDevuelto !== true)
    );

    const todosRecursosDevueltos = envio.detallesEnvioRecurso.every(
      (det) =>
        productosSeleccionados.recursos[det.idDetalleRecurso] ||
        det.esDevuelto === 1 ||
        det.esDevuelto === true
    );

    const todasComputadorasDevueltas = envio.detallesEnvioComputadora.every(
      (det) =>
        productosSeleccionados.computadoras[det.idDetalleComputadora] ||
        det.esDevuelto === 1 ||
        det.esDevuelto === true
    );

    const nuevoEstado =
      todosRecursosDevueltos && todasComputadorasDevueltas ? 6 : 5;

    console.log("Confirmar devolución con estado:", nuevoEstado);

    try {
      await onConfirmDevolucion(
        {
          recursos: recursosADevolver,
          computadoras: computadorasADevolver,
        },
        nuevoEstado
      );
      handleClose();
    } catch (error) {
      console.error("Error al confirmar la devolución:", error);
    }
  };

  const obtenerFechaDeDevolucion = (productoId, tipo) => {
    const lista = tipo === "recursos" ? envio?.detallesEnvioRecurso : envio?.detallesEnvioComputadora;
    const listaCambioEstado = lista?.find(
      (det) =>
        det.idDetalleRecurso === productoId || det.idDetalleComputadora === productoId
    )?.listaCambioEstado;

    const cambioDeEstado = listaCambioEstado?.find(
      (cambio) => cambio.estado === "devuelto" || cambio.estado === "devuelta"
    );

    return cambioDeEstado ? new Date(cambioDeEstado.fechaCambio).toLocaleDateString() : "N/A";
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Body>
        <h3>Recursos</h3>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Seleccionar</th>
              <th>Cantidad</th>
              <th>Recurso</th>
              <th>Ubicación</th>
              <th>Fecha de Devolución</th>
            </tr>
          </thead>
          <tbody>
            {envio?.detallesEnvioRecurso?.map((det) => (
              <tr key={det.idDetalleRecurso}>
                <td>
                  {det?.esDevuelto === 1 || det?.esDevuelto === true ? (
                    <span className="text-success">✔️ Devuelto</span>
                  ) : (
                    <input
                      type="checkbox"
                      checked={productosSeleccionados.recursos[det.idDetalleRecurso] || false}
                      onChange={() =>
                        handleCheckboxChange("recursos", det.idDetalleRecurso, det.esDevuelto)
                      }
                      disabled={det?.esDevuelto === 1 || det?.esDevuelto === true}
                    />
                  )}
                </td>
                <td>{det.cantidad}</td>
                <td>{det.existenciaDTO.nombreRecurso}</td>
                <td>{det.existenciaDTO.nombreDeposito}</td>
                <td>{obtenerFechaDeDevolucion(det.idDetalleRecurso, "recursos")}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3>Computadoras</h3>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Seleccionar</th>
              <th>Número de serie</th>
              <th>Masterizado</th>
              <th>Número de WS</th>
              <th>Fecha de Devolución</th>
            </tr>
          </thead>
          <tbody>
            {envio?.detallesEnvioComputadora?.map((det) => (
              <tr key={det.idDetalleComputadora}>
                <td>
                  {det?.esDevuelto === 1 || det?.esDevuelto === true ? (
                    <span className="text-success">✔️ Devuelto</span>
                  ) : (
                    <input
                      type="checkbox"
                      checked={
                        productosSeleccionados.computadoras[det.idDetalleComputadora] || false
                      }
                      onChange={() =>
                        handleCheckboxChange("computadoras", det.idDetalleComputadora, det.esDevuelto)
                      }
                      disabled={det?.esDevuelto === 1 || det?.esDevuelto === true}
                    />
                  )}
                </td>
                <td>{det.computadoraDTO.nroSerie}</td>
                <td>
                  {det.computadoraDTO.esMasterizado ? (
                    <i className="fa-solid fa-check"></i>
                  ) : (
                    <i className="fa-solid fa-xmark"></i>
                  )}
                </td>
                <td>{det.computadoraDTO.nroWs}</td>
                <td>{obtenerFechaDeDevolucion(det.idDetalleComputadora, "computadoras")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={confirmarDevolucion}>
          Confirmar Devolución
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalDevoluciones;