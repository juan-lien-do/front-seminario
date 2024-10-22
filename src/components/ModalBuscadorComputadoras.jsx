import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Select from "react-select";

export default function ModalBuscadorComputadoras({
  show,
  handleClose,
  computadoras,
  computadorasSeleccionadas,
  computadoraElegida,
  agregarDetalleComputadora,
  setComputadoraElegida,
}) {
  const [options, setOptions] = useState(
    computadoras?.map((computadora) => {
      return { value: computadora.idComputadora, label: computadora.nroSerie };
    })
  );

  useEffect(() => {
    const _options = computadoras?.map((computadora) => {
      return { value: computadora.idComputadora, label: computadora.nroSerie };
    });

    setOptions(_options);
  }, [computadoras]);

  function handleUpdate(selectedOption) {
    if (selectedOption) {
      const _computadora = computadoras
        .filter((compu) => compu.idComputadora === selectedOption.value)
        .at(0);
      setComputadoraElegida(_computadora);
    } else {
      setComputadoraElegida(null);
    }
  }

  function handleGuardarDetalleComputadora() {
    const _detalleCompu = {
      idComputadora:computadoraElegida.idComputadora,
      nroSerie:computadoraElegida.nroSerie,
      idTipo:computadoraElegida.idTipo,
      descripcion:computadoraElegida.descripcion,
    }
    //console.log(_detalleCompu)

    agregarDetalleComputadora(_detalleCompu);
    setComputadoraElegida(null);
    handleClose();
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
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Computadoras</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Select 
        options={options}
        placeholder={"Buscar computadora"}
        onChange={handleUpdate}
        isClearable
        ></Select>
        {
          !!computadoraElegida &&
        <div className="card mt-2 px-2 py-2 bg-light">
          <label>Número de serie: <span className="badge bg-primary"> {computadoraElegida?.nroSerie} </span> </label>
          <label>Tipo PC: <span className="badge bg-primary">{translateTipoComputadora(computadoraElegida?.idTipo)}</span></label>
          <label>Descripción: </label>
          <div className="card px-2">
            {computadoraElegida?.descripcion}
          </div>
        </div>
        }
        
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" 
        disabled={!computadoraElegida}
        onClick={handleGuardarDetalleComputadora}>
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
