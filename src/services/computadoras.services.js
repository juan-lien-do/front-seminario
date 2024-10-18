import instance from '../../axios.config'
import { toast } from 'sonner';

const urlResource = "http://localhost:8080/computadoras";

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
async function BuscarPorId(id_computadora) {
    const resp = await instance.get(urlResource + "/" + id_computadora);
    return resp.data;
}*/

async function desactivar(id) {
    await instance.patch(urlResource + "/desactivar/" + id);
}

async function activar(id) {
    await instance.patch(urlResource + "/activar/" + id);
}

async function save(computadora) {
    if (computadora.id_computadora === 0) {
    await instance.post(urlResource, computadora);
    } else {
    await instance.put(urlResource + "/" + computadora.id, computadora);
    }
}

export const computadorasService = {
    Buscar, activar, desactivar, save
};
