import React from "react";
import Recursos from "../pages/recursos";

export default function BuscadorRecursos({ activo, setActivo, buscarRecursos, cambiarSeccion, agregarRecurso }) {
  return (
    <form
      className="mt-3"
      name="FormBusqueda"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-sm-10 col-md-8 col-lg-6 my-2 mx-auto">
            <div className="form-check">
              <nav className="navbar navbar-expand-md navbar-light" style={{ margin: 0 }}>
                <div className="container-fluid">
                  <div className="navbar-nav">
                    <button
                      type="button"
                      className="nav-link"
                      onClick={() => cambiarSeccion("recursos")}
                      style={{ background: "none", border: "none", color: "rgb(7, 7, 7)", cursor: "pointer" }}
                    >
                      <strong>Recursos</strong>
                    </button>
                    <button
                      type="button"
                      className="nav-link"
                      onClick={() => cambiarSeccion("computadoras")}
                      style={{ background: "none", border: "none", color: "rgba(0, 0, 0, 0.8)", cursor: "pointer" }}
                    >
                      Computadoras
                    </button>
                    <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navcol-1" type="button">
                      <span className="visually-hidden">Toggle navigation</span>
                      <span className="navbar-toggler-icon"></span>
                    </button>
                  </div>
                  <div className="d-flex align-items-center">
                    <input
                      className="form-check-input mt-20 mx-2"
                      type="checkbox"
                      id="activo"
                      checked={activo}
                      onChange={(e) => setActivo(e.target.checked)}
                    />
                    <label className="form-check-label ms-2" htmlFor="activo">
                      Activo
                    </label>
                  </div>
                  <button
                    type="button"
                    className="btn btn-primary mx-1 ms-3"
                    onClick={buscarRecursos}
                  >
                    <i className="fa fa-search"></i> Buscar
                  </button>
                  <button
                    type="button"
                    className="btn btn-warning mx-2 ms-3"
                    onClick={() => agregarRecurso()}
                  >
                    <i className="fa fa-plus"></i> Agregar Item
                  </button>
                </div>
              </nav>
            </div>
            <hr />
          </div>
          <div class="dropdown menu_links"><button class="btn btn-primary dropdown-toggle" aria-expanded="false" data-bs-toggle="dropdown" type="button">Recursos</button>
          <div class="dropdown-menu"><a class="dropdown-item" href="#">Perifericos</a><a class="dropdown-item" href="#">Componentes<br /></a></div>
          </div>
        </div>
      </div>
    </form>
  );
  
}
