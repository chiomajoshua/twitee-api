const UsersController = require('../user/controller/user.controller');
const ValidationMiddleware = require('../common/middleware/auth.validation.middleware');

exports.routesConfig = function (app) {
    app.post('/api/users', [
        UsersController.insert
    ]);
    app.get('/api/users', [
        ValidationMiddleware.validJWTNeeded,
        //PermissionMiddleware.minimumPermissionLevelRequired(PAID),
        UsersController.list
    ]);
    app.get('/api/users/:email', [
        ValidationMiddleware.validJWTNeeded,
        //PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        //PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        UsersController.getByEmail
    ]);
    app.patch('/api/users/:userId', [
        ValidationMiddleware.validJWTNeeded,
        //PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        //PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        UsersController.patchById
    ]);
    app.delete('/api/users/:userId', [
        ValidationMiddleware.validJWTNeeded,
        //PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        UsersController.removeById
    ]);
};