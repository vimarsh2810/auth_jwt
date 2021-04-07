const express = require('express');
const morgan = require('morgan');

const authRouter = require('./routes/auth');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));

app.use('/auth', authRouter);

module.exports = app;