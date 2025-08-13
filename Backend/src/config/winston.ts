import winston from 'winston';
import config from '../config/config';
import util from 'util';

// Custom formatter to replicate console.log behaviour
const combineMessageAndSplat = () => {
  return {
    transform: (info) => {
      //combine message and args if any
      info.message = util.format(info.message, ...(info[Symbol.for('splat')] || []));
      return info;
    }
  };
};

/******* Define Transports *******/
/**
 * Default Winston Logging Levels -
 * (Lower value has higher priority)
 *   error: 0
 *   warn: 1
 *   info: 2
 *   http: 3
 *   verbose: 4
 *   debug: 5
 *   silly: 6
 */

// The console transport logs EVERYTHING! Ideal for dev conditions.
const consoleTransport = new winston.transports.Console({
  level: 'silly', // log data if it's level is higher or equal to this level
  handleExceptions: true,
  format: winston.format.combine(
    winston.format.errors({ stack: true }),
    combineMessageAndSplat(),
    winston.format.timestamp({ format: 'HH:mm:ss.SSS' }),
    winston.format.colorize(),
    winston.format.printf(
      ({ level, message, timestamp, stack }) => `${timestamp} ${level}: ${message} ${stack || ''}`
    )
  )
});

if (config.env !== 'local') {
  /* Use a console transport with json formatting for monitering tools
  which take sdtout/stderr as input stream.
  */

  consoleTransport.format = undefined;
  consoleTransport.level = 'debug';
}

// Create logger
const loggerConfig = {
  defaultMeta: {
    serviceName: 'assessement-service',
    environment: process.env.NODE_ENV
  },
  transports: [consoleTransport],
  exitOnError: true,
  format: winston.format.combine(
    winston.format.errors({ stack: true }),
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
    winston.format.json({ space: 2 }),
    winston.format.prettyPrint()
  )
};

export default loggerConfig;
