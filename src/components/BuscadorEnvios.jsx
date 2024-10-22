import { useState } from "react";

export default function BuscadorEnvios({ handleRegistrarEnvio, buscarEnvios }) {
  return (
    <div className="mx-auto">
      <h1 className="">Envíos</h1>
      <button
        type="button"
        className="btn btn-primary mx-1 ms-3"
        onClick={buscarEnvios}
      >
        <i className="fa fa-search"></i> Buscar
      </button>
      <button
        className="mx-auto btn btn-warning"
        onClick={handleRegistrarEnvio}
      >
            <i className="fa fa-plus"></i> Registrar envío
      </button>
    </div>
  );
}
