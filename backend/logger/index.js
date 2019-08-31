'use strict'

var bunyan = require('bunyan')
var PrettyStream = require('bunyan-prettystream')

var prettyStdOut = new PrettyStream()
prettyStdOut.pipe(process.stdout)

module.exports = function (loggername) {
    return bunyan.createLogger({
      name: loggername,
      stream: prettyStdOut,
      level: 'trace',
      src: true
    });
  }
  