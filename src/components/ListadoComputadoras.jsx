import '../styles/Ludens---1-Index-Table-with-Search--Sort-Filters-v20.css'

export default function ListadoComputadoras({setEstadoInventario}) {

    function cambiarEstadoPagina() {
        setEstadoInventario(1)
    }


    return (
        
      <div className="container-fluid">
        <div className="card" id="TableSorterCard">
          <div className="card-header py-3">
            <header>
              <div className="container">
                <nav className="navbar navbar-expand-md navbar-light" style={{ margin: 0 }}>
                  <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                      <strong>Todo</strong>
                    </a>
                    <button
                      data-bs-toggle="collapse"
                      className="navbar-toggler"
                      data-bs-target="#navcol-1"
                    >
                      <span className="visually-hidden">Toggle navigation</span>
                      <span className="navbar-toggler-icon"></span>
                    </button>
                    <div
                      className="collapse navbar-collapse"
                      id="navcol-1"
                      style={{ marginRight: '32px', paddingRight: '194px' }}
                    >
                      <ul className="navbar-nav">
                        <li className="nav-item">
                          <a className="nav-link active" href="Perifericos.html">
                            <span style={{ color: 'rgba(0, 0, 0, 0.8)' }}>Perifericos</span>
                          </a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" href="Notebooks.html">Notebooks</a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" href="#">PC</a>
                        </li>
                      </ul>
                    </div>
                    <a
                      className="btn btn-primary"
                      role="button"
                      style={{ marginBottom: '16px', paddingBottom: '0px', marginTop: '17px' }}
                    >
                      <i className="fa fa-plus"></i>&nbsp;Agregar Item
                    </a>
                  </div>
                </nav>
              </div>
            </header>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="table-responsive">
                <table className="table table-striped table tablesorter" id="ipi-table">
                  <thead className="thead-dark">
                    <tr>
                      <th className="text-center">Cantidad</th>
                      <th className="text-center">Tipo</th>
                      <th className="text-center">Descripción</th>
                      <th className="text-center filter-false sorter-false">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    <tr>
                      <td>1</td>
                      <td>Notebook</td>
                      <td>Lenovo T420</td>
                      <td className="text-center align-middle" style={{ height: '60px' }}>
                        <a
                          className="btn btnMaterial btn-flat success semicircle"
                          role="button"
                          href="#"
                        >
                          <i className="fas fa-pen"></i>
                        </a>
                        <a
                          className="btn btnMaterial btn-flat accent btnNoBorders checkboxHover"
                          role="button"
                          style={{ marginLeft: '5px' }}
                          data-bs-toggle="modal"
                          data-bs-target="#delete-modal"
                          href="#"
                        >
                          <i className="fas fa-trash btnNoBorders" style={{ color: '#DC3545' }}></i>
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>1</td>
                      <td>Mouse</td>
                      <td>Logitech G203</td>
                      <td className="text-center align-middle" style={{ height: '60px' }}>
                        <a
                          className="btn btnMaterial btn-flat success semicircle"
                          role="button"
                          href="#"
                        >
                          <i className="fas fa-pen"></i>
                        </a>
                        <a
                          className="btn btnMaterial btn-flat accent btnNoBorders checkboxHover"
                          role="button"
                          style={{ marginLeft: '5px' }}
                          data-bs-toggle="modal"
                          data-bs-target="#delete-modal"
                          href="#"
                        >
                          <i className="fas fa-trash btnNoBorders" style={{ color: '#DC3545' }}></i>
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <button onClick={cambiarEstadoPagina}> hola xd</button>
      </div>
    )
}