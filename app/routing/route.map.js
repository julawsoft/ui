const routesMap = {
    viewRoutes: {
        ClientForm: 'components/client',
        CollaboratorForm: 'components/collaborator',
        Home: 'components/home',
    }
}







































let routeMapInverse = [];
function getRouteMap(){

    if(!routeMapInverse.length){
        routeMapInverse = Object
            .entries(routesMap.viewRoutes)
            .reduce((accum, [cmp, path]) => {
                accum[path] = cmp;
                return accum;
            }, {});
    }

    return {
        route: routesMap.viewRoutes,
        inverse: routeMapInverse
    }
}