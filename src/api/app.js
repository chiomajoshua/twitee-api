const config = require('./services/common/config/env.config');
const express = require('express');
const http = require('http');
const winston = require('./services/common/config/winston');
const morgan = require('morgan');
const helmet = require('helmet');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const app = express();

const AuthorizationRouter = require('./services/authorization/route.config');
const UsersRouter = require('./services/user/route.config');
const PostsRouter = require('./services/post/route.config');

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    } else {
        return next();
    }
});


app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('combined', { stream: winston.stream }));

AuthorizationRouter.routesConfig(app);
UsersRouter.routesConfig(app);
PostsRouter.routesConfig(app);

app.get("/", (req, res) =>{
    res.send("hello world!");
    });

http.createServer(app).listen(config.port, function () {
    console.log('app listening at port %s', config.port);
});


// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    console.error('Application currently running on %s', config.environment);
    res.locals.error = config.environment === 'dev' ? err : {};
  
    // add this line to include winston logging
    winston.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });