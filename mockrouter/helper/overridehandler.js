var path = require('path')
var minimatch = require('minimatch') //minimatch is used to test if the API is going to be mapped
var confighandler = require('./confighandler')

function checkOverrides (request, response, next) {
  var overrides = confighandler.getOverrides()
  var targetoverride = overrides.filter(override => {
    return minimatch(request.path, override.path)
  })[0]
  if (targetoverride) {
    console.log('[Override]', request.path)
    var filepath = path.join(__dirname, '../overrides', targetoverride.file)
    // TODO: provide the possibility to work with randoms
    response.status(200).sendFile(filepath)
  } else {
    next()
  }
}

module.exports = {
  checkOverrides: checkOverrides
}
