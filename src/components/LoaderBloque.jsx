import logo from "../assets/bloques-loader.svg"

export default function LoaderBloque({texto}){
    return (
        <div style={{textAlign:"center", marginTop:"50px"}}>
            <img className="my-0 mx-auto btn-primary ms-5" style={{height:"200px"}} src={logo} alt = "Cargando..."></img>
            <h4 className="mt-4"> {texto} </h4>
        </div>
        
    )
}