import { ViewComponent } from "../../@still/component/super/ViewComponent.js";

export class TopNavBar extends ViewComponent {

    htmlRefId = "topNavBar";
    totalNotifications = 0;

    /**
     * @Inject
     * @type { ProcessoService } }
     */
    processoService;

    template = `
                    <!-- Navbar / Header -->
  <nav class="navbar navbar-expand-lg sticky-top shadow-sm ml-280" style="background-color:#12356f;" >
  <div class="container-fluid">
    <button class="btn btn-outline-secondary d-lg-none me-2" type="button" data-bs-toggle="offcanvas" data-bs-target="#sidebar" aria-controls="sidebar">
      <i class="bi bi-list"></i>
    </button>
    <a class="navbar-brand" href="#">
    <img 
    src="assets/images/julaw-logo.png" 
    style="width: 42px;"
    alt="" 
    />
    JULAW - SOFT
    </a>
    <div class="ms-auto d-flex align-items-center gap-3">
    
    <div class="dropdown">
        <a href="#" class="d-flex align-items-left text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bell" viewBox="0 0 16 16">
        <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6"/>
        </svg>
        </a>
        
        <ul style="left: -100px; padding:10px" class="dropdown-menu dropdown-menu-light text-small shadow">
        <li class="header">NOTIFICAÇÕES</li>
        <li class="body" style="width: 100%; margin-bottom: 20px" id="toMenuBarListaNotification">
        </li>
        <li class="footer">
            <a href="#" (click)="gotoView('UserNotification')">Ver todas as Notificações</a>
        </li>
            
        </ul>
    </div>
  
    <div class="dropdown">
    <a href="#" class="d-flex align-items-left text-white text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
      <img src="assets/images/user.jpg" alt="" width="32" height="32" class="rounded-circle me-2">
    </a>
    <ul style="left: -100px" class="dropdown-menu dropdown-menu-light text-small shadow">
      <li>
        <a class="dropdown-item" href="#" (click)="gotoView('UserProfile')">
          Teu Perfil
        </a>
      </li>
      <li><hr class="dropdown-divider"></li>
      <li><a class="dropdown-item" (click)="logout()" href="#">Sair</a></li>
    </ul>
  </div>
    </div>
  </div>
</nav>
    `;


    async stAfterInit() {
        this.processoService.on('load', async () => {
            const notifications = await this.processoService.getTarefaByColaboradorId();
            this.parseAndDisplayNotifications(notifications);
        });
    }

    parseAndDisplayNotifications(notifications) {

        let listaNotificacoes = `
            <div style="display: flex; padding-left: 10px ">
                <p>Sem notificações</p>
            </div>`;

        const totalNotif = notifications.length;
        if (totalNotif) {

            document.getElementById('toMenuBarTotalNotification').setAttribute('counter', totalNotif);
            document.documentElement.style.setProperty('--display', 'block');
            listaNotificacoes = notifications.map(r => {

                let textComplement = '1 Dia';
                let lateTaskClass = '';
                if (r.dias_em_falta < 0) {
                    textComplement = `${r.dias_em_falta.toString().slice(1)} Atrás`;
                    lateTaskClass = `notification-late-task`;
                }

                if (r.dias_em_falta > 0) {
                    textComplement = `Em ${r.dias_em_falta} Dias`;
                }

                return `
                <div class="task-item ${lateTaskClass}">
                    <div>
                        ${r.descricao.slice(0, 30)}
                    </div>
                    <div>
                        ${textComplement}
                    </div>
                </div>
            `;

            })?.join('');

        }

        console.log("listaNotificacoes", listaNotificacoes)

        document
            .getElementById('toMenuBarListaNotification')
            .insertAdjacentHTML('afterbegin', listaNotificacoes);

    }

    gotoView(viewComponent) {
        Router.goto(viewComponent);
    }

    logout() {

        localStorage.clear();
        Router.goto("exit");

    }
}