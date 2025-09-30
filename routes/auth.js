const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { isNotAuthenticated } = require("../middleware/auth");
const logger = require("../utils/logger");

// GET Login page
router.get("/login", isNotAuthenticated, (req, res) => {
  res.render("login", { error: null });
});

// POST Login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      logger.warn("Login attempt with missing credentials");
      return res.render("login", {
        error: "Username and password are required",
      });
    }

    // Find user
    const user = await User.findOne({ username });
    if (!user) {
      logger.warn("Login attempt with invalid username", { username });
      return res.render("login", { error: "Invalid username or password" });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      logger.warn("Login attempt with invalid password", { username });
      return res.render("login", { error: "Invalid username or password" });
    }

    // Set session
    req.session.userId = user._id;
    req.session.username = user.username;

    logger.info("User logged in successfully", { userId: user._id, username });
    res.redirect("/todos");
  } catch (error) {
    logger.error("Login error", error);
    res.render("login", { error: "An error occurred. Please try again." });
  }
});

// GET Signup page
router.get("/signup", isNotAuthenticated, (req, res) => {
  res.render("signup", { error: null });
});

// POST Signup
router.post("/signup", async (req, res) => {
  try {
    const { username, password, confirmPassword } = req.body;

    // Validate input
    if (!username || !password || !confirmPassword) {
      logger.warn("Signup attempt with missing fields");
      return res.render("signup", { error: "All fields are required" });
    }

    if (password !== confirmPassword) {
      logger.warn("Signup attempt with mismatched passwords");
      return res.render("signup", { error: "Passwords do not match" });
    }

    if (password.length < 6) {
      return res.render("signup", {
        error: "Password must be at least 6 characters long",
      });
    }

    if (username.length < 3) {
      return res.render("signup", {
        error: "Username must be at least 3 characters long",
      });
    }

    // Check if user exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      logger.warn("Signup attempt with existing username", { username });
      return res.render("signup", { error: "Username already exists" });
    }

    // Create user
    const user = new User({ username, password });
    await user.save();

    // Set session
    req.session.userId = user._id;
    req.session.username = user.username;

    logger.info("User signed up successfully", { userId: user._id, username });
    res.redirect("/todos");
  } catch (error) {
    logger.error("Signup error", error);
    res.render("signup", { error: "An error occurred. Please try again." });
  }
});

// GET Logout
router.get("/logout", (req, res) => {
  const userId = req.session.userId;
  req.session.destroy((err) => {
    if (err) {
      logger.error("Logout error", err);
    } else {
      logger.info("User logged out", { userId });
    }
    res.redirect("/auth/login");
  });
});

module.exports = router;
