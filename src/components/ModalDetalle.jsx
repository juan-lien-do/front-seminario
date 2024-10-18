import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

export default function ModalDetalle({show, handleClose, detalle}){
    return(
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title >Detalles sobre el mismo recurso</Modal.Title>
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
                    detalle?.map((det) =>

                        <tr key={det.id}>
                            <td className="text-center">
                                {det.cantidad}
                            </td>
                            <td className="text-center">
                                {det.deposito?.nombre}
                            </td>
                            <td className="text-center">
                                {det.deposito?.ubicacion}
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
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
    )
}