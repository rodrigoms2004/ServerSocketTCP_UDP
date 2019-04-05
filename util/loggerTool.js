
const winston = require('winston')
const moment = require('moment')
require('winston-daily-rotate-file')
const conf = require('../config/config')

const transports = [
    new winston.transports.DailyRotateFile({
        name: 'logs',
        filename: conf.logdir + 'access%DATE%.log',
        maxSize: '1000k',
        maxFiles: '15d',
        zippedArchive: false
    }),
    new winston.transports.DailyRotateFile({
        level: 'error',
        name: 'logs',
        filename: conf.logdir + 'error%DATE%.log',
        maxSize: '1000k',
        maxFiles: '15d',
        zippedArchive: false
    }),
    new winston.transports.Console({
        colorize: true
    })
]

const logger = winston.createLogger({
    // format: winston.format.json(),
    // defaultMeta: { timestamp: new Date() },
    transports: transports
})


// if (process.env.NODE_ENV !== 'production') {
//     logger.add(new winston.transports.Console({ format: winston.format.simple() }))
// }

const log = async (service, level, msg) => {
    logger.log({
        timestamp: moment().format('YYYY-MM-DD HH:mm:ss.SSSS'),
        service: service,
        level: level,
        message: msg
    })
}   // end infoLog


module.exports = { log }
