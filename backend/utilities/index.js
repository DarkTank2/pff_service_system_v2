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
    placeOrder: dbConnector.placeOrder,
    postCalcOrder: dbConnector.postCalcOrder,
    getNotFinishedOrders: dbConnector.getNotFinishedOrders,
    updateOrder: dbConnector.updateOrder,
    updateDepletion: dbConnector.updateDepletion,
    getFinished: dbConnector.getFinished,
    getOrder: dbConnector.getOrder,
    initDatabase: dbConnector.initDatabase,
    updateCashed: dbConnector.updateCashed,
    getNotServedTables: dbConnector.getNotServedTables,
    getNotCashedTables: dbConnector.getNotCashedTables,
    getNotServedItemsByTable: dbConnector.getNotServedItemsByTable,
    getNotCashedItemsByTable: dbConnector.getNotCashedItemsByTable,
    getTimeseries: dbConnector.getTimeseries,
    getAllItems: dbConnector.getAllItems
}