const swaggerAutogen = require('swagger-autogen')()







const outputFile = './swagger.json'
const endpointsFiles = ['./services/authorization/route.config', './services/post/route.config', './services/user/route.config']

swaggerAutogen(outputFile, endpointsFiles).then(() => {
    require('./app')
})