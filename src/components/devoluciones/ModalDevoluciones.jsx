import { Button, Modal } from "react-bootstrap";

function ModalDevoluciones({ show, handleClose, envio, onConfirmDevolucion }) {
  const confirmarDevolucion = () => {
    // Implementar la lógica de confirmación aquí
    console.log("Devolución confirmada");
    onConfirmDevolucion(envio); // Pasar los productos a la función de confirmación
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Detalles del Envío para Devolución</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h3>Recursos</h3>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Seleccionar</th>
              <th>Cantidad</th>
              <th>Recurso</th>
              <th>Ubicación</th>
            </tr>
          </thead>
          <tbody>
            {envio?.detallesEnvioRecurso?.map((det) => (
              <tr key={det.idDetalleRecurso}>
                <td>
                  <input
                    type="checkbox"
                    disabled={det.devuelto} // Deshabilitar si ya fue devuelto
                  />
                </td>
                <td>{det.cantidad}</td>
                <td>{det.existenciaDTO.nombreRecurso}</td>
                <td>{det.existenciaDTO.nombreDeposito}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3>Computadoras</h3>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Seleccionar</th>
              <th>Cantidad</th>
              <th>Computadora</th>
              <th>Número de Serie</th>
            </tr>
          </thead>
          <tbody>
            {envio?.detallesEnvioComputadora?.map((det) => (
              <tr key={det.idDetalleComputadora}>
                <td>
                  <input
                    type="checkbox"
                    disabled={det.devuelto} // Deshabilitar si ya fue devuelto
                  />
                </td>
                <td>{det.cantidad}</td>
                <td>{det.computadoraDTO.nombreComputadora}</td>
                <td>{det.computadoraDTO.numeroSerie}</td>
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
