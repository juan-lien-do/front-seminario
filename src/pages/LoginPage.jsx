import { useState } from "react";
import { useForm } from "react-hook-form";
import logear from "../services/LoginService";
import FotoUsuario from "../components/FotoUsuario";

export default function LoginPage({ onLogin }) {
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await logear(data);
      onLogin(response.data); // response.data debería contener el token y la info del usuario
    } catch (err) {
      setError("Error al iniciar sesión");
    }
  };

  return (
    <section class="position-relative py-4 py-xl-5">
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
                <FotoUsuario />
                <form className="text-center" onSubmit={handleSubmit(onSubmit)}>
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
                          {...register("nombre", { required: true })}
                          autoFocus
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-4 col-md-3 offset-md-1">
                        <label className="col-form-label" htmlFor="password">
                          Contraseña<span className="text-danger">*</span>:
                        </label>
                      </div>
                      <div className="col-sm-8 col-md-6">
                        <input
                          type="password"
                          {...register("password", { required: true })}
                          className="form-control"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={!isValid}
                    >
                      Ingresar
                    </button>
                  </fieldset>
                  {error && <p className="text-danger">{error}</p>}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
