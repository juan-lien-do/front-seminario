const baseUrl = "http://localhost:8080/usuarios";
import instance from "../../axios.config";
import { toast } from "sonner";
import sonnerQuestion from '../utils/sonnerQuestion';

async function buscarUsuarios({ nombre, activo }) {
  try {
    const response = await instance.get(baseUrl, {
      params: { nombre, activo }
    });
    return response.data;
  } catch (error) {
    console.error(error);
    if (error.response.status === 401) {
      toast.error("Inicie sesión nuevamente");
    }
  }
}

async function save(usuario) {
  if (usuario.id_usuario === 0 || usuario.id_usuario === null) { // Verificar id_usuario
    const respuesta = await sonnerQuestion.pregunta("¿Desea registrar el usuario?");
    if (respuesta) {
      try {
        const url2 = `${baseUrl}/register`; 
        await instance.post(url2, usuario);
        toast.success("Se cargó un usuario nuevo.");
        return true;
      } catch (err) {
        console.error(err);
        toast.error("Surgió un error al registrar el usuario.");
        return false;
      }
    }
    return false;
  }
  // Código para actualizar usuario (PUT)
  const respuesta = await sonnerQuestion.pregunta("¿Desea actualizar el usuario?");
  if (respuesta) {
    try {
      const url = `${baseUrl}/${usuario.id}`; // Usar id_usuario
      console.log("Datos enviados:", usuario);
      await instance.put(url, usuario);
      toast.success("Se actualizaron los datos del usuario.");
      return true;
    } catch (err) {
      console.error(err);
      toast.error("Surgió un error al actualizar el usuario.");
      return false;
    }
  }
  return;
}



async function remove(id) {
  const url = `${baseUrl}/desactivar/${id}`;

  const respuesta = await sonnerQuestion.pregunta("¿Desea dar de baja el usuario")
  if(respuesta){
    try {
      await instance.patch(url);
      toast.success("El usuario ha sido dado de baja correctamente")

    } catch (error) {
      console.error(error);
      toast.error("Surgió un error")

    }
  }
}

async function blanquearContrasena(id) {
  // Codificar la URL para manejar caracteres especiales como "ñ"
  const url = `${baseUrl}/${("blanquear_password")}/${id}`;
  const respuesta = await sonnerQuestion.pregunta(
    "¿Está seguro de que desea reiniciar la contraseña?"
  );

  if (respuesta) {
    try {
      await instance.patch(url);
      toast.success("La contraseña ha sido reiniciada con éxito.");
    } catch (error) {
      console.error(error);
      toast.error("Ocurrió un error al reiniciar la contraseña.");
    }
  }
}

async function actualizarContrasena (nombre, nuevaPassword) {

    const data = { nombre, nuevaPassword };

    console.log("Datos enviados:", data); // Verifica el cuerpo de la solicitud

    const url = `${baseUrl}/${("actualizar_password")}`;
    const respuesta = await sonnerQuestion.pregunta(
      "¿Está seguro de que desea actualizar la contraseña?"
    );
        await instance.patch(url, data);

};


async function activar(id) {
  const url = `${baseUrl}/activar/${id}`;

  const respuesta = await sonnerQuestion.pregunta("¿Desea dar de alta el usuario?")
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


export const usuariosService = {
    buscarUsuarios,
    save,
    remove,
    activar,
    blanquearContrasena,
    actualizarContrasena,
};