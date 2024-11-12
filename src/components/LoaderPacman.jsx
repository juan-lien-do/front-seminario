import logoPacman from "../assets/pacman-loader.svg"

export default function LoaderPacman({texto}){
    return (
        <>
            <h4 className="text-center mt-4"> {texto} </h4>
            <img className="my-0 btn-primary ms-5" style={{transform:"scale(1)"}} src={logoPacman} alt = "Cargando..."></img>
        </>
        
    )
}