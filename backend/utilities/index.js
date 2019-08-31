'use strict'

var dbConnector = require('./dbConnector.js')

module.exports = {
    getFood: dbConnector.getFood,
    getDrinks: dbConnector.getDrinks,
    getCategories: dbConnector.getCategories,
    putOrder: dbConnector.putOrder
}