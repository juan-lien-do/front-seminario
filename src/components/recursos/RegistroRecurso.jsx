import { useForm } from 'react-hook-form'

export default function RegistroRecurso({ volver, recurso, guardar }) {
    const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, isValid, isSubmitted },
    } = useForm({ values: recurso });

    const onSubmit = (data) => {
    guardar(data)
    }

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
                {...register("nombre", { required: true})}
                autoFocus
                className="form-control "
                />
            </div>
            </div>

            {/* campo cantidadCritica */}
            <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
                <label className="col-form-label" htmlFor="cantidadCritica">
                Cantidad Crítica<span className="text-danger">*</span>:
                </label>
            </div>
            <div className="col-sm-8 col-md-6">
                <input
                type="number"
                {...register("cantidadCritica", { required: true})}
                className="form-control "
                />
            </div>
            </div>


          {/* campo categoria */}
            <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
                <label className="col-form-label" htmlFor="categoria">
                Categoría<span className="text-danger">*</span>:
                </label>
            </div>
            <div className="col-sm-8 col-md-6">
                <select className='form-control' {
                    ...register("categoria", {required: true})
                }>
                    <option value={1}> Periféricos </option>
                    <option value={2}> Componentes </option>
                </select>
                {
                    /*
                    <input
                type="text"
                {...register("categoria", { required: true})}
                className="form-control"
                />*/
                }
            </div>
            </div>

          {/* campo descripcion */}
            <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
                <label className="col-form-label" htmlFor="descripcion">
                Descripcion<span className="text-danger">*</span>:
                </label>
            </div>
            <div className="col-sm-8 col-md-6">
                <input
                type="edescripcion"
                {...register("descripcion", { required: true})}
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
                disabled={true}
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
            

            {/* campo existencia 
            <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
                <label className="col-form-label" htmlFor="existencia">
                Existencias<span className="text-danger">*</span>:
                </label>
            </div>
            <div className="col-sm-8 col-md-6">
                <input
                type="text"
                {...register("existencia", { required: true})}
                className="form-control"
                />
            </div>
            </div>*/}

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
