import React from "react";
import html2pdf from "html2pdf.js";

const DownloadPDFButton = ({ setMostrarLista, textoBoton }) => {
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

    // Solución: Aplicar estilos específicos para evitar cortes
    element.style.pageBreakInside = "avoid";
    element.style.boxSizing = "border-box";

    // Reemplazar textareas antes de la conversión
    replaceTextareasWithDivs();

    const options = {
      margin: [0.5, 0.5, 0.5, 0.5],
      filename: "documento.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: {
        scale: 2, // Mejora la calidad
        useCORS: true, // Permite cargar imágenes externas si las hay
        logging: true, // Depuración
      },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    html2pdf()
      .from(element)
      .set(options)
      .toPdf()
      .get("pdf")
      .then((pdf) => {
        // Solución: Ajustar los márgenes en cada página
        const totalPages = pdf.internal.getNumberOfPages();
        for (let i = 1; i <= totalPages; i++) {
          pdf.setPage(i);
          pdf.setFontSize(10);
          pdf.text(`Página ${i} de ${totalPages}`, 0.5, pdf.internal.pageSize.height - 0.5);
        }
      })
      .save()
      .then(() => {
        restoreTextareas(); // Restaurar textareas después de la conversión
        setMostrarLista(false);
      });
  };

  return (
    <button onClick={downloadPDF} className="btn btn-danger mx-2">
      <i className="fa-solid fa-file-pdf"></i> {textoBoton ?? "Descargar solicitud de reposición"}
    </button>
  );
};

export default DownloadPDFButton;
