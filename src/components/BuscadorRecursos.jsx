import React from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

export default function BuscadorRecursos({
  activo,
  setActivo,
  buscarRecursos,
  agregarRecurso,
  handleTodos,
  handleComponentes,
  handlePerifericos,
  setSearchTerm
}) {
  return (
    <form
      className="mt-1"
      name="FormBusqueda"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-md-6 mx-auto">
            <div className="text-center mb-3">
              <ButtonGroup aria-label="Basic example">
                <Button variant="primary" onClick={handleTodos}>
                  Todos
                </Button>
                <Button variant="primary" onClick={handlePerifericos}>
                  Periféricos
                </Button>
                <Button variant="primary" onClick={handleComponentes}>
                  Componentes
                </Button>
              </ButtonGroup>
            </div>

            <div className="d-flex align-items-center mb-3 justify-content-center">
              <div className="form-check me-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="activo"
                  checked={activo}
                  onChange={(e) => setActivo(e.target.checked)}
                />
                <label className="form-check-label" htmlFor="activo">
                  Activo
                </label>
              </div>

              <input
                type="text"
                placeholder="Buscar por nombre"
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-control me-2"
                style={{ maxWidth: "200px" }} // Tamaño del campo de búsqueda
              />
              <button
                type="button"
                className="btn btn-primary mx-1"
                onClick={buscarRecursos}
              >
                <i className="fa fa-search"></i> Buscar
              </button>
              <button
                type="button"
                className="btn btn-warning mx-2"
                onClick={agregarRecurso}
              >
                <i className="fa fa-plus"></i> Agregar Item
              </button>
            </div>
          </div>
        </div>
        <hr />
      </div>
    </form>
  );
}
