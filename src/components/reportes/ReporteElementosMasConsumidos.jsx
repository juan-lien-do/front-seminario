import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

const ReporteElementosMasConsumidos = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chartDom = chartRef.current;
    const myChart = echarts.init(chartDom);

    const option = {
      title: {
        text: "Elementos más consumidos",
        subtext: "Entregados",
        left: "center",
        top: "10px",
      },
      xAxis: {
        type: "category",
        data: ["Componente", "Periférico", "Notebook", "PC", "All in one"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: [70, 60, 30, 20, 10],
          type: "bar",
          barWidth: "40%", // Ancho de las barras
        },
      ],
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow", // Resalta las barras al pasar el mouse
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
  }, []);

  return (
    <div className="card mx-1 my-4">
        <div
        ref={chartRef}
        style={{
            width: "100%",
            height: "400px",
            minWidth: "300px",
            maxWidth: "800px",
            margin: "0 auto", // Centrado horizontal
        }}
        ></div>
    </div>
  );
};

export default ReporteElementosMasConsumidos;