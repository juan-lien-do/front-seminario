import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import ModalBuscadorExistencias from "../recursos/ModalBuscadorExistencias";
import ModalDetalle from "../ModalDetalle";
import ModalBuscadorComputadoras from "../computadoras/ModalBuscadorComputadoras";

export default function RegistrarEnvio({
  envio,
  setEnvio,
  empleados,
  recursos,
  handleVolverAtras,
  guardarEnvio,
  computadoras,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useForm({
    values: envio,
    mode: "onChange", // Valida el formulario en tiempo real
  });

  const [detallesEnvioComputadora, setDetallesEnvioComputadora] = useState([]);
  const [mostrarBuscadorComputadoras, setMostrarBuscadorComputadoras] =
    useState(false);
  const [computadoraElegida, setComputadoraElegida] = useState(null);
  

  const [empleadosFiltrados, setEmpleadosFiltrados] = useState([]);
  const [ubicacion, setUbicacion] = useState(envio?.ubicacion); // tengo que hacer esto sino se borra cuando cambio el empleado
  const [hayEmpleadoSeleccionado, setHayEmpleadoSeleccionado] = useState(false); // sino no se si hay empleado
  /* esto me pasa por usar soluciones por fuera del framework */

  // lista de detalles agregados "al carrito"
  const [detallesEnvioRecurso, setDetallesEnvioRecurso] = useState([]);
  // mostrar o no el modal de busqueda de recursos
  const [mostrarBuscadorRecursos, setMostrarBuscadorRecursos] = useState(false);
  // el recurso seleccionado actualmente en el buscador
  const [recursoElegido, setRecursoElegido] = useState(null);
  // detalles que tiene el recurso elegido
  const [detalleRecursoElegido, setDetalleRecursoElegido] = useState(null);
  // una lista con los recursos que están presentes en los detalles de envío
  const [recursosSeleccionados, setRecursosSeleccionados] = useState([]);

  // mostrar el modal con datos del detalle clickeado
  const [mostrarModalDetalle, setMostrarModalDetalle] = useState(false);
  // datos de ese modal
  const [detalleModal, setDetalleModal] = useState(null);

  function handleMostrarDetalleModal(idRecurso) {
    //console.log(recursos)
    //console.log(detallesEnvioRecurso)
    
    let _detalle = detallesEnvioRecurso
    .filter((det) => {
      return idRecurso === det.idRecurso;
    })
    .map((det) => {
      return {
        cantidad: det.cantidad,
        deposito: recursos
          ?.filter((rec) =>
            rec.existencias.some(
              (ex) => parseInt(det.idExistencia) === parseInt(ex.id)
            )
          )
          .map((rec)=>rec.existencias)
          .at(0)
          .filter((ex)=>parseInt(det.idExistencia) === parseInt(ex.id))
          .at(0)
          .deposito
      };
    });
    setDetalleModal(_detalle);
    setMostrarModalDetalle(true);
  }
  function cerrarDetalleModal() {
    setMostrarModalDetalle(false);
  }

  useEffect(() => {
    let nuevosRecursos = recursos.filter((rec) => {
      return detallesEnvioRecurso.some(
        (detalle) => detalle.idRecurso === rec.id
      );
    });
    setRecursosSeleccionados(nuevosRecursos);
  }, [detallesEnvioRecurso, recursos, recursoElegido]);



  function agregarDetallesRecurso(detalle) {
    let nuevoDetalles = detallesEnvioRecurso;
    detalle?.forEach((element) => {
      nuevoDetalles.push(element);
    });
    //console.log(nuevoDetalles);
    setDetallesEnvioRecurso(nuevoDetalles);
  }

  function agregarDetalleComputadora(detalle){
    console.log(detalle)
    let nuevoDetalles = detallesEnvioComputadora;
    nuevoDetalles.push(detalle)
    //console.log(nuevoDetalles);
    setDetallesEnvioComputadora(nuevoDetalles);
  }

  function handleUbicacionChange(e) {
    //console.log(e.target.value)
    setUbicacion(e.target.value);
  }

  function handleBuscarExistenciasRecurso() {
    setMostrarBuscadorRecursos(true);
  }

  function handleCerrarModalRecurso() {
    setMostrarBuscadorRecursos(false);
  }

  function handleCerrarModalComputadoras() {
    setMostrarBuscadorComputadoras(false);
  }

  function handleBuscarComputadoras() {
    setMostrarBuscadorComputadoras(true);
  }

  useEffect(() => {
    const empleadosOptions = empleados?.map((empleado) => ({
      value: empleado.idEmpleado,
      label: `${empleado.nombre} - ${empleado.ws}`,
    }));
    setEmpleadosFiltrados(empleadosOptions);
  }, [empleados]);

  function eliminarDetalles(idRecurso) {
    let _detallesEnvioRecurso = detallesEnvioRecurso.filter((rec) => {
      return rec.idRecurso !== idRecurso;
    });

    console.log(_detallesEnvioRecurso);
    setDetallesEnvioRecurso(_detallesEnvioRecurso);
  }

  function eliminarComputadora(idComputadora){
    let _detallesEnvioComputadora = detallesEnvioComputadora.filter((com) => {
      return com.idComputadora !== idComputadora;
    });

    setDetallesEnvioComputadora(_detallesEnvioComputadora);
  }

  const handleEmpleadoChange = (selectedOption) => {
    setValue("idEmpleado", selectedOption ? selectedOption.value : null);
    setHayEmpleadoSeleccionado(!selectedOption);
    setEnvio({ ...envio, idEmpleado: selectedOption, ubicacion: ubicacion });
  };

  const onSubmit = (data) => {
    guardarEnvio({
      ...data,
      detallesEnvioComputadora,
      detallesEnvioRecurso,
      idEmpleado: data.idEmpleado.value,
    });
    //console.log({ ...data, detallesEnvioComputadora, detallesEnvioRecurso }); // Esto es una polenteada terrible pero es que el componente es complejo
  };

  function seleccionarRecursos() {
    //console.log(detallesEnvioRecurso);
  }

  function translateTipoComputadora(tipo){
    return tipo === 1
      ? "Notebook"
      : tipo === 2
      ? "PC"
      : tipo === 3
      ? "All in One"
      : "Categoría desconocida"
  }

  return (
    <div className="row register-form mx-2">
      {/* Botón comentado, no sé que hace
       <button onClick={() => {console.log(detallesEnvioComputadora)}}>a</button> */}
      <div className="col-md-8 offset-md-2 mt-3">
        <form className="custom-form" onSubmit={handleSubmit(onSubmit)}>
          <h1>Nuevo Envío</h1>
          <ModalBuscadorComputadoras
            show={mostrarBuscadorComputadoras}
            handleClose={handleCerrarModalComputadoras}
            computadoras={computadoras}
            computadoraElegida={computadoraElegida}
            setComputadoraElegida={setComputadoraElegida}
            agregarDetalleComputadora={agregarDetalleComputadora}
          />

          <ModalDetalle
            show={mostrarModalDetalle}
            handleClose={cerrarDetalleModal}
            detalle={detalleModal}
          ></ModalDetalle>
          <ModalBuscadorExistencias
            recursosSeleccionados={recursosSeleccionados}
            show={mostrarBuscadorRecursos}
            recursos={recursos}
            handleClose={handleCerrarModalRecurso}
            detalleRecursoElegido={detalleRecursoElegido}
            setDetalleRecursoElegido={setDetalleRecursoElegido}
            recursoElegido={recursoElegido}
            setRecursoElegido={setRecursoElegido}
            agregarDetallesRecurso={agregarDetallesRecurso}
          />

          {/* Campo Empleado con react-select */}
          <div className="row form-group my-2">
            <div className="col-sm-4 label-column">
              <label className="col-form-label" htmlFor="idEmpleado">
                Empleado
              </label>
            </div>
            <div className="col-sm-6 input-column">
              <Select
                options={empleadosFiltrados}
                onChange={handleEmpleadoChange}
                placeholder="Buscar empleado"
                isClearable
              />
              {hayEmpleadoSeleccionado && (
                <span className="text-danger">El campo es obligatorio</span>
              )}
            </div>
          </div>

          {/* Campo Encargado del Envio */}
          <div className="row form-group my-2">
            <div className="col-sm-4 label-column">
              <label className="col-form-label" htmlFor="nombreUsuario">
                Usuario que registra el envío
              </label>
            </div>
            <div className="col-sm-6 input-column">
              <input
                className="form-control"
                type="text"
                disabled={true}
                {...register("nombreUsuario", {
                  required: true,
                })}
              />
              {errors.nombreUsuario && (
                <span className="text-danger">El campo es obligatorio</span>
              )}
            </div>
          </div>


          <h4>Detalles</h4>
          <div className="mx-auto my-2">
            <button
              type="button"
              className="btn btn-primary mx-1 my-1"
              onClick={handleBuscarComputadoras}
            >
              agregar computadora
            </button>
            <button
              type="button"
              className="btn btn-primary mx-1"
              onClick={handleBuscarExistenciasRecurso}
            >
              agregar recurso
            </button>
          </div>
          <div className="card py-2 px-3 bg-light col-10">
            {detallesEnvioComputadora + detallesEnvioRecurso == 0 ? (
              <h4 className="mx-auto my-4">Agregá un recurso o computadora</h4>
            ) : (
              <>
                {recursosSeleccionados?.map((rec) => (
                  <>
                    <div className="container-sm my-2">
                      <div className="card shadow-sm">
                        <div className="card-body">
                          <div className="row align-items-center">
                            <div className="col-6">
                              <strong>{rec.nombre}</strong>
                            </div>
                            <div className="col-2 text-end ">
                              <button
                                type="button"
                                onClick={() => {
                                  eliminarDetalles(rec.id);
                                }}
                                className="btn btn-danger btn-sm"
                              >
                                <i className="fas fa-trash"></i>
                                Eliminar
                              </button>
                            </div>
                          </div>
                          <div className="row mt-3">
                            <div className="col-6">
                              <span className="text-muted">
                                {detallesEnvioRecurso
                                  .filter((det) => det.idRecurso === rec.id)
                                  .reduce(
                                    (accumulator, currentValue) =>
                                      accumulator + currentValue.cantidad,
                                    0
                                  )}{" "}
                                elementos
                              </span>
                            </div>
                            <div className="col-2 text-end ">
                              <button
                                type="button"
                                className="btn btn-primary btn-sm"
                                onClick={() => {
                                  handleMostrarDetalleModal(rec.id);
                                }}
                              >
                                <i className="fa-regular fa-eye mx-2"></i>
                                Ver
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ))}

                {detallesEnvioComputadora?.map((cmpElegida) => (
                  <div className="card mt-2 mx-2 px-2 py-2">
                    <div className="row">
                      <div className="col-6">
                        <label>
                          Número de serie:{" "}
                          <span className="badge bg-primary">
                            {" "}
                            {cmpElegida?.nroSerie}{" "}
                          </span>{" "}
                        </label>
                        <label>
                          Tipo PC:{" "}
                          <span className="badge bg-primary">
                            {translateTipoComputadora(cmpElegida?.idTipo)}
                          </span>
                        </label>
                        <label>Descripción: </label>
                        <div className="card px-2 bg-light">{cmpElegida?.descripcion}</div>
                      </div>
                      <div className="col-2 text-end ">
                              <button
                                type="button"
                                onClick={() => {
                                  eliminarComputadora(cmpElegida.idComputadora);
                                }}
                                className="btn btn-danger btn-sm"
                              >
                                <i className="fas fa-trash"></i>
                                Eliminar
                              </button>
                            </div>
                    </div>
                    
                    
                  </div>
                ))}
              </>
            )}
          </div>

          <button
            className="my-2 btn btn-warning submit-button"
            type="submit"
            disabled={
              !isValid ||
              envio.idEmpleado === null ||
              envio.idEmpleado === 0 ||
              detallesEnvioComputadora.length + detallesEnvioRecurso.length ===
                0
            }
          >
            Agregar Envio
          </button>
        </form>

        <button
          type="button"
          className="my-2 mx-auto btn btn-secondary"
          onClick={handleVolverAtras}
        >
          Volver atrás
        </button>
      </div>
    </div>
  );
}
