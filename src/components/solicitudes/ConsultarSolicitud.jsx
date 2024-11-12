import { useEffect, useState } from "react";
import { toast } from "sonner";
import DownloadPDFButton from "../DownloadPDFButton";

export default function ConsultarSolicitud({handleVolver, solicitud}) {
  const [mostrarLista, setMostrarLista] = useState(true);
  const [elementos, setElementos] = useState(solicitud.detallesSolicitud);

  return (
    <>
      <div className="container-fluid">
        {mostrarLista ? (
          <>
            <div className="row mx-auto">
              <h1 className=" fw-normal text-decoration-underline">Consultar detalles de solicitud</h1>
            </div>
            <div className="row" id="tabla-descargar">
              <h4 className=" fw-normal">Solicitado por el usuario: <span className="fw-bold">{solicitud.nombreUsuario}</span></h4>  
              <h4 className=" fw-normal">Solicitado en fecha: <span className="fw-bold">{solicitud.fechaSolicitud}</span></h4>  
              <h4 className=" fw-normal">Incorporado en fecha: <span className="fw-bold">{solicitud.fechaIncorporacion ?? "❌"}</span></h4>  
              <h4 className=" fw-normal">Lista de ítems</h4>
              <div className="table-responsive me-2">
                <table className="table table-hover table-sm table-bordered table-striped">
                  <thead>
                    <tr>
                      <th scope="col">Cantidad</th>
                      <th scope="col">Nombre</th>
                      <th scope="col">Descripcion</th>
                    </tr>
                  </thead>
                  <tbody className="">
                    {elementos.map((elemento) => (
                      <tr id={elemento.id}>
                        <td>{elemento.cantidad}</td>
                        <td>
                          <input
                            readOnly
                            type="text"
                            className="form-control"
                            onChange={(e) =>
                              handleCambiarNombre(e.target.value, elemento.id)
                            }
                            value={elemento.nombre}
                            maxLength="55"
                          />
                        </td>
                        <td>
                          <textarea
                            className="form-control"
                            onChange={(e) =>
                              handleCambiarDescripcion(
                                e.target.value,
                                elemento.id
                              )
                            }
                            readOnly
                            value={elemento.descripcion}
                            maxLength="100"
                            rows="1"
                            style={{ resize: "none", overflow: "hidden" }}
                            onInput={(e) => {
                              e.target.style.height = "auto"; // Reset height
                              e.target.style.height = `${e.target.scrollHeight}px`; // Set height to content height
                            }}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <DownloadPDFButton
                  setMostrarLista={setMostrarLista}
                ></DownloadPDFButton>
                <button className="btn btn-secondary mx-2" onClick={handleVolver}>Volver</button>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="row mt-5">
              <div className="col-7 mx-auto fs-1">
                <span>
                  <i className="fa-solid fa-circle-check fa-2x mx-auto"></i>
                </span>
                <span className="ms-3">
                  Descargó la solicitud de reposición
                </span>
              </div>
            </div>
            <div className="row mx-auto">
              <div className="col-7"></div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
