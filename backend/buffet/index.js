/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * 
 * @file: index.js
 * @author: Alexander Seiler
 * 
 * This file contains the implementation for the buffet base url endpoints
 *  [GET] /getItems/:type
 *
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

'use strict'

    // var logPrefix = '[' + [request.method, request.url].join(' ') + ']'
    // logger.info(logPrefix)

var express = require('express')
var router = express.Router()
var logger = new (require('../logger'))('buffet')
var utls = require('../utilities')

router.get('/getItems/:type', (request, response) => {
    var logPrefix = '[' + [request.method, request.url].join(' ') + ']'
    logger.debug(logPrefix)
    var type = request.params.type
    if(type === 'food') {
        utls.getItems(request, 'Essen').then(data => {
            response.status(200).send(data)
        })
        .catch(err => {
            response.status(500).send(err)
        })
    } else if (type === 'drinks') {
        utls.getItems(request, 'Trinken').then(data => {
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

router.get('/getNotFinished/:type', (request, response) => {
    var logPrefix = '[' + [request.method, request.url].join(' ') + ']'
    logger.info(logPrefix)
    var type = request.params.type
    if (type === 'food') {
        utls.getNotFinishedOrders(request, 'Essen').then(data => {
            response.status(200).send(data)
        }).catch(err => {
            response.status(500).send(err)
        })
    } else if (type === 'drinks') {
        utls.getNotFinishedOrders(request, 'Trinken').then(data => {
            response.status(200).send(data)
        }).catch(err => {
            response.status(500).send(err)
        })
    } else {
        logger.error(logPrefix, 'Unknown type: ' + type)
        response.status(500).send(new Error('Unknown type: ' + type))
    }
})

router.post('/updateFinished/:id/:type', (request, response) => {
    var logPrefix = '[' + [request.method, request.url].join(' ') + ']'
    logger.info(logPrefix)
    var id = request.params.id
    var type = request.params.type
    request.body.name = 'finished'
    if (id !== 'undefined') {
        if (type === 'food') {
            utls.updateOrder(request, id, 'Essen', request.body).then(data => {
                response.status(200).send(data)
            }).catch(err => {
                response.status(500).send(err)
            })
        } else if (type === 'drinks') {
            utls.updateOrder(request, id, 'Trinken', request.body).then(data => {
                response.status(200).send(data)
            }).catch(err => {
                response.status(500).send(err)
            })
        } else {
            logger.error(logPrefix, 'Unknown type: ' + type)
            response.status(500).send(new Error('Unknown type: ' + type))
        }
    } else {
        logger.error(logPrefix, 'Undefined ID')
        response.status(500).send(new Error('Undefined ID!'))
    }
})

router.post('/updateDepletion/:id/:type', (request, response) => {
    var logPrefix = '[' + [request.method, request.url].join(' ') + ']'
    logger.info(logPrefix)
    var id = request.params.id
    var type = request.params.type
    if (id !== 'undefined') {
        if (type === 'food') {
            utls.updateDepletion(request, id, 'Essen', request.body.value).then(data => {
                response.status(200).send(data)
            }).catch(err=> {
                response.status(500).send(err)
            })
        } else if (type === 'drinks') {
            utls.updateDepletion(request, id, 'Trinken', request.body.value).then(data => {
                response.status(200).send(data)
            }).catch(err=> {
                response.status(500).send(err)
            })
        } else {
            logger.error(logPrefix, 'Unknown type: ' + type)
            response.status(500).send(new Error('Unknown type: ' + type))            
        }
    } else {
        logger.error(logPrefix, 'Undefined ID!')
        response.status(500).send(new Error('Undefined ID!'))
    }
})

module.exports = router