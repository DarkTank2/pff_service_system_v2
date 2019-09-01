var logger = new (require('../logger'))('dbConnector')
const mariadb = require('mariadb')
const moment = require('moment')

const credentials = require('./credentials.json')

const pool = mariadb.createPool({
    host: 'localhost',
    user: credentials.username,
    password: credentials.password,
    connectionLimit: 5,
    database: 'mydb'
})

function getItems(request, type) {
    var logPrefix = '[' + [request.method, request.url].join(' ') + ']'
    logger.info(logPrefix, '[getItems()]')
    return new Promise((resolve, reject) => {
        var query = 'select * from ' + type + ';'
        pool.getConnection().then(con => {
            logger.debug(logPrefix, 'Connection established')
            logger.info(logPrefix, '[Query] ' + query)
            con.query(query).then(data => {
                con.end()
                resolve(data)
            })
            .catch(err => {
                logger.error(logPrefix, err)
                con.end()
                reject(err)
            })
        })
        .catch(err => {
            logger.error(logPrefix, err)
            reject(err)
        })
    })
}

function addItems(request, type) {
    var logPrefix = '[' + [request.method, request.url].join(' ') + ']'
    logger.info(logPrefix, '[addItems()]')
    return new Promise((resolve, reject) => {
        var query = 'insert into ' + type + ' (Name, pictureName, category, depleted, price) values (?, ?, ?, ?, ?);'
        pool.getConnection().then(con => {
            logger.debug(logPrefix, 'Connection established')
            var promises = []
            request.body.forEach(item => {
                logger.info(logPrefix, '[Query]   ' + query)
                logger.info(logPrefix, '[Options] ' + '[' + [item.Name, item.pictureName, item.category, false, item.price].join(', ') + ']')
                promises.push(con.query(query, [item.Name, item.pictureName, item.category, false, item.price]))
            })
            Promise.all(promises).then(data => {
                con.end()
                resolve(data)
            })
            .catch(err => {
                logger.error(logPrefix, err)
                con.end()
                reject(err)
            })
        })
        .catch(err => {
            logger.error(logPrefix, err)
            reject(err)
        })
    })
}

function addTables(request) {
    var logPrefix = '[' + [request.method, request.url].join(' ') + ']'
    logger.info(logPrefix, '[addTables()]')
    return new Promise((resolve, reject) => {
        var query = 'insert into Tisch (Number) values (?);'
        pool.getConnection().then(con => {
            logger.debug(logPrefix, 'Connection established')
            var promises = []
            request.body.forEach(table => {
                logger.info(logPrefix, '[Query]   ' + query)
                logger.info(logPrefix, '[Options] ' + '[' + table.Number + ']')
                promises.push(con.query(query, [table.Number]))
            })
            Promise.all(promises).then(data => {
                con.end()
                resolve(data)
            })
            .catch(err => {
                logger.error(logPrefix, err)
                con.end()
                reject(err)
            })
        })
        .catch(err => {
            logger.error(logPrefix, err)
            reject(err)
        })
    })
}

function getTables(request) {
    var logPrefix = '[' + [request.method, request.url].join(' ') + ']'
    logger.info(logPrefix, '[getTable()]')
    return new Promise((resolve, reject) => {
        var query = 'select * from Tisch;'
        pool.getConnection().then(con => {
            logger.debug(logPrefix, 'Connection established')
            logger.info(logPrefix, '[Query] ' + query)
            con.query(query).then(data => {
                con.end()
                resolve(data)
            })
            .catch(err => {
                logger.error(logPrefix, err)
                con.end()
                reject(err)
            })
        })
        .catch(err => {
            logger.error(logPrefix, err)
            reject(err)
        })
    })
}

function getItemsByCategory(request, type, category) {
    var logPrefix = '[' + [request.method, request.url].join(' ') + ']'
    logger.info(logPrefix, '[getItemsByCategory()]')
    return new Promise((resolve, reject) => {
        var query = 'select * from ' + type + ' where category="' + category + '";'
        pool.getConnection().then(con => {
            logger.debug(logPrefix, 'Connection established')
            logger.info(logPrefix, '[Query] ' + query)
            con.query(query).then(data => {
                con.end()
                resolve(data)
            })
            .catch(err => {
                logger.error(logPrefix, err)
                con.end()
                reject(err)
            })
        })
        .catch(err => {
            logger.error(logPrefix, err)
            reject(err)
        })
    })
}

function getCategories(request, type) {
    var logPrefix = '[' + [request.method, request.url].join(' ') + ']'
    logger.info(logPrefix, '[getCategories()]')
    return new Promise((resolve, reject) => {
        var query = 'select distinct category from ' + type + ' where depleted=false;'
        pool.getConnection().then(con => {
            logger.debug(logPrefix, 'Connection established')
            logger.info(logPrefix, '[Query] ' + query)
            con.query(query).then(data => {
                con.end()
                resolve(data)
            })
            .catch(err => {
                logger.error(logPrefix, err)
                con.end()
                reject(err)
            })
        })
        .catch(err => {
            logger.error(logPrefix, err)
            reject(err)
        })
    })
}

function placeOrder(request) {
    var logPrefix = '[' + [request.method, request.url].join(' ') + ']'
    logger.info(logPrefix, '[getCategories()]')
    var now = moment().format()
    return new Promise((resolve, reject) => {
        var insertOrderQuery = 'insert into Bestellung (Tisch_idTisch) values (?);'
        var insertOrderOptions = [request.body.idTisch]
        pool.getConnection().then(con => {
            logger.debug(logPrefix, 'Connection established')
            logger.info(logPrefix, '[Query]   ' + insertOrderQuery)
            logger.info(logPrefix, '[Options] ' + '[' + insertOrderOptions.join(' ') + ']')
            con.query(insertOrderQuery, insertOrderOptions).then(data => {
                var idBestellung = data.insertId // gets the id of the placed order
                logger.info(logPrefix, 'Added order with id: ' + idBestellung)
                var promises = []
                request.body.food.forEach(item => {
                    var insertItemOrderQuery = 'insert into BestellungEssen (Bestellung_idBestellung, Essen_idEssen, Stueck, finished, served, timePlaced, timeFinished, timeServed) values (?, ?, ?, ?, ?, ?, ?, ?);'
                    var insertItemOrderOptions = [idBestellung, item.idEssen, item.Stueck, false, false, now, '', '']
                    logger.info(logPrefix, '[Query]   ' + insertItemOrderQuery)
                    logger.info(logPrefix, '[Options] ' + '[' + insertItemOrderOptions.join(' ') + ']')
                    promises.push(con.query(insertItemOrderQuery, insertItemOrderOptions))
                })
                request.body.drinks.forEach(item => {
                    var insertItemOrderQuery = 'insert into BestellungTrinken (Bestellung_idBestellung, Trinken_idTrinken, Stueck, finished, served, timePlaced, timeFinished, timeServed) values (?, ?, ?, ?, ?, ?, ?, ?);'
                    var insertItemOrderOptions = [idBestellung, item.idTrinken, item.Stueck, false, false, now, '', '']
                    logger.info(logPrefix, '[Query]   ' + insertItemOrderQuery)
                    logger.info(logPrefix, '[Options] ' + '[' + insertItemOrderOptions.join(' ') + ']')
                    promises.push(con.query(insertItemOrderQuery, insertItemOrderOptions))
                })
                Promise.all(promises).then(data => {
                    con.end()
                    resolve(data)
                }).catch(err => {
                    logger.error(logPrefix, err)
                    con.end()
                    reject(err)
                })                
            }).catch(err => {
                logger.error(logPrefix, err)
                con.end()
                reject(err)
            })
        }).catch(err => {
            logger.error(logPrefix, err)
            reject(err)
        })
    })
}

module.exports = {
    getItems: getItems,
    addItems: addItems,
    addTables: addTables,
    getTables: getTables,
    getItemsByCategory: getItemsByCategory,
    getCategories: getCategories,
    placeOrder: placeOrder
}