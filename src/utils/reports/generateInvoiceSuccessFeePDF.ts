import type { IClient } from "../../schema/InterfaceClient";
import html2pdf from "html2pdf.js";
import type { IProcesso } from "../../schema/InterfaceProcess";
import { formatMoedaAOA } from "../moeda";

// Função para preencher placeholders do template
const fillTemplate = (template: string, processoSelected: IProcesso, cliente: IClient, processo: IProcesso, total: number) => {

  return template
    .replace("{{empresa_nome}}", String("Nome da Empresa"))
    .replace("{{empresa_endereco}}", String("Endereco da Empresa"))
    .replace("{{empresa_nif}}", String("NIF da Empresa"))
    .replace("{{empresa_telefone}}", String("Telefone da Empresa"))
    .replace("{{empresa_email}}", String("E-mail da Empresa"))
    // Dados do cliente
    .replace("{{cliente}}", cliente.denominacao ?? "-")
    .replace("{{cliente_nif}}", String(cliente.nif) ?? "-")
    .replace("{{cliente_contacto}}", String(cliente.contacto_cobranca) ?? "-")

    .replace("{{processo_ref}}", processo.ref ?? "-")
    .replace("{{processo_n_processo_judicial}}", processo.n_processo_judicial ?? "-")

    .replace("{{banco_nome}}",  "-")
    .replace("{{conta_numero}}",  "-")
    .replace("{{iban}}",  "-")

    .replace("{{ref}}",  processo.ref)
    .replace("{{assunto}}",  processo.assunto)
    .replace("{{n_processo_judicial}}",  processo.n_processo_judicial ?? '-' )
    .replace("{{fase}}", processo.fase )
    .replace("{{valor}}", formatMoedaAOA(processo.valor_total))

    .replace("{{total}}", formatMoedaAOA(total) ?? "0.00")
    // Observações e geração
    .replace("{{generated_at}}", new Date().toLocaleString());
};


export const generateInvoiceSuccessFeePDF = async (processoSelected: IProcesso, cliente: IClient, processo: IProcesso, total: number) => {
  // carregar template do public
  const response = await fetch("/templates/invoice_template_hororarios_success_fee.html");
  const templateHtml = await response.text();

  // preencher placeholders
  const filledHtml = fillTemplate(templateHtml, processoSelected, cliente, processo, total);

  // criar container temporário no DOM
  const container = document.createElement("div");
  container.innerHTML = filledHtml;
  document.body.appendChild(container);

  const opt:any = {
    margin:       [10, 10, 20, 10],
    filename:     `invoice_honorarios_success_fee_.pdf`,
    image:        { type: "jpeg", quality: 0.98 },
    html2canvas:  { scale: 2, useCORS: true },
    jsPDF:        { unit: "mm", format: "a4", orientation: "portrait" }
  };

  await html2pdf().set(opt).from(container).save();
  document.body.removeChild(container);

};
