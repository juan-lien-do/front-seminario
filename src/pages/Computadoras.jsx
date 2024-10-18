import React, { useState } from "react";
import moment from "moment";
import ListadoComputadoras from "../components/ListadoComputadoras.jsx";
import RegistroComputadoras from "../components/RegistroComputadoras.jsx";
import { computadorasService } from "../services/computadoras.services.js";
import BuscadorComputadoras from "../components/BuscadorComputadoras.jsx";
import { useEffect} from "react";

function Computadoras() {
    const [activo, setActivo] = useState(true);
    const [Computadoras, setComputadoras] = useState([]);
    const [computadora, setComputadora] = useState(null);
    const [mostrarRegistroComputadora, setMostrarRegistroComputadora] = useState(false);

    async function BuscarComputadoras() {
    console.warn(activo)
    const data = await computadorasService.Buscar({activo});
    setComputadoras(data);
    }
    useEffect(() => {
    BuscarComputadoras();
    }, []);

    function agregarComputadora() {   
        const nuevoComputadora = {
            id: 0,
            nombre: "",
            numeroserie: 0,
            descripcion: "",
            ubiacion: "",
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
                BuscarComputadoras();
            }
            }

    async function desactivarComputadora(id) {
    await computadorasService.desactivar(id);
    BuscarComputadoras();
    }

    async function activarComputadora(id) {
    await computadorasService.activar(id);
    BuscarComputadoras();
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

    function Volver() {
    setMostrarRegistroComputadora(false);
    }

    {
    /* todavía no hay registro de Computadora */
    }

    return (
    <>

        <BuscadorComputadoras
        activo={activo}
        setActivo={setActivo}
        buscarComputadoras={BuscarComputadoras}
        agregarComputadora={agregarComputadora}
        />

        <ListadoComputadoras
        Computadoras={Computadoras}
        activar={activarComputadora}
        desactivar={desactivarComputadora}
        />
        
    </>
    );
}
export default Computadoras;
