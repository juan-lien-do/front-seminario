import instance from '../../axios.config'
import { toast } from 'sonner';
import sonnerQuestion from '../utils/sonnerQuestion';

const urlResource = "http://localhost:8080/solicitudes/";

async function buscarSolicitudes() {
    try {
        const response = await instance.get(urlResource);
        return response.data;
    } catch (error) {
        if(error.response.status === 401) {toast.error("Inicie sesión nuevamente")}
        console.log(error)
    }
}




export const SolicitudesService = {buscarSolicitudes};