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

export function convertMoeda(valorString: string){
  try{
    const valor = parseFloat(valorString.replace(',', '.'));
    const formatado = valor.toLocaleString('pt-AO', { style: 'currency', currency: 'AOA' });
    return formatado
  }catch(e){
    return valorString
  }
}