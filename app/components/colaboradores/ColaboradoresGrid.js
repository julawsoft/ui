import { ViewComponent } from "../../@still/component/super/ViewComponent.js";

export class ColaboradoresGrid extends ViewComponent {
  htmlRefId = "idDataTable";
  dataSource;

  /** 
 * @Proxy
 * @type { TabulatorComponent } 
 */
  dataTable;

  /** @Prop */
  dataTableLabels = [
    { hozAlign: "center", editRow: true, icon: "<i class='bi bi-pencil-square'></i>", width: 20 },
    { hozAlign: "center", deleteRow: false, icon: "<i class='fa fa-trash'></i>", width: 20 },
    { title: "Estado", field: "status", sorter: "string", width: 100 },
    { title: "Nome Profissional", field: "nome_profissional", sorter: "string" },
    { title: "Tipo Colaborador", field: "description", sorter: "string", width: 200 },
    /* { title: "Contacto", field: "contact_value", sorter: "string" },*/
  ];

  template = `
  <section class="content p-4">
    
  <div class="container-fluid">

  <div class="d-flex flex-end">
  <nav style="--bs-breadcrumb-divider: url(&#34;data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Cpath d='M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z' fill='%236c757d'/%3E%3C/svg%3E&#34;);" aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li class="breadcrumb-item"><a href="/">Dashboard</a></li>
      <li class="breadcrumb-item active" aria-current="page">Lista dos Colaboradores</li>
    </ol>
  </nav>
</div>

    <div class="card mb-4 p-2">        
      <div class="row">
        <div class="col-md-4">
            <button (click)="gotoView('ColaboradorForm')" type="button" class="btn btn-primary m-t-15 waves-effect">Novo</button>
        </div>
      </div>
    </div>

            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
               
                <div class="card">
                    <div class="card-header" 
                        style="display: flex;
                        justify-content: space-between;
                    ">
                        <h2>
                            <strong>Colaboradores</strong> registados
                        </h2>
                        <div style="cursor: pointer">
                            <!-- <span class="far fa-file-pdf"></span> -->                    
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="body table-responsive">
                          <st-element
                            component="@tabulator/TabulatorComponent"
                            proxy="dataTable"
                            tableHeader="parent.dataTableLabels"
                             tableHeight="auto"
                            (onEditColumn)="editColaborador(fieldName, data)"
                            (onDeleteRow)="deleteRow(fieldName, data)"
                            (onCellClick)="goToColaboradorDetalhes(row, col, data)"
                          >
                          </st-element>
            </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    `;

  constructor() {
    super();
    this.setup({});
  }

  async onRender() {
    AppTemplate.showLoading();
    /**
     * Isso quer dizer que o import do JQuery foi feito no index principal
     * ou no ficheiro de rotas em eagerImport
     */
    this.stRunOnFirstLoad(() => {
      $('.js-basic-example').DataTable({
        responsive: true
      });
    });

    /** For Test purpose only */
    await this.stLazyExecution(async () => { });
  }

  gotoView(viewComponent) {
    Router.goto(viewComponent);
  }

  goToColaboradorDetalhes(row, col, data) {
    console.log("<<<< <<<  ", data.id);

    Router.goto("ColaboradorDetalhes", {
      data: data.id
    });
  }

  makeColaboradorDTO(data) {


    let initialObjectColaborador = {
      idColaborador: null,
      nomeCompleto: null,
      nomeProfissional: null,
      funcao: null,
      dataNascimento: null,
      status: null,
      createdAt: null,
      tipoColaborador: null,
      identificacoes: [
        {
          code: null,
          descricao: null,
        }
      ],
      contactos: [
        {
          tipo: null,
          descricao: null,
        },
      ],
      custoFinanceiro: [
        {
          taxa_horaria: null,
        }
      ]

    }

    // this.dataSource = r.data;
    let colaboradorData = []

    for (let colaborador of data) {
      colaboradorData.push(
        {
          ...initialObjectColaborador,
          idColaborador: colaborador.id,
          nomeCompleto: colaborador.nome_completo,
          nomeProfissional: colaborador.nome_profissional,
          funcao: colaborador.funcao,
          dataNascimento: colaborador.data_nascimento,
          status: colaborador.status,
          createdAt: colaborador.created_at,
          tipoColaborador: colaborador.tipo.description,
          identificacoes:
            colaborador.identificacoes.map((item) => (
              {
                code: item.tipo.code,
                descricao: item.tipo.description
              })),
          contactos:
            colaborador.contactos.map((item) => (
              {
                tipo: item.type,
                descricao: item.descricao
              })),
          custoFinanceiro: colaborador.map((item) => (
            {
              taxa_horaria: item.taxa_horaria
            }))
        }
      )
    }

    this.dataSource = colaboradorData
    console.log(">>> <<< ", colaboradorData.contact_value)

  }

  editColaborador(f, row) {
    Router.goto('ColaboradorForm', { data: row });
  }

  gotoView(viewComponent) {
    Router.goto(viewComponent);
  }

  stAfterInit(val) {
    $still.HTTPClient.get("/api/v1/colaborador/").then(
      (r) => {
        AppTemplate.hideLoading();
        if (r.data) {
          console.log(r.data);
          this.dataTable.dataSource = r.data
          //this.makeColaboradorDTO(r.data);
        }
      }
    );
  }

  editClient(nif) {
    console.log(`Clicked client is: `, nif);

    const result = this.dataSource.value.filter((r) => r.nif == nif);
    Router.goto("ClientForm", {
      data: result[0],
    });
  }

  /*   makeColaboradorDTO(data) {
      let initialObjectColaborador = {
        idColaborador: null,
        nomeCompleto: null,
        nomeProfissional: null,
        funcao: null,
        dataNascimento: null,
        status: null,
        createdAt: null,
        tipoColaborador: null,
        identificacoes: [
          {
            code: null,
            descricao: null,
          },
        ],
        contactos: [
          {
            tipo: null,
            descricao: null,
          },
        ],
      };
  
      // this.dataSource = r.data;
      let colaboradorData = [];
  
      for (let colaborador of data) {
        colaboradorData.push({
          ...initialObjectColaborador,
          idColaborador: colaborador.id,
          nomeCompleto: colaborador.nome_completo,
          nomeProfissional: colaborador.nome_profissional,
          funcao: colaborador.funcao,
          dataNascimento: colaborador.data_nascimento,
          status: colaborador.status,
          createdAt: colaborador.created_at,
          tipoColaborador: colaborador.tipo.description,
          identificacoes: colaborador.identificacoes.map((item) => ({
            code: item.tipo.code,
            descricao: item.tipo.description,
          })),
          contactos: colaborador.contactos.map((item) => ({
            tipo: item.type,
            descricao: item.descricao,
          })),
        });
      }
  
      this.dataSource = colaboradorData;
      console.log(colaboradorData);
    } */

  /** For Test purpose only */
  /** @type { StEvent } */
  anyState = "This is the state value";
  runLocalFunc() {
    alert("Alert from the components itself" + this.anyState);
  }
}
