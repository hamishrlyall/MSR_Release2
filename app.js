const express = require('express')
const app = express()

//Setup & Middleware
global.__basedir = __dirname;
app.set('view engine', 'pug')
app.set('views', __dirname + '\\views')

//Redirect trailing slashes
app.enable('strict routing')
const redirectTrailingSlash = require('redirect-trailing-slash')
app.use(redirectTrailingSlash)

//Generate Database Models
const SequelizeAuto = require(__dirname + '\\data_access\\sequelize-auto')
//Uncomment to regenerate models. Do not use Nodemon, will restart on loop.
//SequelizeAuto.run((err) => {if (err) throw err})

//Test sequelize connection
const Sequelize = require(__dirname + '\\data_access\\sequelize')

//Connect route files
const privateRoutes = require(__dirname + '\\routing\\private\\private_routes')
const publicRoutes = require(__dirname + '\\routing\\public\\public_routes')
const testRoutes = require(__dirname + '\\routing\\test_routes')

//Use route files
app.use('/api', privateRoutes)
app.use('/', publicRoutes)

//Serve static files
app.use('/', express.static(__dirname + '\\static'))

//Start Server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log('Running on port ' + PORT)

    if (process.env.NODE_ENV = 'development') {
        //DEVELOPMENT ENVIROMENT ONLY
        app.use('/', testRoutes)
    } else if (process.env.NODE_ENV = 'production') {
        //PRODUCTION ENVIROMENT ONLY
    }
})