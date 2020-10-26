var winston = require("winston"),
  expressWinston = require("express-winston");

const winstonLogger = expressWinston.logger({
  transports: [new winston.transports.File({ filename: './logs/all.log' })],
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.colorize(),
    winston.format.json()
  ),
});

const winstonErrorLogger = expressWinston.errorLogger({
  transports: [new winston.transports.File({ filename: './logs/error.log' })],
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.colorize(),
    winston.format.json()
  ),
});

export { winstonLogger, winstonErrorLogger };
