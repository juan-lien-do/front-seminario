import { useState, useEffect } from "react";
import envioServices from "../../services/envios.services.js";
import '@fortawesome/fontawesome-free/css/all.min.css';
import './ModalGaleriaFotos.css';

export default function ModalGaleriaFotos({ show, handleClose, envio }) {
  const [fotos, setFotos] = useState([]);
  const [archivos, setArchivos] = useState([]);
  const [nuevasFotos, setNuevasFotos] = useState([]);

  useEffect(() => {
    console.log("Mostrar modal:", show);  // Verifica que `show` sea verdadero
    console.log("Datos de envio:", envio);  // Verifica que `envio` esté definido
  
    if (envio) {
      cargarFotos(envio.idEnvio);
    }
  }, [envio, show]);

  async function cargarFotos(envioId) {
    try {
      console.log("Cargando fotos para el envio:", envioId);  // Verifica que el envioId es correcto
      const data = await envioServices.obtenerFotos(envioId);
      console.log("Datos recibidos del servidor:", data);  // Verifica qué datos estás recibiendo
    
      const fotosConvertidas = data.map((foto) => ({
        url: `data:image/png;base64,${foto.base64Decode}`,  // Asegúrate de que base64Decode esté presente
        nombre: foto.nombreArchivo
      }));
      console.log("Fotos convertidas a base64:", fotosConvertidas);  // Verifica la conversión de fotos
      setFotos(fotosConvertidas);
    } catch (error) {
      console.error("Error al cargar fotos:", error);
    }
  }

  async function subirFotos() {
    if (nuevasFotos.length === 0) return;
  
    const formData = new FormData();
    nuevasFotos.forEach((foto) => {
      formData.append("file", foto);
    });
  
    try {
      await envioServices.subirFotos(envio.idEnvio, formData);
      console.log("Fotos subidas con éxito");
      setFotos([...fotos, ...nuevasFotos.map((file) => ({ url: URL.createObjectURL(file) }))]);
      setNuevasFotos([]);
    } catch (error) {
      console.error("Error al subir las fotos:", error);
    }
  }

  async function eliminarFoto(nombreArchivo) {
    try {
      await envioServices.eliminarFoto(envio.idEnvio, nombreArchivo);
      console.log("Foto eliminada con éxito");
      cargarFotos(envio.idEnvio); // Vuelve a cargar las fotos después de la eliminación
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
                    <div key={index} className="col-md-4 mb-3">
                      <img src={foto.url} alt={`Foto ${index + 1}`} className="img-fluid img-thumbnail" />
                      <button
                        className="btn btn-danger mt-2 w-100"
                        onClick={() => eliminarFoto(foto.nombre)}
                      >
                        Eliminar
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
                  multiple
                  onChange={(e) => setNuevasFotos(Array.from(e.target.files))}
                  className="form-control mb-2"
                />
                <button
                  className="btn btn-success"
                  onClick={subirFotos}
                  disabled={nuevasFotos.length === 0}
                >
                  Subir Fotos
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}