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

    renderViewOn(placeHolder){
        
        let template = this.template();
        this.prepareRender();
        if(template instanceof Array)
            template = template.join('');

        document
            .getElementById(placeHolder)
            .innerHTML = template;
    }

    renderOnViewFor(placeHolder){
        this.beforeInit();
        
        //$still.context.componentRegistror.componentList[this.getName()] = { instance: this };
        /*.compo.export({
            componentName: this.getName(), instance: this
        });*/

        document
            .getElementById(placeHolder)
            .innerHTML = this.getBoundTemplate();
        this.incrementLoadCounter();
    }

    getTemplate(){
        this.beforeInit();
        //this.prepareRender();
        const template = this.getBoundTemplate();   
        const cmpUnicClass = this.getUUID();
        const loadCmpClass = $stillconst.ANY_COMPONT_LOADED;

        return template.replace("class=\"",`class="${cmpUnicClass} ${loadCmpClass} `);
    }

    render(){
        this.renderOnViewFor(this.htmlRefId);
    }

}
