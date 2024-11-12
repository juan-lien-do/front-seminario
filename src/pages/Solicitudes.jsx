import { useEffect, useState } from "react";
import { toast } from "sonner";
import RegistrarSolicitud from "../components/solicitudes/RegistrarSolicitud";
import ListadoSolicitudes from "../components/solicitudes/ListadoSolicitudes";
import {SolicitudesService} from "../services/solicitudes.service";
import BuscadorSolicitudes from "../components/solicitudes/BuscadorSolicitudes";
import ConsultarSolicitud from "../components/solicitudes/ConsultarSolicitud";

export default function Solicitudes({}) {
  const [mostrarRegistrarSolicitud, setMostrarRegistrarSolictud] = useState(false);
  const [mostrarSolicitud, setMostrarSolicitud] = useState(false)
  const [nombreUsuario, setNombreUsuario] = useState("No se detectó el nombre de usuario")
  const [solicitudes, setSolicitudes] = useState([]);
  const [solicitudElegida, setSolicitudElegida] = useState(null)
  
  useEffect(
    ()=>{
      setNombreUsuario((JSON.parse(localStorage.getItem("usuario"))).nombre);
      buscarSolicitudes();
    }
    , []
  )

  async function buscarSolicitudes(){
    let datos = await SolicitudesService.buscarSolicitudes();
    console.log(datos)
    setSolicitudes(datos);
  }

  async function guardarSolicitud(data) {
    if (await SolicitudesService.guardarSolicitud(data)){
      setMostrarRegistrarSolictud(false)
      buscarSolicitudes()
    }
  }

  async function incorporarSolicitud(id) {
    if (await SolicitudesService.incorporarSolicitud(id)){
      buscarSolicitudes()
    }
  }

  function handleElegirSolicitud(solici){
    setSolicitudElegida(solici)
    setMostrarSolicitud(true)
  }

  function handleMostrarRegistro(){
    setMostrarRegistrarSolictud(true)
  }

  function handleVerSolicitudes(){
    setMostrarRegistrarSolictud(false)
    setMostrarSolicitud(false)
  }


  if(mostrarRegistrarSolicitud) {return (<RegistrarSolicitud handleVolver={handleVerSolicitudes} nombreUsuario={nombreUsuario} guardarSolicitud={guardarSolicitud}></RegistrarSolicitud>)}
  else if (mostrarSolicitud) {return (<ConsultarSolicitud solicitud={solicitudElegida} handleVolver={handleVerSolicitudes}></ConsultarSolicitud>)}
  else {
    return (<>
    <BuscadorSolicitudes handleMostrarRegistro={handleMostrarRegistro} buscarSolicitudes={buscarSolicitudes}></BuscadorSolicitudes>
    <ListadoSolicitudes solicitudes={solicitudes} handleElegirSolicitud={handleElegirSolicitud} incorporarSolicitud={incorporarSolicitud}/>
  </>)
  }

}
