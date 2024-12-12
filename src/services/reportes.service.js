import { toast } from "sonner";
import instance from "../../axios.config";
import sonnerQuestion from "../utils/sonnerQuestion";

const urlResource = "http://localhost:8080/reportes/";

async function GenerarReporteCompleto(fechaInicio, fechaFin) {
  try {
    
    const response = await instance.get(urlResource + "reporte-completo/", {
      params: { fechaInicio, fechaFin },
    });

    const reporte = response.data;
    const reportesGuardados = JSON.parse(localStorage.getItem("reportes")) || [];
    const nuevosReportes = [reporte, ...reportesGuardados.slice(0, 1)];
    localStorage.setItem("reportes", JSON.stringify(nuevosReportes));


    return reporte;
  } catch (error) {
    if (error.response.status === 401) {
      toast.error("Inicie sesión nuevamente");
    }
    console.log(error);
  }
}

function CargarReportesDesdeLocalStorage() {
  const reportesGuardados = JSON.parse(localStorage.getItem("reportes")) || [];
  return reportesGuardados;
}

async function BuscarCantidadesCriticas() {
  try {
    
    const response = await instance.get(urlResource + "cantidad-critica/");

    console.log(response.data);
    return response.data;
  } catch (error) {
    if (error.response.status === 401) {
      toast.error("Inicie sesión nuevamente");
    }
    console.log(error);
  }
}




const reportesService = { GenerarReporteCompleto, BuscarCantidadesCriticas, CargarReportesDesdeLocalStorage };

export default reportesService;
