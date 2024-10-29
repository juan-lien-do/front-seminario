import { useForm } from 'react-hook-form'

export default function RegistroEmpleado({ volver, empleado, guardar }) {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, isValid, isSubmitted },
  } = useForm({ values: empleado });

  const onSubmit = (data) => {
    guardar(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1 className='ms-3'>Registrar empleado</h1>
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
                {...register("nombre", { required: true})}
                autoFocus
                className="form-control "
              />
            </div>
          </div>

          {/* campo cuil */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="cuil">
                CUIL<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="number"
                {...register("cuil", { required: true})}
                autoFocus
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
              <label className="col-form-label" htmlFor="mail">
                Mail<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="email"
                {...register("mail", { required: true})}
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
                disabled={empleado.id_empleado === 0}
                
              >
                <option value={null}></option>
                <option value={false}>NO</option>
                <option value={true}>SI</option>
              </select>
              <div className="invalid-feedback">{errors?.activo?.message}</div>
            </div>
          </div>
          
            {/* campo WS */}
            <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="ws">
                Working Station:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="text"
                {...register("ws", { required: false})}
                className="form-control"
              />
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
