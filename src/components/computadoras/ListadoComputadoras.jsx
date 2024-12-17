import React, { useState, useEffect } from "react";
import { Modal, Button, Pagination } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import ModalEmpleadosConCompu from "./ModalEmpleadosConCompu";
import { empleadosService } from "../../services/empleados.services.js";

export default function ListadoComputadoras({
  Items,
  activar,
  desactivar,
  modificar,
  categoriaSeleccionada,
}) {
  const [empleadosConCompu, setEmpleadosConCompu] = useState(null);
  const [mostrarModalConCompu, setMostrarModalConCompu] = useState(false);

  async function handleBuscarPorComputadora(idCompu) {
    const data = await empleadosService.tieneComputadora(idCompu);
    setEmpleadosConCompu(data);
    setMostrarModalConCompu(true);
  }

  function handleCerrarModalEmpleados() {
    setMostrarModalConCompu(false);
  }

  // Estado para manejar la descripción del modal
  const [showDescripcion, setShowDescripcion] = useState(false);
  const [textoDescripcion, setTextoDescripcion] = useState("");

  // Estado para manejar la ubicación del modal
  const [showUbicacion, setShowUbicacion] = useState(false);
  const [textoUbicacion, setTextoUbicacion] = useState("");

  // Funciones para mostrar y ocultar los modales
  const handleDescripcionClose = () => setShowDescripcion(false);
  const handleDescripcionShow = () => setShowDescripcion(true);

  const handleUbicacionClose = () => setShowUbicacion(false);
  const handleUbicacionShow = () => setShowUbicacion(true);

  // Función para cargar la descripción y abrir el modal
  function verDescripcion(texto) {
    setTextoDescripcion(texto);
    handleDescripcionShow();
  }

  // Función para cargar la ubicación y abrir el modal
  function verUbicacion(texto) {
    setTextoUbicacion(texto);
    handleUbicacionShow();
  }

  // Filtramos los items basados en la categoría seleccionada
  const filteredItems = Items?.filter((Item) => {
    if (categoriaSeleccionada === 0) return true; // Mostrar todos
    return Item.idTipo === categoriaSeleccionada;
  });

  // paginacion
  const [paginaActual, setPaginaActual] = useState(1);
  const itemsPorPagina = 6;

  // paginación
  const indexOfLastItem = paginaActual * itemsPorPagina;
  const indexOfFirstItem = indexOfLastItem - itemsPorPagina;
  const currentItems = filteredItems?.slice(indexOfFirstItem, indexOfLastItem);
  const handlePageChange = (pageNumber) => setPaginaActual(pageNumber);

  const cantidadPaginas = Math.ceil(filteredItems?.length ?? 1 / itemsPorPagina);
  const paginationItems = []; // este es un array de objetos de DOM
  for (let i = 1; i <= cantidadPaginas; i++) {
    paginationItems.push(
      <Pagination.Item
        key={i}
        active={i === paginaActual}
        onClick={() => handlePageChange(i)}
      >
        {i}
      </Pagination.Item>
    );
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

      {/* Modal para la ubicación */}
      <Modal show={showUbicacion} onHide={handleUbicacionClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Ubicación</Modal.Title>
        </Modal.Header>
        <Modal.Body>{textoUbicacion}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleUbicacionClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>

      <ModalEmpleadosConCompu
        show={mostrarModalConCompu}
        empleados={empleadosConCompu}
        handleClose={handleCerrarModalEmpleados}
      />

      {/* Tabla de computadoras */}
      <div className="card" id="TableSorterCard">
        <div className="table-responsive">
          <table className="table table-hover table-sm table-bordered table-striped">
            <thead className="table-light">
              <tr>
                <th className="text-end">Nro de Serie</th>
                <th className="text-end">Categoria</th>
                <th className="text-center">Descripción</th>
                <th className="text-end">Numero WS</th>
                <th className="text-center">Ubicación</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {currentItems &&
                currentItems.map((Item) => (
                  <tr
                    className={!Item.esActivo && "efecto-desactivado"}
                    key={Item.idComputadora}
                  >
                    <td
                      className={`text-end text-dark"
                      }`}
                    >
                      {Item.nroSerie}
                    </td>
                    <td className="text-end">
                      {Item.idTipo === 1
                        ? "Notebook"
                        : Item.idTipo === 2
                        ? "PC"
                        : Item.idTipo === 3
                        ? "All in One"
                        : "Categoría desconocida"}
                    </td>
                    <td className="text-center">
                      <button
                        className="btn btn-info"
                        onClick={() => verDescripcion(Item.descripcion)}
                      >
                        Ver descripción
                      </button>
                    </td>
                    <td className="text-end">{Item.nroWs}</td>
                    <td className="text-center">
                      {
                        /* aca decido si muestro la info del deposito o que esta en uso */
                        Item.enUso ? (
                          <>
                            <button className="btn btn-info" onClick={()=>handleBuscarPorComputadora(Item.idComputadora)}>
                              En uso <i className="fa-solid fa-circle-info"></i>
                            </button>
                          </>
                        ) : (
                          /* Botón "Ver más" para mostrar la ubicación completa */
                          <Button
                            className="btn btn-info ms-2"
                            onClick={() =>
                              verUbicacion(
                                Item.idDeposito === 1
                                  ? "Subsuelo, Piso -2 frente al Ascensor"
                                  : Item.idDeposito === 2
                                  ? "Subsuelo, Piso -2. Exterior en la zona de estacionamiento."
                                  : Item.idDeposito === 3
                                  ? "Armario ubicado en la Sala de Granjas - Piso 2 Área de Tesorería y Presupuesto."
                                  : "Ubicación desconocida"
                              )
                            }
                          >
                            {/* Muestra el nombre del depósito */}
                            {Item.idDeposito === 1
                              ? "Depósito 1"
                              : Item.idDeposito === 2
                              ? "Depósito 2"
                              : Item.idDeposito === 3
                              ? "Depósito 3"
                              : "Ubicación desconocida"}
                          </Button>
                        )
                      }
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
                          !!Item.esActivo ? "btn-danger" : "btn-primary"
                        }`}
                        title={!!Item.esActivo ? "Borrar" : "Reactivar"}
                        onClick={
                          !!Item.esActivo
                            ? () => desactivar(Item.idComputadora)
                            : () => activar(Item.idComputadora)
                        }
                        disabled={Item.enUso}
                      >
                        <i
                          className={
                            !!Item.esActivo
                              ? "fas fa-trash"
                              : "fas fa-trash-restore"
                          }
                        ></i>
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <Pagination className="justify-content-center mt-3">
            {paginationItems}
          </Pagination>
        </div>
      </div>
    </div>
  );
}
