import instance from '../../axios.config'
import { toast } from 'sonner';
import sonnerQuestion from '../utils/sonnerQuestion';

import URL_BACKEND from '../constants/constants';

const urlResource = URL_BACKEND + "/computadoras/";

async function Buscar({ esActivo }) {
    try {
        //console.log(esActivo)
        const response = await instance.get(urlResource, {
            params: { esActivo: esActivo },
        });
        //console.log("Respuesta de la API:", response);
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
    const respuesta = await sonnerQuestion.pregunta("¿Desea desactivar la computadora?")
    if(respuesta){
        await instance.patch(urlResource + "desactivar/" + idComputadora);
    }
}

async function activar(idComputadora) {
    const respuesta = await sonnerQuestion.pregunta("¿Desea activar la computadora?")
    if(respuesta){
        await instance.patch(urlResource + "activar/" + idComputadora);
    }
}

async function save(Item) {
    if (Item.idComputadora === 0) {
        const respuesta = await sonnerQuestion.pregunta("¿Desea registrar la computadora?")
        if(respuesta){
            const itemEnviar = {
                ...Item,
                nroWs: (Item.nroWs == "") ? null : Item.nroWs,
                idDeposito: parseInt(Item.idDeposito),
                idTipo: parseInt(Item.idTipo),
                esMasterizado: Item.esMasterizado === "true" ? true : false,
              }
            console.log(itemEnviar)
            await instance.post(urlResource, itemEnviar);
        }
    } else {
        //console.log(Item)
        const respuesta = await sonnerQuestion.pregunta("¿Desea actualizar la computadora?")
        if(respuesta){
            await instance.put(urlResource + Item.idComputadora, {...Item, masterizado: false});
        }
    }
}

export const computadorasService = {
    Buscar, activar, desactivar, save
};
