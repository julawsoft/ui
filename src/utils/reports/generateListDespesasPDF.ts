import html2pdf from "html2pdf.js";
import type { IDespesas } from "../../schema/interfaceDespesas";

export const generateDespesasListPDF = async (despesas: IDespesas[]) => {
  const response = await fetch("/templates/despesasList.html");
  let templateHtml = await response.text();

  const rows = despesas.map(item => `
    <tr>
      <td>${item.id}</td>
      <td>${item.numeroProcesso ?? "-"}</td>
      <td>${item.nomeCliente}</td>
      <td>${item.valor}</td>
      <td>${item.tipoDespesas}</td>
      <td>${item.criadaEm}</td>
    </tr>
  `).join("");

  const filledHtml = templateHtml
    .replace("{{rows}}", rows)
    .replace("{{generated_at}}", new Date().toLocaleString());

  const opt:any = {
    margin: 0.5,
    filename: `Lista_Despesas.pdf`,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "in", format: "a4", orientation: "landscape" },
  };

  html2pdf().from(filledHtml).set(opt).save();
};
