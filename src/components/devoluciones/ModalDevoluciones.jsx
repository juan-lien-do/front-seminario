import { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import devolucionesServices from "../../services/devoluciones.services.js";
import envioServices from "../../services/envios.services.js";
import "./modal.css";

function ModalDevoluciones({ show, handleClose, envio, onConfirmDevolucion }) {
  const [productosSeleccionados, setProductosSeleccionados] = useState({
    recursos: {},
    computadoras: {},
  });
  const [fotos, setFotos] = useState([]);
  const [fotoCargada, setFotoCargada] = useState(null);
  const [fotoSeleccionada, setFotoSeleccionada] = useState(null);

  useEffect(() => {
    if (show) {
      setProductosSeleccionados({
        recursos: envio?.detallesEnvioRecurso?.reduce((acc, det) => {
          if (det?.esDevuelto === 1 || det?.esDevuelto === true) {
            acc[det.idDetalleRecurso] = true;
          }
          return acc;
        }, {}),
        computadoras: envio?.detallesEnvioComputadora?.reduce((acc, det) => {
          if (det?.esDevuelto === 1 || det?.esDevuelto === true) {
            acc[det.idDetalleComputadora] = true;
          }
          return acc;
        }, {}),
      });
      cargarFotos();
    } else {
      setFotos([]);
    }
  }, [show, envio]);

  const cargarFotos = async () => {
    try {
      const res = await devolucionesServices.obtenerFotosDevolucion(envio.idEnvio);
      const fotosConvertidas = res.map((foto) => {
        const extension = foto.nombreArchivo.split('.').pop();
        const mimeType = extension === 'png' ? 'image/png' : 'image/jpeg';
        return `data:${mimeType};base64,${foto.base64Decode}`;
      });
      setFotos(fotosConvertidas);
    } catch (error) {
      console.error("Error al cargar las fotos:", error);
    }
  };

  const handleFotoChange = (e) => {
    setFotoCargada(e.target.files[0]);
  };

  const subirFoto = async () => {
    if (!fotoCargada) return;

    const formData = new FormData();
    formData.append("file", fotoCargada);

    try {
      await devolucionesServices.subirFotosDevolucion(envio.idEnvio, formData);
      setFotoCargada(null);
      cargarFotos();
    } catch (error) {
      console.error("Error al subir la foto:", error);
    }
  };

  const handleCheckboxChange = (tipo, id, devuelto) => {
    if (devuelto === 1 || devuelto === true) return;

    setProductosSeleccionados((prev) => ({
      ...prev,
      [tipo]: {
        ...prev[tipo],
        [id]: !prev[tipo][id],
      },
    }));
  };

  const confirmarDevolucion = async () => {
    const recursosADevolver = envio.detallesEnvioRecurso.filter(
      (det) =>
        productosSeleccionados.recursos[det.idDetalleRecurso] &&
        (det.esDevuelto !== 1 && det.esDevuelto !== true)
    );

    const computadorasADevolver = envio.detallesEnvioComputadora.filter(
      (det) =>
        productosSeleccionados.computadoras[det.idDetalleComputadora] &&
        (det.esDevuelto !== 1 && det.esDevuelto !== true)
    );

    const todosRecursosDevueltos = envio.detallesEnvioRecurso.every(
      (det) =>
        productosSeleccionados.recursos[det.idDetalleRecurso] ||
        det.esDevuelto === 1 ||
        det.esDevuelto === true
    );

    const todasComputadorasDevueltas = envio.detallesEnvioComputadora.every(
      (det) =>
        productosSeleccionados.computadoras[det.idDetalleComputadora] ||
        det.esDevuelto === 1 ||
        det.esDevuelto === true
    );

    const nuevoEstado =
      todosRecursosDevueltos && todasComputadorasDevueltas ? 6 : 5;

    console.log("Confirmar devolución con estado:", nuevoEstado);

    try {
      await onConfirmDevolucion(
        {
          recursos: recursosADevolver,
          computadoras: computadorasADevolver,
        },
        nuevoEstado
      );
      handleClose();
    } catch (error) {
      console.error("Error al confirmar la devolución:", error);
    }
  };

  const obtenerFechaDeDevolucion = (productoId, tipo) => {
    const lista = tipo === "recursos" ? envio?.detallesEnvioRecurso : envio?.detallesEnvioComputadora;
    const producto = lista?.find((det) => det.idDetalleRecurso === productoId || det.idDetalleComputadora === productoId);

    if (producto?.esDevuelto !== 1 && producto?.esDevuelto !== true) {
      return "N/A";
    }

    const listaCambioEstado = envio?.listaCambiosEstado;
    const cambioDeEstado = listaCambioEstado?.find(
      (cambio) => cambio.idEstadoEnvio === 5 || cambio.idEstadoEnvio === 6
    );

    return cambioDeEstado ? new Date(cambioDeEstado.fechaInicio).toLocaleDateString() : "N/A";
  };

  const esDevolucionCompleta = envio?.listaCambiosEstado?.some((estado) => estado.idEstadoEnvio === 6);

  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg" centered>
        <Modal.Body>
          <h3>Recursos</h3>
          <table className="table table-striped">
            <thead>
              <tr>
                {!esDevolucionCompleta && <th>Seleccionar</th>}
                {esDevolucionCompleta && <th>Estado</th>}
                <th>Cantidad</th>
                <th>Recurso</th>
                <th>Ubicación</th>
                <th>Fecha de Devolución</th>
              </tr>
            </thead>
            <tbody>
              {envio?.detallesEnvioRecurso?.map((det) => (
                <tr key={det.idDetalleRecurso}>
                  <td>
                    {det?.esDevuelto === 1 || det?.esDevuelto === true ? (
                      <span className="text-success">✔️ Devuelto</span>
                    ) : (
                      <input
                        type="checkbox"
                        checked={productosSeleccionados.recursos[det.idDetalleRecurso] || false}
                        onChange={() =>
                          handleCheckboxChange("recursos", det.idDetalleRecurso, det.esDevuelto)
                        }
                        disabled={det?.esDevuelto === 1 || det?.esDevuelto === true}
                      />
                    )}
                  </td>
                  <td>{det.cantidad}</td>
                  <td>{det.existenciaDTO.nombreRecurso}</td>
                  <td>{det.existenciaDTO.nombreDeposito}</td>
                  <td>{obtenerFechaDeDevolucion(det.idDetalleRecurso, "recursos")}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3>Computadoras</h3>
          <table className="table table-striped">
            <thead>
              <tr>
                {!esDevolucionCompleta && <th>Seleccionar</th>}
                {esDevolucionCompleta && <th>Estado</th>}
                <th>Número de serie</th>
                <th>Descripcion</th>
                <th>Número de WS</th>
                <th>Fecha de Devolución</th>
              </tr>
            </thead>
            <tbody>
              {envio?.detallesEnvioComputadora?.map((det) => (
                <tr key={det.idDetalleComputadora}>
                  <td>
                    {det?.esDevuelto === 1 || det?.esDevuelto === true ? (
                      <span className="text-success">✔️ Devuelto</span>
                    ) : (
                      <input
                        type="checkbox"
                        checked={
                          productosSeleccionados.computadoras[det.idDetalleComputadora] || false
                        }
                        onChange={() =>
                          handleCheckboxChange("computadoras", det.idDetalleComputadora, det.esDevuelto)
                        }
                        disabled={det?.esDevuelto === 1 || det?.esDevuelto === true}
                      />
                    )}
                  </td>
                  <td>{det.computadoraDTO.nroSerie}</td>
                  <td>{det.computadoraDTO.descripcion}</td>
                  <td>{det.computadoraDTO.nroWs}</td>
                  <td>{obtenerFechaDeDevolucion(det.idDetalleComputadora, "computadoras")}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {!esDevolucionCompleta && (
            <>
              <h3>Cargar Fotos</h3>
              <input type="file" onChange={handleFotoChange} />
              <Button variant="primary" onClick={subirFoto} disabled={!fotoCargada}>
                Subir Foto
              </Button>
            </>
          )}

          <h3>Fotos</h3>
          <div className="fotos-container">
            {fotos.length > 0 ? (fotos.map((foto, index) => (
              <img
                key={index}
                src={foto}
                alt={`Foto ${index + 1}`}
                className="foto"
                onClick={() => setFotoSeleccionada(foto)}
              />
            ))
          ) : (
            <p>No hay fotos para esta devolución</p>
            )} 
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {esDevolucionCompleta ? "Cerrar" : "Cancelar"}
          </Button>
          {!esDevolucionCompleta && (
            <Button variant="primary" onClick={confirmarDevolucion}>
              Confirmar Devolución
            </Button>
          )}
        </Modal.Footer>
      </Modal>

      {fotoSeleccionada && (
        <Modal show={true} onHide={() => setFotoSeleccionada(null)} size="lg" centered>
          <Modal.Body className="text-center">
            <img src={fotoSeleccionada} alt="Foto seleccionada" className="img-fluid" />
          </Modal.Body>
        </Modal>
      )}
    </>
  );
}

export default ModalDevoluciones;