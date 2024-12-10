import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

const ReporteTiempoPromedioProcesamiento = () => {
  const chartRef = useRef(null); // Referencia al contenedor del gráfico

  useEffect(() => {
    const chartDom = chartRef.current;
    const myChart = echarts.init(chartDom);

    const option = {
      title: {
        text: "Tiempo promedio de Procesamiento",
        subtext: "Envíos",
        left: "center",
        },
      xAxis: {
        type: "category",
        data: ["Sept", "Oct", "Nov", "Div"], // los meses
      },
      yAxis: {
        type: "value",
        min: 20, // esto es para que 
      },
      series: [
        {
          data: [30, 24, 27, 22], // Datos para la línea
          type: "line",
          smooth: true, 
          lineStyle: {
            width: 4,
          },
        },
      ],
      tooltip: {
        trigger: "axis", 
      },
      legend: {
        data: ["Tiempo (horas)"],
        bottom: "0", 
        left: "center", 
      },
    };

    myChart.setOption(option);

    // Redimensiona el gráfico cuando la ventana cambie de tamaño
    const handleResize = () => {
      myChart.resize();
    };

    window.addEventListener("resize", handleResize);

    // Limpia el gráfico y el evento al desmontar el componente
    return () => {
      myChart.dispose();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="card mx-1 my-4">
        <div
        ref={chartRef}
        style={{
            width: "100%",
            height: "400px", // Altura fija del gráfico
            minWidth: "300px",
            maxWidth: "800px", // Opcional: limita el ancho máximo
            margin: "0 auto", // Centra el gráfico horizontalmente
        }}
        ></div>
    </div>
  );
};

export default ReporteTiempoPromedioProcesamiento;
