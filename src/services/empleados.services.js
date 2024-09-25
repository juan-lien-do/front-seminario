import axios from 'axios'

const baseUrl = 'http://localhost:8080/empleados/'

async function search({ nombre, activo}) {
    try {
    const response = await axios.get(baseUrl, {
        params: {nombre:nombre, activo:activo }
    })
    return response.data

    } catch (error) {
    console.error(error)
    }
}

async function getById(id) {
    const url = `${baseUrl}/${id}`

    try {
    const response = await axios.get(url)
    return response.data

    } catch(error) {
    console.log(error);
    }
}

async function save(empleado) {
    if (empleado.id_empleado === 0) {
    try {
        await axios.post(baseUrl, empleado)
    } catch(err) {
        console.error(err)
    }

    return
    }

    try {
    const url = `${baseUrl}/${empleado.id_empleado}`
    await axios.put(url, empleado)
    } catch(err) {
    console.error(err)
    }
}


async function remove(id) {
    const url = `${baseUrl}/${id}`

    try {
    await axios.delete(url)
    } catch(error) {
    console.error(error)
    }
}


export const empleadosService = {
    search,
    getById,
    save,
    remove,
}