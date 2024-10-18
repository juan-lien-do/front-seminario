import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Select from "react-select";

export default function ModalBuscadorExistencias({
  show,
  handleClose,
  recursos,
  recursoElegido,
  setRecursoElegido,
  agregarDetallesRecurso,
  recursosSeleccionados,
  detalleRecursoElegido,
  setDetalleRecursoElegido,
}) {
  
  const [options, setOptions] = useState(
    recursos?.map((recurso) => {
      return { value: recurso.id, label: recurso.nombre };
    })
  );

  useEffect(() => {
    //console.log(recursos);
    const _options = recursos?.map((recurso) => {
        return { value: recurso.id, label: recurso.nombre };
      })
    setOptions(_options);
  }, [recursos]);

  function handleUpdate(selectedOption) {
    //console.log(selectedOption);
    if(selectedOption){
        const _recurso = recursos.filter((recurso)=>{return recurso.id === selectedOption.value}).at(0)
        //console.log(_recurso)
        _recurso?.existencias.forEach(element => {
            element.cantidadDetalle = 0;
        });
        setRecursoElegido(_recurso)
    } else{
        setRecursoElegido(null)
    }
  }

  const handleCantidadDetalle = (event, _idExistencia) => {
    const _cantidad = event.target.value;
    if (_cantidad < 0) return
    // Crear una copia del recurso y las existencias para mantener la inmutabilidad
    const nuevoRecurso = { ...recursoElegido };
    const existenciasActualizadas = nuevoRecurso.existencias.map((ex) => {
      if (ex.id === _idExistencia) {
        return { ...ex, cantidadDetalle: parseInt(_cantidad) }; // Crear una copia y actualizar la cantidad
      }
      return ex;
    });
    // Asignar las existencias actualizadas al nuevo recurso
    nuevoRecurso.existencias = existenciasActualizadas;
    //console.log(nuevoRecurso.existencias)

    if (_cantidad > existenciasActualizadas.filter((ex)=>ex.id === _idExistencia).at(0).cantidad) return
    // Actualizar el estado con el nuevo recurso
    setRecursoElegido(nuevoRecurso);
  };
  
  // transforma los datos en algo que parece un detalle
  function handleGuardarDetalle(){
    let detalles = []
    recursoElegido?.existencias.forEach((ex)=>{
        if (ex.cantidadDetalle > 0){
            let nuevoDetalle = {
                cantidad: ex.cantidadDetalle,
                idRecurso: recursoElegido.id,
                idExistencia: ex.id,
            }
            detalles.push(nuevoDetalle)
        }
        }
    )
    //console.log(detalles)

    agregarDetallesRecurso(detalles)
    setRecursoElegido(null)
    handleClose()
  }

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Existencias</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Select
          options={options}
          placeholder={"Buscar recurso"}
          onChange={handleUpdate}
          isClearable
        ></Select>

        {(recursosSeleccionados.some((rec)=> rec.id === recursoElegido?.id)) ? 
                    <p className="mt-4">Tienes que eliminar tus detalles anteriores antes de cargar más detalles del mismo tipo</p>
                :
        
            <div className="table-responsive">
            <table className="table table-striped">
                <thead className="thead-dark">
                <tr>
                    <th className="text-center"> Cantidad </th>
                    <th className="text-center"> Deposito </th>
                    <th className="text-center"> En este envío </th>
                </tr>
                </thead>
                <tbody>
                    {   

                        recursoElegido?.existencias.map((existencia) =>
                            
                            <tr key={existencia.id}>
                                <td className="text-center">
                                    {existencia.cantidad}
                                </td>
                                <td className="text-center">
                                    {existencia.deposito?.nombre}
                                </td>
                                <td className="text-center">
                                    <input className="w-25" type="number" 
                                    value={existencia.cantidadDetalle} 
                                    onChange={(event)=>{handleCantidadDetalle(event ,existencia.id)}}>
                                    </input>
                                </td>
                            </tr>
                            
                        )
                    }
                </tbody>
            </table>
            </div>
        }

      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={handleGuardarDetalle}>
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
