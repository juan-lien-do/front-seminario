import { useState, useEffect } from "react";
import ListadoDevoluciones from "../components/devoluciones/ListadoDevoluciones";
import devolucionesServices from "../services/devoluciones.services";
import ModalDevoluciones from "../components/devoluciones/ModalDevoluciones";
import { Nav } from "react-bootstrap";

function Devoluciones() {
  const [devolucionesPendientes, setDevolucionesPendientes] = useState([]);
  const [devolucionesParciales, setDevolucionesParciales] = useState([]);
  const [devolucionesCompletas, setDevolucionesCompletas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDevolucionModal, setShowDevolucionModal] = useState(false);
  const [envioSeleccionado, setEnvioSeleccionado] = useState(null);
  const [tabSeleccionada, setTabSeleccionada] = useState("pendientes");

  const handleAbrirModalDevolucion = (envio) => {
    setEnvioSeleccionado(envio);
    setShowDevolucionModal(true);
  };

  const handleConfirmDevolucion = (productos) => {
    if (!envioSeleccionado) return;

    const updatedEnvios = devolucionesPendientes.map((envio) => {
      if (envio.idEnvio === envioSeleccionado.idEnvio) {
        // Aquí se asume que se actualizará el estado del envío a "devuelto"
        return {
          ...envio,
          listaCambiosEstado: [
            ...envio.listaCambiosEstado,
            { idEstadoEnvio: 4, fechaFin: new Date().toISOString() } // Simulamos que ahora está devuelto
          ]
        };
      }
      return envio;
    });

    setDevolucionesPendientes(updatedEnvios);
    setShowDevolucionModal(false);
    
    // Recalculamos las devoluciones parciales y completas
    actualizarListas(updatedEnvios);
  };

  const actualizarListas = (actualizados) => {
    const parciales = actualizados.filter((envio) => {
      const estados = envio.listaCambiosEstado;
      return estados.some((estado) => estado.idEstadoEnvio === 4 && estado.fechaFin) &&
             estados.some((estado) => estado.idEstadoEnvio !== 4); // Hay elementos no devueltos
    });

    const completas = actualizados.filter((envio) =>
      envio.listaCambiosEstado.every((estado) => estado.idEstadoEnvio === 4)
    );

    setDevolucionesParciales(parciales);
    setDevolucionesCompletas(completas);
  };

  async function cargarDevoluciones() {
    setLoading(true);
    try {
      const data = await devolucionesServices.buscarEntregados();

      const pendientes = data.filter((envio) =>
        envio.listaCambiosEstado.some((estado) => estado.idEstadoEnvio === 4 && !estado.fechaFin)
      );

      const parciales = data.filter((envio) => {
        const estados = envio.listaCambiosEstado;
        return estados.some((estado) => estado.idEstadoEnvio === 4 && estado.fechaFin) &&
               estados.some((estado) => estado.idEstadoEnvio !== 4); // Hay elementos no devueltos
      });

      const completas = data.filter((envio) =>
        envio.listaCambiosEstado.every((estado) => estado.idEstadoEnvio === 4)
      );

      setDevolucionesPendientes(pendientes);
      setDevolucionesParciales(parciales);
      setDevolucionesCompletas(completas);
    } catch (error) {
      console.error("Error al cargar devoluciones:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    cargarDevoluciones();
  }, []);

  return (
    <div>
      <h1>Devoluciones</h1>

      <Nav variant="tabs" defaultActiveKey="pendientes" className="mb-3">
        <Nav.Item>
          <Nav.Link
            eventKey="pendientes"
            onClick={() => setTabSeleccionada("pendientes")}
          >
            Pendientes
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="parciales"
            onClick={() => setTabSeleccionada("parciales")}
          >
            Parciales
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="completas"
            onClick={() => setTabSeleccionada("completas")}
          >
            Completas
          </Nav.Link>
        </Nav.Item>
      </Nav>

      {loading ? (
        <p>Cargando devoluciones...</p>
      ) : (
        <>
          {tabSeleccionada === "pendientes" && (
            <>
              <h2>Devoluciones Pendientes</h2>
              <ListadoDevoluciones
                devoluciones={devolucionesPendientes}
                abrirModalDevolucion={handleAbrirModalDevolucion}
              />
            </>
          )}

          {tabSeleccionada === "parciales" && (
            <>
              <h2>Devoluciones Parciales</h2>
              <ListadoDevoluciones
                devoluciones={devolucionesParciales}
                abrirModalDevolucion={handleAbrirModalDevolucion}
              />
            </>
          )}

          {tabSeleccionada === "completas" && (
            <>
              <h2>Devoluciones Completas</h2>
              <ListadoDevoluciones
                devoluciones={devolucionesCompletas}
                abrirModalDevolucion={handleAbrirModalDevolucion}
              />
            </>
          )}
        </>
      )}

      <ModalDevoluciones
        show={showDevolucionModal}
        handleClose={() => setShowDevolucionModal(false)}
        envio={envioSeleccionado}
        onConfirmDevolucion={handleConfirmDevolucion}
      />
    </div>
  );
}

export default Devoluciones;
