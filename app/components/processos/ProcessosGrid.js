import { ViewComponent } from "../../@still/component/super/ViewComponent.js";

export class ProcessosGrid extends ViewComponent {

  /** @Prop */
  roles;

  /** @Prop */
  canCreateProcess = false;

  /** @Prop */
  isEmptyData = true;

  /** @Prop */
  isNotEmptyData = false;

  /** @Proxy @type { TabulatorComponent } */
  dataTableListProcessos;

  /** @Prop */
  dataTableLabels = [
    {
      hozAlign: "center",
      editRow: true,
      icon: "<i class='bi bi-pencil-square'></i>",
      width: 20,
    },
    {
      hozAlign: "center",
      deleteRow: true,
      icon: "<i class='bi bi-file-earmark-fill'></i>",
      width: 20,
    },
    { title: "Estado", field: "estado", sorter: "string", width: 100 },
    { title: "Progresso", field: "progress", sorter: "30", hozAlign: "left", formatter: "progress" },
    { title: "Referência", field: "ref", sorter: "string" },
    { title: "Assunto", field: "assunto", sorter: "string" },
    /*{ title: "Área", field: "area", sorter: "string" },*/
    { title: "Instituição", field: "instituicao", sorter: "string" },
    { title: "Modo Facturação", field: "modo_facturacao", sorter: "string" },
    { title: "Cliente", field: "cliente", sorter: "string" },
    { title: "Gestor", field: "gestor", sorter: "string" },
    { title: "Data Cadastro", field: "data_registo", sorter: "string" },
    /*{ title: "Data Suspensão", field: "data_suspensao", sorter: "string" },
    { title: "Data Encerramento", field: "data_encerramento", sorter: "string" },
     */
  ];


  template = `
  <main class="content p-4">
      <div class="container-fluid">

      <div class="d-flex flex-end">
        <nav style="--bs-breadcrumb-divider: url(&#34;data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Cpath d='M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z' fill='%236c757d'/%3E%3C/svg%3E&#34;);" aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="/">Dashboard</a></li>
            <li class="breadcrumb-item active" aria-current="page">Lista Processos</li>
          </ol>
        </nav>
      </div>


  <div class="">
      <div class="row">
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
          <div>
          <span 
          (renderIf)="self.canCreateProcess"
          >
          <button (click)="gotoView('ProcessoForm')" type="button" class="btn btn-primary m-t-15 waves-effect">
          <span style="display: flex;
                       gap: 10px;
                       align-items: center;"
          >
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
                  <h2><strong>Lista </strong>Geral dos Processos</h2>
                  <p style="font-size: 12px">Encontre aqui, todos os processos</p>
        <div class="row clearfix">
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">        
       
              <div class="card-body">
                <div  (showIf)="self.isNotEmptyData">
                  <div class="table-responsive">
                      <st-element component="@tabulator/TabulatorComponent" 
                          proxy="dataTableListProcessos"
                          tableHeader="parent.dataTableLabels" 
                          tableHeight="auto"
                          (onEditColumn)="editProcesso(fieldName, data)"
                          (onDeleteRow)="detalhesProcesso(fieldName, data)" (onCellClick)="cellClick(row, col, data)">
                      </st-element>
                  </div>
                </div>
                <div id="isEmptyDataId" (showIf)="self.isEmptyData">
                  <div class="alert alert-warning">
                    <p  style="color: #555"><strong>Atenção!</strong> Nenhum processo encontrado.</p>&nbsp;<a href="#" (click)="gotoView('ProcessoForm')">Crie aqui um</a>
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
    this.canCreateProcess = this.roles.includes('CAN_CREATE_PROCESS')
    console.log("on render canCreateProcess here ... ", this.canCreateProcess);
  }

  stAfterInit(val) {
    this.getRolesByLoggedUser()
    $still.HTTPClient.get("/api/v1/processo/").then(
      (r) => {
        if (r.data) {
          console.log("data here ... ", r.data)
          if (r.data.length === 0) {
            this.isNotEmptyData = false;
            this.isEmptyData = true;
          } else {
            this.isNotEmptyData = true;
            this.isEmptyData = false;
             document.getElementById('isEmptyDataId').style.display = 'none'
            this.dataTableListProcessos.dataSource = this.transformDataTable(r.data);
          }
          AppTemplate.hideLoading();
        } else {
          AppTemplate.hideLoading();
        }
      }
    ).catch(e => {
      AppTemplate.toast({ status: 'Erro', message: e })
      AppTemplate.hideLoading();
    })
  }


  transformDataTable(data) {

    function calculateDays(dataEncerramento) {
      if (dataEncerramento) {
        const inicio = new Date();
        const fim = new Date(dataEncerramento);
        const diferencaEmMilissegundos = fim - inicio;
        const milissegundosPorDia = 1000 * 60 * 60 * 24;
        const diferencaEmDias = diferencaEmMilissegundos / milissegundosPorDia;
        return Math.floor(diferencaEmDias) + 1;
      } else {
        return 100
      }
    }

    return data.map(item => {
      return {
        id: item.id,
        ref: item.ref,
        estado: item.estado,
        assunto: item.assunto,
        area: item.area,
        fase: item.fase,
        instituicao: item.instituicao,
        modo_facturacao: item.modo_facturacao,
        gestor: item.gestor,
        cliente: item.cliente,
        contra_parte: item.contra_parte,
        data_registo: item.data_registo ? new Date(item.data_registo).toLocaleDateString("PT") : item.data_registo,
        data_suspensao: item.data_suspensao ? new Date(item.data_suspensao).toLocaleDateString("PT") : item.data_suspensao,
        colaborador_id_suspendeu: item.colaborador_id_suspendeu,
        data_encerramento: item.data_encerramento ? new Date(item.data_encerramento).toLocaleDateString("PT") : item.data_encerramento,
        progress: 100 - calculateDays(item.data_encerramento)
      }
    })
  }

  detalhesProcesso(_, record) {

    const userLogged = JSON.parse(localStorage.getItem("_user"));
    if (userLogged.auth.roles.includes('CAN_SEE_PROCESS_DETAILS')) {
      Router.goto("ProcessoDetalhes", {
        data: record.id,
      });
    } else {
      console.log("sem permissao para ver detalhes do Processo ")
    }
  }

  editProcesso(_, record) {
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
