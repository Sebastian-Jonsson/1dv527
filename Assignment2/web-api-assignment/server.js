const express = require('express')
const helmet = require('helmet')
// const cors  = require('cors')
const logger = require('morgan')
const bodyParser = require('body-parser')

require('dotenv').config()
require('./configs/mongoose')

VERSION = process.env.API_VERSION
PORT = process.env.PORT


const app = express()

// Middlewares
app.use(helmet())

app.use(logger('dev'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    )
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Method', 'GET, PUT, POST, PATCH, DELETE')
        return res.status(200).json({})
    }
    next()
})

// Routes
app.use('/api', require('./api/routes/indexRouter'))
app.use(`/api/${VERSION}/spells`, require('./api/routes/spellRouter'))
app.use(`/api/${VERSION}/users`, require('./api/routes/userRouter'))
app.use(`/api/${VERSION}/webhooks`, require('./api/routes/hookRouter'))

// Error handling
app.use((req, res, next) => {
    const error = new Error('Not Found.')
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: error.message,
        requested: `${req.protocol}://${req.headers.host}${req.originalUrl}`,
        root: `${req.protocol}://${req.headers.host}/api`
    })
})

// Server
app.listen(PORT || 5000, () => {
    console.log(`Server running on port ${PORT}.`)
})
