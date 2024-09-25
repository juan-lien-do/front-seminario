import React, { useState} from "react";
import moment from "moment";
//import RecursosBuscar from "./ProductosBuscar";
import RecursosListado from "../components/RecursosListado";
//import RecursosRegistro from "./RecursosRegistro";
import { recursosService } from "../services/recursos.services.js";
import BuscadorRecursos from "../components/BuscadorRecursos.jsx";

const listaRecursos = [
    {
        "id": 1,
        "nombre": "prueba 2 del put",
        "cantidad": 10,
        "categoria": 1,
        "descripcion": "ola",
        "activo": true,
        "existencias": [
            {
                "id": "5",
                "cantidad": 10,
                "deposito": {
                    "idDeposito": 2,
                    "nombre": "Depósito 2",
                    "ubicacion": "Subsuelo, Piso -2. Exterior en la zona de estacionamiento. "
                }
            }
        ]
    },
    {
        "id": 2,
        "nombre": "nombre actualizado de la ram",
        "cantidad": 10,
        "categoria": 4,
        "descripcion": "actualizamos al descripcion ",
        "activo": true,
        "existencias": []
    },
    {
        "id": 3,
        "nombre": "gabinete itx'; DELETE FROM recursos; --",
        "cantidad": 2,
        "categoria": 1,
        "descripcion": null,
        "activo": true,
        "existencias": []
    },
    {
        "id": 4,
        "nombre": "Monitor Samsung 19",
        "cantidad": 1,
        "categoria": 2,
        "descripcion": "monitor lcd samsung de 19 pulgadas de 2019",
        "activo": true,
        "existencias": [
            {
                "id": "3",
                "cantidad": 100,
                "deposito": {
                    "idDeposito": 3,
                    "nombre": "Depósito \"Temporal\" 3",
                    "ubicacion": "Armario ubicado en la Sala de Granjas - Piso 2 Área de Tesorería y Presupuesto."
                }
            }
        ]
    },
    {
        "id": 7,
        "nombre": "PC MASTER RACE CON i12",
        "cantidad": 1,
        "categoria": 3,
        "descripcion": "a",
        "activo": true,
        "existencias": [
            {
                "id": "2",
                "cantidad": 10,
                "deposito": {
                    "idDeposito": 1,
                    "nombre": "Depósito 1",
                    "ubicacion": "Subsuelo, Piso -2 frente al Ascensor"
                }
            },
            {
                "id": "4",
                "cantidad": 2,
                "deposito": {
                    "idDeposito": 2,
                    "nombre": "Depósito 2",
                    "ubicacion": "Subsuelo, Piso -2. Exterior en la zona de estacionamiento. "
                }
            }
        ]
    },
    {
        "id": 8,
        "nombre": "prueba post post",
        "cantidad": 1,
        "categoria": 1,
        "descripcion": "debería devolver activo 1",
        "activo": true,
        "existencias": []
    },
    {
        "id": 9,
        "nombre": "prueba post post",
        "cantidad": 1,
        "categoria": 3,
        "descripcion": "debería devolver activo 1",
        "activo": true,
        "existencias": [
            {
                "id": "1",
                "cantidad": 1,
                "deposito": {
                    "idDeposito": 1,
                    "nombre": "Depósito 1",
                    "ubicacion": "Subsuelo, Piso -2 frente al Ascensor"
                }
            }
        ]
    },
    {
        "id": 10,
        "nombre": "prueba post post post",
        "cantidad": 1,
        "categoria": 2,
        "descripcion": "debería devolver activo 0",
        "activo": false,
        "existencias": []
    },
    {
        "id": 11,
        "nombre": "prueba post post post",
        "cantidad": 1,
        "categoria": null,
        "descripcion": "444444444ebería devolver activo 1",
        "activo": true,
        "existencias": []
    },
    {
        "id": 12,
        "nombre": "prueba de post existencias",
        "cantidad": 1,
        "categoria": null,
        "descripcion": "d4444 4444444ebería devolver activo 1",
        "activo": true,
        "existencias": []
    }
];
  

function Recursos() {
    const TituloAccionABMC = {
    A: "(Agregar)",
    B: "(Eliminar)",
    M: "(Modificar)",
    L: "(Listado)",
    };
    const [AccionABMC, setAccionABMC] = useState("L");

    const [nombre, setNombre] = useState("");
    const [activo, setActivo] = useState("");

    const [Items, setItems] = useState(listaRecursos);
    const [Item, setItem] = useState(null); 


    async function Buscar() {
    const data = await RecursosService.Buscar(nombre, activo);
    console.log(data)
    setItems(data);


}

    function Modificar(item) {
    if (!item.activo) {
        alert("No puede modificarse un registro Inactivo.");
        return;
    }
    setAccionABMC("M");
    setItem(item);
    }

    function Agregar() {
    setAccionABMC("A");
    setItem({
        id_producto: 0,
        nombre: null,
        precio: null,
        fecha_ingreso: moment(new Date()).format("YYYY-MM-DD"),
        stock: null,
        activo: true,
    });
    }

    async function ActivarDesactivar(item) {
    const resp = window.confirm(
        "Está seguro que quiere " +
        (item.activo ? "desactivar" : "activar") +
        " el registro?"
    );
    if (resp) {
        await RecursosService.ActivarDesactivar(item);
        await Buscar();
        }
    }

    async function Guardar(item) {

    const resp = window.confirm(
        "Está seguro que quiere modificar el registro?"
    );

    if (resp){
        try
        {
        await RecursosService.Guardar(item);
        }
        catch (error)
        {
        alert(error?.response?.data?.message ?? error.toString())
        return;
        }
        Volver();
        setTimeout(() => {
        alert(
        "Registro " +
            (AccionABMC === "A" ? "agregado" : "modificado") +
            " correctamente."
        );
    }, 0);
    await Buscar();

    }

    
    
    }

    function Volver() {
    setAccionABMC("L");
    }

    return (
    <div>
        
 
        {AccionABMC === "L" && <BuscadorRecursos/>

            /*
        <RecursosBuscar 
        nombre={nombre}
        setNombre={setNombre}
        activo={activo}
        setActivo={setActivo}
        Buscar={Buscar}
        Agregar={Agregar} />
*/

            
        }

      {/* Tabla de resutados de busqueda y Paginador */}
        {AccionABMC === "L" && Items?.length > 0 && 
        <RecursosListado
        {...{
            Items,
            Modificar,
            ActivarDesactivar,
        }}
        />}

{AccionABMC === "L" && Items?.length === 0 && 
        <div className="alert alert-info mensajesAlert">
        <i className="fa fa-exclamation-sign"></i>
        No se encontraron registros...
        </div> }

      {/* Formulario de alta/modificacion/consulta */}
        {/*AccionABMC !== "L" &&
        <RecursosRegistro
        {...{ Item, Guardar, Volver }}
        /> */}
    </div> 
    );
}
export default Recursos;
