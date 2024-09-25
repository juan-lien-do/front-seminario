
export default function BuscadorRecursos(){
    return(
        <form
      className="mt-3"
      name="FormBusqueda"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="container-fluid">
        {/* Botones */}
        <div className="row my-2">
          <div className="col text-center botones">
            <button
              type="button"
              className="btn btn-primary mx-2"
              onClick={()=>{console.log("xd")}}
            >
              <i className="fa fa-search"> </i> Buscar
            </button>
            <button
              type="button"
              className="btn btn-warning mx-2"
              onClick={()=>{console.log("xd")}}
            >
              <i className="fa fa-plus "> </i> Agregar
            </button>
          </div>
        </div>
      </div>
    </form>
    );

}