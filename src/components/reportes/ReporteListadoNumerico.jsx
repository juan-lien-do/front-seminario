import React, { useState } from "react";

export default function ReporteListadoNumerico() {
    const [pedidosAtendidos, setPedidosAtendidos] = useState(314);
    const [pedidosCompletados, setPedidosCompletados] = useState(224);
    const [pedidosEnProceso, setPedidosEnProceso] = useState(90);
    const [incorporaciones, setIncorporaciones] = useState(22);

    return (
        <div className="container mt-4">
            <div className="row g-4">
                {/* Pedidos Atendidos */}
                <div className="col-md-3">
                    <div className="card text-center border-primary">
                        <div className="card-body">
                            <i className="fa-solid fa-clipboard-list fa-2x text-primary mb-3"></i>
                            <h5 className="card-title">Pedidos Atendidos</h5>
                            <p className="card-text fs-4 fw-bold">{pedidosAtendidos}</p>
                        </div>
                    </div>
                </div>
                {/* Pedidos Completados */}
                <div className="col-md-3">
                    <div className="card text-center border-success">
                        <div className="card-body">
                            <i className="fa-solid fa-truck-fast fa-2x text-success mb-3"></i>
                            <h5 className="card-title">Pedidos Completados</h5>
                            <p className="card-text fs-4 fw-bold">{pedidosCompletados}</p>
                        </div>
                    </div>
                </div>
                {/* Pedidos en Proceso */}
                <div className="col-md-3">
                    <div className="card text-center border-warning">
                        <div className="card-body">
                            <i className="fa-solid fa-gears fa-2x text-warning mb-3"></i>
                            <h5 className="card-title">Pedidos En Proceso</h5>
                            <p className="card-text fs-4 fw-bold">{pedidosEnProceso}</p>
                        </div>
                    </div>
                </div>
                {/* Incorporaciones */}
                <div className="col-md-3">
                    <div className="card text-center border-info">
                        <div className="card-body">
                            <i className="fa-solid fa-truck-ramp-box fa-2x text-info mb-3"></i>
                            <h5 className="card-title">Incorporaciones</h5>
                            <p className="card-text fs-4 fw-bold">{incorporaciones}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
