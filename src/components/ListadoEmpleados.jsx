import moment from 'moment'

export default function ListadoEmpleados({ empleados, modificar, borrar }) {
  return (
    <div className="table-responsive">
      <table className="table table-hover table-sm table-bordered table-striped">
        <thead className="table-light ">
          <tr>
            <th className="text-center">Nombre</th>
            <th className="text-center">Mail</th>
            <th className="text-center">Teléfono</th>
            <th className="text-center">Activo</th>
            <th className="text-center">WS Asignado</th>
            <th className="text-center text-nowrap">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {
            empleados.map(empleado => (
              <tr key={empleado.id_empleado}>
                <td className="text-center">{empleado.nombre}</td>
                <td className="text-center">{empleado.mail}</td>
                <td className="text-center">{empleado.telefono}</td>
                <td className="text-center">
                {empleado.activo ? (
                  <span className="badge bg-light" style={{color: "black"}}>SI</span>
                ) : (
                  <span className="badge bg-dark">NO</span>
                )}
              </td>
                <td className="text-center">{empleado.ws}</td>
                <td className="text-center text-nowrap">
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
                    className="btn btn-sm btn-danger"
                    title="Borrar"
                    onClick={() => borrar(empleado.id_empleado)}
                  >
                    <i className="fa-solid fa-trash-can"></i>
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}