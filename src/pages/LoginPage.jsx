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
  const [passwordExpired, setPasswordExpired] = useState(false);  // Para controlar si la contraseña ha expirado
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

  // Función para calcular la diferencia de tiempo entre ahora y la última actualización
  const checkPasswordExpiration = () => {
    if (userData && userData.ultimaActualizacion) {
      const ultimaActualizacionDate = new Date(userData.ultimaActualizacion);
      const currentDate = new Date();
      const diffInMinutes = (currentDate - ultimaActualizacionDate) / (1000 * 60); // Diferencia en minutos

      if (diffInMinutes > 15) {
        setPasswordExpired(true); // Si la contraseña ha expirado
      }
    }
  };

  // Controlar el flujo de navegación basado en primerLogin
  useEffect(() => {
    if (!!usuario && userData) {
      if (userData.primerLogin === true) {
        checkPasswordExpiration(); // Verificar si la contraseña ha expirado
        console.log("primerLogin es true, mostrando RegistroContraseña");
      } else {
        console.log("primerLogin es false, redirigiendo a /home");
        navigate("/home");
      }
    }
  }, [!!usuario, userData, navigate]);

  // Si la contraseña ha expirado, mostramos el mensaje y no mostramos el componente RegistroContraseña
  if (passwordExpired) {
    return (
      <div className="alert alert-danger text-center">
        <p>Contraseña expirada. No puede iniciar sesión.</p>
      </div>
    );
  }

  // no tocar por el amor de Dios padre y la virgen santísima
  if (!!usuario && (!userData?.primerLogin ?? true)) {
    return <Navigate to="/home" replace />;
  }

  // Si el usuario tiene primerLogin true y la contraseña no está expirada, mostramos el componente de RegistroContraseña
  if (userData && userData.primerLogin === true && !passwordExpired) {
    return <RegistroContraseña usuario={userData} onComplete={() => navigate("/home")} />;
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
                        disabled={!isValid || passwordExpired} // Deshabilitar si la contraseña ha expirado
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
