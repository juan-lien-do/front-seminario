import React, { useState, useEffect } from "react";
import ListadoComputadoras from "../components/computadoras/ListadoComputadoras.jsx";
import RegistroComputadoras from "../components/computadoras/RegistroComputadoras.jsx";
import { computadorasService } from "../services/computadoras.services.js";
import BuscadorComputadoras from "../components/computadoras/BuscadorComputadoras.jsx";
import { toast } from "sonner";
import LoaderBloque from "../components/LoaderBloque.jsx";

function Computadoras() {
    const [esActivo, setActivo] = useState(true);
    const [esMasterizado, setMasterizado] = useState("todos"); // Estado de masterización
    const [computadoras, setComputadoras] = useState([]);
    const [computadora, setComputadora] = useState(null);
    const [mostrarRegistroComputadora, setMostrarRegistroComputadora] = useState(false);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const [estaCargando, setEstaCargando] = useState(true);

    function handleTodos() {
        setCategoriaSeleccionada(0);
    }

    function handleNotebooks() {
        setCategoriaSeleccionada(1);
    }

    function handlePC() {
        setCategoriaSeleccionada(2);
    }

    function handleAllinOne() {
        setCategoriaSeleccionada(3);
    }

    // Función para filtrar computadoras según el estado de masterización
    const filtrarPorMasterizado = (data) => {
        if (esMasterizado === "masterizado") {
            return data.filter(computadora => computadora.esMasterizado);
        } else if (esMasterizado === "noMasterizado") {
            return data.filter(computadora => !computadora.esMasterizado);
        }
        return data; // Retornar todos si la opción es "todos"
    };

    function filtrarPorDescripcion(data){
        return data?.filter(x => x.descripcion.toUpperCase().includes(searchTerm.toUpperCase()));
    }

    async function Buscar() {
        setEstaCargando(true)
        const data = await computadorasService.Buscar({ esActivo });
        console.log("Datos obtenidos:", data);
        const computadorasFiltradas = filtrarPorDescripcion(filtrarPorMasterizado(data));
        setComputadoras(computadorasFiltradas);
        setEstaCargando(false)
    }

    useEffect(() => {
        Buscar();
    }, [esActivo, esMasterizado]); // Actualiza la búsqueda cuando cambian esActivo o esMasterizado

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
            toast.error("No puede modificarse un registro inactivo")
            return;
        }
        setComputadora(computadora);
        setMostrarRegistroComputadora(true);
    }

    async function guardarComputadora(data) {
        if (!(await computadorasService.save(data))) {
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

    const handleSearch = () => {
        if (searchTerm === "") {
            Buscar()
        } else {
        const filteredComputadoras = computadoras.filter(computadora => {
            const matchesSearchTerm = computadora.descripcion.toLowerCase().includes(searchTerm.toLowerCase());
            
            // Ajustar la lógica de filtrado para esMasterizado
            const matchesMasterizado =
                esMasterizado === "todos" ||
                (esMasterizado === "masterizado" && computadora.esMasterizado) ||
                (esMasterizado === "noMasterizado" && !computadora.esMasterizado);
            
            return matchesSearchTerm && matchesMasterizado;
        });
    
        setComputadoras(filteredComputadoras);
    }
    };

    if (mostrarRegistroComputadora) {
        return (
            <RegistroComputadoras
                guardar={guardarComputadora}
                volver={() => setMostrarRegistroComputadora(false)}
                computadora={computadora}
            />
        );
    }

    return (
        <>
            <BuscadorComputadoras
                esActivo={esActivo}
                masterizado={esMasterizado}
                setMasterizado={setMasterizado}
                setActivo={setActivo}
                buscarComputadoras={handleSearch}
                agregarComputadora={agregarComputadora}
                handleAllinOne={handleAllinOne}
                handlePC={handlePC}
                handleNotebooks={handleNotebooks}
                handleTodos={handleTodos}
                setSearchTerm={setSearchTerm}
                categoriaSeleccionada={categoriaSeleccionada}
            />
            {
                estaCargando ? 
                <LoaderBloque texto={"Cargando computadoras..."}/>
                :

                <ListadoComputadoras
                    Items={computadoras}
                    activar={activarComputadora}
                    desactivar={desactivarComputadora}
                    modificar={modificarComputadora}
                    categoriaSeleccionada={categoriaSeleccionada}
                />
            }
        </>
    );
}

export default Computadoras;