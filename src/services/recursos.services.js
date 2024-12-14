import instance from '../../axios.config'
import { toast } from 'sonner';
import sonnerQuestion from '../utils/sonnerQuestion';

const urlResource = "http://localhost:8080/recursos/";

async function Buscar({ activo }) {
    try {
      const response = await instance.get(urlResource, {
        params: { activo: activo },
      });

      const datosOrdenados = response.data.sort((a, b) => {
        const nameA = a.nombre.toUpperCase();
        const nameB = b.nombre.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });

      return datosOrdenados;
    } catch (error) {
      //if()
      //console.error(error);
      if(error.response.status === 401) {toast.error("Inicie sesión nuevamente")}
      console.log(error)
    }
  }


/*
async function BuscarPorId(id_recurso) {
    const resp = await instance.get(urlResource + "/" + id_recurso);
    return resp.data;
}*/

async function desactivar(id) {
  const respuesta = await sonnerQuestion.pregunta("¿Desea dar de baja el recurso?")
  if(respuesta){
    try{
      await instance.patch(urlResource + "desactivar/" + id);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data)
    }
    return true
  } return false
}

async function activar(id) {
  const respuesta = await sonnerQuestion.pregunta("¿Desea dar de alta el recurso?")
  if(respuesta){
    await instance.patch(urlResource + "activar/" + id);
  }
}

async function save(item) {
  
    if (item.id === 0) {
      const respuesta = await sonnerQuestion.pregunta("¿Desea registrar el recurso?")
      if(respuesta){
        await instance.post(urlResource, item);
      }
    } else {
      console.log(item)

      const respuesta = await sonnerQuestion.pregunta("¿Desea actualizar los datos del recurso?")
      if(respuesta){
        await instance.put(urlResource + item.id, {...item, existencias:[]});
      }
    }
}
export const recursosService = {
    Buscar, activar, desactivar, save
};
