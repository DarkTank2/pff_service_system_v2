'use strict'

var bunyan = require('bunyan')
var PrettyStream = require('bunyan-prettystream')
var fs = require('fs')

var myStream = fs.createWriteStream('./logfile.log')

var prettyStdOut = new PrettyStream()
prettyStdOut.pipe(process.stdout)
var prettyFile = new PrettyStream({useColor: false})
prettyFile.pipe(myStream)

module.exports = function (loggername) {
    return bunyan.createLogger({
      name: loggername,
      streams: [
        {
          level: 'warn',
          type: 'raw',
          stream: prettyFile
        },
        {
          level: 'trace',
          type: 'raw',
          stream: prettyStdOut
        }
      ],
      level: 'trace',
      src: true
    });
  }
  