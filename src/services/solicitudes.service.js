import instance from '../../axios.config'
import { toast } from 'sonner';
import sonnerQuestion from '../utils/sonnerQuestion';

const urlResource = "http://localhost:8080/solicitudes/";

async function buscarSolicitudes() {
    try {
        const response = await instance.get(urlResource);
        const datosOrdenados = response.data.sort((a, b) => {
          //const nameA = a.nombre.toUpperCase();
          //const nameB = b.nombre.toUpperCase();
          if (a.fechaIncorporacion === null && b.fechaIncorporacion !== null) {
            return -1;
          }
          if (a.fechaIncorporacion !== null && b.fechaIncorporacion === null) {
            return 1;
          }
          if (a.fechaSolicitud > b.fechaSolicitud){
            return -1;
          }
          if (a.fechaSolicitud < b.fechaSolicitud){
            return 1;
          }
          return 0;
        });
    
        return datosOrdenados;
    } catch (error) {
        if(error.response.status === 401) {toast.error("Inicie sesión nuevamente")}
        console.log(error)
    }
}

async function guardarSolicitud(solicitud) {
  const respuesta = await sonnerQuestion.pregunta(
    "¿Desea registrar la solicitud?"
  );
  if (respuesta) {
    try {
      await instance.post(urlResource, solicitud);
      toast.success("Se cargó una solicitud nueva.");
      return true;
    } catch (err) {
      toast.error("Surgió un error");
      console.log(err)
      return false;
    }
  }
  return;
}

async function incorporarSolicitud(id) {
  const respuesta = await sonnerQuestion.pregunta(
    "¿Desea incorporar la solicitud?"
  );
  if (respuesta) {
    try {
      await instance.patch(urlResource + id);
      toast.success("Se actualizó la solicitud.");
      return true;
    } catch (err) {
      toast.error("Surgió un error");
      console.log(err)
      return false;
    }
  }
  return;
}



export const SolicitudesService = {buscarSolicitudes, guardarSolicitud, incorporarSolicitud};