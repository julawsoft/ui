import { BaseComponent } from "./BaseComponent.js";

class HTMLRefId {

}

export class ViewComponent extends BaseComponent {

    /**
     * @type {HTMLRefId}
     */
    htmlRefId;
    #stMyParent;

    static includes = [];

    constructor() {
        super();
    }

    beforeInit() { }

    renderViewOn(placeHolder) {

        this.prepareRender();
        if (this.template instanceof Array)
            this.template = this.template.join('');

        document
            .getElementById(placeHolder)
            .innerHTML = this.template;
    }

    renderOnViewFor(placeHolder) {

        setTimeout(async () => {

            await this.beforeInit();

            document
                .getElementById(placeHolder)
                .innerHTML = await this.getBoundTemplate();
            this.incrementLoadCounter();

        });

    }

    async getTemplate() {
        await this.beforeInit();
        //this.prepareRender();
        let template = await this.getBoundTemplate();
        const cmpUnicClass = this.getUUID();
        const loadCmpClass = $stillconst.ANY_COMPONT_LOADED;

        //Add class wrapper
        template = `
            <span class="${cmpUnicClass} ${loadCmpClass}">
                ${template}
            </span>
        `;

        return template;
    }

    render() {
        this.renderOnViewFor(this.htmlRefId);
    }

    setParentComponent(parent) {
        this.stMyParent = parent;
    }

    /** @returns { ViewComponent }  */
    getParentComponent() {
        return this.stMyParent;
    }

    runMethod(methodName, ...params) {

        const method = methodName
            .replace('(', '')
            .replace(')', '')
            .replace('parent.', '');
        return this[method](...params);
    }

    async runMethodAsync(methodName, ...params) {

        const method = methodName
            .replace('(', '')
            .replace(')', '')
            .replace('parent.', '');

        return await this[method](...params);
    }

    parentRun(methodName, ...params) {
        return this
            .getParentComponent()
            .runMethod(methodName, ...params);
    }

    async parentRunAsync(methodName, ...params) {
        return await this
            .getParentComponent()
            .runMethodAsync(methodName, ...params);
    }

}
