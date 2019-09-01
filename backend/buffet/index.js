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

var express = require('express')
var router = express.Router()
var logger = new (require('../logger'))('waiter')
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

module.exports = router