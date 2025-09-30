const fs = require("fs");
const path = require("path");

// Create logs directory if it doesn't exist
const logsDir = path.join(__dirname, "..", "logs");
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

const logFile = path.join(logsDir, "app.log");

// Format log message
const formatLog = (level, message, data = {}) => {
  const timestamp = new Date().toISOString();
  const logData = Object.keys(data).length > 0 ? JSON.stringify(data) : "";
  return `[${timestamp}] [${level}] ${message} ${logData}\n`;
};

// Write log to file
const writeLog = (level, message, data) => {
  const logMessage = formatLog(level, message, data);
  fs.appendFile(logFile, logMessage, (err) => {
    if (err) console.error("Error writing to log file:", err);
  });
};

const logger = {
  info: (message, data = {}) => {
    writeLog("INFO", message, data);
  },

  warn: (message, data = {}) => {
    writeLog("WARN", message, data);
  },

  error: (message, error = {}) => {
    const errorData = {
      message: error.message,
      stack: error.stack,
    };
    writeLog("ERROR", message, errorData);
  },
};

module.exports = logger;
