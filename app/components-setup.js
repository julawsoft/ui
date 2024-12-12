import { Components } from "./@still/setup/components.js";
import { AppTemplate } from "./app-template.js";
import { Login } from "./components/auth/Login.js";

export class ComponentSetup extends Components {

    entryComponentPath = routesMap.viewRoutes.regular.Home;
    entryComponentName = 'Home';
    servicePath = '/services'

    constructor() {
        super();
    }

    init() {
        const logged = localStorage.getItem('logged');
        return logged ? new AppTemplate() : new Login();
    }
}

//ComponentSetup.get().loadComponent()