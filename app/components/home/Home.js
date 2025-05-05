import { BaseComponent } from "../../@still/component/super/BaseComponent.js";

export class Home extends BaseComponent {

  template = `
    <main class="content p-4">
      <div class="container-fluid">
        <h1>Dashboard</h1>
        <p class="lead">Conteúdo principal aqui.</p>
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
