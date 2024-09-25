import React from "react";
import ModalExistencias from "./ModalExistencias";
import { useState } from "react";

export default function RecursosListado({
  Items,
  Modificar,
  ActivarDesactivar,
}) {
  const [show, setShow] = useState(false);
  const [datosExistencias, setDatosExistencias] = useState([])
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="container-fluid">
      <ModalExistencias
        show={show}
        handleClose={handleClose}
        existencias={datosExistencias}
      ></ModalExistencias>

      <div className="card" id="TableSorterCard">
        <div className="table-responsive">
          <table className="table table-striped">
            <thead className="thead-dark">
              <tr>
                <th className="text-end"> Nombre </th>
                <th className="text-end">Cantidad</th>
                <th className="text-end">Categoria</th>
                <th className="text-end">Descripción</th>
                <th className="text-end">Existencias</th>
                <th className="text-end">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {Items &&
                Items.map((Item) => (
                  <tr key={Item.id}>
                    <td className={`text-center ${!Item.activo ? " bg-danger text-white fw-bold" : " text-dark" }`}>{Item.nombre}</td>
                    <td className="text-end">{Item.cantidad}</td>

                    <td className="text-end">{Item.categoria}</td>
                    <td className="text-end">{Item.descripcion}</td>
                    <td className="text-center">
                      {" "}
                      <button className="btn btn-info" onClick={() => { handleShow(); setDatosExistencias(Item.existencias); console.log(Item.existencias) }}>
                        {" "}
                        Ver{" "}
                      </button>{" "}
                    </td>

                    <td className="text-center text-nowrap">
                      <button
                        className="btn btn-sm btn-warning me-2"
                        title="Modificar"
                        onClick={() => {
                          console.log(Item);
                          Modificar(Item);
                        }}
                      >
                        <i className="fa fa-pencil"></i>
                      </button>
                      <button
                        className={`btn btn-sm  ${!!Item.activo ? "btn-danger" : "btn-primary" }`}
                        title={!!Item.activo ? "Borrar" : "Reactivar"}
                        onClick={!!Item.activo ?  () => {desactivar(Item.id)} : () => {activar(Item.id)}}
                      >
                        <i className={!!Item.activo ? "fas fa-trash" : "fas fa-trash-restore"}></i>
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
