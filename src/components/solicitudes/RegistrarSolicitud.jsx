import { useEffect, useState } from "react";
import { toast } from "sonner";
import DownloadPDFButton from "../DownloadPDFButton";

export default function RegistrarSolicitud({handleVolver, nombreUsuario, guardarSolicitud}) {
  const [mostrarLista, setMostrarLista] = useState(true);
  const [cantElementos, setCantElementos] = useState(1);
  const [elementos, setElementos] = useState([
    {
      id: 1,
      cantidad: 1,
      nombre: "",
      descripcion: "",
    },
  ]);

  function handleGuardar(){
    const solicitud = {
      nombreUsuario: nombreUsuario,
      detallesSolicitud: elementos.map(elem => { return {cantidad:elem.cantidad, nombre:elem.nombre, descripcion:elem.descripcion }})
    }
    guardarSolicitud(solicitud);
  }

  useEffect(() => {
    if (cantElementos >= elementos.length) {
      const nuevosElementos = [...elementos];
      while (nuevosElementos.length < cantElementos) {
        nuevosElementos.push({
          id: nuevosElementos.length + 1,
          cantidad: 1,
          nombre: "",
          descripcion: "",
        });
      }
      setElementos(nuevosElementos);
    } else {
      setElementos(elementos.slice(0, cantElementos));
    }
  }, [cantElementos]);

  function changeCantElementos(num) {
    const numero = num;

    if (numero > 0 && numero <= 20) {
      setCantElementos(numero);
    } else if (numero <= 0) {
      toast.error("La cantidad de items no puede ser menor a 1.");
    } else {
      toast.error("La cantidad de items no puede ser mayor a 20");
    }
  }

  function handleIncrementar() {
    changeCantElementos(cantElementos + 1);
  }
  function handleDisminuir() {
    changeCantElementos(cantElementos - 1);
  }

  function handleAumentarCantidadItem(nroItem) {
    const _item = elementos.filter((elem) => elem.id === nroItem).at(0);
    _item.cantidad += 1;
    const indice = elementos.findIndex((elem) => elem.id === nroItem);
    const nuevosElementos = [...elementos];
    nuevosElementos[indice] = _item;
    setElementos(nuevosElementos);
  }

  function handleDisminuirCantidadItem(nroItem) {
    const _item = elementos.filter((elem) => elem.id === nroItem).at(0);
    if (_item.cantidad === 1) {
      toast.error("La cantidad de items no puede ser menor a 1.");
    } else {
      _item.cantidad -= 1;
      const indice = elementos.findIndex((elem) => elem.id === nroItem);
      const nuevosElementos = [...elementos];
      nuevosElementos[indice] = _item;
      setElementos(nuevosElementos);
    }
  }

  function handleCambiarNombre(nombre, nroItem) {
    const _item = elementos.filter((elem) => elem.id === nroItem).at(0);
    _item.nombre = nombre;
    const indice = elementos.findIndex((elem) => elem.id === nroItem);
    const nuevosElementos = [...elementos];
    nuevosElementos[indice] = _item;
    setElementos(nuevosElementos);
  }

  function handleCambiarDescripcion(descripcion, nroItem) {
    const _item = elementos.filter((elem) => elem.id === nroItem).at(0);
    _item.descripcion = descripcion;
    const indice = elementos.findIndex((elem) => elem.id === nroItem);
    const nuevosElementos = [...elementos];
    nuevosElementos[indice] = _item;
    setElementos(nuevosElementos);
  }

  return (
    <>
      <div className="container-fluid">
        {mostrarLista ? (
          <>
            <div className="row mx-auto">
              <h1 className=" fw-normal">Realizar solicitud de reposición</h1>
            </div>
            <div className="row mx-auto">
              <div className="col-13 my-3">
                <span className="me-2 fs-4 fw-normal">Usuario: </span>
                <input 
                type="text"
                disabled={true} readOnly value={nombreUsuario}/>
              </div>
            </div>
            <div className="row mx-auto">
              <div className="col-13 my-3">
                <span className="me-2 fs-4 fw-normal">Cantidad de items:</span>
                <button
                  onClick={handleDisminuir}
                  className="btn btn-primary fw-bold"
                >
                  -
                </button>
                <input
                  value={cantElementos}
                  readOnly
                  className="btn"
                  style={{ width: "45px" }}
                />
                <button
                  onClick={handleIncrementar}
                  className="btn btn-primary fw-bold"
                >
                  +
                </button>
              </div>
            </div>
            <div className="row" id="tabla-descargar">
              <h4 className=" fw-normal">Lista de ítems</h4>
              <div className="table-responsive me-2">
                <table className="table table-hover table-sm table-bordered table-striped">
                  <thead>
                    <tr>
                      <th scope="col"> Acciones</th>
                      <th scope="col">Cantidad</th>
                      <th scope="col">Nombre</th>
                      <th scope="col">Descripción</th>
                    </tr>
                  </thead>
                  <tbody className="">
                    {elementos.map((elemento) => (
                      <tr id={elemento.id}>
                        <td className="text-nowrap">
                          <span
                            className="btn-sm btn btn-warning"
                            onClick={() => {
                              handleDisminuirCantidadItem(elemento.id);
                            }}
                          >
                            -
                          </span>{" "}
                          <span
                            className="btn-sm btn btn-warning"
                            onClick={() => {
                              handleAumentarCantidadItem(elemento.id);
                            }}
                          >
                            +
                          </span>
                        </td>
                        <td>{elemento.cantidad}</td>
                        <td>
                          <input
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
                            value={elemento.descripcion}
                            maxLength="500"
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
              {/*<div className="col-3">
                <DownloadPDFButton
                  setMostrarLista={setMostrarLista}
                  accionExtra={accionExtra}
                ></DownloadPDFButton>
              </div>*/}
              <div className="col-4">
                <button className="btn btn-secondary mx-2" onClick={handleVolver}>Volver</button>
                <button className="btn btn-primary mx-2" onClick={handleGuardar}>Guardar solicitud</button>
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
