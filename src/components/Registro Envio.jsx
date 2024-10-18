import React from 'react';

const FormComponent = () => {
    return (
    <div className="row register-form">
        <div className="col-md-8 offset-md-2">
        <form className="custom-form">
            <h1>Nuevo Envio</h1>
            <div className="row form-group">
            <div className="col-sm-4 label-column">
                <label className="col-form-label" htmlFor="name-input-field">Empleado</label>
            </div>
            <div className="col-sm-6 input-column">
                <input className="form-control" type="text" />
            </div>
            </div>
            <div className="row form-group">
            <div className="col-sm-4 label-column">
                <label className="col-form-label" htmlFor="email-input-field">Encargado del Envio</label>
            </div>
            <div className="col-sm-6 input-column">
                <input className="form-control" type="email" />
            </div>
            </div>
            <div className="row form-group">
            <div className="col-sm-4 label-column">
                <label className="col-form-label" htmlFor="dropdown-input-field">Tipo de Item a Enviar</label>
            </div>
            <div className="col-sm-4 input-column">
                <div className="dropdown">
                <button
                    className="btn btn-light dropdown-toggle"
                    aria-expanded="false"
                    data-bs-toggle="dropdown"
                    type="button"
                >
                    Dropdown
                </button>
                <div className="dropdown-menu">
                    <a className="dropdown-item" href="#">First Item</a>
                    <a className="dropdown-item" href="#">Second Item</a>
                    <a className="dropdown-item" href="#">Third Item</a>
                </div>
                </div>
            </div>
            </div>
            <div className="row form-group">
            <div className="col-sm-4 label-column">
                <label className="col-form-label" htmlFor="email-input-field">Item</label>
            </div>
            <div className="col-sm-6 input-column">
                <input className="form-control" type="search" />
            </div>
            </div>
            <button className="btn btn-light submit-button" type="button">
                Agregar Envio
            </button>
        </form>
        </div>
    </div>
    );
};

export default FormComponent;
