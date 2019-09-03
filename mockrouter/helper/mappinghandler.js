var minimatch = require('minimatch')
var config = require('../generalconfig.json')

function getTypemappings(type) {

    var mappings = config.mappings
    var typemappings = mappings.filter(mapping => mapping.type == type)
    return typemappings
}

function getMappings(path, type) {

    var typemappings = getTypemappings(type)

    var matchingmappings = typemappings.filter(mapping => {
        var minimatchresults = mapping.paths.map(mappingpath => minimatch(path, mappingpath))

        return minimatchresults.indexOf(true) > -1
    })
    return matchingmappings
}

module.exports = {
    getMappings: getMappings
}