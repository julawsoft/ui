import type { IClient } from "../../schema/InterfaceClient";
import html2pdf from "html2pdf.js";
import type { IProcesso } from "../../schema/InterfaceProcess";
import { formatMoedaAOA } from "../moeda";

interface IRegistro {
  id: number;
  tipo: "timesheet" | "despesas";
  descricao: string;
  tarefa: string;
  colaborador: string;
  cliente: string;
  horas?: string | number;
  valor?: string | number;
  status: "aprovado" | "faturado";
  colaboradorTaxa?: string;
  dataRegisto: string;
}

const fillTemplate = (template: string, registos: IRegistro[], cliente: IClient, processo: IProcesso, total: number) => {

  return template
    .replace("{{empresa_nome}}", String("Nome da Empresa"))
    .replace("{{empresa_endereco}}", String("Endereco da Empresa"))
    .replace("{{empresa_nif}}", String("NIF da Empresa"))
    .replace("{{empresa_telefone}}", String("Telefone da Empresa"))
    .replace("{{empresa_email}}", String("E-mail da Empresa"))
    .replace("{{cliente}}", cliente.denominacao ?? "-")
    .replace("{{cliente_nif}}", String(cliente.nif) ?? "-")
    .replace("{{cliente_contacto}}", String(cliente.contacto_cobranca) ?? "-")

    .replace("{{processo_ref}}", processo.ref ?? "-")
    .replace("{{processo_n_processo_judicial}}", processo.n_processo_judicial ?? "-")

    .replace("{{banco_nome}}",  "-")
    .replace("{{conta_numero}}",  "-")
    .replace("{{iban}}",  "-")
    .replace(
      "{{rows}}",
      registos && registos.length > 0
        ? registos
            .map(
              (item, i) => `
                <tr>
                  <td>${i + 1}</td>
                  <td>${item.dataRegisto.substring(0,10)}</td>
                  <td>${item.descricao}</td>
                  <td>${item.tarefa}</td>
                  <td>${item.horas}</td>
                  <td>${formatMoedaAOA(item.valor)}</td>
                </tr>
              `
            )
            .join("")
        : `<tr><td colspan="5" style="text-align:center;">Sem itens</td></tr>`
    )
    .replace("{{total}}", formatMoedaAOA(total) ?? "0.00")

    .replace("{{generated_at}}", new Date().toLocaleString());
};


export const generateInvoiceAvencaPDF = async (registos: IRegistro[], cliente: IClient, processo: IProcesso, total: number) => {
  const response = await fetch("/templates/invoice_template_hororarios.html");
  const templateHtml = await response.text();

  console.log("os registo aqui ", registos)

  const filledHtml = fillTemplate(templateHtml, registos, cliente, processo, total);

  const container = document.createElement("div");
  container.innerHTML = filledHtml;
  document.body.appendChild(container);

  const opt:any = {
    margin:       [10, 10, 20, 10],
    filename:     `invoice_honorarios_avenca_.pdf`,
    image:        { type: "jpeg", quality: 0.98 },
    html2canvas:  { scale: 2, useCORS: true },
    jsPDF:        { unit: "mm", format: "a4", orientation: "portrait" }
  };

  await html2pdf().set(opt).from(container).save();

  document.body.removeChild(container);
};
