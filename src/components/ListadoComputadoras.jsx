import React from "react";
import { useState } from "react";

export default function ListadoCopmputadoras({
  Items,
  activar,
  desactivar
}) {
  const [show, setShow] = useState(false);
  const [datosComputadoras, setDatosComputadoras] = useState([])
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="container-fluid">

      <div className="card" id="TableSorterCard">
        <div className="table-responsive">
          <table className="table table-hover table-sm table-bordered table-striped">
            <thead className="table-light">
              <tr>
                <th className="text-end">Nombre </th>
                <th className="text-end">Categoria</th>
                <th className="text-end">Nro de Serie</th>
                <th className="text-end">Descripción</th>
                <th className="text-end">Ubicacion</th>
                <th className="text-end">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {Items &&
                Items.map((Item) => (
                  <tr key={Item.id}>
                    <td className={`text-center ${!Item.activo ? " bg-danger text-white fw-bold" : " text-dark" }`}>{Item.nombre}</td>
                    <td className="text-end">{Item.categoria}</td>
                    <td className="text-end">{Item.descripcion}</td>
                    <td className="text-center">
                      {" "}
                      <button className="btn btn-info" onClick={() => { handleShow(); setDatosComputadoras(Item.computadoras); console.log(Item.computadoras) }}>
                        {" "}
                        Ver{" "}
                      </button>{" "}
                    </td>

                    <td className="text-center text-nowrap">
                      <button
                        className="btn btn-sm btn-warning me-2"
                        title="Modificar"
                        onClick={() => modificar(computadora)}
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
