import { ViewComponent } from "../../@still/component/super/ViewComponent.js";

export class ColaboradorDashboard extends ViewComponent {
  htmlRefId = "clientDataTable";
  dataSource;
  dataSourceTarefas;

  idTarefa;
  listTarefas;
  listProcessos;

  /** @Proxy @type { TabulatorComponent } */
  dataTable;

  /** @Proxy @type { TabulatorComponent } */
  dataTableTarefas;

  /** @Proxy @type { TUICalendarComponent } */
  agendaColaboradorProxy;

  /** @Inject @type { ProcessoService } */
  processoService;

  /** @Prop */
  isCreateTarefa = false;

  /** @Prop */
  isListTarefas = true;

  /** @type { STForm } */
  tarefaForm;


  /** @Prop */
  dataTableTarefasLabels = [
    {
      hozAlign: "center",
      editRow: true,
      icon: "<i class='bi bi-check-circle'></i>",
      width: 20,
    },
    {
      hozAlign: "center",
      deleteRow: true,
      icon: "<i class='bi bi-pencil-square'></i>",
      width: 20,
    },
    { title: "Estado", field: "estado", sorter: "string", width: 100 },
    { title: "Referência", field: "ref", sorter: "string" },
    { title: "Assunto", field: "assunto", sorter: "string" },
    { title: "Tarefa", field: "descricao", sorter: "string" },
    { title: "Data Para Realização", field: "data_para_realizacao", sorter: "string" },
    { title: "Data Realizada", field: "data_realizada", sorter: "string" },
    { title: "Data Aprovada", field: "data_aprovada", sorter: "string" },
    { title: "Realizador", field: "nome_completo", sorter: "string" },
    { title: "Gestor", field: "gestor", sorter: "string" },
    { title: "Data Criada", field: "data_criada", sorter: "string" },
  ];


  /** @Prop */
  dataTableLabels = [
    {
      hozAlign: "center",
      editRow: true,
      icon: "<i class='bi bi-calendar-week'></i>",
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
    { title: "Área", field: "area", sorter: "string" },
    { title: "Instituição", field: "instituicao", sorter: "string" },
    { title: "Modo Facturação", field: "modo_facturacao", sorter: "string" },
    { title: "Cliente", field: "cliente", sorter: "string" },
    { title: "Gestor", field: "gestor", sorter: "string" },
    { title: "Data Cadastro", field: "data_registo", sorter: "string" },
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


      <div class="card">
        <div class="card-header">
        <!-- Tab Navigation -->
        <ul class="nav nav-underline" id="myTab" role="tablist">
          <li class="nav-item" role="presentation">
            <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Meus Processos</button>
          </li>
          <li class="nav-item" role="presentation">
            <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Minha Agenda</button>
          </li>
          <li class="nav-item" role="presentation">
            <button class="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button" role="tab" aria-controls="contact" aria-selected="false">Minhas Tarefas</button>
          </li>
        </ul>
    </div>

    <div class="card-body">

    <!-- Tab Content -->
    <div class="tab-content" id="myTabContent">

      <!-- Meus Processos -->
      <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
          
            <div class="card mb-3 p-2">
            <div class="row">
            <div class="col-lg-3 col-sm-6">
            <div class="info-box7 l-bg-green order-info-box7">
              <div class="info-box7-block">
                <h4 class="m-b-20">Processos Rascunho</h4>
                <h2 class="text-right">
                <i class="bi bi-folder-plus"></i><span id="processosRascunho">0</span>
                </h2>
              </div>
            </div>
          </div>
      
          <div class="col-lg-3 col-sm-6">
            <div class="info-box7 l-bg-purple order-info-box7">
              <div class="info-box7-block">
                <h4 class="m-b-20">Processos Proposta</h4>
                <h2 class="text-right">
                <i class="bi bi-folder-plus"></i><span id="processosProposta">0</span>
                </h2>
              </div>
            </div>
          </div>
      
          <div class="col-lg-3 col-sm-6">
            <div class="info-box7 l-bg-orange order-info-box7">
              <div class="info-box7-block">
                <h4 class="m-b-20">Processos Suspenso</h4>
                <h2 class="text-right">
               <i class="bi bi-folder-plus"></i><span id="processosSuspenso">0</span>
                </h2>
              </div>
            </div>
          </div>
      
          <div class="col-lg-3 col-sm-6">
            <div class="info-box7 l-bg-cyan order-info-box7">
              <div class="info-box7-block">
                <h4 class="m-b-20">Processos Encerrado</h4>
                <h2 class="text-right">
               <i class="bi bi-folder-plus"></i><span id="processosEncerrado">0</span>
                </h2>
              </div>
            </div>
          </div>
          </div>
            </div>



            <div class="card">
              <div class="card-header">
              <div class="header">
              <h2><strong>Meus </strong>Processos</h2>
              <p style="font-size: 12px">Encontre aqui, os processos que foram partilhados consigo</p>
            </div>
              </div>

              <div class="card-body">

              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <div class="card">
              
                <div class="table-responsive">
        
                  <st-element
                    component="@tabulator/TabulatorComponent"
                    proxy="dataTable"
                    tableHeader="parent.dataTableLabels"
                    (onEditColumn)="getTimeSheetProcesso(fieldName, data)"
                    (onDeleteRow)="getDetailsProcesso(fieldName, data)"
                    (onCellClick)="detalheProcesso(row, col, data)"
                  >
                  </st-element>
                  
                </div>
        
              </div>
            </div>
              </div>
            </div>







    
      </div>
    <!-- #Meus Processos -->

    <!-- Minha Agenda -->
    <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
       
      <div class="p-1">  
        <st-element
        component="@toast-ui/calendar/TUICalendarComponent"
        milestoneTitle="Objectivo"
        proxy="agendaColaboradorProxy"

        (onEventCreate)="saveEvent()"
        editLabel="Editar"
        (onEventUpdate)="updateEvent()"
        (onEventDeletion)="deleteEvent()"
        >  
      </st-element>
    </div>

  </div>
    <!-- #Minage Agenda -->


    <!-- Minhas Tarefas -->
    <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
        
    <div 
    style="background: #fff;
    padding: 10px;">
  
    <div class="d-none"  id="form_tab_tarefas" (showIf)="self.isCreateTarefa"> 
    
      <!-- inicio form add tarefas -->
      <div class="form_add_resources">
      <form id="wizard_with_validatio" (formRef)="tarefaForm" class="" onsubmit="javascript: return false;">
  
        <div class="row clearfix ">
  
            <div class="col-md-4">
                <label> Processos à Associar</label>
                <select 
                  class="form-control"
                    (required)="true"
                    id="processoInput" 
                    (change)="updatePrecedentes($event)" 
                    (forEach)="listProcessos">
                    <option each="item" value="">Selecione uma opção</option>
                    <option each="item" value="{item.id}">{item.descricao}</option>
                </select>
            </div>

            <div class="col-md-4">
                <label> Descrição da Tarefa </label>
                      <input 
                        class="form-control"
                        (required)="true"
                        (value)="valueInputTarefa" 
                        placeholder="Digite uma tarefa" 
                        type="text" 
                        id="input_form_tarefa" 
                      />
            </div>
          
            <div class="col-md-4">
              <label> Data para execução </label>
                    <input 
                      class="form-control"
                      (required)="true"
                      type="date" 
                      id="valueRealizacaoTarefa" 
                      (change)="updateDataTarefa($event)" 
                      class="form-control date" 
                      (value)="valueRealizacaoTarefa"
                    >
          </div>
  
          </div>
  
          <div 
          class="card-footer mt-4" 
          style="display: flex;
              justify-content: end;
              align-items: center;"
          >
          <button class="btn btn-success julaw-submit-button" type="submit"   (click)="saveOrUpdateTarefas()">
            Guardar
            <i class="bi bi-floppy-fill"></i>
          </button>
        </div>
      </form>
    </div>
  
    </div>
  

    <div class="mt-4" (showIf)="self.isListTarefas">
                      
    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
  
      <div class="card p-2 mb-2">
        <div class="row">
            <div class="col-md-4">
            <button 
              (click)="showHiddenFormTarefa()"
              class="btn btn-primary m-t-15 waves-effect">
              Nova Tarefa
            </button>
          </div>
        </div>
      </div>
  
    <div class="card">
      <div class="card-header">
        <h2><strong>Tuas </strong>Tarefas</h2>
        <p style="font-size: 12px">Encontre aqui, as tarefas que foram criadas e partilhadas consigo</p>
      </div>
      <div class="card-body table-responsive">  
        <st-element
          component="@tabulator/TabulatorComponent"
          proxy="dataTableTarefas"
          tableHeader="parent.dataTableTarefasLabels"
          (onEditColumn)="aprovarTarefa(fieldName, data)"
          (onDeleteRow)="editarTarefa(fieldName, data)"
        >
        </st-element>
        
      </div>
    </div>
  </div>
  
  
  
    </div>
  </div>


    </div>
  
  </div>

</div>

    </div>

    <!-- #Minhas Tarefas -->

  <style>

    #dashoboardMinhaAgenda, #dashoboardMeusProcessos {
      background: none !important;
    }

    #dashoboardMinhaAgenda  .toastui-calendar-section-button {
      display: none;
    }

    #dashoboardMinhaAgenda  .toastui-calendar-section-detail {
      display: none;
    }

    .dashoboardMinhaAgenda .toastui-calendar-popup-container {
      top: 50% !important;
      left: 25% !important;
    }

  </style>

</section>
    `;

  constructor() {
    super();
    this.setup({});
  }

  showHiddenFormTarefa() {
    this.idTarefa = ''
    this.isCreateTarefa = !this.isCreateTarefa;
    this.isListTarefas = !this.isListTarefas;

    let form = document.getElementById('form_tab_tarefas')
    form.classList.toggle("showForm")

  }

  async saveOrUpdateTarefas() {

    let processoId = document.getElementById('processoInput').value;
    let tarefas = document.getElementById('input_form_tarefa').value;
    let dataRealizacao = document.getElementById('valueRealizacaoTarefa').value;

    const userLogged = JSON.parse(localStorage.getItem("_user"));

    const saveForm =
    {
      "processoId": processoId,
      "colaboradorId": userLogged.id,
      "descricao": tarefas,
      "dataParaRealizacao": dataRealizacao
    }

    const isValidForm = this.tarefaForm.validate();

    if (isValidForm) {

      try {

        let response;
        AppTemplate.showLoading();

        if (this.idTarefa.value == '') {
          response = await this.processoService.createTarefa(saveForm)
          console.log("save tarefea response ", response);

        } else {
          response = await this.processoService.updateTarefa(this.idTarefa.value, saveForm)
          console.log("update tarefea response", response);
          this.idTarefa = ''
        }

        this.getAllTarefasByColaboradorId(userLogged.id)
        this.showHiddenFormTarefa();

        AppTemplate.hideLoading();
        AppTemplate.toast({ status: 'success', message: 'Sucesso' })
      } catch (e) {
        AppTemplate.hideLoading();
        console.log("Error on saveOrUpdateTarefas", e);
        AppTemplate.toast({ status: 'warning', message: e })
      }

    } else {
      AppTemplate.toast({ status: 'warning', message: 'Por favor, preencha os campos obrigatórios' })
    }

  }

  gotoView(viewComponent) {
    Router.goto(viewComponent);
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

  makeListProcessos(data) {
    let processoData = [];

    for (let processo of data) {
      processoData.push({
        id: processo.id,
        descricao: processo.ref,
      });
    }

    this.listProcessos = processoData

  }

  async getAllTarefasByColaboradorId(colaboradorId) {
    let listTask = await this.processoService.getAllTarefasByColaboradorId(colaboradorId)
    console.log("listTask", listTask)
    this.transformDataTableTarefas(listTask);
  }

  async stAfterInit(val) {

    const userLogged = JSON.parse(localStorage.getItem('_user'));
    const service = this.processoService;

    if (userLogged) {

      try {
        //AppTemplate.showLoading();
        const processosByColaborador = await service.getProcessoByColaborador(userLogged.id);
        await this.getAllTarefasByColaboradorId(userLogged.id);
        // let listTarefas = await service.getAllTarefasByColaboradorId(userLogged.id);
        //this.transformDataTableTarefas(listTarefas);
        this.makeListProcessos(processosByColaborador)

        this.dataTable.dataSource = this.transformDataTable(processosByColaborador);
        this.populateCards(processosByColaborador);

        const tasksData = await service.getTarefaByColaboradorId();

        AppTemplate.hideLoading();
        this.pushDataToCalendar(tasksData);

      } catch (error) {
        AppTemplate.hideLoading();
      }

    }
  }

  transformDataTableTarefas(data) {

    console.log("data >>>> ", data)
    this.dataTableTarefas.dataSource = data;

  }

  pushDataToCalendar(tasksData) {

    const tasks = tasksData.map((item) => {

      const start = new Date(item.data_para_realizacao);
      start.setHours(new Date().getHours());
      const end = new Date(item.data_para_realizacao);
      end.setHours(new Date().getHours() + 2);

      return {
        id: item.id,
        calendarId: 'entrevista',
        title: item.descricao,
        start, end
      };

    });

    this.agendaColaboradorProxy.on('load', () => {
      this.agendaColaboradorProxy.addNewEvents(tasks);
    });

  }

  populateCards(data) {
    let rascunho = data.filter((item) => item.estado === 'Rascunho')
    this._('processosRascunho', rascunho.length)

    let proposta = data.filter((item) => item.estado === 'Proposta')
    this._('processosProposta', proposta.length)

    let suspenso = data.filter((item) => item.estado === 'Suspenso')
    this._('processosSuspenso', suspenso.length)

    let enderrado = data.filter((item) => item.estado === 'Encerrado')
    this._('processosEncerrado', enderrado.length)
  }

  _(id, valor) {
    document.getElementById(id).innerHTML = valor
  }

  getDetailsProcesso(_, record) {

    const userLogged = JSON.parse(localStorage.getItem("_user"));

    if (userLogged.auth.roles.includes('CAN_SEE_PROCESS_DETAILS')) {
      Router.goto("ProcessoDetalhes", {
        data: record.id,
      });
    } else {
      console.log("sem permissao para ver detalhes do Processo ")
    }

  }
  getTimeSheetProcesso(_, record) {
    Router.goto("ProcessoTimeSheet", {
      data: record.id,
    });
  }

  cellClick(row, col, _) {
    console.log(`Cliecked on: `, {
      row,
      col,
      _,
    });
  }

  gotoView(viewComponent) {
    Router.goto(viewComponent);
  }


  editarTarefa(_, data) {

    console.log("editar tarefa ", data)

    if (data.estado == "Aprovada") {
      AppTemplate.toast({ status: 'Error', message: 'Não pode alterar tarefa já Aprovada' })
      this.idTarefa = ''
    } else {

      const [dia, mes, ano] = data.data_para_realizacao.split('/')
      this.showHiddenFormTarefa()

      document.getElementById('processoInput').value = data.processo_id;
      document.getElementById('input_form_tarefa').value = data.descricao;
      document.getElementById('valueRealizacaoTarefa').value = `${ano}-${mes}-${dia}`
      this.idTarefa = data.id
    }

    console.log("this.idTarefa = " + this.idTarefa)

  }

  aprovarTarefa(fieldName, record) {

    const userLogged = JSON.parse(localStorage.getItem("_user"));


    if (record.estado == "Aprovada") {
      return AppTemplate.toast({ status: 'Alerta', message: 'Esta tarefa já foi aprovada' })
    }

    let payload = {
      "status": 1,
      "colaboradorId": userLogged.id
    }

    AppTemplate.showLoading();

    $still.HTTPClient.put(
      `/api/v1/tarefas_processo/colaborador/${record.id}`,
      JSON.stringify(payload),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {

        if (response.status !== 200) {
          AppTemplate.hideLoading();
          AppTemplate.toast({ status: 'Erro', message: response.message })

        } else {

          AppTemplate.toast({ status: 'Sucesso', message: 'Tarefa realizada com sucesso' })
          // this.getDetalhesProcesso(this.id.value)

          AppTemplate.hideLoading();
          setTimeout(() => {
            this.dataTableListProcessosTarefas.updateRow(
              {
                ...response.data[0]
              },
              'id',
              record.id
            );
          }, 1000)

        }
      })
      .catch((err) => {
        AppTemplate.hideLoading();
        AppTemplate.toast({ status: 'Erro', message: err })
      });



  }



  async saveEvent(data) {

    /* if (this.userLoggedIn.value.id === "")
       alert("Nenhum Colaborador definido.")
 
     let horasCalculadas = (data.end.d.d - data.start.d.d) / 3600000
 
     let payload = {
       tipoEventoId: data.calendarId = 'entrevista' ? 1 : 2,
       processoId: parseInt(this.processoId.value),
       descricao: data.title,
       dadosImportantes: JSON.stringify(data),
       dataInicio: data.start.d.d,
       dataFim: data.end.d.d,
       horas: horasCalculadas.toFixed(2),
       colaboradorId: this.userLoggedIn.value.id
     };
 
     let response = await $still.HTTPClient.post(
       "http://localhost:3000/api/v1/processo_time_sheets",
       JSON.stringify(payload),
       {
         headers: {
           "Content-Type": "application/json",
         },
       }
     );
 
     if (response.status !== 201) {
       return false
     } else {
 
       // const eventData = {
       //   ...data,
       //   start: data.start.d.d,
       //   end: data.end.d.d,
       // };
 
       // console.log(">>>> ", this.calendarProxy)
 
       // this.calendarProxy.on('load', () => {
       //   this.calendarProxy.addNewEvents(eventData);
       // });
 
       //this.calendarProxy.addNewEvents(eventData);
       //this.init()
       this.updateHorasColaborador(true, horasCalculadas)
       return true
     }
 
     */

  }

}
