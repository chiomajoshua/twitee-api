const VerifyUserMiddleware = require('./middleware/verify.user.middleware');
const AuthorizationController = require('./controller/authorization.controller');
exports.routesConfig = function (app) {
// #swagger.tags = ['Auth']
    app.post('/api/auth', [
        // #swagger.tags = ['Auth']
        // #swagger.description = 'Endpoint para obter um usuário.'
        VerifyUserMiddleware.hasAuthValidFields,
        VerifyUserMiddleware.isPasswordAndUserMatch,
        AuthorizationController.login
    ]);
};