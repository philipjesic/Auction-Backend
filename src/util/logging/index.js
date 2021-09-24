const {createLogger, format, transports} = require('winston');
const {combine, timestamp, label, printf} = format;

const myFormat = printf(({level, message, label, timestamp}) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const devLogger = createLogger({
  format: combine(
      format.colorize(),
      label({label: `APP - ${process.env.NODE_ENV}`}),
      timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
      format.errors({stack: true}),
      myFormat,
  ),
  // defaultMeta: {service: 'user-service'},
  transports: [
    //
    // - Write all logs with level `error` and below to `error.log`
    // - Write all logs with level `info` and below to `combined.log`
    //
    // new winston.transports.File({filename: 'error.log', level: 'error'}),
    // new winston.transports.File({filename: 'combined.log'}),
    new transports.Console({level: 'info'}),
    new transports.File({
      filename: `${__dirname}/combined.log`,
      level: 'info'}),
  ],
});

const prodLogger = createLogger({
  format: combine(
      format.colorize(),
      label({label: 'right meow!'}),
      timestamp(),
      format.errors({stack: true}),
      myFormat,
  ),
  // defaultMeta: {service: 'user-service'},
  transports: [
    //
    // - Write all logs with level `error` and below to `error.log`
    // - Write all logs with level `info` and below to `combined.log`
    //
    // new winston.transports.File({filename: 'error.log', level: 'error'}),
    // new winston.transports.File({filename: 'combined.log'}),
    new transports.Console(),
    new transports.File({filename: 'combined.log'}),
  ],
});

let logger;

if (process.env.NODE_ENV === 'development') {
  logger = devLogger;
} else {
  logger = prodLogger;
}

module.exports = logger;
