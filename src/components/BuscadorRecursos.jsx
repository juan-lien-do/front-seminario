import React from "react";
import Recursos from "../pages/recursos";
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
}) {
  return (
    <form
  className="mt-1"
  name="FormBusqueda"
  onSubmit={(e) => e.preventDefault()}
>
  <div className="container-fluid">
    <div className="row d-flex align-items-center justify-content-between flex-column flex-md-row mx-auto">
      <div className="col-sm-4 col-md-4 mt-2">
        <ButtonGroup aria-label="Basic example">
          <Button variant="primary" onClick={handleTodos}>
            Todos
          </Button>
          <Button variant="primary" onClick={handlePerifericos}>
            Perifericos
          </Button>
          <Button variant="primary" onClick={handleComponentes}>
            Componentes
          </Button>
        </ButtonGroup>
      </div>

      <div className="col-12 col-md-auto mt-2">
        <div className="form-check d-flex align-items-center">
          <input
            className="form-check-input"
            type="checkbox"
            id="activo"
            checked={activo}
            onChange={(e) => setActivo(e.target.checked)}
          />
          <label className="form-check-label ms-2" htmlFor="activo">
            Activo
          </label>

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
