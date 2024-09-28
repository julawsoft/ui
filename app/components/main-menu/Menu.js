class CMenu extends BaseComponent {

    template = `
    <div class="menu">
        <ul class="list">
            <li>
                <div class="sidebar-profile clearfix">
                    <div class="profile-img">
                        <img src="assets/images/usrbig.jpg" alt="profile">
                    </div>
                    <div class="profile-info">
                        <h3 onclick="menu()">Sarah Deo</h3>
                        <p>Welcome Admin !</p>
                    </div>
                </div>
            </li>
            <!-- <li class="header">Menu Inici</li> -->
            <li class="active">
                <a href="#" (click)="gotoView('Home')">
                    <i class="menu-icon ti-home"></i>
                    <span>Início</span>
                </a>
            </li>

            <li class="">
                <a href="#" onClick="return false;" class="menu-toggle">
                    <i class="menu-icon ti-home"></i>
                    <span>Cadastros</span>
                </a>
                <ul class="ml-menu" (if)="utilzador.persmisoe['Admin']">
                    <li class="">
                        <a href="#" (click)="gotoView('ClientsGrid')">Ver Clientes</a>
                    </li>
                    <li class="active">
                        <a href="#" (click)="gotoView('ClientForm')">Cadastrar Cliente</a>
                    </li>
                    <li>
                        <a href="#" (click)="gotoView('Osvaldo')">Colaborador</a>
                    </li>
                    <li>
                        <a href="#" (click)="gotoView('NovoMenuComponent')">Novo Menu</a>
                    </li>
                </ul>
            </li>
            <li class="active">
                <a href="#" onClick="return false;" class="menu-toggle">
                    <i class="menu-icon ti-user"></i>
                    <span>Colaboradores</span>
                </a>
                <ul class="ml-menu" (if)="utilzador.permission['Admin']">
                    <li class="active">
                        <a href="#" (click)="gotoView('ColaboradoresGrid')">Ver Colaboradores</a>
                    </li>
                </ul>
            </li>
    </div>
    `;   

    gotoView(viewComponent){
        Router.goto(viewComponent);
    }

    constructor(){
        super();
        this.setup({});
    }


}

$still.component.expose(new CMenu());