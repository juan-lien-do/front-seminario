import { useState } from "react"


export default function BuscadorEnvios({handleRegistrarEnvio, buscarEnvios,}){
return(
    <div className="mx-auto">
        <h1 className="">Envíos</h1>
          <button className="mx-auto btn btn-warning" onClick={handleRegistrarEnvio}>
            Registrar envío
          </button>
    </div>
)
}