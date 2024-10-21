import instance from '../../axios.config'
import { toast } from 'sonner';

const urlResource = "http://localhost:8080/computadoras/";

async function Buscar({ esActivo }) {
    try {
        console.log(esActivo)
        const response = await instance.get(urlResource, {
            params: { esActivo: esActivo },
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

async function desactivar(idComputadora) {
    await instance.patch(urlResource + "desactivar/" + idComputadora);
}

async function activar(idComputadora) {
    await instance.patch(urlResource + "activar/" + idComputadora);
}

async function save(Item) {
    if (Item.idComputadora === 0) {
    console.log(Item)
    await instance.post(urlResource, {...Item, idTipo: parseInt(Item.idTipo), esMasterizado: (Item.esMasterizado) === "true" ? true : false});
    } else {
        console.log(Item)
        await instance.put(urlResource + Item.idComputadora, {...Item, masterizado: false});
    }
}

export const computadorasService = {
    Buscar, activar, desactivar, save
};
