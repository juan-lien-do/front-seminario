import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import logear from "../services/LoginService";
import FotoUsuario from "../components/FotoUsuario";
import { useNavigate } from "react-router-dom";
import RegistroContraseña from "../components/usuarios/RegistroContraseña"; // Importamos el componente de RegistroContraseña
import { Navigate } from "react-router-dom";

export default function LoginPage({ usuario, onLogin }) {
  const [error, setError] = useState(null);
  const [intentos, setIntentos] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);  // Para controlar el flujo de la página
  const [userData, setUserData] = useState(null);  // Para almacenar los datos del usuario
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();

  // Función que maneja el login
  const onSubmit = async (data) => {
    setIntentos(intentos + 1);
    if (intentos > 2) {
      alert("Contacte a un administrador antes de seguir intentando y recargue la página.");
    }
    try {
      const response = await logear(data);
      console.log("Usuario logueado:", response.data); // Agregar esto para depurar
      onLogin(response.data); // Almacena la información del usuario en el estado global
      setUserData(response.data); // Guardar los datos del usuario
      setIsLoggedIn(true);  // Cambiar el estado de login

    } catch (err) {
      setError(err.message);
    }
  };

  // Controlar el flujo de navegación basado en primerLogin
  useEffect(() => {
    if (isLoggedIn && userData) {
      if (userData.primerLogin === true) {
        //cambiar isAdmin por primerLogin
        // Si primerLogin es true, mostramos RegistroContraseña
        console.log("primerLogin es true, mostrando RegistroContraseña");
        // Aquí deberías rendereizar el componente RegistroContraseña
      } else {
        // Si primerLogin es false, redirigimos al home
        console.log("primerLogin es false, redirigiendo a /home");
        navigate("/home");
      }
    }
  }, [isLoggedIn, userData, navigate]);

  // Solo mostrar el componente de RegistroContraseña si primerLogin es true
  if (isLoggedIn && userData && userData.primerLoginn === true) {
            //cambiar isAdmin por primerLogin
    return <RegistroContraseña usuario={userData} onComplete={() => navigate("/home")} />;
  }

  // Si ya está logueado y tiene primerLogin false, redirige a /home
  if (isLoggedIn && userData && userData.primerLogin === false) {
    return <Navigate to="/home" replace />;
  }

  return (
    <section className="position-relative py-4 py-xl-5 homeimage">
      <div className="container">
        <div className="row mb-5">
          <div className="col-md-8 col-xl-6 text-center mx-auto shadowtxt">
            <h2>Infraestructura Caja de Jubilaciones</h2>
            <p className="w-lg-50">Sistema de gestión de inventario</p>
          </div>
        </div>
        <div className="row d-flex justify-content-center">
          <div className="col-md-6 col-xl-4">
            <div className="card mb-5">
              <div className="card-body d-flex flex-column align-items-center">
                <FotoUsuario />
                <form className="text-center" onSubmit={handleSubmit(onSubmit)}>
                  <fieldset>
                    <div className="mb-3">
                      <input
                        type="text"
                        {...register("nombre", { required: true })}
                        autoFocus
                        className="form-control"
                        placeholder="Usuario"
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="password"
                        {...register("password", { required: true })}
                        className="form-control"
                        placeholder="Contraseña"
                      />
                    </div>
                    <div className="mb-3">
                      <button
                        type="submit"
                        className="btn btn-primary d-block w-100"
                        disabled={!isValid}
                      >
                        Ingresar
                      </button>
                    </div>
                    {intentos > 2 ? (
                      <p>Contacte a un administrador</p>
                    ) : (
                      <div></div>
                    )}
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
