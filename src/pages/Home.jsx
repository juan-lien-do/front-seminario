const integrantes = [
    { nombre: "Barrionuevo Daniel", legajo: 88618 },
    { nombre: "Blanco, Andrés", legajo: 89900 },
    { nombre: "Cometto, Cecilia Micaela", legajo: 87395 },
    { nombre: "Chaile, Emmanuel Ricardo", legajo: 89767 },
    { nombre: "Liendo Juan Esteban", legajo: 91274 },
  ]


export default function Home({usuario}) {
  return (
    <div className="container mt-5">
      <div className="card p-5 shadow">
        <h1 className="display-4 mb-4">¡Bienvenido {usuario.nombre} a Almacen It!</h1>
        {!!usuario.isAdmin ? <h2 className="display-5 mb-4">Nos honra la visita del admin</h2> : ""}
        <p className="lead">
          ¡Este sistema es nuestro proyecto de Seminario Integrador para
          recibirnos de Analista de Sistemas!
        </p>
        <div className="container mt-1">
          <h2 className="text-center mb-4">Equipo de Desarrollo</h2>
          <div className="row">
            {integrantes.map((integrante, index) => (
              <div key={index} className="col-md-4 mb-4">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{integrante.nombre}</h5>
                    <p className="card-text">Legajo: {integrante.legajo}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
      </div>
    </div>
  );
}
