'use strict'

var bodyParser = require('body-parser')
var logger = new (require('./logger'))('bootstrap')
var staticFolder = 'resources'
var path = require('path')
var express = require('express')
var app = express()

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
app.use('/waiter', require('./waiter/'))   // general api for waiters
// app.use('/servant', require('./servant/')) // general api for servants
app.use('/buffet', require('./buffet/'))   // general api for the buffet
app.use('/master', require('./master/'))   // general api for a master
app.use('/', express.static(path.join(staticFolder, 'index.html'))) // for serving the ui
app.use(express.static(staticFolder))                               // for serving the pictures

module.exports = function () {
    return app
}