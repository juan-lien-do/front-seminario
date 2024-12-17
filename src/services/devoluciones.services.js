import instance from "../../axios.config";

const urlResource = "http://localhost:8080/envios";

// Función para buscar los envíos entregados
async function buscarEntregados() {
    const res = await instance.get(urlResource);
    const enviosEntregados = res.data.filter((envio) =>
        envio.listaCambiosEstado.some((estado) => (estado.idEstadoEnvio === 4 || estado.idEstadoEnvio === 5 || estado.idEstadoEnvio === 6) && !estado.fechaFin)
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

async function devolverComputadora(idDetalleComputadora) {
    try {
        const res = await instance.put(`${urlResource}/devolver-Computadora/${idDetalleComputadora}`);
        return res.data;
    } catch (error) {
        console.error("Error al devolver la computadora:", error);
        throw error;
    }
}

async function devolverRecurso(idDetalleRecurso) {
    try {
        const res = await instance.put(`${urlResource}/devolver-recurso/${idDetalleRecurso}`);
        return res.data;
    } catch (error) {
        console.error("Error al devolver el recurso:", error);
        throw error;
    }
}

// Subir fotos de devolución
async function subirFotosDevolucion(envioId, formData) {
    const url = `http://localhost:8080/archivos/cargar_fotoDev/${envioId}`;
    try {
        const response = await instance.post(url, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return response.data;
    } catch (error) {
        console.error("Error al cargar fotos de devolución:", error);
        throw error;
    }
}

// Obtener fotos de devolución
async function obtenerFotosDevolucion(envioId) {
    const url = `http://localhost:8080/archivos/fotos-devol/${envioId}`;
    try {
        const response = await instance.get(url);
        return response.data;
    } catch (error) {
        console.error("Error al mostrar fotos de devolución:", error);
        throw error;
    }
}

const devolucionesServices = { 
    buscarEntregados, 
    confirmarDevolucion, 
    devolverComputadora, 
    devolverRecurso,
    subirFotosDevolucion,
    obtenerFotosDevolucion
};
export default devolucionesServices;