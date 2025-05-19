import { ViewComponent } from "../../@still/component/super/ViewComponent.js";
import { loadWizard } from "../utils/wizard.js";

export class ClientForm extends ViewComponent {

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

    /**
     * Fields not bound to the form fields but for internal
     */
    clientType; //Holds list of tipo de cliente
    routingData; //Used to assign data if sent from Router

    template = `
    <section class="content p-4">
    
    <div class="container-fluid">
      
    <!-- <div class="still-popup-curtain" (showIf)="self.showFactura"></div>-->
    <div class="d-flex flex-end">
      <nav style="--bs-breadcrumb-divider: url(&#34;data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Cpath d='M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z' fill='%236c757d'/%3E%3C/svg%3E&#34;);" aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="#">Home</a></li>
          <li class="breadcrumb-item active" aria-current="page">Novo Cliente</li>
        </ol>
      </nav>  
    </div>


        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <h2>Cliente</h2>
            <p style="font-size: 12px">Cadastre ou edite aqui os dados dos seus clientes</p>
        </div>


        <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <div class="card">
                    <div class="card-header">
                        Dados Cliente
                    </div>
                
                    <div class="card-body">
                        
                    <form id="clientFormId" (formRef)="clientForm" onsubmit="javascript: return false;">
                           
                    <div class="row">
                        <div class="col-md-6">
                             <label class="form-label">Tipo de cliente</label>
                             <select 
                             class="form-control"
                             (required)="true"
                             (value)="tipoClienteSelecionado"
                             (change)="updateTipoCliente($event)" 
                             (forEach)="clientType">
                             <option each="item" value="">Selecione uma opção</option>
                             <option each="item" value="{item.id}">{item.value}</option>
                         </select>                        
                        </div>
                        
                        <div class="col-md-6">
                            <label class="form-label">Nome / Denominação</label>
                            <input 
                                (required)="true"
                                (validator)="text" 
                                type="text" 
                                class="form-control date" 
                                (value)="denominacao"
                                placeholder="Denominação do cliente">
                        </div>
                        
                        <div class="col-md-12">
                            <label class="form-label">Endereço</label>
                            <input 
                            (required)="true"
                            (validator)="text" 
                            type="text" 
                            class="form-control date" 
                            placeholder="Endereço" (value)="endereco">
                        </div>

                        <div class="col-md-6">
                            <label class="form-label">Número de Identificação Fiscal</label>
                                <input 
                                    (validator)="alhpanumeric"
                                    (validator-warn)="Digite um NIF válido, ex: 000300931LA009"
                                    (required)="true"
                                    (value)="nif" 
                                    placeholder="NIF"
                                    class="form-control"
                                >                                   
                        </div>

                        <div class="col-md-6">
                            <label class="form-label">Pessoa de contacto</label>
                            <input 
                            (required)="true"
                            (validator)="text"
                            type="text" 
                            class="form-control date" 
                            (value)="pessoaContacto" 
                            placeholder="Pessoa de Contacto"
                        >
                        </div>
                       
                        <div class="col-md-6">
                            <label class="form-label">Telefone</label>
                            <input 
                            (required)="true"
                            type="text" 
                            class="form-control date" 
                            (value)="contactoCobranca" 
                            placeholder="ex.: 900 000 000">                               
                        </div>

                        <div class="col-md-6">
                            <label class="form-label">E-mail</label>
                            <input 
                            (required)="true"
                            (validator)="email"
                            type="text" 
                            class="form-control date" 
                            (value)="e_mail" 
                            placeholder="cliente@exemplo.com"
                            >                           
                        </div>

                        <div class="col-md-12">
                            <label class="form-label">Nota</label>
                            <textarea id="clientNotaID" class="form-control" (value)="clientNota" rows="5"></textarea>
                        </div>            
                    
                    </div>    

                    <div 
                        class="card-footer mt-4" 
                        style="display: flex;
                            justify-content: end;
                            align-items: center;"
                    >
                    <button class="btn btn-success julaw-submit-button" type="submit" (click)="registerClient()">
                        Guardar
                        <i class="bi bi-floppy-fill"></i>
                    </button>
                </div>
                </div>
        </form>

                    </div>

                    <div class="card-footer">
                     
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

        alert("Cadastrando... ")

        console.log(">>>>", this.denominacao)

        const routingData = Router.data('ClientForm');

        console.log("routingData registerClient : ", JSON.stringify(routingData))

        console.log("tipoClienteId registerClient CLIEND ID : ", this.tipoClienteId)
        console.log("tipoClienteId registerClient NIF : ", this.nif.value)

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

        console.log("aui", isValidForm)

        if (isValidForm) {
                if (routingData === undefined || routingData === null || routingData === "") {
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


        console.log("payload do Update :::  ", JSON.stringify(payload))

        const tipoCliente = this.routingData.value.tipo;
        delete tipoCliente.created_at;
    
       const {id} = Router.data("ClientForm");
       payload.id = id;

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

        this.clientType = [
            { value: 'Empresa', id: 1 },
            { value: 'Particular', id: 2 },
            { value: 'Ministério', id: 3 },
            { value: 'Instituto Público', id: 4 },
            { value: 'Associação', id: 5 },
            { value: 'Outro', id: 6 }
        ];

        const routeData = Router.data('ClientForm');
        if (routeData) {

            console.log("tipoId ", JSON.stringify(routeData))
            console.log("tipoId ", routeData.tipo)
            console.log("tipoId ", routeData.tipo_id)

            const {
                id, denominacao, tipo_id, nif, endereco, pessoa_contacto,
                contacto_cobranca, nota, status, e_mail
            } = routeData;

            this.nif = nif;
            this.denominacao = denominacao || '';
            this.endereco = endereco;
            this.pessoaContacto = pessoa_contacto;
            this.contactoCobranca = contacto_cobranca;
            this.e_mail = e_mail;
            document.getElementById('clientNotaID').value = nota

            setTimeout(() => {
                this.tipoClienteSelecionado = tipo_id;
            }, 500)


        }
        AppTemplate.hideLoading();

    }

}
