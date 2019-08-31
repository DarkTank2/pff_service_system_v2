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

function getFood(request) {
    var logPrefix = '[' + [request.method, request.url].join(' ') + ']'
    logger.info(logPrefix, '[getFood()]')
    return new Promise((resolve, reject) => {
        var query = 'select * from Essen where depleted=false;'
        pool.getConnection().then(con => {
            logger.debug(logPrefix, 'Connection established')
            logger.info(logPrefix, '[Query] ' + query)
            con.query(query).then(rows => {
                var data = []
                rows.forEach(element => {
                    if(element != 'meta') {
                        data.push(element)
                    }
                })
                resolve(data)
            })
            .catch(err => {
                logger.error(logPrefix, err)
                reject(err)
            })
        })
        .catch(err => {
            logger.error(logPrefix, err)
            reject(err)
        })
    })
}

module.exports = {
    getFood: getFood
}