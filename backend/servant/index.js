'use strict'

    // var logPrefix = '[' + [request.method, request.url].join(' ') + ']'
    // logger.info(logPrefix)

var express = require('express')
var router = express.Router()
var logger = new (require('../logger'))('servant')
var utls = require('../utilities')

router.get('/getFinished/:type', (request, response) => {
    var logPrefix = '[' + [request.method, request.url].join(' ') + ']'
    logger.info(logPrefix)
    var type = request.params.type
    if (type === 'food') {
        utls.getFinished(request, 'Essen').then(data => {
            response.status(200).send(data)
        }).catch(err=> {
            response.status(500).send(err)
        })
    } else if (type === 'drinks') {
        utls.getFinished(request, 'Trinken').then(data => {
            response.status(200).send(data)
        }).catch(err=> {
            response.status(500).send(err)
        })
    } else {
        logger.error(logPrefix, 'Unknown type: ' + type)
        response.status(500).send(new Error('Unknown type: ' + type))            
    }
})

router.get('/getOrder/:id/:type', (request, response) => {
    var logPrefix = '[' + [request.method, request.url].join(' ') + ']'
    logger.info(logPrefix)
    var id = request.params.id
    var type = request.params.type
    if (id !== 'undefined') {
        if (type === 'food') {
            utls.getOrder(request, id, 'Essen').then(data => {
                response.status(200).send(data)
            }).catch(err => {
                response.status(500).send(err)
            })
        } else if (type === 'drinks') {
            utls.getOrder(request, id, 'Trinken').then(data => {
                response.status(200).send(data)
            }).catch(err => {
                response.status(500).send(err)
            })
        } else if (type === 'all') {
            var promises = []
            promises.push(new Promise((resolve, reject) => {
                utls.getOrder(request, id, 'Essen').then(data => {
                    resolve({food:data})
                }).catch(err => {
                    reject(err)
                })
            }))
            promises.push(new Promise((resolve, reject) => {
                utls.getOrder(request, id, 'Trinken').then(data => {
                    resolve({drinks:data})
                }).catch(err => {
                    reject(err)
                })
            }))
            Promise.all(promises).then(data => {
                response.status(200).send(data)
            }).catch(err => {
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

router.post('/updateServed/:id/:type', (request, response) => {
    var logPrefix = '[' + [request.method, request.url].join(' ') + ']'
    logger.info(logPrefix)
    var id = request.params.id
    var type = request.params.type
    request.body.name = 'served'
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

module.exports = router