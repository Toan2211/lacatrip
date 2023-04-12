const express = require('express')
const cors = require('cors')
const app = express()
const route = require('./src/routes')
const http = require('http')
const server = http.createServer(app)
const multer = require('multer')
const upload = multer()
require('dotenv').config()

const db = require('./src/models')

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    )
    res.header('Access-Control-Allow-credentials', true)
    res.header(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, DELETE, UPDATE'
    )
    next()
})
db.sequelize.sync()
app.use(express.json())

app.use(express.urlencoded({ extended: true }))
app.use(upload.array())
app.use('/api', route)
const PORT = process.env.PORT || 8080
server.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})
