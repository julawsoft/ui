class HTMLRefId {

}

class ViewComponent extends BaseComponent {

    /**
     * @type {HTMLRefId}
     */
    htmlRefId

    constructor(){
        super();
    }

    beforeInit(){}

    onRender(){}

    renderViewOn(placeHolder){

        this.prepareRender();
        if(this.template instanceof Array)
            this.template = this.template.join('');

        const placeholder = document.getElementById(placeHolder);
        placeholder.innerHTML = '';
        placeholder.insertAdjacentHTML('afterbegin',this.template);
    }

    renderOnViewFor(placeHolder){
        this.beforeInit();

        if(this.template instanceof Array)
            this.template = this.template.join('');

        const placeholder = document.getElementById(placeHolder);
        placeholder.innerHTML = '';
        placeholder.insertAdjacentHTML('afterbegin',this.template);

    }

    getTemplate(){
        this.beforeInit();
        //this.prepareRender();
        console.log(`${this.constructor.name}`);
        if(this.template instanceof Array)
            this.template = this.template.join('');

        return this.template;
    }

    render(){
        this.renderOnViewFor(this.htmlRefId);
    }

}
