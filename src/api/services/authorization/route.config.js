const VerifyUserMiddleware = require('./middleware/verify.user.middleware');
const AuthorizationController = require('./controller/authorization.controller');
exports.routesConfig = function (app) {

    app.post('/api/auth', [
        VerifyUserMiddleware.hasAuthValidFields,
        VerifyUserMiddleware.isPasswordAndUserMatch,
        AuthorizationController.login
    ]);
};