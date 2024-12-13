


export default function BuscadorSolicitudes({buscarSolicitudes, handleMostrarRegistro}){

    return (
        <form
      className="mt-3"
      name="FormBusqueda"
      onSubmit={(e) => e.preventDefault()}
    >
      <h1 className="text-center">Solicitudes</h1>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-md-6 mx-auto">
            
            <div className="d-flex align-items-center mb-3 justify-content-center">
              <button
                type="button"
                className="btn btn-primary mx-1"
                onClick={buscarSolicitudes}
              >
                <i className="fa fa-search"></i> Buscar
              </button>
              <button
                type="button"
                className="btn btn-warning mx-2"
                onClick={handleMostrarRegistro}
              >
                <i className="fa fa-plus"></i> Nueva solicitud
              </button>
            </div>

          </div>
        </div>
        <hr />
      </div>
    </form>
    )
}