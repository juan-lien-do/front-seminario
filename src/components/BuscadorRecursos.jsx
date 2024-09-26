
export default function BuscadorRecursos({
  activo,
  setActivo,
  buscarRecursos,
  
}){
    return(
    <form
      className="mt-3"
      name="FormBusqueda"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="container-fluid">
        <div className="row ">
          <div className="col-sm-8 col-md-4 my-2 mx-auto">
            <div className="form-check ">
              <input
                className="form-check-input mt-2"
                type="checkbox"
                id="activo"
                checked={activo} // Para reflejar el estado del checkbox
                onChange={(e) => setActivo(e.target.checked)} // Cambia el estado basado en si está marcado o no
              />
              <label className="form-check-label" htmlFor="activo">
                Activo
              </label>

              <button
                type="button"
                className="btn btn-primary mx-1"
                onClick={buscarRecursos}
              >
                <i className="fa fa-search"> </i> Buscar
              </button>

              <button
                type="button"
                className="btn btn-warning mx-1"
                onClick={()=>{console.log("xd")}}
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