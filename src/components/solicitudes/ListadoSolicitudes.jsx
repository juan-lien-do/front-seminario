import { useState, useEffect } from "react";

export default function ListadoSolicitudes({ solicitudes, handleElegirSolicitud, incorporarSolicitud }) {
  return (
    <div className="table-responsive mx-2">
      <h1>Listado de solicitudes</h1>
      <table className="table table-hover table-sm table-bordered table-striped">
        <thead className="table-light ">
          <tr>
            <th className="text-center"> Usuario que solicitó</th>
            <th className="text-center"> Fecha de Solicitud </th>
            <th className="text-center"> Fecha de Incorporación</th>
            <th className="text-center text-no-wrap"> Acciones</th>
          </tr>
        </thead>
        <tbody>
          {solicitudes?.map(soli => <tr key={soli.idSolicitud}>
              <td className="text-center text-dark">{soli.nombreUsuario}</td>
              <td className="text-center text-dark">{soli.fechaSolicitud}</td>
              <td className="text-center text-dark">{soli.fechaIncorporacion ? soli.fechaIncorporacion : "❌" }</td>
              <td className="text-center text-dark text-nowrap">
                <button className="btn btn-info" onClick={()=>{handleElegirSolicitud(soli)}}>Ver</button>
                <button className="btn btn-warning mx-1" onClick={()=>{incorporarSolicitud(soli.idSolicitud)}}>Incorporar</button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
