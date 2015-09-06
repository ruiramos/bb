var server = require('./server'),
    router = require('./router'),
    handlers = require('./handlers'),
    routes = {};

routes['/'] = handlers.home;
routes['/upload'] = handlers.upload;
routes['/api'] = handlers.api;
routes._static = handlers.serveStatic;

server.start(router.route, routes);
