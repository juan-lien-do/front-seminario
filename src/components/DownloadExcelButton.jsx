import React from "react";
import { Button } from "react-bootstrap";
import * as XLSX from "xlsx";

const ExcelDownloadButton = ({data}) => {

  const handleDownload = () => {
    const worksheetData = [
      ["Fecha Inicio", data.fechaInicio],
      ["Fecha Fin", data.fechaFin],
      ["Pedidos Atendidos", data.pedidosAtendidos],
      ["Pedidos Completados", data.pedidosCompletados],
      ["Pedidos En Proceso", data.pedidosEnProceso],
      ["Incorporaciones", data.incorporaciones],
      [],
      ["Meses", "Tiempos Promedio Procesamiento"],
      ...data.meses.map((mes, index) => [mes, data.tiemposPromedioProcesamiento[index]]),
      [],
      ["Estados", "Tiempos Promedio Estado"],
      ...data.estados.map((estado, index) => [estado, data.tiemposPromedioEstado[index]]),
      [],
      ["Elementos", "Cantidades"],
      ...data.elementos.map((elemento, index) => [elemento, data.cantidades[index]]),
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Datos");

    XLSX.writeFile(workbook, "datos.xlsx");
  };

  return (
    <Button variant="success" onClick={handleDownload} className="d-flex align-items-center">
      <i className="fas fa-file-excel me-2"></i> Descargar reporte en Excel
    </Button>
  );
};

export default ExcelDownloadButton;
