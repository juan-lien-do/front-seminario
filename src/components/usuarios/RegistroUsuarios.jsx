import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

export default function RegistroUsuario({ volver, usuario, guardar, modificando }) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm({ defaultValues: usuario });

  useEffect(() => {
    if (modificando) {
      // Establecer el valor inicial del campo rol basado en isAdmin y isDriver
      if (usuario.isAdmin) {
        setValue('rol', 'admin');
      } else if (usuario.esDriver) {
        setValue('rol', 'logistica');
      } else {
        setValue('rol', 'empleado');
      }
    }
  }, [modificando, usuario, setValue]);

  const onSubmit = (data) => {
    // Ajustar los valores de isAdmin y isDriver según el rol seleccionado
    switch (data.rol) {
      case 'empleado':
        data.isAdmin = false;
        data.isDriver = false;
        break;
      case 'logistica':
        data.isAdmin = false;
        data.isDriver = true;
        break;
      case 'admin':
        data.isAdmin = true;
        data.isDriver = false;
        break;
      default:
        data.isAdmin = false;
        data.isDriver = false;
    }
    delete data.rol; // Eliminar el campo rol ya que no es necesario guardarlo
    guardar(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="container-fluid">
        <fieldset>
          {/* campo nombre */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="nombre">
                Nombre<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="text"
                {...register("nombre", { required: true })}
                autoFocus
                className="form-control "
              />
            </div>
          </div>

          {/* campo apellido */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="apellido_usr">
                Apellido<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="text"
                {...register("apellido_usr", { required: true })}
                className="form-control "
              />
            </div>
          </div>

          {/* campo mail */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="mail">
                Mail<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="email"
                {...register("mail", { required: true })}
                className="form-control "
              />
            </div>
          </div>

          {/* campo cuil */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="cuil">
                Cuil<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="text"
                {...register("cuil", { required: true })}
                className="form-control "
              />
            </div>
          </div>

          {/* campo telefono */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="telefono">
                Teléfono<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="text"
                {...register("telefono", { required: true })}
                className="form-control "
              />
            </div>
          </div>

          {/* campo observaciones */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="observaciones">
                Observaciones:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <textarea
                {...register("observaciones")}
                className="form-control "
              />
            </div>
          </div>

          {/* campo rol (solo cuando se modifica un usuario) */}
          {modificando && (
            <div className="row">
              <div className="col-sm-4 col-md-3 offset-md-1">
                <label className="col-form-label" htmlFor="rol">
                  Rol<span className="text-danger">*</span>:
                </label>
              </div>
              <div className="col-sm-8 col-md-6">
                <select
                  {...register("rol", { required: true })}
                  className="form-control"
                >
                  <option value="empleado">Empleado</option>
                  <option value="logistica">Logística</option>
                  <option value="admin">Administrador</option>
                </select>
              </div>
            </div>
          )}

          {/* Botones */}
          <hr />
          <div className="row justify-content-center">
            <div className="col text-center botones">
              <button type="submit" className="btn btn-primary mx-2" disabled={!isValid}>
                <i className="fa fa-check"></i> Guardar
              </button>
              <button
                type="button"
                className="btn btn-warning mx-2"
                onClick={volver}
              >
                <i className="fa fa-undo"></i> Cancelar
              </button>
            </div>
          </div>
        </fieldset>
      </div>
    </form>
  );
}