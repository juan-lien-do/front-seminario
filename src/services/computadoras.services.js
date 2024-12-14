import instance from '../../axios.config'
import { toast } from 'sonner';
import sonnerQuestion from '../utils/sonnerQuestion';

const urlResource = "http://localhost:8080/computadoras/";

async function Buscar({ esActivo }) {
    try {
        const response = await instance.get(urlResource, {
            params: { esActivo: esActivo },
        });

        // aca los ordeno jejej q le den al backend
        const datosOrdenados = response.data.sort((a, b) => {
            const nameA = a.nroSerie.toUpperCase();
            const nameB = b.nroSerie.toUpperCase();
            if(a.enUso && !b.enUso){
                return 1;
            }
            if(b.enUso && !a.enUso){
                return -1;
            }
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
    const respuesta = await sonnerQuestion.pregunta("¿Desea dar de baja la computadora?")
    if(respuesta){
        await instance.patch(urlResource + "desactivar/" + idComputadora);
    }
}

async function activar(idComputadora) {
    const respuesta = await sonnerQuestion.pregunta("¿Desea dar de alta la computadora?")
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
        const respuesta = await sonnerQuestion.pregunta("¿Desea actualizar los datos de la computadora?")
        if(respuesta){
            await instance.put(urlResource + Item.idComputadora, {...Item, masterizado: false});
        }
    }
}

export const computadorasService = {
    Buscar, activar, desactivar, save
};
