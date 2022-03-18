const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const logger = require('morgan')
const bodyParser = require('body-parser')

require('dotenv').config()

const PORT = process.env.PORT

const app = express()

// const model = require('./api/middleware/model')

// Middleware
app.use(helmet())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())//req.header.accept == application/json
app.use(cors())
app.use(logger('dev'))

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


app.use(require('./api/configs/model'))
app.use('/api/v1', require('./api/routes/weatherRouter'))

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
        root: `${req.protocol}://${req.headers.host}/api/v1`
    })
})

// Server
app.listen(PORT || 5000, () => {
    console.log(`Server running on port ${PORT}.`)
})