import { useState } from "react";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import existenciasService from "../services/existencias.service";

export default function ModalExistencias({ show, handleClose, existencias, idRecurso }) {
  const [mostrarIncorporar, setMostrarIncorporar] = useState(false);
  const [mostrarDisminuir, setMostrarDisminuir] = useState(false);
  const [canSubmit, setCanSubmit] = useState(true)

  const [idDeposito, setIdDeposito] = useState(1)
  const [cantidad, setCantidad] = useState(0)

  function handleDeposito(event){
    setIdDeposito(event.target.value)
  }

  function handleCantidad(event){
    let num = event.target.value;
    num = parseInt(num)
    //num = Math.round(num)
    if (num < 0) return;
    if (num > 100) return;
    console.log(num)
    setCantidad(num)
  }

  async function IncorporarExistencias(){
    setCanSubmit(false)
    const ex = {
      cantidad:cantidad,
      idDeposito:parseInt(idDeposito),
      idRecurso:idRecurso
    }
    console.log(ex)
    if(await existenciasService.incorporar(ex)){
      handleVolver()
      handleClose()
    }
    setCanSubmit(true)
  }

  async function DisminuirExistencias(){
    setCanSubmit(false)
    const ex = {
      cantidad:cantidad,
      idDeposito:parseInt(idDeposito),
      idRecurso:idRecurso
    }
    if (await existenciasService.disminuir(ex)){
      handleVolver()
      handleClose()
    }
    setCanSubmit(true)    
  }



  function handleIncorporar() {
    setMostrarIncorporar(true);
  }

  function handleDisminuir() {
    setMostrarDisminuir(true);
  }

  function handleVolver() {
    setMostrarDisminuir(false);
    setMostrarIncorporar(false);
  }

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      {mostrarIncorporar ? (
        <>
        <Modal.Header closeButton>
            <Modal.Title>Incorporar existencias</Modal.Title>
          </Modal.Header>
          <Modal.Body>

          <div className="container-fluid">
            <div className="row ">
              <div className="col-sm-4 col-md-1 mt-2 me-3">
                <label className="col-form-label">Depósito</label>
              </div>
              <div className="col-sm-8 col-md-4 mt-2">
                <select 
                className="form-control"
                onChange={handleDeposito}>
                  <option defaultValue value={1}>Depósito 1</option>
                  <option value={2}>Depósito 2</option>
                  <option value={3}>Depósito "Temporal" 3</option>
                </select>
              </div>
            </div>
            <div className="row ">
              <div className="col-sm-4 col-md-1 mt-2 me-3">
                <label className="col-form-label ">Cantidad</label>
              </div>
              <div className="col-sm-8 col-md-4 mt-2">
                <input
                className="form-control"
                type="number"
                onChange={handleCantidad}
                value={cantidad} 
                />
              </div>
            </div>
          </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={IncorporarExistencias} disabled={cantidad===0 || !canSubmit}>Incorporar</Button>
            <Button variant="secondary" onClick={handleVolver}>Volver</Button>
          </Modal.Footer>
        </>
      ) : mostrarDisminuir ? (
        <>
        <Modal.Header closeButton>
            <Modal.Title>Disminuir existencias</Modal.Title>
          </Modal.Header>
          <Modal.Body>

          <div className="container-fluid">
            <div className="row ">
              <div className="col-sm-4 col-md-1 mt-2 me-3">
                <label className="col-form-label">Depósito</label>
              </div>
              <div className="col-sm-8 col-md-4 mt-2">
                <select 
                className="form-control"
                onChange={handleDeposito}>
                  <option defaultValue value={1}>Depósito 1</option>
                  <option value={2}>Depósito 2</option>
                  <option value={3}>Depósito "Temporal" 3</option>
                </select>
              </div>
            </div>
            <div className="row ">
              <div className="col-sm-4 col-md-1 mt-2 me-3">
                <label className="col-form-label ">Cantidad</label>
              </div>
              <div className="col-sm-8 col-md-4 mt-2">
                <input
                className="form-control"
                type="number"
                onChange={handleCantidad}
                value={cantidad} 
                />
              </div>
            </div>
          </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="warning" onClick={DisminuirExistencias} disabled={cantidad===0 || !canSubmit}>Disminuir</Button>
            <Button variant="secondary" onClick={handleVolver}>Volver</Button>
          </Modal.Footer>
        </>
      ) : (
        <>
          <Modal.Header closeButton>
            <Modal.Title>Existencias</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="table-responsive">
              <table className="table table-striped">
                <thead className="thead-dark">
                  <tr>
                    <th className="text-center"> Cantidad </th>
                    <th className="text-center"> Deposito </th>
                    <th className="text-center"> Ubicación </th>
                  </tr>
                </thead>
                <tbody>
                  {existencias.map((existencia) => (
                    <tr key={existencia.id}>
                      <td className="text-center">{existencia.cantidad}</td>
                      <td className="text-center">
                        {existencia.deposito?.nombre}
                      </td>
                      <td className="text-center">
                        {existencia.deposito?.ubicacion}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="warning" onClick={handleDisminuir}>Disminuir existencias</Button>
            <Button variant="primary" onClick={handleIncorporar}>Incorporar existencias</Button>
            <Button variant="secondary" onClick={handleClose}>
              Cerrar
            </Button>
          </Modal.Footer>
        </>
      )}
    </Modal>
  );
}
