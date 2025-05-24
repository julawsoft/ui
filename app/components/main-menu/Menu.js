import { ViewComponent } from "../../@still/component/super/ViewComponent.js";
import { Router } from "../../@still/routing/router.js";

export class Menu extends ViewComponent {
  htmlRefId = "leftsidebar";

  userId;
  userName;
  userRole = "Admin";
  userFuncao;

  roles;
  /** @Prop */
  devProfile = false;

  /** @Prop */
  canSeeHomePage = false;
  /** @Prop */
  canCreateProcess = false;
  /** @Prop */
  canListProcess = false;
  /** @Prop */
  canListMineProcess = false;

  /** @Prop */
  canCreateClient = false;
  /** @Prop */
  canListClient = false;

  /** @Prop */
  canCreateColaborador = false;
  /** @Prop */
  canListColaborador = false;

  /** @Prop */
  canCreateDespesasr = true;
  /** @Prop */
  canListDespesas = true;

    /** @Prop */
    canCreateHonorarios = true;
    /** @Prop */
    canListHonorarios = true;

    /** @Prop */
    canListTimeSheet = true;
  /** @Prop */
  canCreateTimeSheet = true;

  template = `
  <div style="position:fixed; bottom:0; top:0; margin-top:59px; width: 280px;" class="w-280 d-flex flex-column flex-shrink-0 p-3 menu-bg-color">
  <ul class="list-unstyled ps-0">
    <li class="mb-1">
      <button class="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#home-collapse" aria-expanded="true">
        Home
      </button>
      <div class="collapse show" id="home-collapse">
        <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
          <li>
            <a href="/" class="link-dark rounded btn-menu-link">Dashboard</a>
          </li>
        </ul>
      </div>
    </li>
    <li class="mb-1">
      <button class="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#dashboard-collapse" aria-expanded="false">
        Processos
      </button>
      <div class="collapse" id="dashboard-collapse">
        <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
          <li (renderIf)="self.canCreateProcess">
            <a href="#" class="link-dark" (click)="gotoView('ProcessoForm')"> Criar </a>
          </li>
          <li (renderIf)="self.canListProcess">
            <a href="#" class="link-dark" (click)="gotoView('ProcessosGrid')"> Listar </a>
          </li>
          <li (renderIf)="self.canListMineProcess">
            <a href="#" class="link-dark" (click)="gotoView('ColaboradorDashboard')">Meus Processos </a>
          </li>  
        </ul>
      </div>
    </li>
    <li class="mb-1">
      <button class="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#clientes-collapse" aria-expanded="false">
        Clientes
      </button>
      <div class="collapse" id="clientes-collapse">
        <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
        <li (renderIf)="self.canCreateClient">
                  <a href="#" class="link-dark" (click)="gotoView('ClientForm')"> Cadastrar </a>
                </li>
                <li (renderIf)="self.canListClient">
                  <a href="#" class="link-dark" (click)="gotoView('ClientsGrid')"> Listar</a>
                </li>
                <li (renderIf)="self.isClient"><a href="#" class="link-dark" (click)="gotoViewClient('ClienteDetalhes')">Meus Processos </a></li>
            
        </ul>
      </div>
    </li>
    <li class="mb-1">
    <button class="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#colaboradores-collapse" aria-expanded="false">
     Colaboradores
    </button>
    <div class="collapse" id="colaboradores-collapse">
      <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
      <li (renderIf)="self.canCreateColaborador"><a href="#" class="link-dark" (click)="gotoView('ColaboradorForm')"> Cadastrar </a>
      </li>
      <li (renderIf)="self.canListColaborador"><a href="#" class="link-dark" (click)="gotoView('ColaboradoresGrid')"> Listar</a>
      </li>
          
      </ul>
    </div>
  </li>

  <li class="mb-1">
  <button class="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#timesheet-collapse" aria-expanded="false">
  TimeSheet
  </button>
  <div class="collapse" id="timesheet-collapse">
    <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
    <li (renderIf)="self.canCreateTimeSheet"><a href="#" class="link-dark" (click)="gotoView('TimesheetForm')"> Registar </a>
    </li>          
    <li (renderIf)="self.canListTimeSheet"><a href="#" class="link-dark" (click)="gotoView('TimesheetsGrid')"> Geral </a>
      </li>
      <li><a href="#" class="link-dark" (click)="gotoView('MeusTimesheetsGrid')"> Meus TimeSheets</a>
    </li>
    </ul>
  </div>
</li>

<li class="mb-1">
<button class="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#honorarios-collapse" aria-expanded="false">
Honorários
</button>
<div class="collapse" id="honorarios-collapse">
  <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
          <!-- 
            <li (renderIf)="self.canCreateHonorarios"><a href="#" class="link-dark" (click)="gotoView('HonorarioForm')"> Registar </a>
            </li> 
          -->
          <li (renderIf)="self.canListHonorarios"><a href="#" class="link-dark" (click)="gotoView('HonorariosGrid')"> Geral </a>
          </li>
          <li><a href="#" class="link-dark" (click)="gotoView('MeusHonorariosGrid')"> Meus Honorários</a>
          </li>
  </ul>
</div>
</li>

<li class="mb-1">
<button class="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#despesas-collapse" aria-expanded="false">
Despesas
</button>
<div class="collapse" id="despesas-collapse">
  <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
  <li (renderIf)="self.canCreateDespesasr"><a href="#" class="link-dark" (click)="gotoView('DespesasForm')"> Registar </a>
  </li>
  <li (renderIf)="self.canListDespesas"><a href="#" class="link-dark" (click)="gotoView('Despesas')"> Listar</a>
  </li>
  </ul>
</div>
</li>

    <!--
    <li class="border-top my-3"></li>
    <li class="mb-1">
      <button class="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#account-collapse" aria-expanded="false">
        Account
      </button>
      <div class="collapse" id="account-collapse">
        <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
          <li><a href="#" class="link-dark rounded">New...</a></li>
          <li><a href="#" class="link-dark rounded">Profile</a></li>
          <li><a href="#" class="link-dark rounded">Settings</a></li>
          <li><a href="#" class="link-dark rounded">Sign out</a></li>
        </ul>
      </div>
    </li>
    -->
  </ul>

</div>

    `;

  getRolesByLoggedUser() {
    try {
      const userLogged = JSON.parse(localStorage.getItem("_user"));

      this.userId = userLogged.id
      this.userFuncao = userLogged.funcao
      this.userName = userLogged.nome_completo;
      this.roles = userLogged.auth.roles;

    } catch (e) {
      console.log(e)
    }
  }

  stAfterInit(val) {
    setTimeout(() => Menu.propagateEventsIntoAllItemMenu(), 2000);
  }

  constructor() {
    super();
    this.setup({});
    this.getRolesByLoggedUser();
  }

  async onRender() {
    this.canCreateProcess = this.roles.includes('CAN_CREATE_PROCESS');
    this.canListProcess = this.roles.includes('CAN_SEE_PROCESS_LIST');

    this.canCreateClient = this.roles.includes('CAN_CREATE_CLIENT');
    this.canListClient = this.roles.includes('CAN_SEE_CLIENT_LIST');

    this.canCreateColaborador = this.roles.includes('CAN_CREATE_COLABORADOR');
    this.canListColaborador = this.roles.includes('CAN_SEE_COLABORADOR_LIST');

    this.canCreateHonorarios = this.roles.includes('CAN_CREATE_HONORARIOS');
    this.canListHonorarios = this.roles.includes('CAN_LIST_HONORARIOS');

    this.canListTimeSheet = this.roles.includes('CAN_LIST_TIMESHEET');
    this.canCreateTimeSheet = this.roles.includes('CAN_CREATE_TIMESHEET');

    if (this.userFuncao !== "cliente") {
      this.canSeeHomePage = true;
      this.canListMineProcess = true;
    } else {
      this.isClient = true
    }

  }

  gotoView(viewComponent) {
    Router.goto(viewComponent);
  }

  gotoViewClient(viewComponent) {
    Router.goto(viewComponent, { data: this.userId.value });
  }

  static propagateEventsIntoAllItemMenu() {
    const elms = document.querySelectorAll(".item-menu");

    elms.forEach(function (elm) {
      elm.addEventListener("click", (e) => {
        console.log(e);
        e.preventDefault();
        Menu.removeAllActiveClassIntoMenuLi();
        Menu.removeAllActiveClassIntoMenuLiA();

        console.log(elm.parentNode);
        console.log(elm.parentElement);
        elm.classList.add("active");

        try {
          elm.parentNode.classList.add("active");
        } catch (e) {
          console.log(e);
        }
      });
    });
  }

  static removeAllActiveClassIntoMenuLi() {
    const elms = document.querySelectorAll(".menu-item-julaw");
    elms.forEach(function (elm) {
      elm.classList.remove("active");
    });
  }

  static removeAllActiveClassIntoMenuLiA() {
    const elms = document.querySelectorAll(".item-menu");
    elms.forEach(function (elm) {
      elm.classList.remove("active");
    });
  }

}