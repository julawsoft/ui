import { ViewComponent } from "../../@still/component/super/ViewComponent.js";

export class MeusHonorariosGrid extends ViewComponent {

  timeSheetList;

  /** @Prop */
  roles;

  /** @Prop */
  canCreateProcess = false;

  /** @Prop */
  isEmptyData = true;

  /** @Prop */
  isNotEmptyData = false;

  /** @Proxy @type { TabulatorComponent } */
  dataTableListHonorarios;

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
    { title: "#", field: "id", sorter: "string", width: 20 },
    /*{ title: "Processo Ref.", field: "processo", sorter: "30", hozAlign: "left", formatter: "progress" },*/
    { title: "Estado", field: "estado", sorter: "string" },
    { title: "Hora(s) / Hora Mês", field: "hora", sorter: "string" },
    { title: "Custo / Custo Total", field: "custo", sorter: "string" },
    { title: "Data Registo", field: "data_registo", sorter: "string" },
    { title: "Processo", field: "processo", sorter: "string" },
    { title: "Cliente", field: "cliente", sorter: "string" },
    { title: "Colaborador", field: "colaborador", sorter: "string" }
  ];

  /** @Inject @type { ProcessoService } */
  processoService;


  template = `
  <main class="content p-4">
      <div class="container-fluid">

      <div class="d-flex flex-end">
        <nav style="--bs-breadcrumb-divider: url(&#34;data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Cpath d='M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z' fill='%236c757d'/%3E%3C/svg%3E&#34;);" aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="#">Home</a></li>
            <li class="breadcrumb-item active" aria-current="page">Library</li>
          </ol>
        </nav>
      </div>

    <div class="">
      <div class="row">
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
          <div>
          <span 
          (renderIf)="self.canCreateTimeSheet"
          >
          <button (click)="gotoView('TimeSheetForm')" type="button" class="btn btn-primary m-t-15 waves-effect">
          <span style="display: flex;
                       gap: 10px;
                       align-items: center;"
          >
          <i class="material-icons">create_new_folder</i>
            Novo
          </span>
          </button>
      </span>   
           
          </div>
      </div>
  </div>



  <div class="row clearfix mt-4">
      <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <div class="card p-2 mb-2">
          <h6>Para os filtros</h6>    
        </div>
      </div>

      <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div class="card">
              <div class="card-header">
                  <h2><strong>Lista </strong>Geral dos TimeSheets</h2>
                  <p style="font-size: 12px">Encontre aqui, todos os timesheets registados</p>
        <div class="row clearfix">
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">        
       
              <div class="card-body">
                <div  (showIf)="self.isNotEmptyData">
                  <div class="table-responsive">
                      <st-element component="@tabulator/TabulatorComponent" 
                          proxy="dataTableListHonorarios"
                          tableHeader="parent.dataTableLabels" 
                          tableHeight="auto"
                          (onEditColumn)="editTimeSheet(fieldName, data)"
                          (onDeleteRow)="detalhesTimeSheet(fieldName, data)" (onCellClick)="cellClick(row, col, data)">
                      </st-element>
                  </div>
                </div>
                <div id="isEmptyDataId" (showIf)="self.isEmptyData">
                <br/><br/>
                  <div class="alert alert-warning">
                    <p  style="color: #555"><strong>Atenção!</strong> Nenhum timesheet encontrado.</p>&nbsp;<a href="#" (click)="gotoView('TimeSheetForm')">Crie aqui um</a>
                  </div>
                </div>
              </div>
          </div>
      </div>
  </div>
</div>
</div>
</main>
    `;

  constructor() {
    super();
    this.setup({});
  }

  gotoView(viewComponent) {
    Router.goto(viewComponent);
  }

  getRolesByLoggedUser() {
    try {
      const userLogged = JSON.parse(localStorage.getItem("_user"));
      this.roles = userLogged.auth.roles
    } catch (e) {
      console.log(e)
    }
  }

  onRender() {
    AppTemplate.showLoading();
    this.getRolesByLoggedUser()
    // this.canCreateProcess = this.roles.includes('CAN_CREATE_PROCESS')
    // console.log("on render canCreateProcess here ... ", this.canCreateProcess);
  }

  async stAfterInit(val) {
    this.getRolesByLoggedUser()
    const userLogged = JSON.parse(localStorage.getItem("_user"));
  let resposeData  = await this.processoService.getHonorariosByColaboradorId(userLogged.id);
    AppTemplate.hideLoading();
    if(resposeData.length > 0) {
        this.isEmptyData = false;
        this.isNotEmptyData = true;
           document.getElementById('isEmptyDataId').style.display = 'none'
    }else{
        this.isEmptyData = true;
        this.isNotEmptyData = false;
    }

    console.log("resposeData", resposeData);
    console.log("resposeData", resposeData.length);

    this.transformDataTable(resposeData);
  }


  transformDataTable(data) {
    this.dataTableListHonorarios.dataSource = data.map((item, index) => {
      return {
        id: index + 1,
        estado: item.status,
        hora: item.horas ?? item.horas_mes,
        custo: item.custo,
        data_registo: item.data_registo ? new Date(item.data_registo).toLocaleString("PT") : item.data_registo,
        processo: item.ref,
        cliente: item.cliente ?? 'N/A',
        colaborador: item.colaborador
      }
    })
  }

  detalhesTimeSheet(_, record) {

    const userLogged = JSON.parse(localStorage.getItem("_user"));
    if (userLogged.auth.roles.includes('CAN_SEE_PROCESS_DETAILS')) {
      Router.goto("ProcessoDetalhes", {
        data: record.id,
      });
    } else {
      console.log("sem permissao para ver detalhes do Processo ")
    }
  }

  editTimeSheet(_, record) {
    Router.goto("ProcessoForm", {
      data: record.id,
    });
  }

  cellClick(row, col, data) {
    Router.goto("ProcessoDetalhes", {
      data: data.id,
    });
  }

}
