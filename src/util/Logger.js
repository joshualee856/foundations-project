const { createLogger, transports, format } = require("winston");

const logger = createLogger({
  level: "info", // log only messages with level 'info' and above
  format: format.combine(
    format.timestamp(),
    format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level}]: ${message}`;
    })
  ),
  transports: [
    new transports.File({ filename: "server.log" }), // log to a file
  ],
});

module.exports = logger;