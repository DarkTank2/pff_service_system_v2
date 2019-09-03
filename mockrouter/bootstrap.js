'use strict'

var express = require('express')
var bodyParser = require('body-parser')
var proxy = require('express-http-proxy')

var helpers = require('./helper')

var app = express()
app.use(bodyParser.json()) // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })) // support encoded bodies

app.use(helpers.checkOverrides)

app.use((req, res, next) => {
    if (helpers.isBackendCall(req)) {
        console.log('[backend]', req.path)
        next()
    } else {
        console.log('[frontend]', req.path)
        next()
    }
})

app.use(proxy('backendproxy', {
    filter: request => {
        return helpers.isBackendCall(request) === true
    },
    proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
        var mappings = helpers.getMappings(proxyReqOpts.path, 'backend')[0]
        if (mappings) {
            proxyReqOpts.host = mappings.host
            proxyReqOpts.port = mappings.port
        }
        return proxyReqOpts
    }
}))

app.use(proxy('frontendproxy', {
    filter: request => {
        return helpers.isBackendCall(request) === false
    },
    proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
        var mappings = helpers.getMappings(proxyReqOpts.path, 'frontend')[0]
        if (mappings) {
            proxyReqOpts.host = mappings.host
            proxyReqOpts.port = mappings.port
        }
        return proxyReqOpts
    }
}))

module.exports = app