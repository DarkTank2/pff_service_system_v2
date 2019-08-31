/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * 
 * @file: index.js
 * @author: Alexander Seiler
 * 
 * This file contains the implementation for the waiter base url endpoints
 *  [PUT] placeOrder
 *  [GET] getFood
 *  [GET] getDrinks
 *  [GET] getCategories
 *
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

'use strict'

var express = require('express')
var router = express.Router()
var logger = new (require('../logger'))('waiter')
var utls = require('../utilities')

router.put('/placeOrder', (request, response) => {
    var logPrefix = '[' + [request.method, request.url].join(' ') + ']'
    logger.debug(logPrefix)
    response.status(200).send({})
})

router.get('/getFood', (request, response) => {
    var logPrefix = '[' + [request.method, request.url].join(' ') + ']'
    logger.debug(logPrefix)
    utls.getFood(request).then(data => {
        response.status(200).send(data)
    })
    .catch(err => {
        response.status(500).send(err)
    })
})
router.get('/getDrinks', (request, response) => {
    var logPrefix = '[' + [request.method, request.url].join(' ') + ']'
    logger.debug(logPrefix)
    response.status(200).send({})
})
router.get('/getCategories/:type', (request, response) => {
    var logPrefix = '[' + [request.method, request.url].join(' ') + ']'
    logger.debug(logPrefix)
    var type = request.params.type
    logger.info(logPrefix, 'Get categories of type: ' + (type || 'all'))
    response.status(200).send({})
})

module.exports = router