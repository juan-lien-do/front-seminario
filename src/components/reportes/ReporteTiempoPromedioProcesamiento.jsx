import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

const ReporteTiempoPromedioProcesamiento = ({reporte}) => {
  const chartRef = useRef(null); // Referencia al contenedor del gráfico

  useEffect(() => {
    const chartDom = chartRef.current;
    const myChart = echarts.init(chartDom);

    const option = {
      title: {
        text: "Tiempo promedio de Procesamiento",
        subtext: "De envíos (en horas)",
        left: "center",
        },
      xAxis: {
        type: "category",
        data: reporte?.meses ?? ["Sept", "Oct", "Nov", "Div"], // los meses
      },
      yAxis: {
        type: "value",
        min: Math.min(reporte?.tiemposPromedioProcesamiento ?? [30, 24, 27, 22]) -1, 
        max: Math.max(reporte?.tiemposPromedioProcesamiento ?? [30, 24, 27, 22]) +1, 
      },
      series: [
        {
          data: reporte?.tiemposPromedioProcesamiento ?? [30, 24, 27, 22], // Datos para la línea
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
  }, [reporte]);

  return (
    <div className="card mx-1 my-4" style={!!reporte ? {} : {visibility:"hidden"}}>
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
