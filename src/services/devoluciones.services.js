import instance from "../../axios.config";

const urlResource = "http://localhost:8080/envios";

async function buscarEntregados() {
    const res = await instance.get(urlResource);
    const enviosEntregados = res.data.filter((envio) => 
    envio.listaCambiosEstado.some((estado) => estado.idEstadoEnvio === 4 && !estado.fechaFin)
    );
    return enviosEntregados;
}

async function confirmarDevolucion(idEnvio) {
    try {
    const res = await instance.put(`${urlResource}/${idEnvio}/devolucion`);
    return res.data;
    } catch (error) {
    console.error("Error al confirmar la devolución:", error);
    throw error;
    }
}

const devolucionesServices = { buscarEntregados, confirmarDevolucion };
export default devolucionesServices;
