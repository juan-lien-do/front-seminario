import Offcanvas from 'react-bootstrap/Offcanvas';


export default function OffCanvasDescripcion({show, handleClose, texto}){

    return (
        <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Descripcion</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className='fs-1'>
          {texto}
        </Offcanvas.Body>
      </Offcanvas>
    )
}