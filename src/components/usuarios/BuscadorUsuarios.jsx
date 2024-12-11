export default function BuscadorUsuarios({
  nombre, 
  setNombre,
  activo,
  setActivo,
  agregarUsuario
}) {
  return (
    <div className="container my-4">
      <h3 className="text-uppercase mb-3">Buscar Usuarios</h3>
      <div className="row gy-3">
        {/* Input de Búsqueda */}
        <div className="col-md-6">
          <label htmlFor="buscador" className="form-label">Buscar usuario:</label>
          <input
            id="buscador"
            type="text"
            className="form-control"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Buscar por nombre o usuario"
          />
        </div>

        {/* Selector de Estado */}
        <div className="col-md-4">
          <label htmlFor="activo" className="form-label">Filtrar por estado:</label>
          <select
            id="activo"
            className="form-select"
            value={activo}
            onChange={(e) => setActivo(e.target.value)}
          >
            <option value="todos">Todos</option>
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
          </select>
        </div>

        {/* Botón de Búsqueda */}
        <div className="col-md-2 d-flex align-items-end">
          <button className="btn btn-primary w-100" onClick={() => {}}>
            Buscar
          </button>
        </div>
      </div>
      <button
        type="button"
        className="btn btn-outline-primary"
        onClick={agregarUsuario}
      >
        Agregar Usuario
      </button>
    </div>
  );
}
