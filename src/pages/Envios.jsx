import { useState, useEffect } from "react";
import RegistrarEnvio from "../components/RegistrarEnvio";
import { usuariosService } from "../services/usuarios.services.js";
import { recursosService } from "../services/recursos.services.js";
import { empleadosService } from "../services/empleados.services.js";
import envioServices from "../services/envios.services.js";
import BuscadorEnvios from "../components/BuscadorEnvios.jsx";
import ListadoEnvios from "../components/ListadoEnvios.jsx";

function Envios() {
  const [registrarEnvio, setRegistrarEnvio] = useState(false);
  const [envio, setEnvio] = useState(null);
  const [envios, setEnvios] = useState(envioServices.buscar());
  const [empleados, setEmpleados] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [recursos, setRecursos] = useState([]);

  // Cargar los datos al abrir el formulario de registro de envío
  async function cargarDatosParaEnvio() {
    try {
      const dataUsuarios = await usuariosService.buscarUsuarios();
      const dataRecursos = await recursosService.Buscar({ activo: true });
      const dataEmpleados = await empleadosService.search({ nombre: "", activo: true });

      setUsuarios(dataUsuarios);
      setRecursos(dataRecursos);
      setEmpleados(dataEmpleados);

      const usuario = JSON.parse(localStorage.getItem("usuario"));
      const nuevoEnvio = {
        idEmpleado: 0,
        ubicacion: "",
        nombreUsuario: usuario.nombre,
        detallesEnvioRecurso: [],
        detallesEnvioComputadora: [],
      };
      console.log(usuario)
      setEnvio(nuevoEnvio);
    } catch (error) {
      console.error("Error al cargar los datos", error);
    }
  }

  function handleRegistrarEnvio() {
    setRegistrarEnvio(true);
    cargarDatosParaEnvio();
  }

  function handleVolverAtras() {
    setRegistrarEnvio(false);
    setEnvio(null);
  }

  function guardarEnvio(data) {
    setRegistrarEnvio(false);
    console.log("Envio guardado:", data);
    // Aquí podrías implementar la lógica para guardar el envío en la base de datos
  }

  function buscarEnvios(){
    const data = envioServices.buscar();
    console.log(data)
    setEnvios(data)
  }

  useEffect(()=>{buscarEnvios()},[])

  return (
    <>
      {!registrarEnvio ? (
        <>
          <BuscadorEnvios handleRegistrarEnvio={handleRegistrarEnvio} buscarEnvios={buscarEnvios}></BuscadorEnvios>
          <ListadoEnvios envios={envios}></ListadoEnvios>
        </>
      ) : (
        <RegistrarEnvio
          envio={envio}
          setEnvio={setEnvio}
          handleVolverAtras={handleVolverAtras}
          empleados={empleados}
          usuarios={usuarios}
          recursos={recursos}
          guardarEnvio={guardarEnvio} // Pasamos la función para guardar el envío
        />
      )}
    </>
  );
}

export default Envios;
