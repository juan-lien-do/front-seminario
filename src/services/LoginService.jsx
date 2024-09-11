import axios from 'axios';
const baseUrl = 'http://localhost:8080';

async function logear(datosLogin) {
  try {
    const response = await axios.post(`${baseUrl}/login`, datosLogin);
    console.log(response)
    return response;
  } catch (err) {
    throw new Error("Error en la autenticación");
  }
}

export default logear;
