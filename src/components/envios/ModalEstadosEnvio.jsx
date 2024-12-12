import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";


function estadoFromNumber(num){
    switch (num) {
        case 1:
            return "Pendiente"
        case 2:
            return "En preparación"
        case 3:
            return "Enviado"
        case 4:
            return "Entregado/ Pte. devolución"
        case 5:
            return "Devolución parcial"
        case 6:
            return "Devolución completa"
        case 7:
            return "Cancelado"
        case 8:
            return "Para retiro"
        case 9:
            return "En reparación"
        default:
            return "Desconocido";
    }
}

export default function ModalEstadosEnvio({show, handleClose, envio}){
    return(
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title >Detalles sobre el envío</Modal.Title>
      </Modal.Header>
      <Modal.Body>

        <div className="table-responsive">
          <h3 className="fs-5" >Recursos </h3>
          <table className="table table-striped">
            <thead className="thead-dark">
              <tr>
                <th className="text-center">Estado</th>
                <th className="text-center">Fecha de inicio</th>
              </tr>
            </thead>
            <tbody>
                {
                    envio?.listaCambiosEstado?.map((cambio) =>

                        <tr key={cambio.idCambioEstado}>
                            <td className="text-center">
                                {estadoFromNumber(cambio.idEstadoEnvio)}
                            </td>
                            <td className="text-center">
                                {cambio.fechaInicio}
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