import instance from '../../axios.config'
import { toast } from 'sonner';

const urlResource = "http://localhost:8080/recursos";

async function Buscar({ activo }) {
    try {
      console.log(activo)
      const response = await instance.get(urlResource+"/", {
        params: { activo: activo },
      });
      return response.data;
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
    await instance.patch(urlResource + "/desactivar/" + id);
}

async function activar(id) {
    await instance.patch(urlResource + "/activar/" + id);
}

async function Guardar(item) {
    if (item.id_recurso === 0) {
    await instance.post(urlResource, item);
    } else {
    await instance.put(urlResource + "/" + item.id_recurso, item);
    }
}

export const recursosService = {
    Buscar, activar, desactivar, Guardar
};
