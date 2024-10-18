import instance from '../../axios.config'
import { toast } from 'sonner';

const urlResource = "http://localhost:8080/computadoras";

async function Buscar({ activo }) {
    try {
        console.log(activo)
        const response = await instance.get(urlResource+"/", {
            params: { activo: activo },
        });
        console.log("Respuesta de la API:", response);
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
    if (computadora.idComputadora === 0) {
    await instance.post(urlResource, computadora);
    } else {
        console.log(computadora)
    }
}

export const computadorasService = {
    Buscar, activar, desactivar, save
};
