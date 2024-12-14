import { useForm } from "react-hook-form";
import { useEffect } from "react";

export default function RegistroUsuario({ volver, usuario, guardar }) {
  const defaultValues = {
    nombre_usr: "",
    apellido_usr: "",
    observaciones: "",
    telefono: "",
    mail: "",
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: usuario || defaultValues,
    mode: "onChange", // Validación en tiempo real
  });

  useEffect(() => {
    console.log("Errores:", errors);
    console.log("Validación:", isValid);
  }, [errors, isValid]);

  const onSubmit = (data) => {
    guardar(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1 className="ms-3">Usuario</h1>
      <div className="container-fluid">
        <fieldset>
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="nombre_usr">
                Nombre<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                id="nombre_usr"
                type="text"
                {...register("nombre_usr", {
                  required: "El nombre es obligatorio.",
                })}
                className={`form-control ${errors.nombre_usr ? "is-invalid" : ""}`}
              />
              {errors.nombre_usr && (
                <div className="invalid-feedback">
                  {errors.nombre_usr.message}
                </div>
              )}
            </div>
          </div>

          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="apellido_usr">
                Apellido<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                id="apellido_usr"
                type="text"
                {...register("apellido_usr", {
                  required: "El apellido es obligatorio.",
                })}
                className={`form-control ${errors.apellido_usr ? "is-invalid" : ""}`}
              />
              {errors.apellido_usr && (
                <div className="invalid-feedback">
                  {errors.apellido_usr.message}
                </div>
              )}
            </div>
          </div>

          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="observaciones">
                Observaciones<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="text"
                {...register("observaciones", { required: true })}
                className="form-control"
              />
            </div>
          </div>

          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="telefono">
                Teléfono<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="tel"
                {...register("telefono", { required: true })}
                className="form-control"
              />
            </div>
          </div>

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
                className="form-control"
              />
            </div>
          </div>

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
                className="form-control"
              />
            </div>
          </div>

          <hr />
          <div className="row justify-content-center">
            <div className="col text-center botones">
              <button
                type="submit"
                className="btn btn-primary mx-2"
                disabled={!isValid}
              >
                <i className="fa fa-check"></i> Guardar
              </button>
              <button
                type="button"
                className="btn btn-warning mx-2"
                onClick={() => {
                  reset();
                  volver();
                }}
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
