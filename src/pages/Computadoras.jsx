import React, { useState } from "react";
import moment from "moment";
import ListadoComputadoras from "../components/ListadoComputadoras.jsx";
import RegistroComputadoras from "../components/RegistroComputadoras.jsx";
import { computadorasService } from "../services/computadoras.services.js";
import BuscadorComputadoras from "../components/BuscadorComputadoras.jsx";
import { useEffect} from "react";

function Computadoras() {
    const [activo, setActivo] = useState(true);
    const [masterizado, setMasterizado] = useState(false);	
    const [Computadoras, setComputadoras] = useState([]);
    const [computadora, setComputadora] = useState(null);
    const [mostrarRegistroComputadora, setMostrarRegistroComputadora] = useState(false);

    async function Buscar() {
    const data = await computadorasService.Buscar({ activo });
    console.log("Datos obtenidos:", data);
    setComputadoras(data);
    }
    useEffect(() => {
    Buscar();
    }, []);

    function agregarComputadora() {   
        const nuevoComputadora = {
            idComputadora: 0,
            idTipo: 0,
            numeroserie: "",
            descripcion: "",
            idDeposito: 0,
            nroWSs: 0,
            activo: true,
            masterizado: false,
    };
    setComputadora(nuevoComputadora);
    setMostrarRegistroComputadora(true);
    }

    function modificarComputadora(computadora) {
        if (!computadora.activo) {
            alert("No puede modificarse un registro Inactivo.");
            return;
        }
        setComputadora(computadora);
        setMostrarRegistroComputadora(true);
        }

    async function guardarComputadora(data) {
        const resp = window.confirm(
            "Está seguro que quiere " +
            (data.activo ? "desactivar" : "activar") +
            " el registro?"
        );
        if (resp) {
            await computadorasService.save(data);
            setMostrarRegistroComputadora(false);
            Buscar();
        }
        }

    async function desactivarComputadora(id) {
    await computadorasService.desactivar(id);
    Buscar();
    }

    async function activarComputadora(id) {
    await computadorasService.activar(id);
    Buscar();
    }

    if (mostrarRegistroComputadora) {
        return (
            <RegistroComputadoras
            guardar={guardarComputadora}
            volver={() => setMostrarRegistroComputadora(false)}
            computadora={computadora}
            />
        );
        }


    {
    /* todavía no hay registro de Computadora */
    }

    return (
    <>

        <BuscadorComputadoras
        activo={activo}
        masterizado={masterizado}
        setMasterizado={setMasterizado}
        setActivo={setActivo}
        buscarComputadoras={Buscar}
        agregarComputadora={agregarComputadora}
        />

        <ListadoComputadoras
        Items={Computadoras}
        activar={activarComputadora}
        desactivar={desactivarComputadora}
        modificar={modificarComputadora}
        />
        
    </>
    );
}
export default Computadoras;
