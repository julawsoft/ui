import { ViewComponent } from "../../@still/component/super/ViewComponent.js";

export class TimesheetForm extends ViewComponent {

  id;
  referencia;
  assunto;
  dadosImportantes;
  modo_facturacao;
  cliente;
  tipoCliente;
  gestor;
  processoId;
  userLoggedIn;

  clienteId;

  listColaboradores;
  listPrecedentes;


  /** @Proxy @type { TUICalendarComponent } */
  calendarRegisterTimeSheetProxy;

  template = `  <section class="content p-4">
    
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
        <h2>Registo das Actividades</h2>
        <p style="font-size: 12px">Cadastre aqui uma intervenções no Processo</p>
    </div>



    <div class="row">
        <div class="col-3">
            <div class="card">
              <div class="card-header">Detalhes</div>
              <div class="card-body">
              <div id="mail-nav">
    
                <div style="margin-bottom: 5px">
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
    
                <div style="margin-bottom: 5px">
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

            <div class="card-footer">
              <div style="margin-bottom: 5px">
                <div style="font-weight: bold;">Colaborador</div>
                 <div>
                  <span id="colaboradorInputId"></span>
                  <p style="font-size: 12px" id="colaboradorInputFuncao"></p>
                </div>
              </div>

              <div style="margin-bottom: 5px">
                <div style="font-weight: bold;">Total de Horas</div>
                  <div>
                     <i class="bi bi-clock"></i></i> <span id="horasInputId"> 0 </span> horas
                  </div>
                </div>
              </div>
            </div>

      </div>

        
        <div class="col-9">
          <div class="card">
            <div class="card-header"></div>
            <div class="card-body">
              <div style="positon: relative">
                <st-element
                  component="@toast-ui/calendar/TUICalendarComponent"
                  (onEventCreate)="saveRegisterTimeSheetEvent()"
                  editLabel="Editar"
                  milestoneTitle="Objectivo"
                  (onEventUpdate)="updateEvent()"
                  (onEventDeletion)="deleteEvent()"
                  proxy="calendarRegisterTimeSheetProxy"
                >
                </st-element> 
              </div>
            
            </div>
            <div class="card-footer"></div>
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

  gotoView(viewComponent) {
    Router.goto(viewComponent);
  }

  populateCalendarDTO(data) {

    let totalHours = 0;
    // horasInputId

    if (data) {
      this.calendarRegisterTimeSheetProxy.addNewEvents(
        data.map((item) => {
          console.log(item);
          totalHours += parseFloat(item.horas)
          return {
            id: item.id,
            calendarId: item.tipo_evento,
            title: item.descricao,
            start: item.data_inicio,
            end: item.data_fim,
          };
        })
      );
    }
    document.getElementById('horasInputId').innerHTML = totalHours;
  }

  async init() {

    this.userLoggedIn
    this.processoId

    $still.HTTPClient.get(
      `/api/v1/processo_time_sheets/${this.processoId.value}/${this.userLoggedIn.value.id}`
    ).then((r) => {
      if (r.status === 200) {
        try {
          console.log(r.data)
          this.populateCalendarDTO(r.data);
        } catch (e) {
          console.log("fn populates attributes", e);
        }
      }
    });

    $still.HTTPClient.get(
      `/api/v1/processo/${this.processoId.value}`
    ).then((r) => {
      if (r.status === 200) {
        try {
          this.populateAttributes(r.data[0]);
          // this.populateCalendarDTO(r.data);
        } catch (e) {
          console.log("fn populates attributes", e);
        }
      }
    });

  }

  stAfterInit(val) {

    try {

      this.userLoggedIn = JSON.parse(localStorage.getItem("_user"));
      console.log(this.userLoggedIn);

      this.getListPrecedentes()
      this.getListColaboradores()

      document.getElementById('colaboradorInputId').innerHTML = this.userLoggedIn.value.nome_completo;
      document.getElementById('colaboradorInputFuncao').innerHTML = this.userLoggedIn.value.tipo.description;

      const routeData = Router.data("ProcessoTimeSheet");
      this.processoId = routeData

      // this.init()
    } catch (e) {
      console.log("fn populates attributes", e);
    }

  }

  populateAttributes(data) {
    try {
      this.referencia = data.ref
        ? data.ref
        : "";
      this.assunto = data.assunto ? data.assunto : "";
      this.cliente = data.cliente ? data.cliente : "";
      this.tipoCliente = data.tipo_cliente ? data.tipo_cliente : "";
      this.gestor = data.colaborador ? data.colaborador : "";
      this.modo_facturacao = data.modo_facturacao
        ? data.modo_facturacao
        : "";

      /** details */
      this.setValueById("input_referencia", this.referencia.value);
      this.setValueById("input_assunto", this.assunto.value);
      this.setValueById("input_modo_facturacao", this.modo_facturacao.value);
      this.setValueById("input_cliente", this.cliente.value);
      this.setValueById("input_gestor", this.gestor.value);
    } catch (e) {
      console.log(e);
    }
  }

  async saveRegisterTimeSheetEvent(data) {

    if (this.userLoggedIn.value.id === "")
      alert("Nenhum Colaborador definido.")


    console.log(">>>> processo >>> ", parseInt(this.processoId.value))
    console.log(">>>> cliente >>> ", parseInt(this.clienteId.value))


    let horasCalculadas = (data.end.d.d - data.start.d.d) / 3600000

    let payload = {
      tipoEventoId: data.calendarId = 'entrevista' ? 1 : 2,
      processoId: 2  ,//parseInt(this.processoId.value),   para  testes
      clienteId: null,
      descricao: data.title,
      dadosImportantes: JSON.stringify(data),
      dataInicio: data.start.d.d,
      dataFim: data.end.d.d,
      horas: horasCalculadas.toFixed(2),
      colaboradorId: this.userLoggedIn.value.id
    };

    console.log("payload a ser enviada" , payload)
    AppTemplate.showLoading();

    let response = await $still.HTTPClient.post(
      "/api/v1/processo_time_sheets",
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

      this.updateHorasColaborador(true, horasCalculadas)
      setTimeout(() => {
        
        AppTemplate.hideLoading();
        AppTemplate.toast({ status: 'Sucesso', message: 'TimeSheet salvo com sucesso!' })
        Router.goto("MeusTimesheetsGrid", {
            data: [],
        });

      }, 2000)

      return true
    }

  }

  updateHorasColaborador(isPlus, time) {

    let currentTime = eval(document.getElementById('horasInputId').innerHTML)
    let calculateTime = isPlus ? currentTime + time : currentTime - time
    document.getElementById('horasInputId').innerHTML = calculateTime

  }

  async updateEvent(evt, changes) {

    if (!changes)
      return true;

    if (evt.id === "")
      alert("Evento sem ID")

    let startDate = changes.start ? changes.start.d.d : evt.start.d.d
    let endDate = changes.end ? changes.end.d.d : evt.end.d.d
    let tipoEventoId = changes.calendarId ? changes.calendarId : evt.calendarId
    let horasCalculadas = (endDate - startDate) / 3600000
    let horasCalculadasEvt = (evt.end.d.d - evt.start.d.d) / 3600000

    let isChanged = false
    let isPlus = false
    let horasPlus = 0

    if (horasCalculadas == horasCalculadasEvt) {
      isChanged = false
    }

    if (horasCalculadas > horasCalculadasEvt) {
      isChanged = true
      isPlus = true
      horasPlus = horasCalculadas - horasCalculadasEvt
    }

    if (horasCalculadas < horasCalculadasEvt) {
      isChanged = true
      isPlus = false
      horasPlus = horasCalculadasEvt - horasCalculadas
    }

    let payload = {
      tipoEventoId: tipoEventoId = 'entrevista' ? 1 : 2,
      descricao: changes.title ?? evt.descricao,
      dadosImportantes: JSON.stringify(evt, changes),
      dataInicio: startDate,
      dataFim: endDate,
      horas: horasCalculadas.toFixed(2),
    };

    let response = await $still.HTTPClient.put(
      `/api/v1/processo_time_sheets/${evt.id}`,
      JSON.stringify(payload),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )

    console.log("save response", response);

    if (response.status !== 200) {
      console.log(response.errors);
      return false
    } else {
      console.log("Alterações feita com sucesso");
      //this.calendarRegisterTimeSheetProxy.clearGrid()
      //this.init()
      if (isChanged)
        this.updateHorasColaborador(isPlus, horasPlus)
      return true
    }

  }

  async deleteEvent(evt) {

    if (evt.id === undefined) return false;

    let startDate = evt.start.d.d
    let endDate = evt.end.d.d
    let horasCalculadas = (endDate - startDate) / 3600000

    let response = await $still.HTTPClient.delete(
      `/api/v1/processo_time_sheets/${evt.id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )

    if (response.status !== 200) {
      console.log(response.errors);
      return false
    } else {
      console.log("Alterações feita com sucesso");
      this.updateHorasColaborador(false, horasCalculadas)
      return true
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

  setValueById(id, value) {
    console.log(id, value);
    document.getElementById(id).value = value;
  }

  getValueById(id) {
    return document.getElementById(id).value;
  }

}
