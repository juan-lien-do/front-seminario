import { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";

function ModalDevoluciones({ show, handleClose, envio, onConfirmDevolucion }) {
  // Estado para los productos seleccionados
  const [productosSeleccionados, setProductosSeleccionados] = useState({
    recursos: {},
    computadoras: {},
  });

  useEffect(() => {
    // Cuando se abre el modal, inicializamos el estado de los productos seleccionados
    const inicializarSeleccionados = () => {
      setProductosSeleccionados({
        recursos: envio?.detallesEnvioRecurso?.reduce((acc, det) => {
          // Marcar como seleccionado si ya fue devuelto
          if (det.es_devuelto === 1 || det.es_devuelto === true) {
            acc[det.idDetalleRecurso] = true;
          }
          return acc;
        }, {}),
        computadoras: envio?.detallesEnvioComputadora?.reduce((acc, det) => {
          // Marcar como seleccionado si ya fue devuelto
          if (det.esDevuelto === 1 || det.esDevuelto === true) {
            acc[det.idDetalleComputadora] = true;
          }
          return acc;
        }, {}),
      });
    };

    // Solo inicializamos si el modal está abierto
    if (show) {
      inicializarSeleccionados();
    }
  }, [show, envio]); // Dependencia de `show` y `envio` para actualizar el estado cuando cambien

  const handleCheckboxChange = (tipo, id, devuelto) => {
    // Si el producto ya fue devuelto, no permitir cambios
    if (devuelto === 1 || devuelto === true) return;

    setProductosSeleccionados((prev) => ({
      ...prev,
      [tipo]: {
        ...prev[tipo],
        [id]: !prev[tipo][id], // Alternar selección
      },
    }));
  };

  const confirmarDevolucion = () => {
    // Filtramos los productos seleccionados que no han sido devueltos
    const productosADevolver = {
      recursos: envio.detallesEnvioRecurso.filter(
        (det) =>
          productosSeleccionados.recursos[det.idDetalleRecurso] &&
          (det.es_devuelto !== 1 && det.es_devuelto !== true)
      ),
      computadoras: envio.detallesEnvioComputadora.filter(
        (det) =>
          productosSeleccionados.computadoras[det.idDetalleComputadora] &&
          (det.esDevuelto !== 1 && det.esDevuelto !== true)
      ),
    };

    console.log("Productos a devolver:", productosADevolver); // Verificación de los productos seleccionados

    onConfirmDevolucion(productosADevolver);
    handleClose();
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
            </tr>
          </thead>
          <tbody>
            {envio?.detallesEnvioRecurso?.map((det) => (
              <tr key={det.idDetalleRecurso}>
                <td>
                  <input
                    type="checkbox"
                    checked={productosSeleccionados.recursos[det.idDetalleRecurso] || false}
                    onChange={() =>
                      handleCheckboxChange("recursos", det.idDetalleRecurso, det.es_devuelto)
                    }
                    disabled={det.es_devuelto === 1 || det.es_devuelto === true} // Deshabilitar si ya fue devuelto
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
              <th>Número de serie</th>
              <th>Masterizado</th>
              <th>Número de WS</th>
            </tr>
          </thead>
          <tbody>
            {envio?.detallesEnvioComputadora?.map((det) => (
              <tr key={det.idDetalleComputadora}>
                <td>
                  <input
                    type="checkbox"
                    checked={productosSeleccionados.computadoras[det.idDetalleComputadora] || false}
                    onChange={() =>
                      handleCheckboxChange("computadoras", det.idDetalleComputadora, det.esDevuelto)
                    }
                    disabled={det.esDevuelto === 1 || det.esDevuelto === true} // Deshabilitar si ya fue devuelto
                  />
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
