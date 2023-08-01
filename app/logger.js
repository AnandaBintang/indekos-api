const winston = require("winston");

// Buat instance logger
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logs/error.log", level: "error" }),
    new winston.transports.File({ filename: "logs/combined.log" }),
  ],
});

// Tambahkan format log kustom dengan informasi pengguna
const logFormat = winston.format.printf(
  ({ level, message, timestamp, user }) => {
    return `${timestamp} [${level}] ${user ? `User: ${user}. ` : ""}${message}`;
  }
);

// Tambahkan format log kustom ke logger
logger.add(
  new winston.transports.Console({
    format: winston.format.combine(winston.format.timestamp(), logFormat),
  })
);

module.exports = logger;
