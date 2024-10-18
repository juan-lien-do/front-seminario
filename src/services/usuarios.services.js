const baseUrl = "http://localhost:8080/usuarios";
import instance from "../../axios.config";
import { toast } from "sonner";

async function buscarUsuarios() {
  try {
    const response = await instance.get(baseUrl, {
      params: {},
    });
    return response.data;
  } catch (error) {
    //if()
    console.error(error);
    if (error.response.status === 401) {
      toast.error("Inicie sesión nuevamente");
    }
    console.log(error);
  }
}


export const usuariosService = {
    buscarUsuarios,
};