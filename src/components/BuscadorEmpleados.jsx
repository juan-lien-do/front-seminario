export default function BuscadorEmpleados({
  nombre,
  setNombre,
  activo,
  setActivo,
  buscarEmpleados,
  agregarEmpleado,
}) {
  return (
    <form
      className="mt-3"
      name="FormBusqueda"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-4 col-md-2">
            <label className="col-form-label">Nombre:</label>
          </div>
          <div className="col-sm-8 col-md-4">
            <input
              type="text"
              className="form-control"
              onChange={(e) => setNombre(e.target.value)}
              value={nombre}
              maxLength="55"
              autoFocus
            />
          </div>
          <div className="col-sm-4 col-md-2">
            <label className="col-form-label">Activo:</label>
          </div>
          <div className="col-sm-8 col-md-4">
            <select
              className="form-control"
              onChange={(e) => setActivo(e.target.value)}
              value={activo}
            >
              <option value={true}>SI</option>
              <option value="">TODOS</option>
              <option value={false}>NO</option>
            </select>
          </div>
        </div>

        <hr />

        {/* Botones */}
        <div className="row">
          <div className="col text-center botones">
            <button
              type="button"
              className="btn btn-primary mx-2"
              onClick={buscarEmpleados}
            >
              <i className="fa fa-search"> </i> Buscar
            </button>
            <button
              type="button"
              className="btn btn-warning mx-2"
              onClick={agregarEmpleado}
            >
              <i className="fa fa-plus "> </i> Agregar
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
