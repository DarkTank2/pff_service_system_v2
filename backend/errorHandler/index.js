'use strict'

var express = require('express')
var router = express.Router()
var logger = new (require('../logger'))('errorHandler')

router.put('/', (request, response) => {
    var logPrefix = '[' + [request.method, request.url].join(' ') + ']'
    logger.info(logPrefix, 'Received an error!')
    logger.error('[ERROR]', request.body)
    response.status(200).send({msg:'Succesfully transmitted'})
})

module.exports = router
