export const formatMoedaAOA = (moeda: any) => {

  if(!moeda) return ''
  const formatter = new Intl.NumberFormat('ao-AO',
    {
        style: 'currency', currency: 'AOA',
        maximumFractionDigits: 2, minimumFractionDigits: 2
    }
);
return formatter.format(moeda);

}