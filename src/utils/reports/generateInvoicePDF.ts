import html2pdf from "html2pdf.js";
import type { IFatura } from "../../schema/InterfaceHonorarios";

const fillTemplate = (template: string, fatura: IFatura) => {
  return template
    .replace("{{empresa_nome}}", String("Nome da Empresa"))
    .replace("{{empresa_endereco}}", String("Endereco da Empresa"))
    .replace("{{empresa_nif}}", String("NIF da Empresa"))
    .replace("{{empresa_telefone}}", String("Telefone da Empresa"))
    .replace("{{empresa_email}}", String("E-mail da Empresa"))
    .replace("{{cliente}}", fatura.cliente ?? "-")
    .replace("{{cliente_nif}}", fatura.clienteNIF ?? "-")
    .replace("{{cliente_contacto}}", fatura.clienteContato ?? "-")

    .replace("{{banco_nome}}",  "-")
    .replace("{{conta_numero}}",  "-")
    .replace("{{iban}}",  "-")
    .replace(
      "{{rows}}",
      fatura.items && fatura.items.length > 0
        ? fatura.items
            .map(
              (item, i) => `
                <tr>
                  <td>${i + 1}</td>
                  <td>${item.tipo}</td>
                  <td>${item.tipoDespesa}</td>
                  <td>${item.custo.toFixed(2)}</td>
                </tr>
              `
            )
            .join("")
        : `<tr><td colspan="5" style="text-align:center;">Sem itens</td></tr>`
    )
    .replace("{{total}}", Number(fatura.processo_custo).toFixed(2) ?? "0.00")

    .replace("{{observacoes}}", fatura.processo_custo ?? "-")
    .replace("{{generated_at}}", new Date().toLocaleString());
};


export const generateInvoice = async (fatura: IFatura) => {
  const response = await fetch("/templates/invoice_template.html");
  const templateHtml = await response.text();

  const filledHtml = fillTemplate(templateHtml, fatura);

  const container = document.createElement("div");
  container.innerHTML = filledHtml;
  document.body.appendChild(container);

  const opt:any = {
    margin:       [10, 10, 20, 10],
    filename:     `Invoice_Cobranca_${fatura.cliente.replace(/\s+/g, "_")}.pdf`,
    image:        { type: "jpeg", quality: 0.98 },
    html2canvas:  { scale: 2, useCORS: true },
    jsPDF:        { unit: "mm", format: "a4", orientation: "portrait" }
  };

  await html2pdf().set(opt).from(container).save();

  document.body.removeChild(container);
};
