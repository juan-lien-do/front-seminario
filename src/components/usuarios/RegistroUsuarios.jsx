import { useForm } from 'react-hook-form'

export default function RegistroUsuario({ volver, usuario, guardar }) {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, isValid, isSubmitted },
  } = useForm({ values: usuario });

  const onSubmit = (data) => {
    guardar(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1 className='ms-3'>Usuario</h1>
      <div className="container-fluid">
        <fieldset>

          {/* campo usuario */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="nombre">
                Usuario<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="text"
                {...register("nombre", { required: true})}
                autoFocus
                className="form-control "
              />
            </div>
          </div>

          {/* campo nombre del usuario */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="nombre_usr">
                Nombre<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="text"
                {...register("nombre_usr", { required: true})}
                className="form-control "
              />
            </div>
          </div>
          
          {/* campo apellido del usuario */}
                    <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="apellido_usr">
                Apellido<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="text"
                {...register("apellido_usr", { required: true})}
                className="form-control "
              />
            </div>
          </div>


          {/* campo telefono */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="telefono">
                Telefono<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="tel"
                {...register("telefono", { required: true})}
                className="form-control"
              />
            </div>
          </div>

          {/* campo mail */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="email">
                Email<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="email"
                {...register("email", { required: true})}
                className="form-control"
              />
            </div>
          </div>

           {/* campo Activo */}
            <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="activo">
                Activo<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <select
                name="activo"
                {...register("activo", {
                  required: { value: true, message: "Activo es requerido" },
                })}
                className={
                  "form-control" + (errors?.Activo ? " is-invalid" : "")
                }               
              >
                <option value={null}></option>
                <option value={false}>NO</option>
                <option value={true}>SI</option>
              </select>
              <div className="invalid-feedback">{errors?.activo?.message}</div>
            </div>
          </div>

          {/* campo Admin */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="activo">
                Admin<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <select
                name="isAdmin"
                {...register("isAdmin", {
                  required: { value: true, message: "Admin es requerido" },
                })}
              >
                <option value={null}></option>
                <option value={false}>NO</option>
                <option value={true}>SI</option>
              </select>
            </div>
          </div>
          
          

          {/* Botones' */}
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
                <i className="fa fa-undo"></i>
                Cancelar
              </button>
            </div>
          </div>
        </fieldset>
      </div>

    </form>
  )
}
