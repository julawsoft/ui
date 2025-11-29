import html2pdf from "html2pdf.js";
import type { IProcesso } from "../../schema/InterfaceProcess";

export const generateProcessosListPDF = async (processos: IProcesso[]) => {
  const response = await fetch("/templates/processosList.html");
  let templateHtml = await response.text();

  // gerar as linhas da tabela
  const rows = processos.map(proc => `
    <tr>
      <td>${proc.ref}</td>
      <td>${proc.n_processo_judicial ?? "-"}</td>
      <td>${proc.assunto}</td>
      <td>${proc.area}</td>
      <td>${proc.instituicao}</td>
      <td>${proc.cliente}</td>
      <td>${proc.modo_facturacao ?? "-"}</td>
      <td>${proc.estado}</td>
      <td>${new Date(proc.data_registo).toLocaleDateString()}</td>
    </tr>
  `).join("");

  const filledHtml = templateHtml
    .replace("{{rows}}", rows)
    .replace("{{generated_at}}", new Date().toLocaleString());

  // usar html2pdf.js
  const opt:any = {
    margin: 0.5,
    filename: `Lista_Processos.pdf`,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "in", format: "a4", orientation: "landscape" },
  };

  html2pdf().from(filledHtml).set(opt).save();
};
