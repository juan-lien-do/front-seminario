import ReporteElementosMasConsumidos from "../components/reportes/ReporteElementosMasConsumidos";
import ReporteListadoNumerico from "../components/reportes/ReporteListadoNumerico";
import ReporteTasaCumplimiento from "../components/reportes/ReporteTasaCumplimiento";
import ReporteTiempoPromedioPorEstado from "../components/reportes/ReporteTiempoPromedioPorEstado";
import ReporteTiempoPromedioProcesamiento from "../components/reportes/ReporteTiempoPromedioProcesamiento";
import { DropdownButton, Dropdown, Badge, Modal, Button, Form, Row, Col  } from "react-bootstrap";
import DownloadPDFButton from "../components/DownloadPDFButton";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const mockRecursos = [
  { nombre: "Mouse genérico", cantidad: 12, critica: 15 },
  { nombre: "Monitor 19''", cantidad: 1, critica: 5 },
];

export default function Home({ usuario }) {
  const [xd, setXd] = useState(true);
  const [mostrarRegistro, setMostrarRegistro] = useState(false)
  const [fechaInicio, setFechaInicio] = useState(null);
  const [fechaFin, setFechaFin] = useState(null);
  const [nombreReporte, setNombreReporte] = useState("");
  const generarReporte = () => {
    if (fechaInicio && fechaFin && nombreReporte.trim() !== "") {
      console.log("Generar reporte con:", {
        nombreReporte,
        fechaInicio,
        fechaFin,
      });
      cerrarModal();
    } else {
      alert("Por favor, completa todos los campos.");
    }
  };

  function cerrarModal(){
    setMostrarRegistro(false)
  }

  function abrirModal(){
    setMostrarRegistro(true)
  }

  return (
    <div className="container mt-5">
      <div className="card px-3 py-1 my-2 shadow">
        <h2 className="ms-2">Sesión iniciada como {usuario.nombre}</h2>
      </div>

      {!!usuario.isAdmin && (
        <>
          <Modal show={mostrarRegistro} onHide={cerrarModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>Nuevo reporte</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {/* Campo de texto para el nombre del reporte */}

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
                  dateFormat="dd/MM/yyyy"
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
                  dateFormat="dd/MM/yyyy"
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
        <Button variant="warning" onClick={generarReporte}>
          Generar reporte
        </Button>
        <Button variant="secondary" onClick={cerrarModal}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>

          <div className="card my-2 px-3 py-2 shadow">
            <h2 className="ms-2">
              Recursos por debajo de las cantidades críticas
            </h2>
            <div className="table-responsive">
              <div className="table">
                <table className="table table-hover table-sm table-bordered table-striped">
                  <thead className="table-light">
                    <tr>
                      <th className="text-center">Nombre</th>
                      <th className="text-center">Cantidad</th>
                      <th className="text-center">Cantidad crítica</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockRecursos?.map((recurso) => (
                      <tr className="efecto-desactivado">
                        <td className={`text-center text-dark" }`}>
                          {recurso.nombre}
                        </td>
                        <td className={`text-center text-dark" }`}>
                          {recurso.cantidad}
                        </td>
                        <td className={`text-center text-dark" }`}>
                          {recurso.critica}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="card px-3 py-2 shadow" id="tabla-descargar">
            {/*<h1 className="display-4 mb-4">¡Bienvenido <strong>{usuario.nombre}</strong> a Almacen It!</h1>
        {!!usuario.isAdmin ? <h2 className="display-5 mb-4">Usted es ADMIN</h2> : ""}*/}

            <div className="container">
              <div className="row">
                <div className="col">
                  <h2 className="ms-2">
                    Reportes{" "}
                    <span class="badge bg-info">2024-12-09 - 2024-09-09</span>
                  </h2>
                </div>
                <div className="col align-self-end ">
                  <div className="row">
                    <div className="col">
                      <button onClick={abrirModal} className="btn btn-warning">
                        Generar otro reporte
                      </button>
                    </div>
                    <div className="col">
                      <DropdownButton
                        id="dropdown-basic-button"
                        title="Elegir reporte"
                      >
                        <Dropdown.Item href="#/action-1">
                          2024-12-09
                        </Dropdown.Item>
                        <Dropdown.Item href="#/action-2">
                          2024-11-24
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item href="#/action-3">
                          Elegir otro reporte
                        </Dropdown.Item>
                      </DropdownButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <ReporteListadoNumerico />
            <div className="row">
              <div className="col">
                <ReporteTasaCumplimiento />
              </div>
              <div className="col">
                <ReporteTiempoPromedioProcesamiento />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <ReporteTiempoPromedioPorEstado />
              </div>
              <div className="col">
                <ReporteElementosMasConsumidos />
              </div>
            </div>
          </div>
          <div className="w-100 my-3">
            <div className="mx-auto text-center">
              <DownloadPDFButton setMostrarLista={setXd} textoBoton={"Descargar reporte"}/>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
