import { useState, useEffect } from "react";
import { Pagination } from "react-bootstrap";

export default function ListadoSolicitudes({ solicitudes, handleElegirSolicitud, incorporarSolicitud }) {
  function formatearFecha(fechaISO) {
    const fecha = new Date(fechaISO);
    const dia = String(fecha.getDate()).padStart(2, '0');
    const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // Los meses van de 0 a 11
    const año = fecha.getFullYear();
    const horas = String(fecha.getHours()).padStart(2, '0');
    const minutos = String(fecha.getMinutes()).padStart(2, '0');
    const segundos = String(fecha.getSeconds()).padStart(2, '0');
    return `${dia}/${mes}/${año} ${horas}:${minutos}:${segundos}`;
  }

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSolicitudes = solicitudes?.slice(indexOfFirstItem, indexOfLastItem);
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const cantidadPaginas = Math.ceil(solicitudes.length / itemsPerPage);
  const paginationItems = []; // este es un array de objetos de DOM
  for (let i = 1; i <= cantidadPaginas; i++) {
    paginationItems.push(
      <Pagination.Item 
        key={i} 
        active={i === currentPage} 
        onClick={() => handlePageChange(i)}
      >
        {i}
      </Pagination.Item>
    );
  }

  return (
    <div className="table-responsive mx-2">
      <table className="table table-hover table-sm table-bordered table-striped">
        <thead className="table-light">
          <tr>
            <th className="text-center">Usuario que solicitó</th>
            <th className="text-center">Fecha de Solicitud</th>
            <th className="text-center">Fecha de resolución</th>
            <th className="text-center text-no-wrap">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentSolicitudes?.map((soli) => (
            <tr key={soli.idSolicitud}>
              <td className="text-center text-dark">{soli.nombreUsuario}</td>
              <td className="text-center text-dark">{
                soli.fechaSolicitud
              }</td>
              <td className="text-center text-dark">
                {soli.fechaIncorporacion ? soli.fechaIncorporacion : "❌"}
              </td>
              <td className="text-center text-dark text-nowrap">
                <button
                  className="btn btn-info"
                  onClick={() => {
                    handleElegirSolicitud(soli);
                  }}
                >
                  Ver
                </button>
                <button
                  className="btn btn-warning mx-1"
                  disabled={!!soli.fechaIncorporacion}
                  onClick={() => {
                    incorporarSolicitud(soli.idSolicitud);
                  }}
                >
                  Marcar como resuelta
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Controles de paginación */}
      <Pagination className="justify-content-center mt-3">
        {paginationItems}
      </Pagination>
    </div>
  );
}
