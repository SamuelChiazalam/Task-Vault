const logger = require("../utils/logger");

// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.userId) {
    logger.info("User authenticated", { userId: req.session.userId });
    return next();
  }

  logger.warn("Unauthorized access attempt");
  res.redirect("/auth/login");
};

// Middleware to redirect if already logged in
const isNotAuthenticated = (req, res, next) => {
  if (req.session && req.session.userId) {
    return res.redirect("/todos");
  }
  next();
};

module.exports = { isAuthenticated, isNotAuthenticated };
