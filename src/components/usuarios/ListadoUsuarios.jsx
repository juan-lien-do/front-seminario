const ListadoUsuarios = ({ usuarios, abrirFormulario }) => {
  if (!Array.isArray(usuarios)) {
    return <div>Hubo un error con los datos de usuarios.</div>; 
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="text-uppercase">Usuarios</h3>
        <button
          className="btn btn-outline-primary"
          onClick={() => {
            console.log("Agregar Usuario presionado");
            abrirFormulario(null);
          }}
        >
          Agregar Usuario
        </button>
      </div>
      <table className="table table-striped table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>Usuario</th>
            <th>Nombre y Apellido</th>
            <th>Habilitado</th>
            <th>Rol</th>
            <th>Fecha Alta</th>
            <th>Fecha Baja</th>
            <th>Última Actualización</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td className="text-uppercase">{usuario.usuario}</td>
              <td>{usuario.nombre}</td>
              <td className="text-center">{usuario.habilitado ? "✔️" : "❌"}</td>
              <td className="text-uppercase">{usuario.rol}</td>
              <td>{usuario.fechaAlta}</td>
              <td>{usuario.fechaBaja || "-"}</td>
              <td>{usuario.ultimaActualizacion}</td>
              <td>
                <div className="d-flex gap-2 justify-content-center">
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => {
                      console.log("Modificar Usuario presionado:", usuario);
                      abrirFormulario(usuario);
                    }}
                  >
                    ✏️ Modificar
                  </button>
                  <button className="btn btn-secondary btn-sm">
                    🔑 Modificar Clave
                  </button>
                  <button className="btn btn-danger btn-sm">🗑️ Dar Baja</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListadoUsuarios;