import { useState, useEffect } from "react";
import RegistrarEnvio from "../components/envios/RegistrarEnvio";
import { usuariosService } from "../services/usuarios.services.js";
import { recursosService } from "../services/recursos.services.js";
import { empleadosService } from "../services/empleados.services.js";
import envioServices from "../services/envios.services.js";
import BuscadorEnvios from "../components/envios/BuscadorEnvios.jsx";
import ListadoEnvios from "../components/envios/ListadoEnvios.jsx";
import { computadorasService } from "../services/computadoras.services.js";
import LoaderPacman from "../components/LoaderPacman.jsx";

function Envios() {
  const [registrarEnvio, setRegistrarEnvio] = useState(false);
  const [envio, setEnvio] = useState(null);
  const [envios, setEnvios] = useState([]);
  const [computadoras, setComputadoras] = useState([])
  const [empleados, setEmpleados] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [recursos, setRecursos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [estadoSeleccionado, setEstadoSeleccionado] = useState("")

  // Cargar los datos al abrir el formulario de registro de envío
  async function cargarDatosParaEnvio() {
    try {
      const dataUsuarios = await usuariosService.buscarUsuarios();
      const dataRecursos = await recursosService.Buscar({ activo: true });
      const dataEmpleados = await empleadosService.search({ nombre: "", activo: true });
      const dataComputadoras = await computadorasService.Buscar({esActivo:true});

      setUsuarios(dataUsuarios);
      setRecursos(dataRecursos);
      setEmpleados(dataEmpleados);
      setComputadoras(dataComputadoras);

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
    buscarEnvios();
  }

  function handleVolverAtras() {
    setRegistrarEnvio(false);
    setEnvio(null);
  }

  async function guardarEnvio(data) {
    const payload = {
      idEmpleado:data.idEmpleado,
      nombreUsuario:data.nombreUsuario,
      detallesEnvioRecurso:data.detallesEnvioRecurso,
    }

    const detallesEnvioComputadora = []
    data.detallesEnvioComputadora?.forEach(det => {
      detallesEnvioComputadora.push({idComputadora:det.idComputadora})
    });

    payload.detallesEnvioComputadora = detallesEnvioComputadora;

    console.log(payload)

    await envioServices.guardar(payload);
    setRegistrarEnvio(false);
    console.log("Envio guardado:", data);
  }

  async function buscarEnvios() {
    setLoading(true);
    try {
      const data = await envioServices.buscar();
      setEnvios(data);
    } catch (error) {
      console.error("Error al cargar envíos:", error);
    } finally {
      setLoading(false);
    }
  }

  const handleEstadoChange = (nuevoEstado) => {
    setEstadoSeleccionado(nuevoEstado);
  };

  const enviosFiltrados = estadoSeleccionado
  ? envios.filter((envio) => {
      const estadoActual = envio.listaCambiosEstado?.filter((x) => !x.fechaFin).at(0)?.idEstadoEnvio;
      return estadoActual === parseInt(estadoSeleccionado);
    })
  : envios;

  useEffect(()=>{buscarEnvios()},[])

  return (
    <>
      {!registrarEnvio ? (
        <>
          <BuscadorEnvios
            handleRegistrarEnvio={handleRegistrarEnvio}
            buscarEnvios={buscarEnvios}
            onEstadoChange={handleEstadoChange}
          />
          {loading ? (
            <LoaderPacman texto={"Cargando envíos..."}></LoaderPacman>
          ) : (
            <ListadoEnvios envios={enviosFiltrados} />
          )}
        </>
      ) : (
        <RegistrarEnvio
          envio={envio}
          setEnvio={setEnvio}
          handleVolverAtras={handleVolverAtras}
          empleados={empleados}
          usuarios={usuarios}
          recursos={recursos}
          computadoras={computadoras}
          guardarEnvio={guardarEnvio}
        />
      )}
    </>
  );
}

export default Envios;
