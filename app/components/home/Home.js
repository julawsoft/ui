import { ViewComponent } from "../../@still/component/super/ViewComponent.js";

export class Home extends ViewComponent {


  template = `
    <section class="content">
            <div class="container-fluid">
                <!-- Dashboard Widgets -->
                <div id="dashBoardCards" class="row"></div>

                <div class="row">
                    <div id="barCharPlaceholder" style="display: contents;"></div>
                    <div id="lineCharPlaceholder" style="display: contents;"></div>
                </div>

                <div class="row clearfix">
                    <div id="animateCharts" style="display: none;"></div>
                </div>
                
                <div class="row clearfix">
                    <div id="projectGrid" style="display: contents;"></div>
                    <div id="dashboardCalendar" style="display: contents;"></div>
                </div>
                
            </div>
        
    </section>
    `;

  cardDisplayDS;

  constructor() {
    super();
    /*
    if(AppTemplate.get().getStorageValue('logged')){
        console.log(`Used was logged: `, AppTemplate.get().getStorageValue('logged'));
    }else{
        Router.goto('init');
    }
    */
    //AppTemplate.showLoading();
    this.setup({
      includes: [
        import('../../components/charts/LineChart.js'),
        import('../../components/charts/BarChart.js'),
        import('../../components/dashboard-card/CardDisplay.js'),
        import('../../components/calendar/Calendar.js'),
        import('../../components/charts/CircularAnimatedChart.js'),
        import('../../components/project-list/ProjectGrid.js'),
      ],
      scripts: [
        "assets/js/chart.min.js",
        "assets/js/bundles/amcharts4/core.js",
        "assets/js/bundles/amcharts4/charts.js",
        "assets/js/bundles/amcharts4/animated.js",
        "assets/js/pages/index.js",
      ],
    });

    /* CardDisplay.cardDataSource.onChange((value) => {
            console.log(`Home component detected changes: `,value);
        }); */
  }

  async stAfterInit() {

    //AppTemplate.hideLoading();

  }
}
