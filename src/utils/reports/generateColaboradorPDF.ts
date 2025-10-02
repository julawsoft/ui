import html2pdf from "html2pdf.js";
import type { IColaborador } from "../../schema/InterfaceColaboradores";

export const generateColaboradorPDF = async (colaborador: IColaborador) => {
  const response = await fetch("/templates/colaboradorFicha.html");
  let templateHtml = await response.text();

  // Substitui placeholders
  templateHtml = templateHtml
    .replace("{{id}}", String(colaborador.id))
    .replace("{{nome_completo}}", colaborador.nome_completo ?? "-")
    .replace("{{nome_profissional}}", colaborador.nome_profissional ?? "-")
    .replace("{{inicial}}", colaborador.inicial ?? "-")
    .replace("{{funcao}}", colaborador.funcao ?? "-")
    .replace("{{tipoColaborador}}", colaborador.tipoColaborador ?? "-")
    .replace("{{categoria}}", colaborador.categoria ?? "-")
    .replace("{{data_nascimento}}", colaborador.data_nascimento ?? "-")
    .replace("{{n_identificacao}}", colaborador.n_identificacao ?? "-")
    .replace("{{n_cedula_ordem}}", colaborador.n_cedula_ordem ?? "-")
    .replace("{{contacto_pessoal}}", colaborador.contacto_pessoal?.toString() ?? "-")
    .replace("{{contacto_emergencia}}", colaborador.contacto_emergencia?.toString() ?? "-")
    .replace("{{email_pessoal}}", colaborador.email_pessoal ?? "-")
    .replace("{{email_corporativo}}", colaborador.email_corporativo ?? "-")
    .replace("{{taxa_horaria}}", colaborador.taxa_horaria?.toString() ?? "-")
    .replace("{{status}}", colaborador.status ?? "-")
    .replace("{{created_at}}", colaborador.created_at ? new Date(colaborador.created_at).toLocaleDateString() : "-")
    .replace("{{updated_at}}", colaborador.updated_at ? new Date(colaborador.updated_at).toLocaleDateString() : "-")
    .replace("{{generated_at}}", new Date().toLocaleString());


  // Converte HTML para PDF com estilos preservados
  const opt:any = {
    margin:       10,
    filename:     `I_Ficha_Colaborador_${colaborador.nome_completo?.replace(/\s+/g, "_")}.pdf`,
    image:        { type: "jpeg", quality: 0.98 },
    html2canvas:  { scale: 2 }, // melhor qualidade
    jsPDF:        { unit: "mm", format: "a4", orientation: "portrait" }
  };

  html2pdf().from(templateHtml).set(opt).save();
};
