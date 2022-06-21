require('dotenv').config();
const express = require('express');
const dbConnection = require('../db/dbConnect');

const app = express();


//db conncetion
dbConnection();

const { notFoundHanlder, errroHanlder } = require('./error');

app.use(require('./middleware'));
app.use(require('./routes'));
app.use(notFoundHanlder);
app.use(errroHanlder);

module.exports = app;