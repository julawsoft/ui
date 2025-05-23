export function converterHorasDecimais(horasDecimais) {
  const horas = Math.floor(horasDecimais);
  const minutos = Math.round((horasDecimais - horas) * 60);

  if (minutos === 0) {
    return `${horas}h`;
  } else if (minutos === 30) {
    return `${horas}h e meia`;
  } else {
    return `${horas}h e ${minutos}min`;
  }
}