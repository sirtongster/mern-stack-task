const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

const { mongoose } = require('./database');
const app = express();

// Settings
app.set('port', process.env.PORT);
// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
// Routes
app.use('/api', require('./routes'));
// Statics
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;