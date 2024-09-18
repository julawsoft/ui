const cardDataSource = [
    { 
        state: {
            mainLabel: `First Card`,
            statusValue: `18% Higher Then Last Month`,
            score: `358`
        },
        props: { className: 'l-bg-green' } 
    },
    { 
        state: {
            mainLabel: `Completed Orders`,
            statusValue: `21% Higher Then Last Month`,
            score: `856`
        },
        props: { className: 'l-bg-purple' } 
    },
    { 
        state: {
            mainLabel: `New Orders`,
            statusValue: `37% Higher Then Last Month`,
            score: `128`
        },
        props: { className: 'l-bg-orange' } 
    },
    { 
        state: {
            mainLabel: `Total Earnings`,
            statusValue: `10% Higher Then Last Month`,
            score: `25698`
        },
        props: { className: 'l-bg-cyan' } 
    },
]


class CCardDisplay extends ViewComponent {

    htmlRefId = 'dashBoardCards';
    /** @type { StEvent } */
    cardDataSource = cardDataSource;

    updateComponent(){
        this.template = this.cardDataSource.value.map(
            rec =>  DashboardCard.new(rec.state)
                .props(rec.props)
                .getTemplate()
        );
    }

    beforeInit(){
        this.template = this.cardDataSource.value.map(
            rec =>  DashboardCard.new(rec.state)
                .props(rec.props)
                .getTemplate()
        );
    }

    stOnUpdate(){
        console.log(`Called Card Display on Update: `, this.cardDataSource);
    }

    callAlert(){
        alert('Alert called');
    }
    
    constructor(){
        super();
        //this.renderOnViewFor('dashBoardCards');
    }
    

}

/** @type {CCardDisplay} */
const CardDisplay = $still.component.expose(new CCardDisplay());