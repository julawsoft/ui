import type { IClient } from "../../schema/InterfaceClient";
import html2pdf from "html2pdf.js";

// Função para montar linhas da tabela
const generateRows = (clients: IClient[]) => {
  return clients.map(client => `
    <tr>
      <td>${client.id}</td>
      <td>${client.denominacao}</td>
      <td>${client.tipo?.description ?? "-"}</td>
      <td>${client.nif ?? "-"}</td>
      <td>${client.pessoa_contacto ?? "-"}</td>
      <td>${client.e_mail ?? "-"}</td>
      <td>${ new Date(client.created_at).toLocaleDateString("PT") ?? "-"}</td>
    </tr>
  `).join("");
};

export const generateClientsListPDF = async (clients: IClient[]) => {
  // carregar template
  const response = await fetch("/templates/clientsList.html");
  const templateHtml = await response.text();

  // preencher placeholders
  const rowsHtml = generateRows(clients);
  const filledHtml = templateHtml
    .replace("{{rows}}", rowsHtml)
    .replace("{{generated_at}}", new Date().toLocaleString());

  // criar container temporário no DOM
  const container = document.createElement("div");
  container.innerHTML = filledHtml;
  document.body.appendChild(container);

  // opções do html2pdf
  const opt:any = {
    margin: [10, 10, 20, 10],
    filename: `Lista_Clientes_${new Date().toISOString().split("T")[0]}.pdf`,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: "mm", format: "a4", orientation: "landscape" } // landscape cabe mais
  };

  // gerar PDF
  await html2pdf().set(opt).from(container).save();

  // remover container temporário
  document.body.removeChild(container);
};
