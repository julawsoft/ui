import { ViewComponent } from "../../@still/component/super/ViewComponent.js";
import { AppTemplate } from "../../app-template.js";
import { loadWizard } from "../utils/wizard.js";
import { cleanHorasValue, cleanMoedaValue, convertToAkzCurrency } from "../utils/currency.js";


export class HonorarioForm extends ViewComponent {

    tipoClienteId;
    nome;
    sobrenome;
    denominacao;
    nif;
    endereco;
    pessoaContacto;
    contactoCobranca;
    e_mail;
    clientNota;
    tipoClienteSelecionado;
    createdAt

    /** @type { STForm } */
    clientForm;

    /** @Proxy @type { TBDragableGrid } */
    honorarioProxy = Proxy;


    /** @Prop */
    horarioCabecalho = [
        { title: "Designação", field: "name" },
        { title: "Início", field: "start" },
        { title: "Fim", field: "end" },
        { title: "Custo", field: "custo", hozAlign: "right" }
    ];

    /** @Prop */
    horarioDestCabecalho = [
        { title: "Designação", field: "name" },
        { title: "Início", field: "start" },
        { title: "Fim", field: "end" },
        { title: "Custo", field: "custo", hozAlign: "right", editor: "parent.editPricingValue()" }
    ];


    /** @Prop */
    dadosTimeSheet = [];

    /**
     * Fields not bound to the form fields but for internal
     */
    clientType; //Holds list of tipo de cliente
    routingData; //Used to assign data if sent from Router

    clienteId;
    processoId;

    listColaboradores;
    listPrecedentes;


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

        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <h2>Registo dos Honorários</h2>
            <p style="font-size: 12px">Cadastre aqui uma intervenções no Processo</p>
        </div>

        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-header">
                            <div class="row">
                                <div class="col-6">
                                    <label>Processos</label>
                                        <select 
                                            class="form-control"
                                            id="processoAssociadoInput" 
                                            (change)="updatePrecedentes($event)" 
                                            (forEach)="listPrecedentes">
                                                <option each="item" value="">Selecione uma opção</option>
                                                <option each="item" value="{item.id}">{item.descricao}</option>
                                        </select>
                                </div>
                                <div class="col-6">
                                    <label>Clientees</label>
                                    <select 
                                        class="form-control"
                                        id="processoAssociadoInput" 
                                        (change)="updateClientes($event)" 
                                        (forEach)="listColaboradores">
                                            <option each="item" value="">Selecione uma opção</option>
                                            <option each="item" value="{item.id}">{item.descricao}</option>
                                    </select>
                                </div>
                            </div>
                    </div>
                    <div class="card-body">
                    
                    <st-element 
                        component="@tabulator/TBDragableGrid" 
                        proxy="honorarioProxy" 
                        tableData="parent.dadosTimeSheet"
                        tableFields="parent.horarioCabecalho" 
                        destFields="parent.horarioDestCabecalho"
                        destPlaceholder="Arraste aqui o item a pagar">
                    </st-element>

                    </div>
                    <div class="card-footer">
                    <button class="btn btn-success julaw-submit-button" (click)="generateHonorario()">
                        Gerar Honorário
                    </button></div>
                </div>
            </div>
        
        </div>          

        </div>
    </section>
    `;

    constructor() {
        super();

        this.setup({
            includs: [
                /* ClientsGrid */
            ],
            scripts: [
                'assets/js/form.min.js',
            ],
        });
        AppTemplate.showLoading();

    }

    updateTipoCliente(evt) {
        console.log('Value is: ', evt);
        this.tipoClienteId = evt.target.value;
    }

    onRender() {
        this.routingData = Router.data('ClientForm');
        loadWizard({ enableAllSteps: this.routingData ? true : false });
    }


    registerClient() {

        const routingData = Router.data('ClientForm');
        let tipoClientId = this.tipoClienteId.value;
        if ((!tipoClientId || tipoClientId == '') && routingData)
            tipoClientId = routingData?.tipo_id;

        const payload = {
            "denominacao": this.denominacao.value ?? routingData.denominacao,
            "tipo_id": tipoClientId,
            "nif": this.nif.value ?? routingData.nif,
            "endereco": this.endereco.value ?? routingData.endereco,
            "pessoa_contacto": this.pessoaContacto.value ?? routingData.pessoa_contacto,
            "contacto_cobranca": this.contactoCobranca.value ?? routingData.contacto_cobranca,
            "e_mail": this.e_mail.value ?? routingData.e_mail,
            "nota": document.getElementById('clientNotaID').value,
            "status": "pending"
        }

        console.log("payload ", payload)

        const isValidForm = this.clientForm.validate();

        if (isValidForm) {
            if (!routingData) {
                this.saveClient(payload);
            } else {
                this.updateClient(payload);
            }
        }

    }

    saveClient(payload) {

        AppTemplate.showLoading();
        $still.HTTPClient.post(
            '/api/v1/cliente',
            JSON.stringify(payload),
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ).then((r) => {

            AppTemplate.hideLoading();
            if (r.status === 201) {
                Router.goto('ClientsGrid');
            } else {
                alert(r.errors)
            }

        }).catch((err) => {
            AppTemplate.hideLoading();
        });

    }

    updateClient(payload) {

        const tipoCliente = this.routingData.value.tipo;
        delete tipoCliente.created_at;
        payload.id = this.routingData.value.id;

        $still.HTTPClient.put(
            '/api/v1/cliente',
            JSON.stringify(payload),
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ).then((r) => {
            AppTemplate.hideLoading();
            Router.goto('ClientsGrid');
        }).catch((err) => {
            AppTemplate.hideLoading();
        });

    }

    stAfterInit() {
        this.getTimeSheetNaoFacturado()
        this.getListPrecedentes()
        this.getListColaboradores()
    }

    getTimeSheetNaoFacturado() {

        $still.HTTPClient.get(
            `/api/v1/processo_time_sheets_nao_faturado`
        ).then((r) => {
            if (r.status === 200) {
                try {
                    const mapper = this.convertTimeSheetToGrid;
                    const timeSheetData = r.data.map(mapper);
                    this.honorarioProxy.setSourceData(timeSheetData);

                } catch (e) {
                    AppTemplate.toast({ status: 'Erro', message: e.message })
                }
            }
            AppTemplate.hideLoading()
        });

    }

    convertTimeSheetToGrid(r) {

        console.log(">>> ", r)
        console.log(">>> ", typeof r)

        const { dados_importantes, id } = r;
        const { title: name, start: Start, end: End } = JSON.parse(dados_importantes);

        const startDate = new Date(Start.d.d);
        const endDate = new Date(End.d.d);

        const startTime = startDate.getTime();
        const endTime = endDate.getTime();

        const start = startDate.toLocaleString();
        const end = endDate.toLocaleString();

        const hours = (endTime - startTime) / (1000 * 60 * 60);
        const custo = `${convertToAkzCurrency(hours * 10_000)}`


        return {
            id,
            custo,
            name,
            start,
            end,
            qtd: `${hours} Hrs`,
            total: custo
        }
    }



    generateHonorario() {


        this.userLogged = JSON.parse(localStorage.getItem("_user"));

            const data = this.honorarioProxy.getDestData();

        console.log("data de destino da table ", data)

        if (data.length) {


            const totalFactura = data
                .map(
                    r => parseFloat(cleanMoedaValue(r.total))
                )
                .reduce((accum, val) => accum + val);

            const totalHoras = data
                .map(
                    r => parseFloat(cleanHorasValue(r.qtd))
                )
                .reduce((accum, val) => accum + val);


            console.log("processo ... ", this.processoId)

            // mexer aqui
            let payload = {
                'processo_id': this.processoId.value,
                'cliente_id': this.clienteId.value,
                'colaborador_id': this.userLogged.value !== undefined ? this.userLogged.value.id : this.userLogged.id,
                'horas': totalHoras,
                'custo': totalFactura,
                'status': 'pendente',
                'items': data.map((item) => ({
                    "processos_timesheet_id": item.id,
                    "horas": parseFloat(cleanHorasValue(item.qtd)),
                    "custo": parseFloat(cleanMoedaValue(item.custo)),
                    "dados_adicionais": JSON.stringify(item)
                }))
            }

            console.log("payload ", payload)

            return 0;

            AppTemplate.showLoading();

            $still.HTTPClient.post(
                "/api/v1/processo_factura",
                JSON.stringify(payload),
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
                .then((response) => {
                    AppTemplate.hideLoading();
                    if (response.status !== 201) {
                        if (response.message) {
                            AppTemplate.toast({ status: 'error', message: response.message })
                        } else {
                            AppTemplate.toast({ status: 'error', message: JSON.stringify(response.errors) })
                        }
                    } else {

                        AppTemplate.toast({ status: 'success', message: 'Honorário registado com sucesso!' })

                        this.honorarioProxy.clearDestData()
                        console.log("clear data ....")

                        let dataResponse = response.data
                        this.showFactura = true;

                        const invoiceNum = Math.random().toString().split('.')[1];
                        this.facturaProxy.setNumeroFactura(invoiceNum.substring(0, 5).concat(dataResponse.id));
                        this.facturaProxy.setNomeDocliente(this.cliente.value);
                        this.facturaProxy.setTotalFactura(totalFactura);
                        this.facturaProxy.itensFactura = data;


                    }
                })
                .catch((err) => {
                    AppTemplate.hideLoading();
                    AppTemplate.toast({ status: 'error', message: err.message })
                });

        } else {
            AppTemplate.toast({ status: 'Erro', message: 'Arraste item a pagar â Direita!' })
        }


    }


    getListPrecedentes() {
        $still.HTTPClient.get("/api/v1/processo/").then(
            (r) => {
                if (r.data) {
                    let processoData = [];

                    for (let processo of r.data) {
                        processoData.push({
                            id: processo.id,
                            descricao: `${processo.ref} - ${processo.assunto}`,
                            ref: processo.ref,
                            assunto: processo.assunto,
                        });
                    }

                    console.log("processoData", processoData)

                    this.listPrecedentes = processoData;
                }
            }
        );
    }

    getListColaboradores() {
        $still.HTTPClient.get("/api/v1/colaborador/").then(
            (r) => {
                if (r.data) {
                    let colaboradorData = [];

                    for (let colaborador of r.data) {
                        colaboradorData.push({
                            id: colaborador.id,
                            descricao: `${colaborador.description} - ${colaborador.nome_completo}`,
                        });
                    }

                    console.log("colaboradorData", colaboradorData)

                    this.listColaboradores = colaboradorData;
                }
            }
        );
    }


    updatePrecedentes(evt) {
        console.log("... ", evt)
        this.processoId = evt.target.value;
    }
    updateClientes(evt) {
        this.clienteId = evt.target.value;
    }

}
