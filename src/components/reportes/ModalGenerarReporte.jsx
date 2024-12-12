import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {Modal, Button, Form, Row, Col} from "react-bootstrap";

export default function ModalGenerarReporte({cerrarModal, generarReporte, mostrarRegistro}){
    const [fechaInicio, setFechaInicio] = useState(null);
    const [fechaFin, setFechaFin] = useState(null);


    return(

        <Modal show={mostrarRegistro} onHide={cerrarModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>Nuevo reporte</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {/* Selector de fecha de inicio */}
          <Form.Group className="mb-3" controlId="fechaInicio">
            <Row className="align-items-center">
              <Col xs={4}>
                <Form.Label>Fecha de inicio</Form.Label>
              </Col>
              <Col xs={8}>
                <DatePicker
                  selected={fechaInicio}
                  onChange={(date) => setFechaInicio(date)}
                  dateFormat="yyyy-MM-dd"
                  className="form-control"
                  placeholderText="Selecciona la fecha de inicio"
                />
              </Col>
            </Row>
          </Form.Group>

          {/* Selector de fecha de fin */}
          <Form.Group className="mb-3" controlId="fechaFin">
            <Row className="align-items-center">
              <Col xs={4}>
                <Form.Label>Fecha de fin</Form.Label>
              </Col>
              <Col xs={8}>
                <DatePicker
                  selected={fechaFin}
                  onChange={(date) => setFechaFin(date)}
                  dateFormat="yyyy-MM-dd"
                  className="form-control"
                  placeholderText="Selecciona la fecha de fin"
                  minDate={fechaInicio} // Evitar seleccionar una fecha menor a la de inicio
                />
              </Col>
            </Row>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="warning" onClick={() => generarReporte(fechaInicio, fechaFin)}>
          Generar reporte
        </Button>
        <Button variant="secondary" onClick={cerrarModal}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
    );
}