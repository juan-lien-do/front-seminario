export default function ListadoEnvios({ envios }) {
  return (
    <div className="mt-3 table-responsive">
      <table className="table table-hover table-sm table-bordered table-striped">
        <thead className="table-light ">
          <tr>
            <th className="text-center">Empleado</th>
            <th className="text-center">Usuario</th>
            <th className="text-center">Estado</th>
            <th className="text-center">Fecha de Creacion</th>
            <th className="text-center">Detalles</th>
            <th className="text-center text-nowrap">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {envios?.map((empleado) => {return (
            <tr key={empleado.idEnvio}>
              <td
                className={`text-center`}
              >
                {empleado?.nombreEmpleado}
              </td>
              <td
                className={`text-center`}
              >
                {empleado.nombreUsuario}
              </td>
              <td
                className={`text-center`}
              >
                {empleado?.cambiosEstado.at(0).fechaHoraInicio}
              </td>
              <td
                className={`text-center`}
              >
                {empleado?.cuil}
              </td>

              <td
                className={`text-center`}
              >
                {empleado?.ws}
              </td>
              <td
                className={`text-center`}
              >

                <button
                  className="btn btn-sm btn-warning me-2"
                  title="Modificar"
                  onClick={() => modificar(empleado)}
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
