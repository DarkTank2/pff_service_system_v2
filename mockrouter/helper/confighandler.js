var generalconfig = require("../generalconfig")

function getOverrides () {
    return generalconfig.localoverrides
}

module.exports = {
    getOverrides: getOverrides
}
  