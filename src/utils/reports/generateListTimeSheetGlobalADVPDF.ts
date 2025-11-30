import { ITimeSheets } from '../../schema/InterfaceTimeSheets';
import html2pdf from "html2pdf.js";

const totalDuration = (data:any): string => {
  const totalSeconds = data.reduce((acc:any, t:any) => {
    if (!t.horas) return acc;

    const parts = t.horas.split(":").map(Number);
    const [h = 0, m = 0, s = 0] = parts;

    if (isNaN(h) || isNaN(m) || isNaN(s)) return acc;

    return acc + h * 3600 + m * 60 + s;
  }, 0);

  const h = Math.floor(totalSeconds / 3600)
    .toString()
    .padStart(2, "0");
  const m = Math.floor((totalSeconds % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const s = Math.floor(totalSeconds % 60)
    .toString()
    .padStart(2, "0");

  return `${h}:${m}:${s}`;
};

export const generateTimeSheetListGlobalAVDPDF = async (timesheet: ITimeSheets[], dataInicio: string,dataFim: string) => {
  const response = await fetch("/templates/timeSheetListGlobalAdvogado.html");
  let templateHtml = await response.text();

  const rows = timesheet.map(timesheet => `
    <tr>
      <td>${timesheet.data_registo.substring(0,10)}</td>
      <td>${timesheet.tarefa ?? "-"}</td>
      <td>${timesheet.horas}</td>
      <td>${timesheet.colaborador}</td>
      <td>${timesheet.cliente}</td>
      <td>${timesheet.referencia_processo}</td>
      <td>${timesheet.status}</td>
    </tr>
  `).join("");

  const totalHoras = totalDuration(timesheet)

  const filledHtml = templateHtml
    .replace("{{dataInicio}}", new Date(dataInicio).toLocaleString().substring(0,10))
    .replace("{{dataFim}}", new Date(dataFim).toLocaleString().substring(0,10))
    .replace("{{totalHoras}}", totalHoras)
    .replace("{{rows}}", rows)
    .replace("{{generated_at}}", new Date().toLocaleString());

  const opt:any = {
    margin: 0.5,
    filename: `Lista_global_timeSheets.pdf`,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "in", format: "a4", orientation: "landscape" },
  };

  html2pdf().from(filledHtml).set(opt).save();
};
