import React from "react";
import html2pdf from "html2pdf.js";

const DownloadPDFButton = ({setMostrarLista, textoBoton}) => {
  const replaceTextareasWithDivs = () => {
    const textareas = document.querySelectorAll("#tabla-descargar textarea");
    textareas.forEach((textarea) => {
      const div = document.createElement("div");
      div.style.cssText = `
        white-space: pre-wrap;
        border: 1px solid #ced4da;
        padding: 0.375rem 0.75rem;
        border-radius: 0.25rem;
        background-color: #fff;
        color: #495057;
      `;
      div.innerText = textarea.value; // Copia el contenido del textarea al div
      div.className = textarea.className;
      textarea.parentNode.replaceChild(div, textarea); // Reemplaza textarea por div
      div.setAttribute("data-original-element", "textarea");
    });
  };

  const restoreTextareas = () => {
    const divs = document.querySelectorAll("#tabla-descargar div[data-original-element='textarea']");
    divs.forEach((div) => {
      const textarea = document.createElement("textarea");
      textarea.value = div.innerText; // Copia el contenido de vuelta al textarea
      textarea.className = div.className;
      textarea.style.cssText = div.style.cssText;
      textarea.setAttribute("rows", "1");
      textarea.style.resize = "none";
      textarea.style.overflow = "hidden";
      div.parentNode.replaceChild(textarea, div); // Restaura el div al textarea
    });
  };

  const downloadPDF = () => {
    const element = document.getElementById("tabla-descargar");
    if (!element) {
      console.error('Element with id "tabla-descargar" not found');
      return;
    }

    replaceTextareasWithDivs(); // Reemplaza los textareas antes de la conversión

    const options = {
      margin: 0.5,
      filename: "SolicitudDeReposicion.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    html2pdf()
      .from(element)
      .set(options)
      .save()
      .then(restoreTextareas); // Restaura los textareas después de la conversión

    setMostrarLista(false)
  };

  return (
      <button onClick={downloadPDF} className="btn btn-primary mx-2">
        {textoBoton ?? "Descargar solicitud de reposición"}
      </button>
  );
};

export default DownloadPDFButton;
