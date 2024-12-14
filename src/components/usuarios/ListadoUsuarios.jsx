import { usuariosService } from "../../services/usuarios.services";

const ListadoUsuarios = ({ usuarios, modificar, desactivar, activar }) => {
  const formatFecha = (fecha) => {
    if (!fecha) return "-";
    const date = new Date(fecha);
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    });
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="text-uppercase">Usuarios</h3>
      </div>
      <table className="table table-striped table-bordered table-hover">
        <thead className="table">
          <tr>
            <th>Usuario</th>
            <th>Nombre</th>
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
                {usuario.isAdmin ? "Administrador" : usuario.esDriver ? "Logistica" : "Empleado "}
              </td>
              <td>{formatFecha(usuario.fechaCreacion)}</td>
              <td>{formatFecha(usuario.fechaBaja)}</td>
              <td>{formatFecha(usuario.ultimaActualizacion)}</td>
              <td>
                <div className="d-flex gap-2 justify-content-center">
                  <button className="btn btn-warning btn-sm" onClick={() => modificar(usuario)}>✏️</button>
                  <button className="btn btn-secondary btn-sm"
                    onClick={() =>
                    usuariosService.blanquearContrasena(usuario.id)}
                    >🔑 Reiniciar Clave</button>
                  <button
                    className={`btn btn-sm ${usuario.esActivo ? "btn-danger" : "btn-primary"}`}
                    title={usuario.esActivo ? "Borrar" : "Reactivar"}
                    onClick={usuario.esActivo ? () => desactivar(usuario.id) : () => activar(usuario.id)}
                  >
                    <i className={usuario.esActivo ? "fas fa-trash" : "fas fa-trash-restore"}></i>
                  </button>
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
