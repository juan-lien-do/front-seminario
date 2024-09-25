import axios from 'axios';
import URL_BACKEND from '../constants/constants'

const baseUrl = 'http://localhost:8080';

async function logear(datosLogin) {
  try {
    const response = await axios.post(`${baseUrl}/login`, datosLogin);
    console.log(response)
    return response;
  } catch (err) {
    console.log(err)
    if(err?.response?.status == 401 || err?.response?.status == 404){
      throw new Error("Credenciales inválidas")
    }
    throw new Error("Error en la autenticación");
  }
}

export default logear;
