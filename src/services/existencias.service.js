import { toast } from 'sonner';
import instance from '../../axios.config'
import sonnerQuestion from '../utils/sonnerQuestion';


const urlResource = "http://localhost:8080/existencias/";

async function incorporar(existencia) {
    const respuesta = await sonnerQuestion.pregunta("¿Desea realizar la incorporación?")
    if(respuesta){
        const res = await instance.post(urlResource + "incorporar/", existencia);
        console.log(res.data)
        return true;
    } else return false;
}

async function disminuir(existencia) {
    const respuesta = await sonnerQuestion.pregunta("¿Desea disminuir las existencias?")
    if(respuesta){
        const res = await instance.post(urlResource + "disminuir/", existencia);
        console.log(res)
        if(res.data === 1) toast.warning("Baja cantidad de existencias en el recurso.")

        return true
    }
}

const existenciasService = {
    incorporar,
    disminuir,
}

export default existenciasService;