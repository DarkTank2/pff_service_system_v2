'use strict'

    // var logPrefix = '[' + [request.method, request.url].join(' ') + ']'
    // logger.info(logPrefix)

var express = require('express')
var router = express.Router()
var logger = new (require('../logger'))('servant')
var utls = require('../utilities')

var productType = {
    'food': ['Essen'],
    'drinks': ['Trinken'],
    'all': ['Essen', 'Trinken']
}
var reversedTypes = {
    'Essen': 'food',
    'Trinken': 'drinks'
}

router.get('/getFinished/:type', (request, response) => {
    var logPrefix = '[' + [request.method, request.url].join(' ') + ']'
    logger.info(logPrefix)
    var types = productType[request.params.type]
    if (types === undefined) {
        logger.warn(logPrefix, 'Unknown type: ' + request.params.type)
        response.status(404).send('Unknown type: ' + request.params.type)
    } else {
        var promises = []
        types.forEach(type => {
            promises.push(new Promise((resolve, reject) => {
                utls.getFinished(request, type).then(data => {
                    var retData = {}
                    retData[reversedTypes[type]] = data
                    resolve(retData)
                }).catch(err=> {
                    reject(err)
                })
            }))
        })
        Promise.all(promises).then(data => {
            response.status(200).send(data)
        }).catch(err => {
            response.status(500).send(err)
        })
    }
})

router.get('/getNotServedTables/:type', (request, response) => {
    var logPrefix = '[' + [request.method, request.url].join(' ') + ']'
    logger.info(logPrefix)
    var types = productType[request.params.type]
    if (types === undefined) {
        logger.warn(logPrefix, 'Unknown type: ' + request.params.type)
        response.status(404).send('Unknown type: ' + request.params.type)
    } else {
        var promises = []
        types.forEach(type => {
            promises.push(new Promise((resolve, reject) => {
                utls.getNotServedTables(request, type).then(data => {
                    var retData = {}
                    retData[reversedTypes[type]] = data
                    resolve(retData)
                }).catch(err => {
                    reject(err)
                })
            }))
        })
        Promise.all(promises).then(data => {
            response.status(200).send(data)
        }).catch(err => {
            response.status(500).send(err)
        })
    }
})
router.get('/getNotCashedTables/:type', (request, response) => {
    var logPrefix = '[' + [request.method, request.url].join(' ') + ']'
    logger.info(logPrefix)
    var types = productType[request.params.type]
    if (types === undefined) {
        logger.warn(logPrefix, 'Unknown type: ' + request.params.type)
        response.status(404).send('Unknown type: ' + request.params.type)
    } else {
        var promises = []
        types.forEach(type => {
            promises.push(new Promise((resolve, reject) => {
                utls.getNotCashedTables(request, type).then(data => {
                    var retData = {}
                    retData[reversedTypes[type]] = data
                    resolve(retData)
                }).catch(err => {
                    reject(err)
                })
            }))
        })
        Promise.all(promises).then(data => {
            response.status(200).send(data)
        }).catch(err => {
            response.status(500).send(err)
        })
    }
})
router.get('/getNotServedItemsByTable/:type/:tableId', (request, response) => {
    var logPrefix = '[' + [request.method, request.url].join(' ') + ']'
    logger.info(logPrefix)
    var types = productType[request.params.type]
    var id = Number(request.params.tableId)
    if (!Number.isInteger(id)) {
        logger.warn(logPrefix, 'TableId is not valid: ' + id)
        response.status(404).send('TableId is not valid: ' + id)
    } else if (types === undefined) {
        logger.warn(logPrefix, 'Unknown type: ' + request.params.type)
        response.status(404).send('Unknown type: ' + request.params.type)
    } else {
        var promises = []
        types.forEach(type => {
            promises.push(new Promise((resolve, reject) => {
                utls.getNotServedItemsByTable(request, type, id).then(data => {
                    var retData = {}
                    retData[reversedTypes[type]] = data
                    resolve(retData)
                }).catch(err => {
                    reject(err)
                })
            }))
        })
        Promise.all(promises).then(data => {
            response.status(200).send(data)
        }).catch(err => {
            response.status(500).send(err)
        })
    }
})
router.get('/getNotCashedItemsByTable/:type/:tableId', (request, response) => {
    var logPrefix = '[' + [request.method, request.url].join(' ') + ']'
    logger.info(logPrefix)
    var types = productType[request.params.type]
    var id = Number(request.params.tableId)
    if (!Number.isInteger(id)) {
        logger.warn(logPrefix, 'TableId is not valid: ' + id)
        response.status(404).send('TableId is not valid: ' + id)
    } else if (types === undefined) {
        logger.warn(logPrefix, 'Unknown type: ' + request.params.type)
        response.status(404).send('Unknown type: ' + request.params.type)
    } else {
        var promises = []
        types.forEach(type => {
            promises.push(new Promise((resolve, reject) => {
                utls.getNotCashedItemsByTable(request, type, id).then(data => {
                    var retData = {}
                    retData[reversedTypes[type]] = data
                    resolve(retData)
                }).catch(err => {
                    reject(err)
                })
            }))
        })
        Promise.all(promises).then(data => {
            response.status(200).send(data)
        }).catch(err => {
            response.status(500).send(err)
        })
    }
})

router.get('/getOrder/:id/:type', (request, response) => {
    var logPrefix = '[' + [request.method, request.url].join(' ') + ']'
    logger.info(logPrefix)
    var id = request.params.id
    var types = productType[request.params.type]
    if (id !== 'undefined') {
        if (types === undefined) {
            logger.warn(logPrefix, 'Unknown type: ' + request.params.type)
            response.status(404).send('Unknown type: ' + request.params.type)
        } else {
            var promises = []
            types.forEach(type => {
                promises.push(new Promise((resolve, reject) => {
                    utls.getOrder(request, id, type).then(data => {
                        var retData = {}
                        retData[reversedTypes[type]] = data
                        resolve(retData)
                    }).catch(err=> {
                        reject(err)
                    })
                }))
            })
            Promise.all(promises).then(data => {
                response.status(200).send(data)
            }).catch(err => {
                response.status(500).send(err)
            })
        }
    } else {
        logger.error(logPrefix, 'Undefined ID!')
        response.status(500).send('Undefined ID!')
    }
})

router.post('/updateServed/:id/:type', (request, response) => {
    var logPrefix = '[' + [request.method, request.url].join(' ') + ']'
    logger.info(logPrefix)
    var id = request.params.id
    var type = request.params.type
    request.body.name = request.body.name || 'served'
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

router.post('/updateCashed/:id/:type', (request, response) => {
    var logPrefix = '[' + [request.method, request.url].join(' ') + ']'
    logger.info(logPrefix)
    var id = request.params.id
    var type = request.params.type === 'food' ? 'Essen' : 'Trinken'
    var item = request.body.item
    var value = request.body.value
    if (item === 'all') {
        utls.updateOrder(request, id, type, {name:'cashed', value:'Stueck'}).then(data => {
            response.status(200).send(data)
        }).catch(err => {
            response.status(500).send(err)
        })
    } else {
        utls.updateCashed(request, id, type, item, value).then(data => {
            response.status(200).send(data)
        }).catch(err => {
            response.status(500).send(err)
        })
    }
})

module.exports = router