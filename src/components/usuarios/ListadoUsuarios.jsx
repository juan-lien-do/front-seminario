const ListadoUsuarios = ({ usuarios, abrirFormulario, modificar }) => {

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
            <th>Nombre </th>
            <th>Apellido</th>
            <th>Mail</th>
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
              <td className="text-uppercase">{usuario.nombre}</td>
              <td>{usuario.nombre_usr}</td>
              <td>{usuario.apellido_usr}</td>
              <td>{usuario.email}</td>
              <td className="text-center">{usuario.esActivo ? "✔️" : "❌"}</td>
              <td className="text-uppercase">
              {usuario.isAdmin ? "Administrador" : usuario.esDriver ? "Empleado" : "Driver"}
              </td>

              <td>{usuario.fechaCreacion}</td>
              <td>{usuario.fechaBaja || "-"}</td>
              <td>{usuario.ultimaActualizacion}</td>
              <td>
                <div className="d-flex gap-2 justify-content-center">
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => {modificar(usuario);
                    }}
                  >
                    ✏️ 
                  </button>
                  <button className="btn btn-secondary btn-sm">
                    🔑 Reiniciar Clave
                  </button>
                  <button className="btn btn-danger btn-sm">🗑️</button>
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