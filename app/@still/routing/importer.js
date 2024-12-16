self.addEventListener('install', function (event) {
    console.log('Installing SW');
});

self.addEventListener('activate', function (event) {
    console.log('Claiming control');
    return self.clients.claim();
});

self.addEventListener('fetch', event => {
    console.log('Module imported:', event.request.url);
    if (event.request.url.endsWith('.js')) {
        // Modify the request or response here
        // Example: Intercept and log the module URL
        console.log('Module imported1:', event.request.url);
    }
});


