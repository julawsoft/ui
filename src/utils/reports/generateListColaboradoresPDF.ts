// src/utils/pdf/generateColaboradoresListPDF.ts
import html2pdf from "html2pdf.js";
import type { IColaborador } from "../../schema/InterfaceColaboradores";

export const generateColaboradoresListPDF = async (colaboradores: IColaborador[]) => {
  const response = await fetch("/templates/colaboradoresList.html");
  let templateHtml = await response.text();

  let rowIndex = 1
  const rows = colaboradores.map(emp => `
    <tr>
      <td style="text-align='center'">${rowIndex ++}</td>
      <td>${emp.nome_completo}</td>
      <td>${emp.tipoColaborador}</td>
      <td>${emp.categoria ?? "-"}</td>
      <td>${emp.n_identificacao ?? "-"}</td>
      <td>${emp.n_cedula_ordem ?? "-"}</td>
    </tr>
  `).join("");

  const filledHtml = templateHtml
    .replace("{{rows}}", rows)
    .replace("{{generated_at}}", new Date().toLocaleString());

  const container = document.createElement("div");
  container.innerHTML = filledHtml;

  const opt:any = {
    margin:       10,
    filename:     "Lista_Colaboradores.pdf",
    image:        { type: "jpeg", quality: 0.98 },
    html2canvas:  { scale: 2 },
    jsPDF:        { unit: "pt", format: "a4", orientation: "landscape" }
  };

  await html2pdf()
    .set(opt)
    .from(container)
    .save();
};
