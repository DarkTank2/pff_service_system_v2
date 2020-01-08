'use strict'

    // var logPrefix = '[' + [request.method, request.url].join(' ') + ']'
    // logger.info(logPrefix)

var express = require('express')
var router = express.Router()
var logger = new (require('../logger'))('buffet')
var utls = require('../utilities')

router.get('/items', (request, response) => {
    var logPrefix = '[' + [request.method, request.url].join(' ') + ']'
    logger.debug(logPrefix)
    var promises = []
    promises.push(utls.getItems(request, 'Essen').then(data => {
        return {food: data}
    }))
    promises.push(utls.getItems(request, 'Trinken').then(data => {
        return {drinks: data}
    }))
    Promise.all(promises).then(data => {
        response.status(200).send(data)
    }).catch(err => {
        response.status(500).send(err)
    })
})
router.post('/order', (request, response) => {
    var logPrefix = '[' + [request.method, request.url].join(' ') + ']'
    logger.debug(logPrefix)
    utls.postCalcOrder(request).then(data => {
        response.status(200).send(data)
    }).catch(err => {
        response.status(500).send(err)
    })
})

module.exports = router