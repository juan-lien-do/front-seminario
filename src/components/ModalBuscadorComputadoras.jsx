import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

export default function ModalBuscadorComputadoras({ show, handleClose, existencias}) {
    // a este le di poca bola
  return (
    <Modal show={show} onHide={handleClose} size="lg"
>
      <Modal.Header closeButton>
        <Modal.Title >Existencias</Modal.Title>
      </Modal.Header>
      <Modal.Body>

        <div className="table-responsive">
          <table className="table table-striped">
            <thead className="thead-dark">
              <tr>
                <th className="text-center"> Cantidad </th>
                <th className="text-center"> Deposito </th>
                <th className="text-center"> Ubicacion </th>
              </tr>
            </thead>
            <tbody>
                {
                    existencias.map((existencia) =>

                        <tr key={existencia.id}>
                            <td className="text-center">
                                {existencia.cantidad}
                            </td>
                            <td className="text-center">
                                {existencia.deposito?.nombre}
                            </td>
                            <td className="text-center">
                                {existencia.deposito?.ubicacion}
                            </td>
                        </tr>
                    
                    )
                }
            </tbody>
          </table>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
