export const importModule = async function (filePath, callback) {
    return await import(filePath);
}


export const $stillLoadScript = (path, className, base = null) => {

    const prevScript = document.getElementById(`${path}/${className}.js`);
    if (prevScript) return false;

    const script = document.createElement('script');
    script.src = `${base ? base : ''}${path}/${className}.js`;
    script.id = `${path}/${className}.js`;
    script.type = 'module';
    //document.head.insertAdjacentElement('beforeend', script);
    return script;

}


export const $stillLoadScriptName = (path, className, base = null) => {

    return `${base ? base : ''}${path}/${className}.js`;

}

export const routeMaps = $stillGetRouteMap();