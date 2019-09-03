var minimatch = require('minimatch')

function isBackendCall(request) {
    return minimatch(request.path, '/backend/**')
}

module.exports = {
    isBackendCall: isBackendCall
}