/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * 
 * @file: index.js
 * @author: Alexander Seiler
 * 
 * This file contains the implementation for the waiter base url endpoints
 *  [PUT] placeOrder
 *  [GET] getItems/:type/:category
 *  [GET] getCategories
 *  [GET] getTables
 *
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

'use strict'

var express = require('express')
var router = express.Router()
var logger = new (require('../logger'))('waiter')
var utls = require('../utilities')

router.get('/getItems/:type/:category', (request, response) => {
    var logPrefix = '[' + [request.method, request.url].join(' ') + ']'
//     logger.debug(logPrefix)
    var type = request.params.type
    var category = request.params.category
    if(type === 'food') {
        utls.getItemsByCategory(request, 'Essen', category).then(data => {
            response.status(200).send(data)
        })
        .catch(err => {
            response.status(500).send(err)
        })
    } else if (type === 'drinks') {
        utls.getItemsByCategory(request, 'Trinken', category).then(data => {
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

router.get('/getTables', (request, response) => {
    var logPrefix = '[' + [request.method, request.url].join(' ') + ']'
//     logger.debug(logPrefix)
    utls.getTables(request).then(data => {
        response.status(200).send(data)
    })
    .catch(err => {
        response.status(500).send(err)
    })
})

router.get('/getCategories/:type', (request, response) => {
    var logPrefix = '[' + [request.method, request.url].join(' ') + ']'
//     logger.debug(logPrefix)
    var type = request.params.type
    if (type === 'food') {
        utls.getCategories(request, 'Essen').then(data => {
            response.status(200).send(data)
        })
        .catch(err => {
            response.status(500).send(err)
        })
    } else if (type === 'drinks') {
        utls.getCategories(request, 'Trinken').then(data => {
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

router.put('/placeOrder', (request, response) => {
    var logPrefix = '[' + [request.method, request.url].join(' ') + ']'
    logger.debug(logPrefix)
    utls.placeOrder(request).then(data => {
        response.status(200).send(data)
    })
    .catch(err => {
        response.status(500).send(err)
    })
})

module.exports = router