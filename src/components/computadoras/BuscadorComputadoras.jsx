import React from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

export default function BuscadorComputadoras({
    esActivo,
    setActivo,
    buscarComputadoras,
    agregarComputadora,
    setMasterizado,
    masterizado,
    handleTodos,
    handleNotebooks,
    handlePC,
    handleAllinOne,
    setSearchTerm,
    categoriaSeleccionada, // Prop para la categoría seleccionada
}) {
    // Determina el texto de estado
    const estadoActivo = esActivo ? "" : "inactivas";
    let tipoSeleccionado = "todas las computadoras"; // Por defecto
    let estadoMasterizado = "";

    // Determina el estado de masterizado
    if (masterizado === "todos") {
        estadoMasterizado = "";
    } else if (masterizado === "masterizado") {
        estadoMasterizado = "masterizadas";
    } else if (masterizado === "noMasterizado") {
        estadoMasterizado = "no masterizadas";
    }

    // Determina el tipo de computadoras según la categoría seleccionada
    switch (categoriaSeleccionada) {
        case 0 && handleTodos:
            tipoSeleccionado = "todas las computadoras";
            break;
        case 1 && handleNotebooks:
            tipoSeleccionado = "Notebooks";
            break;
        case 2 && handlePC:
            tipoSeleccionado = "PC";
            break;
        case 3 && handleAllinOne:
            tipoSeleccionado = "All in One";
            break;
        default:
            tipoSeleccionado = "todas las computadoras";
    }

    return (
        <form
            className="mt-3"
            name="FormBusquedaComputadoras"
            onSubmit={(e) => e.preventDefault()}
        >
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 col-sm-10 col-md-8 col-lg-6 my-2 mx-auto">
                        <div className="form-check">
                            <ButtonGroup aria-label="Basic example">
                                <Button variant="primary" onClick={handleTodos}>
                                    Todos
                                </Button>
                                <Button variant="primary" onClick={handleNotebooks}>
                                    Notebooks
                                </Button>
                                <Button variant="primary" onClick={handlePC}>
                                    PC
                                </Button>
                                <Button variant="primary" onClick={handleAllinOne}>
                                    All in One
                                </Button>
                            </ButtonGroup>

                            <nav className="navbar navbar-expand-md navbar-light" style={{ margin: 0 }}>
                                <div className="container-fluid">
                                    <div className="d-flex align-items-center">
                                        <input
                                            className="form-check-input mt-2 mx-2"
                                            type="checkbox"
                                            id="activo"
                                            checked={esActivo}
                                            onChange={(e) => setActivo(e.target.checked)}
                                        />
                                        <label className="form-check-label ms-2" htmlFor="activo">
                                            Activo
                                        </label>
                                    </div>

                                    <div className="d-flex align-items-center mx-3">
                                        <select
                                            id="masterizado"
                                            className="form-select rounded-start"
                                            value={masterizado}
                                            onChange={(e) => setMasterizado(e.target.value)}
                                        >
                                            <option value="todos">Todos</option>
                                            <option value="masterizado">Masterizados</option>
                                            <option value="noMasterizado">No Masterizados</option>
                                        </select>
                                    </div>

                                    <div className="input-group">
                                        <input
                                            type="text"
                                            placeholder="Buscar por nro de serie"
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="form-control rounded-start"
                                            style={{ maxWidth: "100%" }}
                                        />
                                        <button
                                            type="button"
                                            className="btn btn-primary mx-1 rounded-end"
                                            onClick={buscarComputadoras}
                                        >
                                            <i className="fa fa-search"></i> Buscar
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-warning mx-2 rounded-end"
                                            onClick={agregarComputadora}
                                        >
                                            <i className="fa fa-plus"></i> Agregar Item
                                        </button>
                                    </div>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>

                {/* Encabezado que muestra el estado y tipo de computadoras, debajo de los filtros */}
                <h5 className="text-center">
                    Se están mostrando: {tipoSeleccionado} {estadoActivo} {estadoMasterizado && `(${estadoMasterizado})`}
                </h5>

                <hr />
            </div>
        </form>
    );
}
