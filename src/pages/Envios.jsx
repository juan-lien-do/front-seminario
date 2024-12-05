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
import LoaderBloque from "../components/LoaderBloque.jsx";

function Envios() {
  const [registrarEnvio, setRegistrarEnvio] = useState(false);
  const [envio, setEnvio] = useState(null);
  const [envios, setEnvios] = useState([]);
  const [computadoras, setComputadoras] = useState([])
  const [empleados, setEmpleados] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [recursos, setRecursos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [estadoSeleccionado, setEstadoSeleccionado] = useState("");
  const [completadosActivo, setCompletadosActivo] = useState(false);
  const [nombreBuscar, setNombreBuscar] = useState("");

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
      //console.log(usuario)
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

    //console.log(payload)

    await envioServices.guardar(payload);
    setRegistrarEnvio(false);
    //console.log("Envio guardado:", data);
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


  
    useEffect(() => {
      cargarEnvios(); // Carga los envíos al inicio
    }, []);
  
    const cargarEnvios = async () => {
      setLoading(true);
      try {
        const data = await envioServices.buscar();
        setEnvios(data);
        console.log(data)
      } catch (error) {
        console.error("Error al cargar envíos:", error);
      } finally {
        setLoading(false);
      }
    };
  
    const handleEstadoChange = (nuevoEstado) => {
      setEstadoSeleccionado(nuevoEstado);
    };
  
    const toggleCompletados = () => {
      setCompletadosActivo((prev) => !prev);
    };

    const handleNombreChange = (nombre) => {
      setNombreBuscar(nombre.toLowerCase()); // Convertir a minúsculas para una búsqueda insensible a mayúsculas
    };
  
    const nombreBuscarLower = nombreBuscar.toLowerCase();

    //console.log("Envíos disponibles:", envios);
    //console.log("Nombre a buscar:", nombreBuscar);
    
    const enviosFiltrados = envios.filter((envio) => {
      const estadoActual = envio.listaCambiosEstado?.filter((x) => !x.fechaFin).at(0)?.idEstadoEnvio;
    
      // Verifica si el estado y completados están activos
      const filtroEstado = estadoSeleccionado ? estadoActual === parseInt(estadoSeleccionado) : true;
      const filtroCompletados = completadosActivo ? [4, 5, 6].includes(estadoActual) : true;
    
      // Aplicar filtro de nombre asegurando que `envio.nombre` exista
      const filtroNombre = nombreBuscar
        ? envio.nombreEmpleado && envio.nombreEmpleado.toLowerCase().includes(nombreBuscar.toLowerCase())
        : true;
    
      return filtroEstado && filtroCompletados && filtroNombre;
    });
    
      return (
        <>
          {!registrarEnvio ? (
            <>
              <BuscadorEnvios
                handleRegistrarEnvio={handleRegistrarEnvio}
                onEstadoChange={handleEstadoChange}
                toggleCompletados={toggleCompletados}
                completadosActivo={completadosActivo}
                buscarEnvios={cargarEnvios}
                onNombreChange={handleNombreChange}
              />
              {loading ? (
            <LoaderBloque texto={"Cargando envíos"}></LoaderBloque>
          ) : (
        <ListadoEnvios envios={enviosFiltrados}/>  
            
          )}</>) :
          
          (
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
          )
        }</>  
  )}
  ;


export default Envios;
