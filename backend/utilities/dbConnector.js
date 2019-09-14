var logger = new (require('../logger'))('dbConnector')
const mariadb = require('mariadb')
const moment = require('moment')
const dbStructure = require('../dbStructure.json')

const credentials = require('./credentials.json')

    // var logPrefix = '[' + [request.method, request.url].join(' ') + ']'
    // logger.info(logPrefix, '[functionname()]')

const pool = mariadb.createPool({
    host: 'localhost',
    user: credentials.username,
    password: credentials.password,
    connectionLimit: 5,
    database: 'mydb'
})

function initDatabase() {
    logger.info('[initDatabase()]')
    pool.getConnection().then(con => {
        var promises = []
        dbStructure.forEach(entry => {
            logger.info('Table:', entry.table)
            logger.info('Query:', entry.query)
            promises.push(con.query(entry.query))
        })
        Promise.all(promises).then(() => {
            logger.info('Database successfully initialized')
        }).catch(err => {
            logger.err(err)
        })
    }).catch(err => {
        logger.error(err)
    })
}

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
        var query = 'select * from ' + type + ' where category="' + category + '" and depleted=false;'
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
    logger.info(logPrefix, '[placeOrder()]')
    var now = moment().format()
    return new Promise((resolve, reject) => {
        var insertOrderQuery = 'insert into Bestellung (Tisch_idTisch, commentEssen, commentTrinken, Kellner) values (?, ?, ?, ?);'
        var body = request.body
        var insertOrderOptions = [body.idTisch, body.commentEssen, body.commentTrinken, body.Kellner]
        pool.getConnection().then(con => {
            logger.debug(logPrefix, 'Connection established')
            logger.info(logPrefix, '[Query]   ' + insertOrderQuery)
            logger.info(logPrefix, '[Options] ' + '[' + insertOrderOptions.join(' | ') + ']')
            con.query(insertOrderQuery, insertOrderOptions).then(data => {
                var idBestellung = data.insertId // gets the id of the placed order
                logger.info(logPrefix, 'Added order with id: ' + idBestellung)
                var promises = []
                request.body.food.forEach(item => {
                    var insertItemOrderQuery = 'insert into BestellungEssen (Bestellung_idBestellung, Essen_idEssen, Stueck, finished, served, timePlaced, timeFinished, timeServed) values (?, ?, ?, ?, ?, ?, ?, ?);'
                    var insertItemOrderOptions = [idBestellung, item.idEssen, item.Stueck, false, false, now, '', '']
                    logger.info(logPrefix, '[Query]   ' + insertItemOrderQuery)
                    logger.info(logPrefix, '[Options] ' + '[' + insertItemOrderOptions.join(' | ') + ']')
                    promises.push(con.query(insertItemOrderQuery, insertItemOrderOptions))
                })
                request.body.drinks.forEach(item => {
                    var insertItemOrderQuery = 'insert into BestellungTrinken (Bestellung_idBestellung, Trinken_idTrinken, Stueck, finished, served, timePlaced, timeFinished, timeServed) values (?, ?, ?, ?, ?, ?, ?, ?);'
                    var insertItemOrderOptions = [idBestellung, item.idTrinken, item.Stueck, false, false, now, '', '']
                    logger.info(logPrefix, '[Query]   ' + insertItemOrderQuery)
                    logger.info(logPrefix, '[Options] ' + '[' + insertItemOrderOptions.join(' | ') + ']')
                    promises.push(con.query(insertItemOrderQuery, insertItemOrderOptions))
                })
                Promise.all(promises).then(data => {
                    con.end()
                    data.push({orderId: idBestellung})
                    resolve(data)
                }).catch(err => {
                    logger.error(logPrefix, err)
                    con.end()
                    var error = {
                        id: idBestellung,
                        msg: err
                    }
                    reject(error)
                })                
            }).catch(err => {
                logger.error(logPrefix, err)
                con.end()
                reject(err)
            })
        }).catch(err => {
            logger.error(logPrefix, err)
            if (err.code === 'ER_GET_CONNECTION_TIMEOUT') {
                logger.warn(logPrefix, 'Retrying!')
                placeOrder(request).then(data => resolve(data)).catch(err => reject(err))
            } else {
                reject(err.code)
            }
        })
    })
}

function getNotFinishedOrders(request, type) {
    var logPrefix = '[' + [request.method, request.url].join(' ') + ']'
    logger.info(logPrefix, '[getNotFinishedOrders()]')
    return new Promise((resolve, reject) => {
        // select name, Stück, idBestellung, Number 
        //      from Bestellung 
        //      join BestellungEssen 
        //      join Essen 
        //      join Tisch 
        //      where idBestellung = Bestellung_idBestellung 
        //      and Essen_idEssen = idEssen 
        //      and finished = '0' 
        //      and idTisch = Tisch_idTisch 
        //      order by idBestellung;
        var query = 'select Name, Stueck, idBestellung, Number '
            + 'from Bestellung '
            + 'join Bestellung' + type + ' '
            + 'join ' + type + ' '
            + 'join Tisch '
            + 'where finished=false '
            + 'and idBestellung = Bestellung_idBestellung '
            + 'and id' + type + ' = ' + type + '_id' + type + ' '
            + 'and idTisch = Tisch_idTisch '
            + 'order by idBestellung;'
        pool.getConnection().then(con => {
            logger.debug(logPrefix, 'Connection established')
            logger.info(logPrefix, '[Query] ' + query)
            con.query(query).then(data => {
                con.end()
                resolve(data)
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

function updateOrder(request, id,  type, flag) {
    var logPrefix = '[' + [request.method, request.url, flag.name + ': ' + flag.value].join(' ') + ']'
    logger.info(logPrefix, '[updateOrder()]')
    return new Promise((resolve, reject) => {
        var now = moment().format()
        var query = 'update Bestellung' + type + ' '
            + 'set ' + flag.name + '=' + flag.value + ','
            + 'time' + flag.name + '="' + now + '" '
            + 'where Bestellung_idBestellung=' + id + ';'
        pool.getConnection().then(con => {
            logger.debug(logPrefix, 'Connection established')
            logger.info(logPrefix, '[Query] ' + query)
            con.query(query).then(data => {
                con.end()
                resolve(data)
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

function updateDepletion(request, id, type, value) {
    var logPrefix = '[' + [request.method, request.url, value].join(' ') + ']'
    logger.info(logPrefix, '[updateDepletion()]')
    var now = moment().format()
    return new Promise((resolve, reject) => {
        var query = 'update ' + type + ' set depleted=' + value + ', timeDepleted="' + now + '" where id' + type + '=' + id + ';'
        pool.getConnection().then(con => {
            logger.debug(logPrefix, 'Connection established')
            logger.info(logPrefix, '[Query] ' + query)
            con.query(query).then(data => {
                con.end()
                resolve(data)
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

function getFinished(request, type) {
    var logPrefix = '[' + [request.method, request.url].join(' ') + ']'
    logger.info(logPrefix, '[getFinished()]')
    return new Promise((resolve, reject) => {
        var query = 'select distinct idBestellung, Number from Bestellung join Bestellung' + type + ' join Tisch where Tisch_idTisch=idTisch and idBestellung=Bestellung_idBestellung and finished=true and served=false;'
        pool.getConnection().then(con => {
            logger.debug(logPrefix, 'Connection established')
            logger.info(logPrefix, '[Query] ' + query)
            con.query(query).then(data => {
                con.end()
                resolve(data)
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

function getOrder(request, id, type) {
    var logPrefix = '[' + [request.method, request.url].join(' ') + ']'
    logger.info(logPrefix, '[getOrder()]')
    return new Promise((resolve, reject) => {
        var query = 'select * from Bestellung join Bestellung' + type + ' join ' + type + ' join Tisch where idBestellung=' + id + ' and idBestellung=Bestellung_idBestellung and idTisch=Tisch_idTisch and id' + type + '=' + type + '_id' + type + ';'
        pool.getConnection().then(con => {
            logger.debug(logPrefix, 'Connection established')
            logger.info(logPrefix, '[Query] ' + query)
            con.query(query).then(data => {
                con.end()
                resolve(data)
            }).catch(err => {
                logger.error(logPrefix, err)
                con.end()
                reject(err)
            })
        }).catch(err => {
            logger.error(lgPrefix, err)
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
    placeOrder: placeOrder,
    getNotFinishedOrders: getNotFinishedOrders,
    updateOrder: updateOrder,
    updateDepletion: updateDepletion,
    getFinished: getFinished,
    getOrder: getOrder,
    initDatabase: initDatabase
}