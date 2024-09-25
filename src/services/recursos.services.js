import axios from "axios";

const urlResource = "http://localhost:8080/recursos";

async function Buscar(nombre, activo) {
    const resp = await axios.get(urlResource, {
    params: { nombre:nombre, activo:activo },
    });
    return resp.data;
}


async function BuscarPorId(id_recurso) {
    const resp = await axios.get(urlResource + "/" + id_recurso);
    return resp.data;
}

async function ActivarDesactivar(item) {
    await axios.delete(urlResource + "/" + item.id_recurso);
}

async function Guardar(item) {
    if (item.id_recurso === 0) {
    await axios.post(urlResource, item);
    } else {
    await axios.put(urlResource + "/" + item.id_recurso, item);
    }
}

export const recursosService = {
    Buscar,BuscarPorId,ActivarDesactivar,  Guardar
};