import { ITasks } from './../../schema/InterfaceTarefa';
import html2pdf from "html2pdf.js";

export const generateTasksListPDF = async (tasks: ITasks[], dataInicio: string,dataFim: string) => {
  const response = await fetch("/templates/tasksList.html");
  const templateHtml = await response.text();

  // gerar as linhas da tabela
  const rows = tasks.map(task => `
    <tr>
      <td>${task.descricao}</td>
      <td>${task.tipoTarefa ?? "-"}</td>
      <td>${task.data_para_realizacao}</td>
      <td>${task.estado?.toLowerCase() !== 'concluída' ? task.dias_em_falta : '-'}</td>
      <td>${task.cliente}</td>
      <td>${task.ref}</td>
      <td>${task.estado ?? "-"}</td>
      <td>${task.data_criada.substring(0,10)}</td>
    </tr>
  `).join("");

  const filledHtml = templateHtml
    .replace("{{dataInicio}}", new Date(dataInicio).toLocaleString().substring(0,10))
    .replace("{{dataFim}}", new Date(dataFim).toLocaleString().substring(0,10))
    .replace("{{rows}}", rows)
    .replace("{{generated_at}}", new Date().toLocaleString());

  const opt:any = {
    margin: 0.5,
    filename: `Lista_tarefas.pdf`,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "in", format: "a4", orientation: "landscape" },
  };

  html2pdf().from(filledHtml).set(opt).save();
};
