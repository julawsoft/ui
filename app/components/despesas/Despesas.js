import { ViewComponent } from "../../@still/component/super/ViewComponent.js";

export class Despesas extends ViewComponent {

    clientList;
    listProcesso;

    /** @Prop */
    dataTableLabels = [
        {
            hozAlign: "center",
            deleteRow: true,
            icon: "<i class='bi bi-file-earmark'></i>",
            width: 20,
        },
        { title: "N. Processo", field: "numProcesso", hozAlign: "left" },
        { title: "Nome cliente", field: "nomeCliente", sorter: "string" },
        { title: "Valor", field: "valor", sorter: "string" },
        { title: "Tipo Movimento", field: "tipo", sorter: "string" },
        { title: "Data Movimento", field: "dataMovimento", sorter: "string" }
    ];

    /** @type { StForm } */
    filtroForm;

    /** @type { StForm } */
    despesaForm;

    /** @Prop */
    createFormVisible = false;

    /** @Proxy @type { TabulatorComponent } */
    despesasTableProxy;

    tipoMovimento;
    valorDespesa;
    numeroProcesso;
    dataDespesa;

    nomeCliente;

    nomeClienteFiltro;
    numProcessoFiltro;

    tipoMovimentos = [
        { id: 1, name: 'Débito' },
        { id: 2, name: 'Crédito' },
    ];

    /** @Prop */
    tipoMovimentosMap = { 1: 'Débito', 2: 'Crédito' };

    /** @Inject @type { ProcessoService } */
    processoService;

    template = `
    <section class="content p-4">
    
        <div class="container-fluid">

        <div class="d-flex flex-end">
        <nav style="--bs-breadcrumb-divider: url(&#34;data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Cpath d='M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z' fill='%236c757d'/%3E%3C/svg%3E&#34;);" aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="#">Home</a></li>
            <li class="breadcrumb-item active" aria-current="page">Library</li>
          </ol>
        </nav>
      </div>



         <div class="card">

            <div class="card-header p-2 mb-2">
                
            <form id="client_wizard_with_validation" (formRef)="filtroForm" onsubmit="javascript: return false;">
            <!-- <h3>Da</h3> -->
            <fieldset>

                <h5 class="card-inside-title">Filtrar por cliente e/ou processo</h5>

                <div class="row">
                    <div class="col-md-4">
                               <label>Cliente</label>
                                <select
                                    (required)="true"
                                    class="form-control"
                                    (value)="nomeClienteFiltro"
                                    (change)="setNomeClienteFiltro($event)" 
                                    (forEach)="clientList"
                                       id="clienteId"
                                    >
                                 
                                    <option each="item" value="">Selecione uma opção</option>
                                    <option each="item" value="{item.id}">{item.descricao}</option>
                                </select>
                    </div>

                    <div class="col-md-3">
                            <label>Processo</label>
                            <select
                                (required)="true"
                                class="form-control"
                                (value)="numProcessoFiltro"
                                (change)="setNumProcessoFiltro($event)" 
                                (forEach)="listProcesso"
                                id="processoId"
                            >
                                    <option each="item" value="">Selecione uma opção</option>
                                    <option each="item" value="{item.id}">{item.numero}</option>
                            </select>
                    </div>

                    <div class="col-md-2" style="display: flex;
                                                justify-content: center;
                                                align-items: center;
                                                margin-top: 20px;">
                        <button class="btn btn-primary" type="submit" (click)="getDespesaFilter()">
                            Filtrar
                            <i class="bi bi-funnel"></i>
                        </button>       
                    </div>

                </div>
            </fieldset>
        </form>   
            </div>

        <div class="card-body">
            <st-element 
                component="@tabulator/TabulatorComponent"
                tableHeader="parent.dataTableLabels"
                proxy="despesasTableProxy"
            >
        </div>
    </div>
    </section>
    `;

    constructor() {
        super();
        AppTemplate.showLoading();
    }

    async stAfterInit() {
        this.clientList = await this.processoService.getListClientes();
        this.listProcesso = await this.processoService.getProcessos();
        await this.getDespesa();
    }

    setDataDespesa(evt) {
        this.dataDespesa = evt.target.value;
    }

    setNomeClienteFiltro(evt) {
        this.nomeClienteFiltro = evt.target.value;
    }

    setNumProcessoFiltro(evt) {
        this.numProcessoFiltro = evt.target.value;
    }

    /** @Prop */
    nomeClienteText;
    setNomeCliente(evt) {
        this.nomeCliente = evt.target.value;
        this.nomeClienteText = evt.target.options[evt.target.selectedIndex].text;
    }

    showHideCreateForm() {
        this.createFormVisible = !this.createFormVisible;
    }

    /** @Prop */
    numProcessoText;
    setNumeroProcesso(evt) {
        this.numeroProcesso = evt.target.value;
        this.numProcessoText = evt.target.options[evt.target.selectedIndex].text;
    }

    setTipoMovimento(evt) {
        this.tipoMovimento = evt.target.value;
    }

    saveNewDespesa() {

        const colaboradorId = JSON.parse(localStorage._user).id;


        const payload = {
            colaboradorId,
            dataMovimento: document.getElementById('dataDespesa').value,
            idProcesso: this.numeroProcesso.value,
            tipoMovimento: this.tipoMovimento.value,
            valor: this.valorDespesa.value
        }

        AppTemplate.showLoading();
        $still.HTTPClient.post(
            '/api/v1/processo/despesa',
            JSON.stringify(payload),
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ).then((r) => {
            AppTemplate.hideLoading();
            this.despesasTableProxy.insertRow({
                numProcesso: this.numProcessoText,
                nomeCliente: this.nomeClienteText,
                valor: payload.valor,
                tipo: this.tipoMovimentosMap[payload.tipoMovimento],
                dataMovimento: payload.dataMovimento
            });
        }).catch((err) => {
            AppTemplate.hideLoading();
            console.log(`Erro ao cadastrar despesa: `, err);
        });

    }

    getDespesa() {

        $still.HTTPClient.get(
            '/api/v1/processo/despesa/all'
        ).then((r) => {
            AppTemplate.hideLoading();

            const dataSource = r.data.map(item => ({
                numProcesso: item.numeroProcesso,
                nomeCliente: item.nomeCliente,
                valor: item.valor,
                tipo: this.tipoMovimentosMap[item.tipoMovimento],
                dataMovimento: item?.dataMovimento?.split('T')[0]
            }));

            this.despesasTableProxy.insertRow(null, dataSource);

        }).catch((err) => {
            AppTemplate.hideLoading();
            console.log(`Erro ao buscar despesas: `, err);
        });

    }

    getDespesaFilter() {

        let payload =
        {
            "cliente_id": document.getElementById('clienteId').value == "" ? 0 : document.getElementById('clienteId').value,
            "processo_id": document.getElementById('processoId').value == "" ? 0 : document.getElementById('processoId').value
        }

        console.log("Payload das despeas ", payload)

        $still.HTTPClient.get(
            `/api/v1/despesas_filtro/${payload.cliente_id}/${payload.processo_id}`,
        ).then((r) => {
            AppTemplate.hideLoading();

            const dataSource = r.data.map(item => ({
                numProcesso: item.numeroProcesso,
                nomeCliente: item.nomeCliente,
                valor: item.valor,
                tipo: this.tipoMovimentosMap[item.tipoMovimento],
                dataMovimento: item?.dataMovimento?.split('T')[0]
            }));

            this.despesasTableProxy.insertRow(null, dataSource);

        }).catch((err) => {
            AppTemplate.hideLoading();
            console.log(`Erro ao buscar despesas: `, err);
        });

    }

    goToDespesasForm() {
        Router.goto("DespesasForm");
    }

}