class ComponentSetup extends Components {
    
    entryComponentPath = routesMap.viewRoutes.App;
    entryComponentName = 'App';
    
    constructor(){
        super();
    }

    init(){
        return new App();
    }

}

(new ComponentSetup).loadComponent();