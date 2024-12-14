import { Modal, Button } from "react-bootstrap";

export default function ModalEmpleadosConCompu({
    show,
    handleClose,
    empleados,
}){

    return(
        <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Empleado con esa computadora</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {empleados?.map(
            nom => <p>{nom}</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    )
}