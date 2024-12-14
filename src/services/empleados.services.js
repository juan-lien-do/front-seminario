import sonnerQuestion from '../utils/sonnerQuestion';
import instance from '../../axios.config'
import { Toaster, toast } from "sonner";




const baseUrl = "http://localhost:8080/empleados/";


async function search({ nombre, activo }) {
  try {
    const response = await instance.get(baseUrl, {
      params: { nombre: nombre, activo: activo },
    });
    const datosOrdenados = response.data.sort((a, b) => {
      const nameA = a.nombre.toUpperCase();
      const nameB = b.nombre.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });

    return datosOrdenados;
  } catch (error) {
    if(error.response.status === 401) {toast.error("Inicie sesión nuevamente")}
    console.error(error);
  }
}

// este getById esta mas al pedo que bocina de avion
/*
async function getById(id) {
  const url = `${baseUrl}/${id}`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}*/

async function save(empleado) {
  if (empleado.id_empleado === 0) {
    const respuesta = await sonnerQuestion.pregunta("¿Desea registrar el empleado")
    if(respuesta){
      try {
        await instance.post(baseUrl, empleado);
        toast.success("Se cargó un empleado nuevo.")
        return true;

      } catch (err) {
        console.log("Header xd:", err.response.headers['xd']);
        toast.error("Surgió un error")
        return false;
      }
    }
    return;
  }
  const respuesta = await sonnerQuestion.pregunta("¿Desea actualizar el empleado")
  if(respuesta){
    try {
      const url = `${baseUrl}`;
      await instance.put(url, empleado);
      toast.success("Se actualizaron los datos del empleado")
      return true;

    } catch (err) {
      toast.error("Surgió un error")
      return false

    }
    return;
  }

  try {
    const url = `${baseUrl}`;
    await instance.put(url, empleado);
    toast.success("Se actualizaron los datos del empleado")
    //audioExito.play()

  } catch (err) {
    console.error(err);
    toast.error("Surgió un error")
    //audioError.play();

    
  }
}

async function remove(id) {
  const url = `${baseUrl}desactivar/${id}`;

  const respuesta = await sonnerQuestion.pregunta("¿Desea dar de baja el empleado")
  if(respuesta){
    try {
      await instance.patch(url);
      toast.success("El Empleado ha sido dado de baja correctamente")

    } catch (err) {
      console.log(err);
      toast.error(err.response.data)
    }
  }
}

async function activar(id) {
  const url = `${baseUrl}activar/${id}`;

  const respuesta = await sonnerQuestion.pregunta("¿Desea dar de alta el empleado?")
  if(respuesta){
    try {
      await instance.patch(url);
      toast.success("Se dio de alta correctamente")

    } catch (error) {
      console.error(error);
      toast.error("Surgió un error")

    }
  }
}

async function tieneComputadora(idCompu) {
  const url = `${baseUrl}tiene-computadora/${idCompu}`;

  const respuesta = await instance.get(url);

  return respuesta.data;
}


export const empleadosService = {
  search,
  //getById,
  save,
  remove,
  activar,
  tieneComputadora,
}
