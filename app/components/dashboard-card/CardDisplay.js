import { ViewComponent } from "../../@still/component/super/ViewComponent.js";
import { DashboardCard } from "./DashboardCard.js";

const cardDataSource = [
    {
        state: {
            mainLabel: `Total de Processos`,
            statusValue: `Total de processos até o momento`,
            score: `358`
        },
        props: {
            className: 'l-bg-green',
            iconClass: 'fas fa-archive'
        }
    },
    {
        state: {
            mainLabel: `Total de Clientes`,
            statusValue: `Clientes registados até ao momento`,
            score: `856`
        },
        props: {
            className: 'l-bg-purple',
            iconClass: 'fas fa-users'
        }
    },
    {
        state: {
            mainLabel: `Horas Lançadas`,
            statusValue: `Lançamentos a nível do Timesheet`,
            score: `128`
        },
        props: {
            className: 'l-bg-orange',
            iconClass: 'far fa-calendar-alt'
        }
    },
    {
        state: {
            mainLabel: `Horas Cobradas`,
            statusValue: `Cobranças com base nos Timesheets`,
            score: `25698`
        },
        props: {
            className: 'l-bg-cyan',
            iconClass: 'fas fa-file-invoice-dollar'
        }
    },
]


export class CardDisplay extends ViewComponent {

    htmlRefId = 'dashBoardCards';
    /** @type { StEvent } */
    cardDataSource = cardDataSource;

    updateComponent() {
        this.template = ``/* this.cardDataSource.value.map(
            rec => DashboardCard.new(rec.state)
                .props(rec.props)
                .getTemplate()
        ) */;
    }

    async beforeInit() {

        let cardsResult = ``;
        for (const cardData of this.cardDataSource.value) {
            const card = new DashboardCard(cardData.state);
            card.props(cardData.props);
            cardsResult += await card.getTemplate();
        }

        this.template = cardsResult;
    }

    stOnUpdate() {
        console.log(`Called Card Display on Update: `, this.cardDataSource);
    }

    callAlert() {
        alert('Alert called');
    }

    constructor() {
        super();
    }


}