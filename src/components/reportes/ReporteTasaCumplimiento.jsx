import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

const ReporteTasaCumplimiento = ({reporte}) => {
  const chartRef = useRef(null); // Referencia al contenedor del gráfico

  function dibujar(){
    const chartDom = chartRef.current;
    const myChart = echarts.init(chartDom);

    // Configuración del gráfico
    const option = {
      title: {
        text: "Tasa de cumplimiento",
        subtext: "Envíos",
        left: "center",
      },
      tooltip: {
        trigger: "item",
      },
      legend: {
        orient: "horizontal", // Cambia la orientación de la leyenda
        bottom: "40", // Posiciona la leyenda debajo del gráfico
        left: "center", // Centra la leyenda horizontalmente
      },
      series: [
        {
          name: "Access From",
          type: "pie",
          radius: "50%",
          data: [
            { value: reporte?.pedidosCompletados ?? 224, name: "Completados" },
            { value: reporte?.pedidosEnProceso ?? 22, name: "En proceso" },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
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
  }

  useEffect(() => {
    dibujar();
  }, [reporte]);

  return (
    <div className="card mx-1 my-4" style={!!reporte ? {} : {visibility:"hidden"}}>
      <div
        ref={chartRef}
        style={{
          width: "100%",
          height: "400px", // Altura fija para mantener la proporción
          minWidth: "300px",
          maxWidth: "600px", // Opcional: establece un ancho máximo
          margin: "0 auto", // Centra el gráfico horizontalmente
        }}
      ></div>
    </div>
  );
};

export default ReporteTasaCumplimiento;
