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
}) {
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

                                    {/* Menú desplegable para filtrar por masterizado */}
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
                <hr />
            </div>
        </form>
    );
}
