var appRoot = require('app-root-path');
const MESSAGE = Symbol.for('message');
var winston = require('winston');

// define the custom settings for each transport (file, console)
var options = {
    file: {
      level: 'info',
      filename: `${appRoot}/logs/app.log`,
      handleExceptions: true,
      json: true,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      colorize: false,
    },
    console: {
      level: 'debug',
      handleExceptions: true,
      json: false,
      colorize: true,
    },
  };

  var jsonFormatter = (logEntry) => {
    const base = { timestamp: new Date() };
    const json = Object.assign(base, logEntry)
    logEntry[MESSAGE] = JSON.stringify(json);
    return logEntry;
  }

  // creates a new Winston Logger with the settings defined above
  var logger = winston.createLogger({
    transports: [
      new winston.transports.File(options.file),
      new winston.transports.Console(options.console)
    ],
    format: winston.format(jsonFormatter)(),
    exitOnError: false, // do not exit on handled exceptions
  });


  // create a stream object with a 'write' function that will be used by `morgan`
  logger.stream = {
    write: function(message, encoding) {
      logger.info(message);
    },
  };

  module.exports = logger;