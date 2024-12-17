import moment from 'moment'
import '../../App.css'
import { useState, useEffect } from "react";
import { Pagination } from "react-bootstrap";

export default function ListadoEmpleados({ empleados, modificar, desactivar, activar, buscaActivos }) {
  function formatearFechaSimple(fechaISO) {
    const fecha = new Date(fechaISO);
    const dia = String(fecha.getDate()).padStart(2, '0');
    const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // Los meses van de 0 a 11
    const año = fecha.getFullYear();
    const horas = String(fecha.getHours()).padStart(2, '0');
    const minutos = String(fecha.getMinutes()).padStart(2, '0');
    const segundos = String(fecha.getSeconds()).padStart(2, '0');
    return `${dia}/${mes}/${año} ${horas}:${minutos}:${segundos}`.slice(0,10);
  }

  const [paginaActual, setPaginaActual] = useState(1)
  const itemsPorPagina = 7;

  // paginación
  const indexOfLastItem = paginaActual * itemsPorPagina;
  const indexOfFirstItem = indexOfLastItem - itemsPorPagina;
  const currentEmpleados = empleados.slice(indexOfFirstItem, indexOfLastItem);
  const handlePageChange = (pageNumber) => setPaginaActual(pageNumber);

  const cantidadPaginas = Math.ceil(empleados.length / itemsPorPagina);
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
    <div className="mt-3 table-responsive">
      <table className="table table-hover table-sm table-bordered table-striped">
        <thead className="table-light ">
          <tr>
            <th className="text-center">Nombre</th>
            <th className="text-center">Mail</th>
            <th className="text-center">Teléfono</th>
            <th className="text-center">CUIL</th>
            <th className="text-center">WS Asignado</th>
            { buscaActivos ?
              <></>
              :
              <th className='text-center'>Fecha de baja</th>
            }
              
            <th className="text-center text-nowrap">Acciones</th>

          </tr>
        </thead>
        <tbody>
          {
            currentEmpleados?.map(empleado => (
              <tr className={!empleado.activo && "efecto-desactivado"} key={empleado.id_empleado}>
                <td className={`text-center text-dark" }`}>{empleado.nombre}</td>
                <td className={`text-center text-dark" }`}>{empleado.mail}</td>
                <td className={`text-center text-dark" }`}>{empleado.telefono}</td>
                <td className={`text-center text-dark" }`}>{empleado.cuil}</td>
                <td className={`text-center text-dark" }`}>{empleado.ws}</td>
                { buscaActivos ?
                  <></>
                  :
                  <td className="text-center">
                    {formatearFechaSimple(empleado?.deleteDate)}
                  </td>
                }
                <td className={`text-center text-nowrap text-dark" }`}>

                  <button
                    className="btn btn-sm btn-warning me-2"
                    title="Modificar"
                    onClick={() => modificar(empleado)}
                  >
                    <i className="fa fa-pencil"></i>
                  </button>
                  <button
                    className={`btn btn-sm  ${!!empleado.activo ? "btn-danger" : "btn-primary" }`}
                    title={!!empleado.activo ? "Borrar" : "Reactivar"}
                    onClick={!!empleado.activo ?  () => {desactivar(empleado.idEmpleado)} : () => {activar(empleado.idEmpleado)}}
                  >
                    <i className={!!empleado.activo ? "fas fa-trash" : "fas fa-trash-restore"}></i>
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
  )
}