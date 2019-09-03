var check = require('./checkhandler')
var config = require('./confighandler')
var mapping = require('./mappinghandler')
var override = require('./overridehandler')

module.exports = {
    isBackendCall: check.isBackendCall,
    getOverrides: config.getOverrides,
    getMappings: mapping.getMappings,
    checkOverrides: override.checkOverrides
}