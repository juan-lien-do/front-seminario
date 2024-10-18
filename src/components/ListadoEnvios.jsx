import { useState } from "react";
import ModalDetallesEnvio from "./ModalDetallesEnvio";

export default function ListadoEnvios({ envios }) {
    const [show, setShow] = useState(false)
    const [envio, setEnvio] = useState(null)
    function handleClose(){
        setShow(false)
    }
    function handleShow(envio){
        setShow(true)
        setEnvio(envio)
    }

  return (
    <div className="mt-3 table-responsive">
        <ModalDetallesEnvio show={show} handleClose={handleClose} envio={envio}></ModalDetallesEnvio>
      <table className="table table-hover table-sm table-bordered table-striped">
        <thead className="table-light ">
          <tr>
            <th className="text-center">Empleado</th>
            <th className="text-center">Usuario</th>
            <th className="text-center">Último Estado</th>
            <th className="text-center">Fecha</th>
            <th className="text-center">Detalles</th>
            <th className="text-center text-nowrap">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {envios?.map((envio) => {return (
            <tr key={envio.idEnvio}>
              <td
                className={`text-center`}
              >
                {envio?.nombreEmpleado}
              </td>
              <td
                className={`text-center`}
              >
                {envio.nombreUsuario}
              </td>
              <td
                className={`text-center`}
              >
                {envio?.cambiosEstado.at(0).estado}
              </td>
              <td className="text-center">
                    {new Date().toLocaleDateString()}
                  </td>

              <td
                className={`text-center`}
              >
                <button className="btn btn-info" onClick={()=>{handleShow(envio)}}>Ver detalles</button>
              </td>
              <td
                className={`text-center`}
              >

                <button
                  className="btn btn-sm btn-warning me-2"
                  title="Modificar"
                  onClick={() => modificar(envio)}
                >
                  <i className="fa fa-pencil"></i>
                </button>

              </td>
            </tr>
          )})}
        </tbody>
      </table>

      
    </div>
  );
}
