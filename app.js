const express = require('express');
const morgan = require('morgan');
const createError = require('http-errors');

const authRouter = require('./routes/auth.route.js');
const usersRouter = require('./routes/users.route.js');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));

app.use('/auth', authRouter);
app.use('/users/', usersRouter);

// throws 404 if URL not found
app.use((req, res, next) => {
  next(createError.NotFound());
});

// Error Handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    status: err.status || 500,
    success: false,
    message: err.message,
  });
});

module.exports = app;