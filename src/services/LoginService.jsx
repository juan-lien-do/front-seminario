import axios from 'axios'
const baseUrl = 'http://localhost:8080'


async function logear(datosLogin) {
    try {
        const ans = await axios.post(baseUrl+"/login", datosLogin);
    } catch (err){
        console.log("xd")
    }
}


export default {logear}