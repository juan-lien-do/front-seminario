import instance from "../../axios.config";

const urlResource = "http://localhost:8080/envios";

// Función para buscar los envíos entregados
async function buscarEntregados() {
    const res = await instance.get(urlResource);
    const enviosEntregados = res.data.filter((envio) =>
    envio.listaCambiosEstado.some((estado) => estado.idEstadoEnvio === 4 && !estado.fechaFin || estado.idEstadoEnvio === 5 && !estado.fechaFin || estado.idEstadoEnvio === 6 && !estado.fechaFin )
    );
    return enviosEntregados;
}

// Función para confirmar la devolución
async function confirmarDevolucion(idEnvio, nuevoEstado) {
    try {
    const res = await instance.put(`${urlResource}/${idEnvio}/${nuevoEstado}`);
    return res.data;
    } catch (error) {
    console.error("Error al confirmar la devolución:", error);
    throw error;
    }
}

const devolucionesServices = { buscarEntregados, confirmarDevolucion };
export default devolucionesServices;
