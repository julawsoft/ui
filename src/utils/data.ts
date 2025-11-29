export function converterHorasDecimais(horasDecimais:string) {
  const horas = Math.floor(Number(horasDecimais));
  const minutos = Math.round((Number(horasDecimais) - horas) * 60);

  if (minutos === 0) {
    return `${horas}h`;
  } else if (minutos === 30) {
    return `${horas}:30`;
  } else {
    return `${horas}h e ${minutos}min`;
  }
}

export function convertMoeda(valorString: string): number | string{
  try{
    const valor = parseFloat(valorString.replace(',', '.'));
    const formatado = valor.toLocaleString('pt-AO', { style: 'currency', currency: 'AOA' });
    return formatado
  }catch(e){
    return valorString
  }
}

export function parseValorBR(valorString: string): number {
  if (!valorString) return 0;

  // Remove espaços, pontos de milhar e substitui vírgula decimal por ponto
  const valorNormalizado = valorString.replace(/\./g, '').replace(',', '.');
  const valorNumerico = Number.parseFloat(valorNormalizado);
  // Retorna 0 se não for um número válido
  return isNaN(valorNumerico) ? 0 : valorNumerico;
}


export const formatDateInput = (dataStr?: string) => {
  if (!dataStr) return "";
  const [dia, mes, resto] = dataStr.split("/");
  if (!resto) return "";
  const [ano, hora = "00:00:00"] = resto.split(" ");
  const [h, m, s] = hora.split(":").map(Number);
  const data = new Date(Number(ano), Number(mes) - 1, Number(dia), h, m, s);
  return data.toLocaleDateString("pt-PT").split("/").reverse().join("-");
};


export  const formatTime = (ms: number) => {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600)
    .toString()
    .padStart(2, "0");
  const minutes = Math.floor((totalSeconds % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
};