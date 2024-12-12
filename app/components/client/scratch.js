class First {

  constructor() {
    console.log(`WAS CALLED FOR: `, arguments);
  }

}



class Second extends First {

  constructor(valor = '') {
    super()
  }

  nome;

}


const dd = new Second('Primeiro Valor');