import {  useState, useEffect } from 'react'
import { empleadosService } from '../services/empleados.services'
import ListadoEmpleados from '../components/empleados/ListadoEmpleados'
import BuscadorEmpleados from '../components/empleados//BuscadorEmpleados'
import RegistroEmpleado from '../components/empleados//RegistroEmpleado'
import { toast } from 'sonner'

import imagen from '../assets/ratita_perdida.png'
import LoaderBloque from '../components/LoaderBloque'


export default function Empleados() {
  const [nombre, setNombre] = useState('')
  const [activo, setActivo] = useState(true)
  const [empleados, setEmpleados] = useState(null)
  const [empleado, setEmpleado] = useState(null)
  const [buscaActivos, setBuscaActivos] = useState(activo)
  const [mostrarRegistroEmpleado, setMostrarRegistroEmpleado] = useState(false)
  const [estaCargando, setEstaCargando] = useState(true)

  useEffect(()=>{
    setBuscaActivos(empleados?.at(0)?.activo ?? true)
  },[empleados])

  async function buscarEmpleados() {
    setEstaCargando(true)
    const data = await empleadosService.search({ nombre, activo })
    setEmpleados(data)
    setEstaCargando(false)
  }

   // Use useEffect to update empleados when the page loads
  useEffect(() => {
    buscarEmpleados();
  }, []); // Empty array means this runs once when the component mounts


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
    if (!empleado.activo) {
      toast.error("No puede modificarse un registro inactivo")
      return;
  }
    console.log(empleado)
    setEmpleado(empleado)
    setMostrarRegistroEmpleado(true)
  }


  async function guardarEmpleado(data) {
    if (await empleadosService.save(data)){
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
      {
        estaCargando ?
      <LoaderBloque texto={"Cargando empleados..."} />
        :
      (!!empleados ?
      <ListadoEmpleados
        empleados={empleados}
        modificar={modificarEmpleado}
        desactivar={desactivarEmpleado}
        activar={activarEmpleado}
        buscaActivos={buscaActivos}
      /> : ""
      /*<img
        className="mx-auto"
        src={imagen}
        alt="imagen de ejemplo"
        style={{ width: "20em" }}
      /> */
      )
      
      }
    </>
  );
}