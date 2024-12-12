import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

const ReporteTiempoPromedioPorEstado = ({reporte}) => {
  const chartRef = useRef(null);


  useEffect(() => {
    const chartDom = chartRef.current;
    const myChart = echarts.init(chartDom);

    const option = {
      title: {
        text: "Tiempo promedio por estado de un pedido",
        left: "center",
        top: "10px",
      },
      xAxis: {
        type: "category",
        data: reporte?.estados ?? ["Pendiente", "En preparación", "En reparación", "Para retiro"],
      },
      yAxis: {
        type: "value",
        name: "Horas", // Etiqueta en el eje Y
        nameLocation: "middle",
        nameGap: 40, // Espacio entre la etiqueta y el eje
      },
      series: [
        {
          data: reporte?.tiemposPromedioEstado ?? [3.2, 2.9, 9.5, 1.5],
          type: "bar",
          barWidth: "40%", // Ancho de las barras
        },
      ],
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow", // Resalta barras al pasar el mouse
        },
      },
    };

    myChart.setOption(option);

    const handleResize = () => {
      myChart.resize();
    };

    window.addEventListener("resize", handleResize);

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
          height: "400px",
          minWidth: "300px",
          maxWidth: "800px",
          margin: "0 auto", // Centrado horizontal
        }}
      />
    </div>
  );
};

export default ReporteTiempoPromedioPorEstado;
