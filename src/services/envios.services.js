import instance from "../../axios.config";
import sonnerQuestion from '../utils/sonnerQuestion';

const urlResource = "http://localhost:8080/envios";


function convertirEnFecha(fecha){
    const month = fecha.getMonth() + 1;
    const year = fecha.getFullYear();
    const date = fecha.getDate();
    return `${month}/${date}/${year}`;

}



const envios = [
    {
        idEnvio: 1,
        nombreEmpleado: "Juan Esteban Liendo",
        nombreUsuario: "pepeluis",
        cambiosEstado:[
            {
                fechaHoraInicio: Date.toString(Date(2024, 17, 10)),
                estado:"Creado"
            }
        ],
        detallesEnvioRecurso:[
            {
                idDetalle:1,
                cantidad:10,
                nombreRecurso:"procesador i7 3770",
                nombreDeposito:"Depósito 2"
            }
        ],
        detallesEnvioComputadora:[

        ]
    },
]


async function buscar() {
    const res = await instance.get(urlResource);
    console.log(res)
    return res.data;
}

async function guardar(envio) {
    const respuesta = await sonnerQuestion.pregunta("¿Desea registrar el envío?")
    if(respuesta){
        await instance.post(urlResource+"/", envio);
        return true
    } else{
        return false
    }
}



const envioServices = {buscar, guardar}
export default envioServices;