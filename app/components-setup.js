import { Components } from "./@still/setup/components.js";
//import { Home } from "./components/home/Home.js";

export class ComponentSetup extends Components {

    entryComponentPath = routesMap.viewRoutes.regular.Home;
    entryComponentName = 'Home';
    servicePath = '/services'

    constructor() {
        super();
        //const componentInstance = new Home();
        ComponentSetup.instance
    }

    init() {
        const logged = localStorage.getItem('logged');
        return logged ? new AppTemplate() : new Login();
    }
}

ComponentSetup.get().loadComponent()