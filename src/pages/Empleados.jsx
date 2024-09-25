import {  useState } from 'react'
import { empleadosService } from '../services/empleados.services'
import ListadoEmpleados from '../components/ListadoEmpleados'
import BuscadorEmpleados from '../components/BuscadorEmpleados'
import RegistroEmpleado from '../components/RegistroEmpleado'


export default function Empleados() {
  const [nombre, setNombre] = useState('')
  const [activo, setActivo] = useState(true)
  const [empleados, setEmpleados] = useState(null)
  const [empleado, setEmpleado] = useState(null)
  const [mostrarRegistroEmpleado, setMostrarRegistroEmpleado] = useState(false)

  async function buscarEmpleados() {
    const data = await empleadosService.search({ nombre, activo })
    setEmpleados(data)
  }

  function agregarEmpleado() {
    const v = {
      id_empleado: 0,
      cuil: null,
      nombre: null,
      mail: null,
      telefono: null,
      activo: true,
      ws: null,
    }

    setEmpleado(v)
    setMostrarRegistroEmpleado(true)
  }

  function modificarEmpleado(empleado) {
    console.log(empleado)
    setEmpleado(empleado)
    setMostrarRegistroEmpleado(true)
  }


  async function guardarEmpleado(data) {
    const resp = window.confirm(
      "Está seguro que quiere " +
        (empleado.activo ? "desactivar" : "activar") +
        " el registro?"
    );
    if (resp) {
    await empleadosService.save(data)
    setMostrarRegistroEmpleado(false)
    buscarEmpleados()
    }
  }

  async function desactivarEmpleado(id) {
    await empleadosService.remove(id)
    buscarEmpleados()
  }

  async function activarEmpleado(id) {
    await empleadosService.activar(id)
    buscarEmpleados()
  }




  if (mostrarRegistroEmpleado) {
    return (
      <RegistroEmpleado
        guardar={guardarEmpleado}
        volver={() => setMostrarRegistroEmpleado(false)}
        empleado={empleado} />
    )
  }

  return (
    <>
      <BuscadorEmpleados
        nombre={nombre}
        setNombre={setNombre}
        activo={activo}
        setActivo={setActivo}
        buscarEmpleados={buscarEmpleados}
        agregarEmpleado={agregarEmpleado}
        
        
      />

      {empleados &&
      <ListadoEmpleados
        empleados={empleados}
        modificar={modificarEmpleado}
        desactivar={desactivarEmpleado}
        activar={activarEmpleado}
      />}
    </>
  );
}