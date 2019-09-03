'use cstrict'

var app = require('./bootstrap.js')

var port = 4000
app().listen(port, function () {
    console.log('App is now listening to port ' + port)
})

process.on('uncaughtException', function (err) {
    console.log(err.message, err.stack)
})
