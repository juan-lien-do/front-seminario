import ReporteElementosMasConsumidos from "../components/reportes/ReporteElementosMasConsumidos";
import ReporteListadoNumerico from "../components/reportes/ReporteListadoNumerico";
import ReporteTasaCumplimiento from "../components/reportes/ReporteTasaCumplimiento";
import ReporteTiempoPromedioPorEstado from "../components/reportes/ReporteTiempoPromedioPorEstado";
import ReporteTiempoPromedioProcesamiento from "../components/reportes/ReporteTiempoPromedioProcesamiento";
import { DropdownButton, Dropdown} from "react-bootstrap";
import DownloadPDFButton from "../components/DownloadPDFButton";
import { useEffect, useState } from "react";
import ModalGenerarReporte from "../components/reportes/ModalGenerarReporte";
import reportesService from "../services/reportes.service";
import ExcelDownloadButton from "../components/DownloadExcelButton";
import { NavLink } from "react-router-dom";
const mockRecursos = [
  { nombre: "Mouse genérico", cantidad: 12, critica: 15 },
  { nombre: "Monitor 19''", cantidad: 1, critica: 5 },
];

export default function Home({ usuario }) {
  const [xd, setXd] = useState(true);
  const [mostrarRegistro, setMostrarRegistro] = useState(false)
  const [reporte, setReporte] = useState(null)
  const [otrosReportes, setOtrosReportes] = useState([])
  const [cantidadesCriticas, setCantidadesCriticas] = useState([])

  async function generarReporte (fechaInicio, fechaFin) {
    fechaInicio = fechaInicio.toISOString().substring(0, 10)
    fechaFin = fechaFin.toISOString().substring(0, 10)
    if (fechaInicio && fechaFin) {
      console.log("Generar reporte con:", { fechaInicio,
        fechaFin
      });

      let ans = await reportesService.GenerarReporteCompleto(fechaInicio, fechaFin);
      console.log(ans)
      setReporte(ans)

      cerrarModal();
    } else {
      alert("Por favor, completa todos los campos.");
    }
  };

  async function buscarCantidadesCriticas(){
    setCantidadesCriticas(await reportesService.BuscarCantidadesCriticas());
  }

  useEffect(()=>{
    buscarCantidadesCriticas();
    setOtrosReportes(reportesService.CargarReportesDesdeLocalStorage());
  },[reporte]);

  function intercambiarReporte(rep){
    setReporte(rep)
  }

  function cerrarModal(){
    setMostrarRegistro(false)
  }

  function abrirModal(){
    setMostrarRegistro(true)
  }

/*
NavLink className="nav-link" to="/inventario">
                <i className="fa-solid fa-boxes-stacked"></i> Inventario
              </NavLink>
*/

  function QuickAccess({  }){
    return (
      <div className="d-flex justify-content-between align-items-center p-2 my-2 ">
        {/* Texto a la izquierda */}
        <div className="text-dark fw-bold" style={{ fontSize: "1.2rem" }}>
          Accedé rápidamente a los envíos
        </div>
        {/* Botón a la derecha */}
        <button
          className="btn btn-primary d-flex align-items-center gap-2"
        >
          <NavLink className="nav-link" to="/envios">
            <i className="fa-solid fa-parachute-box me-2"></i>
            Administrar envíos
          </NavLink>
        </button>
      </div>
    );
  };
  
  

  return (
    <div className="container mt-5">
      <div className="card px-3 pt-3 my-4 shadow">
        <h2 className="ms-2">Sesión iniciada como {usuario.nombre}</h2>
        <QuickAccess />
      </div>

      <div className="card my-2 px-3 pt-3 my-4 shadow">
            <h2 className="ms-2">
              Recursos por debajo de las cantidades críticas
            </h2>
            <div className="table-responsive">
              <div className="table">
                <table className="table table-hover table-sm table-bordered table-striped">
                  <thead className="table-light">
                    <tr>
                      <th className="text-center">Nombre</th>
                      <th className="text-center">Cantidad existente</th>
                      <th className="text-center">Cantidad crítica</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cantidadesCriticas?.map((recurso) => (
                      <tr className="efecto-desactivado">
                        <td className={`text-center text-dark" }`}>
                          {recurso.nombre}
                        </td>
                        <td className={`text-center text-dark" }`}>
                          {recurso.cantidad}
                        </td>
                        <td className={`text-center text-dark" }`}>
                          {recurso.cantidadCritica}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

      {!!usuario.isAdmin && (
        <>
          <ModalGenerarReporte cerrarModal={cerrarModal} generarReporte={generarReporte} mostrarRegistro={mostrarRegistro}/>
          
          <div className="card px-3 py-2 shadow" id="tabla-descargar">


            <div className="container">
              <div className="row">
                <div className="col">
                  <h2 className="ms-2 align-text-bottom">
                    Reportes{" "}
                    <span class="badge bg-info">{reporte?.fechaInicio ?? "Fecha de inicio"} - {reporte?.fechaFin ?? "Fecha de fin"}</span>
                  </h2>
                </div>
                <div className="col align-self-end ">
                  <div className="row">
                    <div className="col mb-2">
                      <button onClick={abrirModal} className="btn btn-warning">
                        Generar reporte
                      </button>
                    </div>
                    <div className="col">
                      <DropdownButton
                        id="dropdown-basic-button"
                        title="Elegir reporte"
                      >
                        {otrosReportes?.map(
                          (or) => 
                          <Dropdown.Item onClick={()=>{intercambiarReporte(or)}} >
                            {or.fechaFin}
                          </Dropdown.Item>
                        )
                        
                        }


                      </DropdownButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>


            <ReporteListadoNumerico reporte={reporte} />
            <div className="row">
              <div className="col">
                <ReporteTasaCumplimiento reporte={reporte} />
              </div>
              <div className="col">
                <ReporteTiempoPromedioProcesamiento reporte={reporte} />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <ReporteTiempoPromedioPorEstado reporte={reporte} />
              </div>
              <div className="col">
                <ReporteElementosMasConsumidos reporte={reporte} />
              </div>
            </div>
          </div>
          <div className="w-100 my-3" style={!!reporte ? {} : { visibility: "hidden" }}>
            <div className="container-fluid">
              <div className="row gy-3">
                <div className="col-12 col-md-6 d-flex justify-content-center">
                  <DownloadPDFButton
                    setMostrarLista={setXd}
                    textoBoton={"Descargar reporte en PDF"}
                  />
                </div>
                <div className="col-12 col-md-6 d-flex justify-content-center">
                  <ExcelDownloadButton data={reporte} />
                </div>
              </div>
            </div>
          </div>

            
        </>
      )}
    </div>
  );
}
