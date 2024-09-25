//import axios from "axios";
//import axios from 'axios';
import instance from '../../axios.config'
import { Toaster, toast } from "sonner";

const baseUrl = "http://localhost:8080/empleados/";

async function search({ nombre, activo }) {
  try {
    const response = await instance.get(baseUrl, {
      params: { nombre: nombre, activo: activo },
    });
    return response.data;
  } catch (error) {
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
    try {
      await instance.post(baseUrl, empleado);
      toast.success("Se cargó un empleado nuevo.")

    } catch (err) {
      console.error(err);
      toast.error("Surgió un error")

    }
    return;
  }

  try {
    const url = `${baseUrl}`;
    await instance.put(url, empleado);
    toast.success("Se actualizaron los datos del empleado con ID: "+empleado.idEmpleado)

  } catch (err) {
    console.error(err);
    toast.error("Surgió un error")

  }
}

async function remove(id) {
  const url = `${baseUrl}desactivar/${id}`;

  try {
    await instance.patch(url);
    toast.success("Se desactivó un empleado existente.")

  } catch (error) {
    console.error(error);
    toast.error("Surgió un error")

  }
}

async function activar(id) {
  const url = `${baseUrl}activar/${id}`;

  try {
    await instance.patch(url);
    toast.success("Se activó un empleado existente.")
  } catch (error) {
    console.error(error);
    toast.error("Surgió un error")

  }

}

export const empleadosService = {
  search,
  //getById,
  save,
  remove,
  activar,
};
