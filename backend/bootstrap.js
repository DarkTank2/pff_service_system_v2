'use strict'

var bodyParser = require('body-parser')
var logger = new (require('./logger'))('bootstrap')
var staticFolder = 'resources'
var statisticsFolder = 'statistics'
var path = require('path')
var express = require('express')
var app = express()

const utls = require('./utilities')
utls.initDatabase()

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    )
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST')
    next()
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use('/backend/waiter', require('./waiter/'))   // general api for waiters
app.use('/backend/servant', require('./servant/')) // general api for servants
app.use('/backend/buffet', require('./buffet/'))   // general api for the buffet
app.use('/backend/master', require('./master/'))   // general api for a master
app.use('/backend/calc', require('./calc/'))   // general api for the calculation
app.use('/backend/error', require('./errorHandler/'))
app.use('/', express.static(path.join(staticFolder, 'index.html'))) // for serving the ui
app.use('/statistics', express.static(path.join(statisticsFolder, 'index.html')))
app.use(express.static(staticFolder))                               // for serving the pictures
app.use(express.static(statisticsFolder))

module.exports = function () {
    return app
}