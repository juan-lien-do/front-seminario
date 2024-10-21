import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function RegistroComputadoras({ volver, computadora, guardar }) {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        setValue,
        watch,
    } = useForm({
        defaultValues: computadora // Asegúrate de que los valores por defecto sean los correctos
    });

    const [showModal, setShowModal] = useState(false);
    const [ubicacionInfo, setUbicacionInfo] = useState("");
    const [isMasterizado, setIsMasterizado] = useState(false); // Estado local para isMasterizado

    const onSubmit = (data) => {
        guardar(data);
    };

    // Funciones para manejar el modal
    const handleModalClose = () => setShowModal(false);
    const handleModalShow = (info) => {
        setUbicacionInfo(info);
        setShowModal(true);
    };

    // Manejar la selección de depósito
    const handleDepositoChange = (event) => {
        const value = event.target.value;
        setValue("idDeposito", value);
        if (value) {
            setValue("nroWs", ""); // Resetear el campo nroWs si se selecciona un depósito
        }
    };

    // Efecto para cargar el valor de la ubicación al editar
    useEffect(() => {
        if (computadora) {
            setValue("idDeposito", computadora.idDeposito); // Cargar el valor de la ubicación desde la computadora
        }
    }, [computadora, setValue]);

    // Efecto para manejar cambios en esMasterizado
    useEffect(() => {
        setValue("nroWs", isMasterizado ? "" : ""); // Reinicia el campo nroWs
    }, [isMasterizado, setValue]);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="container-fluid">
                <fieldset>

                    {/* campo nroSerie */}
                    <div className="row">
                        <div className="col-sm-4 col-md-3 offset-md-1">
                            <label className="col-form-label" htmlFor="nroSerie">
                                Numero de Serie<span className="text-danger">*</span>:
                            </label>
                        </div>
                        <div className="col-sm-8 col-md-6">
                            <input
                                type="text"
                                {...register("nroSerie", { required: true })}
                                autoFocus
                                className="form-control"
                            />
                        </div>
                    </div>

                    {/* campo idTipo */}
                    <div className="row">
                        <div className="col-sm-4 col-md-3 offset-md-1">
                            <label className="col-form-label" htmlFor="idTipo">
                                Tipo<span className="text-danger">*</span>:
                            </label>
                        </div>
                        <div className="col-sm-8 col-md-6">
                            <select
                                {...register("idTipo", { required: { value: true, message: "El tipo es requerido" } })}
                                className={`form-control ${errors?.idTipo ? "is-invalid" : ""}`}
                            >
                                <option value="">Seleccione una opción</option>
                                <option value={1}>Notebook</option>
                                <option value={2}>PC</option>
                                <option value={3}>All in One</option>
                            </select>
                            <div className="invalid-feedback">{errors?.idTipo?.message}</div>
                        </div>
                    </div>

                    {/* campo descripcion */}
                    <div className="row">
                        <div className="col-sm-4 col-md-3 offset-md-1">
                            <label className="col-form-label" htmlFor="descripcion">
                                Descripcion<span className="text-danger">*</span>:
                            </label>
                        </div>
                        <div className="col-sm-8 col-md-6">
                            <input
                                type="text"
                                {...register("descripcion", { required: true })}
                                className="form-control"
                            />
                        </div>
                    </div>

                    {/* campo Activo */}
                    <div className="row">
                        <div className="col-sm-4 col-md-3 offset-md-1">
                            <label className="col-form-label" htmlFor="esActivo">
                                Activo<span className="text-danger">*</span>:
                            </label>
                        </div>
                        <div className="col-sm-8 col-md-6">
                            <select
                                name="esActivo"
                                {...register("esActivo", {
                                    required: { value: true, message: "Activo es requerido" },
                                })}
                                className={`form-control ${errors?.esActivo ? "is-invalid" : ""}`}
                            >
                                <option value={null}></option>
                                <option value={false}>NO</option>
                                <option value={true}>SI</option>
                            </select>
                            <div className="invalid-feedback">{errors?.esActivo?.message}</div>
                        </div>
                    </div>

                    {/* campo masterizado */}
                    <div className="row">
                        <div className="col-sm-4 col-md-3 offset-md-1">
                            <label className="col-form-label" htmlFor="esMasterizado">
                                Masterizado<span className="text-danger">*</span>:
                            </label>
                        </div>
                        <div className="col-sm-8 col-md-6">
                            <select
                                {...register("esMasterizado", {
                                    required: false,
                                })}
                                className={`form-control ${errors?.esMasterizado ? "is-invalid" : ""}`}
                                onChange={(e) => {
                                    const value = e.target.value === "true"; // Convertir a boolean
                                    setIsMasterizado(value); // Actualizar el estado local
                                    setValue("esMasterizado", value); // Actualizar el valor en el formulario
                                    if (!value) {
                                        setValue("nroWs", ""); // Resetear el campo nroWs si no es masterizado
                                    }
                                }}
                            >
                                <option value={true}>SI</option>
                                <option value={false}>NO</option>
                            </select>
                            <div className="invalid-feedback">{errors?.esMasterizado?.message}</div>
                        </div>
                    </div>

                    {/* campo nroWs (condicional) */}
                    {isMasterizado && (
                        <div className="row">
                            <div className="col-sm-4 col-md-3 offset-md-1">
                                <label className="col-form-label" htmlFor="nroWs">
                                    Número WS:
                                </label>
                            </div>
                            <div className="col-sm-8 col-md-6">
                                <input
                                    type="number"
                                    {...register("nroWs", {
                                        required: isMasterizado ? { value: true, message: "Nro WS es requerido" } : false,
                                    })}
                                    className={`form-control ${errors?.nroWs ? "is-invalid" : ""}`}
                                />
                                <div className="invalid-feedback">{errors?.nroWs?.message}</div>
                            </div>
                        </div>
                    )}

                    {/* campo idDeposito */}
                    <div className="row">
                        <div className="col-sm-4 col-md-3 offset-md-1">
                            <label className="col-form-label" htmlFor="idDeposito">
                                Ubicación<span className="text-danger">*</span>:
                            </label>
                        </div>
                        <div className="col-sm-8 col-md-6">
                            <div className="d-flex">
                                <select
                                    {...register("idDeposito", {
                                        required: { value: true, message: "Ubicación es requerida" },
                                    })}
                                    className={`form-control ${errors?.idDeposito ? "is-invalid" : ""}`}
                                    onChange={handleDepositoChange} // Actualiza el manejador
                                >
                                    <option value="">Seleccione una opción</option>
                                    <option value={1}>Depósito 1</option> {/* idDeposito 1 */}
                                    <option value={2}>Depósito 2</option> {/* idDeposito 2 */}
                                    <option value={3}>Depósito 3</option> {/* idDeposito 3 */}
                                </select>
                                <div className="invalid-feedback">{errors?.idDeposito?.message}</div>
                                <Button className="ms-2" onClick={() => handleModalShow(watch("idDeposito"))}>
                                    Ver más
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Botones */}
                    <hr />
                    <div className="row justify-content-center">
                        <div className="col text-center botones">
                            <button type="submit" className="btn btn-primary mx-2" disabled={!isValid}>
                                <i className="fa fa-check"></i> Guardar
                            </button>

                            <button
                                type="button"
                                className="btn btn-warning mx-2"
                                onClick={volver}
                            >
                                <i className="fa fa-undo"></i> Cancelar
                            </button>
                        </div>
                    </div>
                </fieldset>

                {/* Modal para mostrar detalles de la ubicación */}
                <Modal show={showModal} onHide={handleModalClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Detalles de la Ubicación</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {ubicacionInfo === "1" && (
                            <p>Deposito 1: Subsuelo, Piso -2 frente al Ascensor.</p>
                        )}
                        {ubicacionInfo === "2" && (
                            <p>Deposito 2: Subsuelo, Piso -2. Exterior en la zona de estacionamiento.</p>
                        )}
                        {ubicacionInfo === "3" && (
                            <p>Deposito 3: Armario ubicado en la Sala de Granjas - Piso 2 Área de Tesorería y Presupuesto.</p>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleModalClose}>
                            Cerrar
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </form>
    );
}
