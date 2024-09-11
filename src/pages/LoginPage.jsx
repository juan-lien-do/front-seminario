import '../styles/LoginPage.css'
import FotoUsuario from '../components/FotoUsuario'
import logear from '../services/LoginService'
import { useForm } from 'react-hook-form'
import { useState } from 'react'


export default function LoginPage (usuarioRegistrado, setUsuarioRegistrado) {
    const [usuario, setUsuario] = useState()

    const {
        register,
        handleSubmit,
        formState: { errors, touchedFields, isValid, isSubmitted },
    } = useForm({ values: usuario });

    const onSubmit = (setUsuario) => {
        console.log(nombre)
        logear({nombre, password})
    }


    return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
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

            <button type="submit" className="btn btn-primary" disabled={!isValid}>
                <i className="fa fa-check"></i> Guardar
            </button>
        </fieldset>
    </form>)

/*
    return <section class="position-relative py-4 py-xl-5">
    <div class="container">
        <div class="row mb-5">
            <div class="col-md-8 col-xl-6 text-center mx-auto">
                <h2>Infraestructura Caja de Jubilaciones</h2>
                <p class="w-lg-50">Sistema de gestión de inventario</p>
            </div>
        </div>
        <div class="row d-flex justify-content-center">
            <div class="col-md-6 col-xl-4">
                <div class="card mb-5">
                    <div class="card-body d-flex flex-column align-items-center">
                        <FotoUsuario/>
                        <form class="text-center" method="post">
                            <div class="mb-3">
                                <input class="form-control" type="email" name="Usuario" placeholder="Usuario"/>
                            </div>
                            <div class="mb-3">
                                <input class="form-control" type="password" name="contraseña"
                                    placeholder="Contraseña"/>
                            </div>
                            <div class="mb-3">
                                <button class="btn btn-primary d-block w-100" type="submit">Ingresar</button>
                            </div>
                            <p class="text-muted">Olvidaste tu contraseña?</p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>*/
}