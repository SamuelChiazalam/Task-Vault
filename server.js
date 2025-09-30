const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const path = require('path');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const todoRoutes = require('./routes/todos');
const logger = require('./utils/logger');

const app = express();
const PORT = process.env.PORT || 7000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    logger.info('Connected to MongoDB successfully');
    console.log('✅ Connected to MongoDB');
  })
  .catch((err) => {
    logger.error('MongoDB connection error', err);
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || aue7372b3c4d5e6f7g8h9i0jkl$nopq&stu,
  resave: false,
  saveUninitialized: false,
  cookie: { 
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    httpOnly: true
  }
}));

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Make user available to all views
app.use((req, res, next) => {
  res.locals.user = req.session.userId || null;
  next();
});

// Routes
app.get('/', (req, res) => {
  if (req.session.userId) {
    res.redirect('/todos');
  } else {
    res.redirect('/auth/login');
  }
});

app.use('/auth', authRoutes);
app.use('/todos', todoRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  logger.error('Global error handler', err);
  
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Something went wrong!';
  
  // Log the error
  console.error('❌ Error:', message);
  
  // Send appropriate response
  if (req.accepts('html')) {
    res.status(statusCode).render('error', { 
      message, 
      error: process.env.NODE_ENV === 'development' ? err : {} 
    });
  } else {
    res.status(statusCode).json({ 
      success: false, 
      message,
      error: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }
});

// 404 Handler
app.use((req, res) => {
  res.status(404).send('Page not found');
});

// Start server
app.listen(PORT, () => {
  logger.info(`Server started on port ${PORT}`);
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});