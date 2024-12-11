import { useState, useEffect } from "react";
import ListadoDevoluciones from "../components/devoluciones/ListadoDevoluciones";
import devolucionesServices from "../services/devoluciones.services";
import ModalDevoluciones from "../components/devoluciones/ModalDevoluciones";
import { Nav } from "react-bootstrap";
import LoaderPacman from "../components/LoaderPacman";
import LoaderBloque from "../components/LoaderBloque";

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

  const handleConfirmDevolucion = async (productos = { recursos: [], computadoras: [] }) => {
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

        // Determinar nuevo estado
        const totalRecursos = envioSeleccionado.detallesEnvioRecurso.length;
        const totalComputadoras = envioSeleccionado.detallesEnvioComputadora.length;

        const devueltosRecursos = productos.recursos.length;
        const devueltosComputadoras = productos.computadoras.length;

        const nuevoEstado =
            devueltosRecursos === totalRecursos && devueltosComputadoras === totalComputadoras
                ? 6 // Devuelto completamente
                : 5; // Devuelto parcialmente

        await devolucionesServices.confirmarDevolucion(envioSeleccionado.idEnvio, nuevoEstado);

        // Actualizar listas y cerrar modal
        cargarDevoluciones();
        setShowDevolucionModal(false);
    } catch (error) {
        console.error("Error al confirmar la devolución:", error);
    }
};


  // Función para actualizar las listas de devoluciones pendientes y completas
  const actualizarListas = (devoluciones) => {
    console.log("Actualizando listas con los envíos:", devoluciones);
  
    // Pendientes: idEstadoEnvio 4 o 5 (sin fechaFin)
    const pendientes = devoluciones.filter((envio) =>
      envio.listaCambiosEstado.some(
        (estado) => !estado.fechaFin && (estado.idEstadoEnvio === 4 || estado.idEstadoEnvio === 5)
      )
    );
  
    // Completas: idEstadoEnvio 6 (sin fechaFin)
    const completas = devoluciones.filter((envio) =>
      envio.listaCambiosEstado.some(
        (estado) => !estado.fechaFin && estado.idEstadoEnvio === 6
      )
    );
  
    console.log("Pendientes:", pendientes);
    console.log("Completas:", completas);
  
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
