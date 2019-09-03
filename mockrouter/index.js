'use strict'

var app = require('./bootstrap.js')
var config = require('./generalconfig')

app.listen(config.server.port, function () {
    console.log('App is now listening to port ' + config.server.port)
})

process.on('uncaughtException', function (err) {
    console.log(err.message, err.stack)
})
