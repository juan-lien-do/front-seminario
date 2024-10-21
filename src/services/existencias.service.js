import instance from '../../axios.config'


const urlResource = "http://localhost:8080/existencias/";

async function incorporar(existencia) {
    const res = await instance.post(urlResource + "incorporar/", existencia);
    console.log(res.data)
    return true;
}

async function disminuir(existencia) {
    await instance.post(urlResource + "disminuir/", existencia);
    return true
}

const existenciasService = {
    incorporar,
    disminuir,
}

export default existenciasService;