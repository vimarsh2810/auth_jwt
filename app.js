const express = require('express');
const morgan = require('morgan');

const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));

app.use('/auth', authRouter);
app.use('/users/', usersRouter);

module.exports = app;