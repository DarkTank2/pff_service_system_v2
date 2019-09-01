'use strict'

var express = require('express')
var router = express.Router()
var logger = new (require('../logger'))('master')
var utls = require('../utilities')

router.put('/addItems/:type', (request, response) => {
    var logPrefix = '[' + [request.method, request.url].join(' ') + ']'
    logger.debug(logPrefix)
    var type = request.params.type

    if (type === 'food') {
        utls.addItems(request, 'Essen').then(data => {
            response.status(200).send(data)
        })
        .catch(err => {
            response.status(500).send(err)
        })
    } else if (type === 'drinks') {
        utls.addItems(request, 'Trinken').then(data => {
            response.status(200).send(data)
        })
        .catch(err => {
            response.status(500).send(err)
        })
    } else {
        logger.error(logPrefix, 'Unknown type: ' + type)
        response.status(500).send(new Error('Unknown type: ' + type))
    }
})

router.put('/addTables', (request, response) => {
    var logPrefix = '[' + [request.method, request.url].join(' ') + ']'
    logger.debug(logPrefix)
    utls.addTables(request).then(data => {
        response.status(200).send(data)
    })
    .catch(err => {
        response.status(500).send(err)
    })
})

module.exports = router