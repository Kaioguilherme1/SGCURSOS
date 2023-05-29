const { createLogger, format, transports } = require('winston');

const databaseLogger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  defaultMeta: { service: 'Database' },
  transports: [
    new transports.File({ filename: './logs/database.log' })
  ]
});

const apiLogger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  defaultMeta: { service: 'API' },
  transports: [
    new transports.File({ filename: './logs/api.log' })
  ]
});

const requestLogger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.errors({ stack: true }),
        format.splat(),
        format.json()
    ),
    defaultMeta: { service: 'Request' },
    transports: [
        new transports.File({ filename: './logs/request.log' })
    ]

});

module.exports = {databaseLogger, apiLogger, requestLogger};