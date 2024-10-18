import moment from 'moment'
import imagen from '../assets/ratita_perdida.png'

export default function ListadoEmpleados({ empleados, modificar, desactivar, activar }) {
  return (
    <div className="mt-3 table-responsive">
      <table className="table table-hover table-sm table-bordered table-striped">
        <thead className="table-light ">
          <tr>
            <th className="text-center">Nombre</th>
            <th className="text-center">Mail</th>
            <th className="text-center">Teléfono</th>
            <th className="text-center">CUIL</th>
            {/*<th className="text-center">Activo</th>*/}
            <th className="text-center">WS Asignado</th>
            <th className="text-center text-nowrap">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {
            empleados.map(empleado => (
              <tr  key={empleado.id_empleado}>
                <td className={`text-center ${!empleado.activo ? " bg-danger text-white fw-bold" : " text-dark" }`}>{empleado.nombre}</td>
                <td className={`text-center ${!empleado.activo ? " bg-danger text-white fw-bold" : " text-dark" }`}>{empleado.mail}</td>
                <td className={`text-center ${!empleado.activo ? " bg-danger text-white fw-bold" : " text-dark" }`}>{empleado.telefono}</td>
                <td className={`text-center ${!empleado.activo ? " bg-danger text-white fw-bold" : " text-dark" }`}>{empleado.cuil}</td>

                {/*<td className="text-center">
                {empleado.activo ? (
                  <span className="badge bg-light" style={{color: "black"}}>SI</span>
                ) : (
                  <span className="badge bg-dark">NO</span>
                )}
              </td>*/}
                <td className={`text-center ${!empleado.activo ? " bg-danger text-white fw-bold" : " text-dark" }`}>{empleado.ws}</td>
                <td className={`text-center text-nowrap ${!empleado.activo ? " bg-danger text-white fw-bold" : " text-dark" }`}>
                  {/* <button
                    className="btn btn-sm btn-outline-primary" // esto no se como hacerlo funcionar
                    title="Consultar"
                  // onClick={() => Consultar(Item)}
                  >
                    <i className="fa fa-eye"></i>
                  </button> */}
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

      {/*
        !!empleados ? "" : <img
        className="img-fluid shadow-logo"
        src={imagen}
        alt="imagen de ejemplo"
        style={{ width: "40em" }}
      /> 
*/
      }
    </div>
  )
}