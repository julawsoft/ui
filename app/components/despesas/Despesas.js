class Despesas extends ViewComponent {

    clientType = [
        { nome: 'Manuel', id: 1 },
        { nome: 'André', id: 2 },
        { nome: 'Gerson', id: 3 },
        { nome: 'Maria', id: 4 },
        { nome: 'Mila', id: 5 }
    ];

    listProcesso = [
        { numero: '091280', id: 1 },
        { numero: 'S0981232', id: 2 },
        { numero: '87632TR', id: 3 },
        { numero: '907324678QT', id: 4 },
        { numero: '87128SN', id: 5 }
    ];

    /** @Prop */
    dataTableLabels = [
        {
            hozAlign: "center",
            editRow: true,
            icon: "<i class='fa fa-pen'></i>",
            width: 20,
        },
        {
            hozAlign: "center",
            deleteRow: true,
            icon: "<i class='fas fa-file-alt'></i>",
            width: 20,
        },
        { title: "Estado", field: "estado", sorter: "string", width: 100 },
        { title: "Progresso", field: "progress", sorter: "30", hozAlign: "left", formatter: "progress" },
        { title: "Referência", field: "ref", sorter: "string" },
        { title: "Assunto", field: "assunto", sorter: "string" },
        { title: "Área", field: "area", sorter: "string" },
        { title: "Instituição", field: "instituicao", sorter: "string" },
        { title: "Modo Facturação", field: "modo_facturacao", sorter: "string" },
        { title: "Cliente", field: "cliente", sorter: "string" },
        { title: "Gestor", field: "gestor", sorter: "string" },
        { title: "Data Cadastro", field: "data_registo", sorter: "string" },
        { title: "Data Suspensão", field: "data_suspensao", sorter: "string" },
        { title: "Data Encerramento", field: "data_encerramento", sorter: "string" },
    ];

    template = `
    <section class="content">
        <div class="body">
            <form id="client_wizard_with_validation" (formRef)="clientForm" onsubmit="javascript: return false;">
                <!-- <h3>Da</h3> -->
                <fieldset>
                    <h2 class="card-inside-title">Filtrar por cliente e/ou processo</h2>
                    <div class="row clearfix">
                        <div class="col-md-4">
                            <div class="input-group">
                                <div class="input-field col s12">
                                    <span class="input-group-addon">
                                        <i class="material-icons">person</i> Cliente
                                    </span>
                                    <select Dados Pessoais
                                        (required)="true"
                                        (value)="tipoClienteSelecionado"
                                        (change)="updateTipoCliente($event)" 
                                        (forEach)="clientType">
                                        <option each="item" value="">Selecione uma opção</option>
                                        <option each="item" value="{item.id}">{item.nome}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="input-group">
                                <div class="input-field col s12">
                                    <span class="input-group-addon">
                                        <i class="material-icons">folder</i> Processo
                                    </span>
                                    <select Dados Pessoais
                                        (required)="true"
                                        (value)="tipoClienteSelecionado"
                                        (change)="updateTipoCliente($event)" 
                                        (forEach)="listProcesso">
                                        <option each="item" value="">Selecione uma opção</option>
                                        <option each="item" value="{item.id}">{item.numero}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </fieldset>
            </form>
        </div>

        <st-element 
            component="TabulatorComponent"
            tableHeader="parent.dataTableLabels"
        >

    </section>
    `;

}