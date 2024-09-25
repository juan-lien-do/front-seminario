import { useState } from "react";
import ListadoComputadoras from "../components/ListadoComputadoras";



export default function Inventario() {
    const [estadoInventario, setEstadoInventario] = useState(0);

    function volver(){
      setEstadoInventario(0)
    }

    if (estadoInventario == 0){
      return (
        <ListadoComputadoras setEstadoInventario={setEstadoInventario}/>
      )
    }
    if (estadoInventario == 1){
      return(
        <div>
          hola mundo
          <button onClick={volver}> hola </button>
        </div>
        
      )
    }
    
  }
  