import instance from "../../axios.config";
import sonnerQuestion from '../utils/sonnerQuestion';

const urlResource = "http://localhost:8080/envios";


// buscar los envíos
async function buscar() {
    const res = await instance.get(urlResource);
    //console.log(res);
    return res.data;
}

// guardar un nuevo envío
async function guardar(envio) {
    const respuesta = await sonnerQuestion.pregunta("¿Desea registrar el envío?");
    if (respuesta) {
        await instance.post(urlResource + "/", envio);
        return true;
    } else {
        return false;
    }
}

async function actualizarEstado(idEnvio, nuevoEstado) {
    try {
        const res = await instance.put(`${urlResource}/${idEnvio}/${nuevoEstado}`);
        return res.data;
    } catch (error) {
        console.error("Error al actualizar el estado del envío:", error);
        throw error;
    }
}



const envioServices = { buscar, guardar, actualizarEstado };
export default envioServices;
