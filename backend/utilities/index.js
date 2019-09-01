'use strict'

var dbConnector = require('./dbConnector.js')

module.exports = {
    getItems: dbConnector.getItems,
    getCategories: dbConnector.getCategories,
    putOrder: dbConnector.putOrder,
    addItems: dbConnector.addItems,
    addTables: dbConnector.addTables,
    getTables: dbConnector.getTables,
    getItemsByCategory: dbConnector.getItemsByCategory,
    getCategories: dbConnector.getCategories,
    placeOrder: dbConnector.placeOrder
}