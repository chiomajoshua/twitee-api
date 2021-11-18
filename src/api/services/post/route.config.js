const PostsController = require('../post/controller/post.controller');
const ValidationMiddleware = require('../common/middleware/auth.validation.middleware');

exports.routesConfig = function (app) {
    app.post('/api/posts', [
        ValidationMiddleware.validJWTNeeded,
        PostsController.insert
    ]);

    app.post('/api/activity', [
        ValidationMiddleware.validJWTNeeded,
        PostsController.insertActivity
    ]);
    
    app.get('/api/posts/:postId', [
        ValidationMiddleware.validJWTNeeded,
        PostsController.getByPostId
    ]);
    app.get('/api/posts/', [
        ValidationMiddleware.validJWTNeeded,
        PostsController.getByOwnerId
    ]);
    app.delete('/api/posts/:postId', [
        ValidationMiddleware.validJWTNeeded,        
        PostsController.removePost
    ]);
};