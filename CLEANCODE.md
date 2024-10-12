# DICAS DE CLEAN CODE 


## 1 - Escolha bons nomes
Os nomes das coisas devem sempre ser objetivos, demonstrando exatamente o que elas fazem.

É necessário cuidado para não passar informações erradas ao declarar nomes.
Pense com cautela e invista tempo na escolha dos nomes.

Nomes de classes devem ser curtos, com substantivos e iniciais maiúsculas:

✅ Person, ProductAdapter, HamburgerFactory
❌ cheeseCake, UpdateData, ProductValidatorAccordingToThePriceList

Nomes de métodos podem ser mais longos (não muito) e devem representar ações (verbos), com iniciais maiúsculas, exceto a primeira:

✅ updateProducts(), kill(), getAllComponentsOfElement(element)
❌ is_playing()

Nomes de variáveis devem ser como nomes de métodos (com iniciais maiúsculas, exceto a primeira) se forem atributos de classes, ou então com todas as letras minúsculas, usando underline para espaços para outros contextos:

✅ time_in_seconds, new_person_dto
❌ s, MoneyAmount

## 2 - Funções

Devem ser pequenas (4 linhas ou menos) e ter responsabilidades únicas.
Se uma função apresenta muitas linhas, ela deve ser quebrada em funções menores.

Não devem ter muitos parâmetros (4 são demais). Obs: se insistir que precisa deles, provavelmente seus parâmetros podem formar uma nova classe.
✅ Exemplo que segue os princípios acima

<code>
function calculateRectangleArea(float width, float height) {
    return width * height
}
</code>

❌ Fazendo além do que seu nome diz

function setName(string name) {
    name = name.toUpperCase()
    this.name = name
}

❌ Muitos parâmetros

function createNewCar(string name, float price, float velocity, Fuel fuelType, int doorAmount) {
    // ...
}

❌ Muitas responsabilidades

<code>
function receiveAndValidadeDateFromClient(Client client) {
    if (client == null)
        return
    
    if (!client.isConnected())
        return
        
    var data = client.getData()
    var client_id = data[0]
    var client_name = data[1].toUpperCase()
    
    handleClient(client_id, client_name)
}
</code>

## 3 - Comentários

Podem ser úteis em situa ções específicas, mas na maioria das vezes são usados quando não deveriam.

Se comentários estiverem tentando explicar o que o código faz, provavelmente o código não está limpo e os nomes não estão bem atribuídos. Se não for isso, o comentário provavelmente é redundante.

Comentários podem fornecer informações falsas.

## 4 - Classes

Devem ser pequenas e coesas, não possuindo inúmeros métodos e assumindo responsabilidade única.
Devem ser bem encapsuladas.

É preferível um sistema com diversas classes pequenas do que com poucas classes grandes.
