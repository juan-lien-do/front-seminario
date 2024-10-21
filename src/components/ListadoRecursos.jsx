import React, { useState } from "react";
import ModalExistencias from "./ModalExistencias";
import { Modal, Button } from "react-bootstrap"; // Importamos Modal y Button de react-bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ListadoRecursos({
  Items,
  activar,
  desactivar,
  modificar,
  categoriaSeleccionada,
}) {
  const [idRecurso, setIdRecurso] = useState(null);
  const [show, setShow] = useState(false);
  const [datosExistencias, setDatosExistencias] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Estados para la descripción
  const [showDescripcion, setShowDescripcion] = useState(false);
  const [textoDescripcion, setTextoDescripcion] = useState("");
  const handleDescripcionClose = () => setShowDescripcion(false);
  const handleDescripcionShow = () => setShowDescripcion(true);

  // Función para mostrar la descripción
  function verDescripcion(texto) {
    setTextoDescripcion(texto);
    handleDescripcionShow();
  }

  return (
    <div className="container-fluid">
      {/* Modal para la descripción */}
      <Modal show={showDescripcion} onHide={handleDescripcionClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Descripción</Modal.Title>
        </Modal.Header>
        <Modal.Body>{textoDescripcion}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDescripcionClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal para las existencias */}
      <ModalExistencias
        show={show}
        handleClose={handleClose}
        existencias={datosExistencias}
        idRecurso={idRecurso}
      />

      <div className="card" id="TableSorterCard">
        <div className="table-responsive">
          <table className="table table-hover table-sm table-bordered table-striped">
            <thead className="table-light">
              <tr>
                <th className="text-center">Nombre</th>
                <th className="text-end">Cantidad</th>
                <th className="text-center">Categoria</th>
                <th className="text-center">Descripción</th>
                <th className="text-center">Existencias</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {Items &&
                Items.map((Item) =>
                  Item.categoria !== categoriaSeleccionada ? (
                    <tr key={Item.id}>
                      <td
                        className={`text-center ${
                          !Item.activo
                            ? "bg-danger text-white fw-bold"
                            : "text-dark"
                        }`}
                      >
                        {Item.nombre}
                      </td>
                      <td className="text-end">
                        {Item.existencias?.reduce(
                          (accumulator, currentValue) =>
                            accumulator + currentValue.cantidad,
                          0
                        )}
                      </td>
                      <td className="text-center ">
                        {Item.categoria === 1 ? "Periférico" : "Componente"}
                      </td>
                      <td className="text-center">
                        <button
                          className="btn btn-info"
                          onClick={() => verDescripcion(Item.descripcion)}
                        >
                          Ver descripción
                        </button>
                      </td>
                      <td className="text-center">
                        <button
                          className="btn btn-info"
                          onClick={() => {
                            handleShow();
                            setDatosExistencias(Item.existencias);
                            setIdRecurso(Item.id);
                          }}
                        >
                          Ver
                        </button>
                      </td>
                      <td className="text-center text-nowrap">
                        <button
                          className="btn btn-sm btn-warning me-2"
                          title="Modificar"
                          onClick={() => modificar(Item)}
                        >
                          <i className="fa fa-pencil"></i>
                        </button>
                        <button
                          className={`btn btn-sm ${
                            !!Item.activo ? "btn-danger" : "btn-primary"
                          }`}
                          title={!!Item.activo ? "Borrar" : "Reactivar"}
                          onClick={
                            !!Item.activo
                              ? () => desactivar(Item.id)
                              : () => activar(Item.id)
                          }
                        >
                          <i
                            className={
                              !!Item.activo
                                ? "fas fa-trash"
                                : "fas fa-trash-restore"
                            }
                          ></i>
                        </button>
                      </td>
                    </tr>
                  ) : null
                )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
