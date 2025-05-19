import { BaseComponent } from "../../@still/component/super/BaseComponent.js";

export class Home extends BaseComponent {

  template = `
    <main class="content p-4">
      <div class="container-fluid">
        <h1>Dashboard - Exemplo</h1>
        <p class="lead">Fique a par de tudo</p>

            <div class="row mb-3">
              <div class="col-3">
                <div class="card">
                  <div class="card-header">Total de Processos</div>
                  <div class="card-body">0</div>
                </div>
              </div>
              <div class="col-3">
                <div class="card">
                  <div class="card-header"> Pendências / Atrasos</div>
                  <div class="card-body">0</div>
                </div>
              </div>
              <div class="col-3">
                <div class="card">
                  <div class="card-header">Clientes ativos</div>
                  <div class="card-body">0</div>
                </div>
              </div>
              <div class="col-3">
                <div class="card">
                  <div class="card-header">Colaboradores Activos</div>
                  <div class="card-body">body</div>
                </div>
              </div>
        </div>

        <div class="row mb-3">
              <div class="col-6">
              <div class="card">
              <div class="card-header">Processos por modo de Facturação</div>
              <div class="card-body">0</div>
              </div>
              </div>

              <div class="col-6">
              <div class="card">
              <div class="card-header">Tarefas e execução</div>
              <div class="card-body">0</div>
            </div>
              </div>
        </div>

        <div class="row">
          <div class="col-12">
            <div class="card">
              <div class="card-header">Notificações gerais</div>
              <div class="card-body">Nenhuma notificação</div>
          </div>
        </div>

      </div>
    </main>
  `;



  constructor() {
    super();
    //AppTemplate.showLoading();
    /* 
      CardDisplay.cardDataSource.onChange((value) => {
              console.log(`Home component detected changes: `,value);
      }); 
    */
  }

  importAssets() {

    return {
      scripts: [
        "assets/js/chart.min.js",
        "assets/js/bundles/amcharts4/core.js",
        "assets/js/bundles/amcharts4/charts.js",
        "assets/js/bundles/amcharts4/animated.js",
        "assets/js/pages/index.js",
      ],
    };

  }


  async stAfterInit() {
    AppTemplate.hideLoading();
  }
}
