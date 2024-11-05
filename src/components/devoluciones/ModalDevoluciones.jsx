// ModalDevoluciones.jsx
import { useState } from "react";
import React from "react";
import { Button, Modal } from "react-bootstrap";


function ModalDevoluciones({ show, handleClose, envio, onConfirmDevolucion }) {
  const [productosSeleccionados, setProductosSeleccionados] = useState({ recursos: {}, computadoras: {} });

  const handleCheckboxChange = (tipo, id, devuelto) => {
    if (devuelto) return; // No permitir seleccionar si ya está devuelto
    setProductosSeleccionados((prev) => ({
      ...prev,
      [tipo]: {
        ...prev[tipo],
        [id]: !prev[tipo][id], // Cambiar el estado de selección
      },
    }));
  };

  const confirmarDevolucion = () => {
    const productosADevolver = {
      recursos: envio.detallesEnvioRecurso.filter((det) => productosSeleccionados.recursos[det.idDetalleRecurso]),
      computadoras: envio.detallesEnvioComputadora.filter((det) => productosSeleccionados.computadoras[det.idDetalleComputadora]),
    };

    onConfirmDevolucion(productosADevolver);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      {/* Modal content */}
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
                    onChange={() => handleCheckboxChange("recursos", det.idDetalleRecurso, det.devuelto)}
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

        {/* Similar table structure for Computadoras */}
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
