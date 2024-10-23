class HonorarioComponent extends ViewComponent {

    honorario = Prop(null);
    saveLabel = Prop('Gerar Honorario');
    cancelLabel = Prop('Cancelar');
    modeloPagamento = [
        {
            id: 1,
            descricao: "Avença",
            obesevacao: null,
            created_at: "2024-10-06 21:30:34",
            updated_at: "2024-10-06 21:30:34",
        },
        {
            id: 2,
            descricao: "Taxa horária",
            obesevacao: null,
            created_at: "2024-10-06 21:30:34",
            updated_at: "2024-10-06 21:30:34",
        },
        {
            id: 3,
            descricao: "Valor Fixo",
            obesevacao: null,
            created_at: "2024-10-06 21:30:34",
            updated_at: "2024-10-06 21:30:34",
        },
        {
            id: 4,
            descricao: "Sucess fee",
            obesevacao: null,
            created_at: "2024-10-06 21:30:34",
            updated_at: "2024-10-06 21:30:34",
        },
        
    ];
    listColaboradores;
    listClientes;
    
    
    template = `
    <section class="content">
    <div class="row clearfix">
        
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div class="card">
                <div class="header">
                    <h2><strong>Honorario</strong> </h2>
                </div>
                <div class="body">
                    <form>
                        <h2 class="card-inside-title">Detalhes do Honorario</h2>
            
                            <div class="col-md-4">
                                <div class="input-field col s12">
                                    <span class="input-group-addon">
                                        <i class="material-icons">person</i> Colaboradores
                                    </span>
                                    <select (change)="updateColaboradores($event)" (forEach)="listColaboradores">
                                        <option each="item" value="">Selecione uma opção</option>
                                        <option each="item" value="{item.id}">{item.descricao}</option>
                                    </select>
                                </div>
                            </div>

                            <div class="col-md-4">
                                <div class="input-field col s12">
                                    <span class="input-group-addon">
                                        <i class="material-icons">person</i> Modo de pagamento
                                    </span>
                                    <select (change)="updateModoPagamento($event)" (forEach)="modeloPagamento">
                                        <option each="item" value="">Selecione uma opção</option>
                                        <option each="item" value="{item.id}">{item.descricao}</option>
                                    </select>
                                </div>
                            </div>

                                
                            <button class="btn btn-primary julaw-submit-button" (click)="">Gerar Honorario</button>
                            
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
    </div>
</section>
        `;




        stAfterInit() {
            this.getColaboradores();
            this.getClientes();
        }


        getColaboradores() {
            $still.HTTPClient.get("http://localhost:3000/api/v1/colaborador/").then(
                (r) => {
                    if (r.data) {
                        let colaboradorData = [];
    
                        for (let colaborador of r.data) {
                            colaboradorData.push({
                                id: colaborador.id,
                                descricao: `${colaborador.tipo.description} - ${colaborador.nome_completo}`,
                            });
    
                        }
    
                        this.listColaboradores = colaboradorData;
                        
    
                    }
                }
            );
        }

        getClientes() {
            $still.HTTPClient.get("http://localhost:3000/api/v1/cliente/").then((r) => {
                if (r.data) {
                    let clienteData = [];
    
                    for (let cliente of r.data) {
                        clienteData.push({
                            id: cliente.id,
                            descricao: `${cliente.tipo.description} - ${cliente.denominacao}`,
                        });
                    }
    
                    this.listClientes = clienteData;
    
                }
            });
        }

        updateColaboradores(evt) {
            this.listColaboradores = evt.target.value;
        }

        updateModoPagamento(evt) {
            this.modeloPagamento = evt.target.value;
        }


}