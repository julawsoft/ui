import { ViewComponent } from "../../@still/component/super/ViewComponent.js";

export class MeusTimesheetsGrid extends ViewComponent {

  htmlRefId = "clientDataTable";
  dataSource;
  clientType;

  /** 
   * @Proxy
   * @type { TabulatorComponent } 
   */
  dataTable;

  /** @Prop */
  isEmptyData = true;

  /** @Prop */
  isNotEmptyData = false;


  /** @Prop */
  dataTableLabels = [
    { hozAlign: "center", editRow: true, icon: "<i class='fa fa-pen'></i>", width: 20 },
    /*{ hozAlign: "center", deleteRow: true, icon: "<i class='fa fa-trash'></i>", width: 20 },*/
    { title: "Tipo Cliente", field: "tipo_id", sorter: "string", width: 200 },
    { title: "Nome", field: "denominacao", sorter: "string" },
    { title: "NIF", field: "nif", sorter: "string" },
    { title: "Endereco", field: "endereco", sorter: "string" },
    { title: "Telefone", field: "pessoa_contacto", sorter: "string" },
    { title: "Telefone Cobrança", field: "contacto_cobranca", sorter: "string" }
  ];


  template = `
    <section class="content">
        <br>
        <div class="block-header">
            <div class="row">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                        
                    <st-element
                        component="CreateButton"
                        (onClick)="gotoCreateCliente()"
                    >

                    <ul class="breadcrumb breadcrumb-style" style="
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        padding: 5px;"
                    >
                        <li class="breadcrumb-item 	bcrumb-1">
                            <a href="/">
                                <i class="material-icons">home</i>
                                Home
                            </a>
                        </li>
                        <li class="breadcrumb-item bcrumb-1 active">Cliente</li>
                        <li class="breadcrumb-item active">Lista de Clientes</li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="card">
            <div class="header">
            <h2><strong>TimeSheets </strong>Registados</h2>
            </div>
            <div class="body">



            <div class="col-md-4">
            <div class="input-group">
                <div class="input-field col s12">
                    <span class="input-group-addon">
                        <i class="material-icons">person</i> Tipo Empresa
                    </span>
                    <select
                        (required)="false"
                        (value)="clientType"
                        (change)="changeEmpresaFiltro($event)" 
                        (forEach)="clientType"
                        id="tipoEmpresaId"
                        >                     
                        <option each="item" value="">Selecione uma opção</option>
                        <option each="item" value="{item.id}">{item.value}</option>
                    </select>
                </div>
            </div>
        </div>

        <div class="col-md-2">
        <div class="input-group">
            <div class="input-field col s12">
                <span class="input-group-addon">
                    &nbsp;
                </span>
                <st-element
                    label="Pesquisar"
                    iconName="search"
                    color="bg-blue"
                    component="CreateButton"
                    (onClick)="getEmpresasFilter()"
                >
            </div>
        </div>
    </div>




            <div  (showIf)="self.isNotEmptyData">
            <div class="table-responsive">
                <st-element
                    component="@tabulator/TabulatorComponent"
                    proxy="dataTable"
                    tableHeader="parent.dataTableLabels"
                     tableHeight="auto"
                    (onEditColumn)="getClientDetails(fieldName, data)"
                    (onDeleteRow)="deleteRow(fieldName, data)"
                    (onCellClick)="goToClienteDetalhes(row, col, data)"
                    >
                </st-element>
            </div>
            </div>
            <div  (showIf)="self.isEmptyData">
            <div class="alert alert-warning">
              <p  style="color: #555"><strong>Atenção!</strong> Nenhum cliente encontrado.</p>&nbsp;<a href="#" (click)="gotoView('ClientForm')">Crie aqui um</a>
            </div>
          </div>
            </div>
        </div>

    </section>
    `;

  constructor() {
    super();
    AppTemplate.showLoading();
    this.setup({});
  }

  goToClienteDetalhes(row, col, data) {
    console.log(data.id);

    Router.goto("ClienteDetalhes", {
      data: data.id
    });
  }

  deleteRow(_, record) {
    alert(JSON.stringify(record));
  }

  editRow(_, record) {
    console.log(`ROW WILL BE EDITED: `, record);
  }

  cellClick(row, col, _) {
    console.log(`Cliecked on: `, {
      row,
      col,
      _
    });
  }

  changeEmpresaFiltro(event) {

    console.log("Mudou o filtro de empresa ", event)
  }

  async onRender() {
    /** For Test purpose only */
    await this.stLazyExecution(async () => {
      /** @type { ClientForm } */
      /* 
            const clientFormView = $still.view.get('ClientForm');
            clientFormView.onChange((newState) => {
                console.log(`Client grid detectou mudança no client form: `, newState);
            }); 
            */
    });
  }

  getEmpresasFilter() {

    const tipoEmpresaId = document.getElementById("tipoEmpresaId").value;
    console.log("Filtrar empresas ", tipoEmpresaId);
    
    $still.HTTPClient.get(`/api/v1/cliente_type/${tipoEmpresaId}`).then(
      (r) => {
        if (r.data) {

          console.log("dados da empresa", r.data)

          this.isNotEmptyData = true;
          this.isEmptyData = false;
          let clieteDTO = r.data.map((item) => {
            return {
              id: item.id,
              denominacao: item.denominacao,
              nif: item.nif,
              endereco: item.endereco,
              pessoa_contacto: item.pessoa_contacto,
              contacto_cobranca: item.contacto_cobranca,
              tipo: item.tipo.description,
              tipo_id: item.tipo ? item.tipo.description : '-',
              e_mail: item.e_mail,
              nota: item.nota,
              created_at: new Date(item.created_at)
                .toLocaleString("PT")
                .substring(0, 10)
            };
          });
          this.dataSource = clieteDTO;
          this.dataTable.dataSource = clieteDTO;
      
        
          AppTemplate.hideLoading();
        } else {
          
          console.log("dados da  do else", r.data)

          this.dataSource = []
          this.isNotEmptyData = false;
          this.isEmptyData = true;
          AppTemplate.hideLoading();
        }
      }
    ).catch(e => {
      AppTemplate.toast({ status: 'Erro', message: e })
      AppTemplate.hideLoading();
    })



  }

  stAfterInit(val) {

    this.clientType = [
      { value: 'Empresa', id: 1 },
      { value: 'Particular', id: 2 },
      { value: 'Ministério', id: 3 },
      { value: 'Instituto Público', id: 4 },
      { value: 'Associação', id: 5 },
      { value: 'Outro', id: 6 }
  ];

  console.log("tipo empresa" , this.clientType)


    $still.HTTPClient.get("/api/v1/cliente/").then((r) => {
      try {
        let dataResponse = r.data;
        if (dataResponse.length > 0) {
          this.isNotEmptyData = true;
          this.isEmptyData = false;
          let clieteDTO = dataResponse.map((item) => {
            return {
              id: item.id,
              denominacao: item.denominacao,
              nif: item.nif,
              endereco: item.endereco,
              pessoa_contacto: item.pessoa_contacto,
              contacto_cobranca: item.contacto_cobranca,
              tipo: item.tipo.description,
              tipo_id: item.tipo ? item.tipo.description : '-',
              e_mail: item.e_mail,
              nota: item.nota,
              created_at: new Date(item.created_at)
                .toLocaleString("PT")
                .substring(0, 10)
            };
          });
          this.dataSource = clieteDTO;
          this.dataTable.dataSource = clieteDTO;
        } else {
          this.isNotEmptyData = false;
          this.isEmptyData = true;
        }
      } catch (e) {
        console.log("erro no processo DTO", e);
      } finally {
        AppTemplate.hideLoading();
      }
    });
  }

  gotoView(viewComponent) {
    Router.goto(viewComponent);
  }

  /** For Test purpose only */
  /** @type { StEvent } */
  anyState = "This is the state value";
  runLocalFunc() {
    this.dataTable.dataSource = [{ denominacao: "Novo valor", tipo_id: 190 }];
  }

  getClientDetails(f, row) {
    console.log("row do cliente", row)
    Router.goto("ClientForm", { data: row });
  }

  editPricingValue(evtType, value, rowData) {
    if (evtType == "onFocus") {
      const actualValue = String(value)
        .slice(4) //Remove AKZ Angola currency code and the space after it
        .replace(".", "", "gi") //Remove the period/dot in the thousands separator
        .split(","); //Separate the integer value from the cents
      const cents = parseFloat(actualValue[1]);
      return parseFloat(actualValue[0]) + `${cents > 0 ? "," + cents : ""}`;
    }

    if (evtType == "onLoseFocus") {
      const inputValue = String(value).split(",");
      const amount = inputValue[0];
      const cents = inputValue[1] ? "," + inputValue[1] : ",00";

      const formatter = new Intl.NumberFormat("ao-AO", {
        style: "currency",
        currency: "AKZ",
        maximumFractionDigits: 0,
        minimumFractionDigits: 0
      });

      return formatter.format(amount) + `${cents}`;
    }
  }

  gotoCreateCliente() {
    Router.goto("ClientForm");
  }
}
