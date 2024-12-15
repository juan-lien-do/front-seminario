import { useState, useEffect, useRef } from "react";
import envioServices from "../../services/envios.services.js";
import './ModalGaleriaFotos.css';

export default function ModalGaleriaFotos({ show, handleClose, envio }) {
  const [fotos, setFotos] = useState([]);
  const [nuevaFoto, setNuevaFoto] = useState(null);
  const [fotoSeleccionada, setFotoSeleccionada] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (show && envio) {
      cargarFotos(envio.idEnvio);
    } else {
      setFotos([]); // Limpiar las fotos cuando el modal se cierra
    }
  }, [envio, show]);

  async function cargarFotos(envioId) {
    try {
      const data = await envioServices.obtenerFotos(envioId);
      const fotosConvertidas = data.map((foto) => ({
        url: `data:image/jpeg;base64,${foto.base64Decode}`,
        nombreArchivo: foto.nombreArchivo
      }));
      console.log("Fotos cargadas:", fotosConvertidas); // Verifica las fotos cargadas
      setFotos(fotosConvertidas);
    } catch (error) {
      console.error("Error al cargar fotos:", error);
    }
  }

  async function subirFoto() {
    if (!nuevaFoto) return;

    if (fotos.length >= 9) {
      alert("No se pueden subir más de 9 fotos.");
      return;
    }
  
    const formData = new FormData();
    formData.append("file", nuevaFoto);
  
    try {
      await envioServices.subirFotos(envio.idEnvio, formData);
      setNuevaFoto(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      cargarFotos(envio.idEnvio); // Actualizar las fotos después de subir una nueva
    } catch (error) {
      console.error("Error al subir la foto:", error);
    }
  }

  async function eliminarFoto(nombreArchivo) {

    try {
      await envioServices.eliminarFoto(envio.idEnvio, nombreArchivo);
      cargarFotos(envio.idEnvio);
    } catch (error) {
      console.error("Error al eliminar foto:", error);
    }
  }

  return (
    show && (
      <div className="modal fade show d-block" tabIndex="-1">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Fotos del Envío</h5>
              <button type="button" className="btn-close" onClick={handleClose}></button>
            </div>
            <div className="modal-body">
              <div className="row">
                {fotos.length > 0 ? (
                  fotos.map((foto, index) => (
                    <div key={index} className="col-md-4 mb-3 imagen-container">
                      <img
                        src={foto.url}
                        alt={`Foto ${index + 1}`}
                        className="img-fluid img-thumbnail imagen-previsualizacion"
                        style={{ display: "block", width: "100%", height: "auto", cursor: "pointer" }}
                        onClick={() => setFotoSeleccionada(foto.url)}
                      />
                      <button
                        className="btn-eliminar-hover"
                        onClick={() => eliminarFoto(foto.nombreArchivo)}
                      >
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </div>
                  ))
                ) : (
                  <p>No hay fotos disponibles para este envío.</p>
                )}
              </div>
              <div className="mt-3">
                <input
                  type="file"
                  onChange={(e) => setNuevaFoto(e.target.files[0])}
                  className="form-control mb-2"
                  ref={fileInputRef}
                  disabled={fotos.length >= 9}
                />
                <button
                  className="btn btn-success"
                  onClick={subirFoto}
                  disabled={!nuevaFoto || fotos.length >= 9}
                >
                  Subir Foto
                </button>
              </div>
            </div>
          </div>
        </div>
        {fotoSeleccionada && (
          <div className="modal fade show d-block" tabIndex="-1">
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Vista Previa</h5>
                  <button type="button" className="btn-close" onClick={() => setFotoSeleccionada(null)}></button>
                </div>
                <div className="modal-body text-center">
                  <img src={fotoSeleccionada} alt="Vista Previa" className="img-fluid" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  );
}