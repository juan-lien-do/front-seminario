import React, { useState } from 'react';
import BuscadorRecursos from '../components/BuscadorRecursos';
import BuscadorComputadoras from '../components/BuscadorComputadoras';
import Recursos from './recursos';
import Computadoras from './Computadoras';

function Inventario() {
  const [seccion, setSeccion] = useState('recursos'); // Estado inicial es 'recursos'

  const cambiarSeccion = (nuevaSeccion) => {
    console.log("Cambiando a la sección:", nuevaSeccion);
    setSeccion(nuevaSeccion); // Cambia la sección activa
  };

  // Definimos qué componente mostrar en el buscador dependiendo de la sección activa
  const renderBuscador = () => {
    if (seccion === 'recursos') {
      return <BuscadorRecursos cambiarSeccion={cambiarSeccion} />;
    } else if (seccion === 'computadoras') {
      return <BuscadorComputadoras cambiarSeccion={cambiarSeccion} />;
    }
  };

  // Definimos qué contenido mostrar dependiendo de la sección activa
  const renderContenido = () => {
    if (seccion === 'recursos') {
      return <Recursos />;
    } else if (seccion === 'computadoras') {
      return <Computadoras />;
    }
  };

  return (
    <div>
      {/* Renderizamos dinámicamente el buscador y el contenido basado en la sección */}
      {renderBuscador()}
      {renderContenido()}
    </div>
  );
}

export default Inventario;
