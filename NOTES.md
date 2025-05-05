
## Show Loading
AppTemplate.showLoading();

## Hide Loading
AppTemplate.hideLoading();

## Toast
AppTemplate.toast({ status: 'Erro', message: e })


##
this.dataTableListProcessos.dataSource


##

   function calculateDays(dataEncerramento) {
      if (dataEncerramento) {
        const inicio = new Date();
        const fim = new Date(dataEncerramento);
        const diferencaEmMilissegundos = fim - inicio;
        const milissegundosPorDia = 1000 * 60 * 60 * 24;
        const diferencaEmDias = diferencaEmMilissegundos / milissegundosPorDia;
        return Math.floor(diferencaEmDias) + 1;
      } else {
        return 100
      }
    }