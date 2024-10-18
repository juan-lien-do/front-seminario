import React from "react";
import ModalExistencias from "./ModalExistencias";
import { useState } from "react";
import OffCanvasDescripcion from "./OffCanvasDescripcion";

export default function ListadoRecursos({
  Items,
  activar,
  desactivar,
  modificar,
  categoriaSeleccionada,
}) {
  const [idRecurso, setIdRecurso] = useState(null)
  const [show, setShow] = useState(false);
  const [datosExistencias, setDatosExistencias] = useState([])
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const [showDescripcion, setShowDescripcion] = useState(false)
  const [textoDescripcion, setTextoDescripcion] = useState("")
  const handleDescripcionClose = () => setShowDescripcion(false);
  const handleDescripcionShow = () => setShowDescripcion(true);

  function verDescripcion(texto){
    handleDescripcionShow()
    setTextoDescripcion(texto)
  }

  return (
    <div className="container-fluid">
      <OffCanvasDescripcion
        show={showDescripcion}
        handleClose={handleDescripcionClose}
        texto={textoDescripcion}
      ></OffCanvasDescripcion>
      <ModalExistencias
        show={show}
        handleClose={handleClose}
        existencias={datosExistencias}
        idRecurso={idRecurso}
      ></ModalExistencias>

      <div className="card" id="TableSorterCard">
        <div className="table-responsive">
          <table className="table table-hover table-sm table-bordered table-striped">
            <thead className="table-light">
              <tr>
                <th className="text-center">Nombre </th>
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
                            ? " bg-danger text-white fw-bold"
                            : " text-dark"
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
                      <td className="text-center ">
                        <button
                          className="btn btn-info"
                          onClick={() => {
                            verDescripcion(Item.descripcion);
                          }}
                        >
                          Ver descripción
                        </button>
                      </td>
                      <td className="text-center">
                        {" "}
                        <button
                          className="btn btn-info"
                          onClick={() => {
                            handleShow();
                            setDatosExistencias(Item.existencias);
                            setIdRecurso(Item.id)
                            console.log(Item.existencias);
                          }}
                        >
                          {" "}
                          Ver{" "}
                        </button>{" "}
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
                          className={`btn btn-sm  ${
                            !!Item.activo ? "btn-danger" : "btn-primary"
                          }`}
                          title={!!Item.activo ? "Borrar" : "Reactivar"}
                          onClick={
                            !!Item.activo
                              ? () => {
                                  desactivar(Item.id);
                                }
                              : () => {
                                  activar(Item.id);
                                }
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
                  ) : (
                    <></>
                  )
                )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
