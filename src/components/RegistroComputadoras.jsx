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

          {/* campo nroSerie */}
            <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
                <label className="col-form-label" htmlFor="nroSerie">
                Numero de Serie<span className="text-danger">*</span>:
                </label>
            </div>
            <div className="col-sm-8 col-md-6">
                <input
                type="number"
                {...register("nroSerie", { required: true})}
                autoFocus
                className="form-control "
                />
            </div>
            </div>

            <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
                <label className="col-form-label" htmlFor="idTipo">
                Categoria<span className="text-danger">*</span>:
                </label>
            </div>
            <div className="col-sm-8 col-md-6">
                <input
                type="number"
                {...register("idTipo", { required: true})}
                autoFocus
                className="form-control "
                />
            </div>
            </div>

          {/* campo nroWs */}
            <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
                <label className="col-form-label" htmlFor="nroWs">
                Numero WS<span className="text-danger">*</span>:
                </label>
            </div>
            <div className="col-sm-8 col-md-6">
                <input
                type="number"
                {...register("nwoWs", { required: true})}
                autoFocus
                className="form-control "
                />
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
                type="text"
                {...register("descripcion", { required: true})}
                className="form-control"
                />
            </div>
            </div>

          {/* campo ubicacion */}
            {/*
            <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
                <label className="col-form-label" htmlFor="idDeposito">
                Ubicacion<span className="text-danger">*</span>:
                </label>
            </div>
            <div className="col-sm-8 col-md-6">
                <input
                type="number"
                {...register("descripcion", { required: true})}
                className="form-control"
                />
            </div>
            </div>
            */}
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
            
            {/* campo masterizado */}
            <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
                <label className="col-form-label" htmlFor="masterizado">
                Masterizado<span className="text-danger">*</span>:
                </label>
            </div>
            <div className="col-sm-8 col-md-6">
                <select
                name="masterizado"
                {...register("masterizado", {
                    required: { value: true, message: "masterizado es requerido" },
                })}
                className={
                    "form-control" + (errors?.Masterizado ? " is-invalid" : "")
                }
                
                >
                <option value={null}></option>
                <option value={false}>NO</option>
                <option value={true}>SI</option>
                </select>
                <div className="invalid-feedback">{errors?.masterizado?.message}</div>
            </div>
            </div>
            
            {/* campo existencia */}
            {/*}
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
