import type { IClient } from "../../schema/InterfaceClient";
import html2pdf from "html2pdf.js";

// Função para preencher placeholders do template
const fillTemplate = (template: string, client: IClient) => {
  return template
    .replace("{{id}}", String(client.id))
    .replace("{{denominacao}}", client.denominacao)
    .replace("{{tipo}}", client.tipo?.description ?? "-")
    .replace("{{nif}}", client.nif?.toString() ?? "-")
    .replace("{{endereco}}", String(client.endereco) ?? "-")
    .replace("{{pessoa_contacto}}", String(client.pessoa_contacto) ?? "-")
    .replace("{{contacto_cobranca}}", client.contacto_cobranca?.toString() ?? "-")
    .replace("{{e_mail}}", client.e_mail ?? "-")
    .replace("{{status}}", client.status ?? "-")
    .replace("{{nota}}", client.nota ?? "-")
    .replace("{{created_at}}", new Date(client.created_at).toLocaleDateString())
    .replace("{{updated_at}}", new Date(client.updated_at).toLocaleDateString())
    .replace("{{generated_at}}", new Date().toLocaleString());
};

export const generateClientPDF = async (client: IClient) => {
  // carregar template do public
  const response = await fetch("/templates/clientFicha.html");
  const templateHtml = await response.text();

  // preencher placeholders
  const filledHtml = fillTemplate(templateHtml, client);

  // criar container temporário no DOM
  const container = document.createElement("div");
  container.innerHTML = filledHtml;
  document.body.appendChild(container);

  // opções do html2pdf
  const opt:any = {
    margin:       [10, 10, 20, 10], // top, right, bottom, left
    filename:     `Ficha_Cliente_${client.denominacao.replace(/\s+/g, "_")}.pdf`,
    image:        { type: "jpeg", quality: 0.98 },
    html2canvas:  { scale: 2, useCORS: true },
    jsPDF:        { unit: "mm", format: "a4", orientation: "portrait" }
  };

  // gerar PDF
  await html2pdf().set(opt).from(container).save();

  // remover container temporário
  document.body.removeChild(container);
};
