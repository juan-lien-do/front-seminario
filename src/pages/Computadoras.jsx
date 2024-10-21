import React, { useState } from "react";
import moment from "moment";
import ListadoComputadoras from "../components/ListadoComputadoras.jsx";
import RegistroComputadoras from "../components/RegistroComputadoras.jsx";
import { computadorasService } from "../services/computadoras.services.js";
import BuscadorComputadoras from "../components/BuscadorComputadoras.jsx";
import { useEffect} from "react";

function Computadoras() {
    const [esActivo, setActivo] = useState(true);
    const [esMasterizado, setMasterizado] = useState(false);	
    const [Computadoras, setComputadoras] = useState([]);
    const [computadora, setComputadora] = useState(null);
    const [mostrarRegistroComputadora, setMostrarRegistroComputadora] = useState(false);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(0)

    function handleTodos() {
        setCategoriaSeleccionada(0); // Mostrar todos
        }
        
    function handleNotebooks() {
        setCategoriaSeleccionada(1); // Mostrar solo notebooks
        }
        
    function handlePC() {
        setCategoriaSeleccionada(2); // Mostrar solo PC
        }
    
    function handleAllinOne() {
        setCategoriaSeleccionada(3); // Mostrar solo All in One
        }

    async function Buscar() {
    const data = await computadorasService.Buscar({ esActivo, esMasterizado });
    console.log("Datos obtenidos:", data);
    setComputadoras(data);
    }
    useEffect(() => {
    Buscar();
    }, []);

    function agregarComputadora() {   
        const nuevoComputadora = {
            idComputadora: 0,
            idTipo: 1,
            nroSerie: "",
            descripcion: "",
            idDeposito: 1,
            nroWs: null,
            esActivo: true,
            esMasterizado: false,
    };
    setComputadora(nuevoComputadora);
    setMostrarRegistroComputadora(true);
    }

    function modificarComputadora(computadora) {
        if (!computadora.esActivo) {
            alert("No puede modificarse un registro Inactivo.");
            return;
        }
        setComputadora(computadora);
        setMostrarRegistroComputadora(true);
        }

    async function guardarComputadora(data) {
        const resp = window.confirm(
            "Está seguro que desea guardar el registro?"
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
        esActivo={esActivo}
        masterizado={esMasterizado}
        setMasterizado={setMasterizado}
        setActivo={setActivo}
        buscarComputadoras={Buscar}
        agregarComputadora={agregarComputadora}
        handleAllinOne={handleAllinOne}
        handlePC={handlePC}
        handleNotebooks={handleNotebooks}
        handleTodos={handleTodos}
        />

        <ListadoComputadoras
        Items={Computadoras}
        activar={activarComputadora}
        desactivar={desactivarComputadora}
        modificar={modificarComputadora}
        categoriaSeleccionada={categoriaSeleccionada}
        />
        
    </>
    );
}
export default Computadoras;
