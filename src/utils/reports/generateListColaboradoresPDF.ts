// src/utils/pdf/generateColaboradoresListPDF.ts
import html2pdf from "html2pdf.js";
import type { IColaborador } from "../../schema/InterfaceColaboradores";

export const generateColaboradoresListPDF = async (colaboradores: IColaborador[]) => {
  // carrega o template HTML
  const response = await fetch("/templates/colaboradoresList.html");
  let templateHtml = await response.text();

  // monta as linhas da tabela
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

  // substitui placeholders no template
  const filledHtml = templateHtml
    .replace("{{rows}}", rows)
    .replace("{{generated_at}}", new Date().toLocaleString());

  // cria container temporário no DOM
  const container = document.createElement("div");
  container.innerHTML = filledHtml;

  // gera PDF com html2pdf
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
