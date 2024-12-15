import instance from "../../axios.config";
import sonnerQuestion from '../utils/sonnerQuestion';
import axios from "axios";
import { Toaster, toast } from "sonner";

const urlResource = "http://localhost:8080/envios";

// buscar los envíos
async function buscar() {
    const res = await instance.get(urlResource);
    return res.data;
}

// guardar un nuevo envío
async function guardar(envio) {
    const respuesta = await sonnerQuestion.pregunta("¿Desea registrar el envío?");
    if (respuesta) {
        const res = await instance.post(urlResource + "/", envio);
        return res.data.idEnvio; // Devolvemos el ID del envío para usarlo en las fotos
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

// Subir fotos al envío
async function subirFotos(envioId, formData) {
    const url = `http://localhost:8080/archivos/cargar_foto/${envioId}`;
    try {
        const response = await instance.post(url, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return response.data;
    } catch (error) {
        console.error("Error al cargar fotos:", error);
        throw error;
    }
}

async function obtenerFotos(envioId) {
    const url = `http://localhost:8080/archivos/fotos/${envioId}`;

        try {
            const response = await instance.get(url);
            return response.data;
        } catch (error) {
            console.error("Error al mostrar fotos:", error);
            throw error;
        }
}

// Eliminar foto
async function eliminarFoto(envioId, nombreFoto) {
    const url = `http://localhost:8080/archivos/fotos/eliminar/${envioId}/${nombreFoto}`;
    const respuesta = await sonnerQuestion.pregunta("¿Desea borrar la imagen?")
    if(respuesta){
        try{
            await instance.delete(url);
            toast.success("La foto se borro correctamente")
        }
        catch(error){
            console.error("Error al borrar la foto:", error);
            throw error;
        }
    }
}

const envioServices = { buscar, guardar, actualizarEstado, subirFotos, obtenerFotos, eliminarFoto };
export default envioServices;