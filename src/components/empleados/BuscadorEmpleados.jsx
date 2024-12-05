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
        <div className="row ">
          <div className="col-sm-4 col-md-1 mt-2">
            <label className="col-form-label ">Nombre:</label>
          </div>
          <div className="col-sm-8 col-md-4 mt-2">
            <input
              type="text"
              className="form-control"
              onChange={(e) => setNombre(e.target.value)}
              value={nombre}
              maxLength="55"
              autoFocus
            />
          </div>

          <div className="col-sm-8 col-md-4 my-2">
            <div className="form-check ">
              <input
                className="form-check-input mt-2"
                type="checkbox"
                id="activo"
                checked={!activo} // Acá hay un negado y en el de abajo tambien porque era mas facil cambiarlo aca que
                onChange={(e) => setActivo(!e.target.checked)} // cambiarlo en el resto de la estructura.
              />
              <label className="form-check-label" htmlFor="activo">
                Dado Baja
              </label>

              <button
                type="button"
                className="btn btn-primary mx-1"
                onClick={buscarEmpleados}
              >
                <i className="fa fa-search"> </i> Buscar
              </button>

              <button
                type="button"
                className="btn btn-warning mx-1"
                onClick={agregarEmpleado}
              >
                <i className="fa fa-plus "> </i> Agregar
              </button>
            </div>
          </div>
        </div>

        <hr />        
      </div>
    </form>
  );
}
