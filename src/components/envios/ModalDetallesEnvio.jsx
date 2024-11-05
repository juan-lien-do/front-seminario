import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

export default function ModalDetallesEnvio({show, handleClose, envio}){
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
                <th className="text-center"> Cantidad </th>
                <th className="text-center"> Recurso </th>
                <th className="text-center"> Ubicacion </th>
              </tr>
            </thead>
            <tbody>
                {
                    envio?.detallesEnvioRecurso?.map((det) =>

                        <tr key={det.idDetalleRecurso}>
                            <td className="text-center">
                                {det.cantidad}
                            </td>
                            <td className="text-center">
                                {det.existenciaDTO.nombreRecurso}
                            </td>
                            <td className="text-center">
                                {det.existenciaDTO.nombreDeposito}
                            </td>
                            
                        </tr>
                    
                    )
                }
            </tbody>
          </table>
          <h3 className="fs-5">Computadoras</h3>
          <table className="table table-striped">
            <thead className="thead-dark">
              <tr>
                <th className="text-center"> Número de serie </th>
                <th className="text-center"> Masterizado </th>
                <th className="text-center"> Número de ws </th>
              </tr>
            </thead>
            <tbody>
              {
                envio?.detallesEnvioComputadora?.map((det) => 
                <tr>
                  <td className="text-center">
                      {det.computadoraDTO.nroSerie}
                  </td>
                  <td className="text-center">
                      {det.computadoraDTO.esMasterizado ?
                      <i className="fa-solid fa-check"></i>
                      :
                      <i class="fa-solid fa-xmark"></i>
                      }
                  </td>
                  <td className="text-center">
                      {det.computadoraDTO.nroWs}
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