import { ViewComponent } from "../../@still/component/super/ViewComponent.js";

export class ClientsGrid extends ViewComponent {

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
    { hozAlign: "center", editRow: true, icon: "<i class='bi bi-pencil-square'></i>", width: 20 },
    /*{ hozAlign: "center", deleteRow: true, icon: "<i class='fa fa-trash'></i>", width: 20 },*/
    { title: "Tipo Cliente", field: "tipo", sorter: "string", width: 200 },
    { title: "Nome", field: "denominacao", sorter: "string" },
    { title: "NIF", field: "nif", sorter: "string" },
    { title: "Endereco", field: "endereco", sorter: "string" },
    { title: "Telefone", field: "pessoa_contacto", sorter: "string" },
    { title: "Telefone Cobrança", field: "contacto_cobranca", sorter: "string" }
  ];


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


        <div class="card mb-4 p-2">        
            <div class="row">
              <!--
              <div class="col-md-4">
                <label>Cliente</label>
                <select
                class="form-control"
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
              -->

              <div class="col-md-4">
              <label>Tipo de Empresa</label>

              <select
              (required)="false"
              class="form-control"
              (value)="clientType"
              (change)="changeEmpresaFiltro($event)" 
              (forEach)="clientType"
              id="tipoEmpresaId"
              >                     
              <option each="item" value="">Selecione uma opção</option>
              <option each="item" value="{item.id}">{item.value}</option>
          </select>

            </div> 
           
            <div class="col-md-2" style="display: flex;
              justify-content: center;
              align-items: center;
              margin-top: 20px;">
              <button class="btn btn-primary" type="submit" (click)="getEmpresasFilter()">
                Filtrar
                <i class="bi bi-funnel"></i>
              </button>       
            </div>
          </div>
        </div>



        <div class="card">
            <div class="card-header">
            <h2><strong>Cliente </strong>Registados</h2>

        <div class="card-body">
            <div (showIf)="self.isNotEmptyData">
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
            <div id="isEmptyDataId" (showIf)="self.isEmptyData">
                <div class="alert alert-warning">
                  <p  style="color: #555"><strong>Atenção!</strong> Nenhum cliente encontrado.</p>&nbsp;<a href="#" (click)="gotoView('ClientForm')">Crie aqui um</a>
                </div>
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

  console.log("tipo empresa" , this.isEmptyData)


    $still.HTTPClient.get("/api/v1/cliente/").then((r) => {
      try {
        let dataResponse = r.data;
        if (dataResponse.length > 0) {
          this.isNotEmptyData = true;
          this.isEmptyData = false;

          document.getElementById('isEmptyDataId').style.display = 'none'

          let clieteDTO = dataResponse.map((item) => {
            return {
              id: item.id,
              denominacao: item.denominacao,
              nif: item.nif,
              endereco: item.endereco,
              pessoa_contacto: item.pessoa_contacto,
              contacto_cobranca: item.contacto_cobranca,
              tipo: item.tipo.description,
              tipo_id: item.tipo ? item.tipo.id : '-',
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
