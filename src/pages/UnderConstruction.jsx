export default function UnderConstruction(){
    return(
        <div className="d-flex">
            <div className="mx-auto fs-1 my-5">
                <div className="mx-auto text-center" onClick={()=>{alert("Encontraste un east-egg")}}>
                    <i class="fa-solid fa-person-digging fa-bounce fa-2x"></i>                
                </div>
                <div className="mx-auto">
                    Esta sección todavía está en construcción. 
                </div>
            </div>
        </div>
    )
}