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
                nombreDepósito:"Depósito 2"
            }
        ],
        detallesEnvioComputadora:[

        ]
    },
]


function buscar() {
    return envios;
}



const envioServices = {buscar}
export default envioServices;