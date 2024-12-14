import React, { useState, useEffect } from "react";
import devolucionesServices from "../services/devoluciones.services";
import ModalDevoluciones from "../components/devoluciones/ModalDevoluciones";
import { Nav } from "react-bootstrap";
import LoaderBloque from "../components/LoaderBloque";
import ListadoDevoluciones from "../components/devoluciones/ListadoDevoluciones";

function Devoluciones() {
  const [devolucionesPendientes, setDevolucionesPendientes] = useState([]);
  const [devolucionesCompletas, setDevolucionesCompletas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDevolucionModal, setShowDevolucionModal] = useState(false);
  const [envioSeleccionado, setEnvioSeleccionado] = useState(null);
  const [tabSeleccionada, setTabSeleccionada] = useState("pendientes");

  // Función para abrir el modal de devolución
  const handleAbrirModalDevolucion = (envio) => {
    setEnvioSeleccionado(envio);
    setShowDevolucionModal(true);
  };

  const handleConfirmDevolucion = async (productos = { recursos: [], computadoras: [] }, nuevoEstado) => {
    if (!envioSeleccionado) return;

    try {
      // Procesar recursos
      for (const recurso of productos.recursos) {
        await devolucionesServices.devolverRecurso(recurso.idDetalleRecurso);
      }

      // Procesar computadoras
      for (const computadora of productos.computadoras) {
        await devolucionesServices.devolverComputadora(computadora.idDetalleComputadora);
      }

      // Confirmar devolución
      await devolucionesServices.confirmarDevolucion(envioSeleccionado.idEnvio, nuevoEstado);

      // Actualizar listas y cerrar modal
      cargarDevoluciones();
      setShowDevolucionModal(false);
    } catch (error) {
      console.error("Error al confirmar la devolución:", error);
    }
  };

  const actualizarListas = (devoluciones) => {
    console.log("Actualizando listas con los envíos:", devoluciones);

    const pendientes = devoluciones.filter((envio) =>
      envio.listaCambiosEstado.some(
        (estado) => !estado.fechaFin && (estado.idEstadoEnvio === 4 || estado.idEstadoEnvio === 5)
      )
    );

    const completas = devoluciones.filter((envio) =>
      envio.listaCambiosEstado.some(
        (estado) => !estado.fechaFin && estado.idEstadoEnvio === 6
      )
    );

    setDevolucionesPendientes(pendientes);
    setDevolucionesCompletas(completas);
  };

  useEffect(() => {
    cargarDevoluciones();
  }, []);

  const cargarDevoluciones = async () => {
    setLoading(true);
    try {
      const envios = await devolucionesServices.buscarEntregados();
      console.log("Envios cargados:", envios);  // Verifica aquí los datos cargados
      actualizarListas(envios);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error al cargar las devoluciones:", error);
    }
  };

  return (
    <div>
      <h1>Devoluciones</h1>

      <Nav variant="tabs" defaultActiveKey="pendientes" className="mb-3">
        <Nav.Item>
          <Nav.Link eventKey="pendientes" onClick={() => setTabSeleccionada("pendientes")}>Pendientes</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="completas" onClick={() => setTabSeleccionada("completas")}>Completas</Nav.Link>
        </Nav.Item>
      </Nav>

      {loading ? (
        <LoaderBloque texto={"Cargando devoluciones"}></LoaderBloque>
      ) : (
        <>
          {tabSeleccionada === "pendientes" && (
            <>
              <h2>Devoluciones Pendientes</h2>
              <ListadoDevoluciones
                devoluciones={devolucionesPendientes}
                abrirModalDevolucion={handleAbrirModalDevolucion}
                estadoSeleccionado={tabSeleccionada === "pendientes" ? 4 : tabSeleccionada === "completas" ? 6 : null}
              />
            </>
          )}
          {tabSeleccionada === "completas" && (
            <>
              <h2>Devoluciones Completas</h2>
              <ListadoDevoluciones
                devoluciones={devolucionesCompletas}
                abrirModalDevolucion={handleAbrirModalDevolucion}
                estadoSeleccionado={6} // Filtramos directamente para el estado 6 (completas)
              />
            </>
          )}
        </>
      )}

      <ModalDevoluciones show={showDevolucionModal} handleClose={() => setShowDevolucionModal(false)} envio={envioSeleccionado} onConfirmDevolucion={handleConfirmDevolucion} />
    </div>
  );
}

export default Devoluciones;