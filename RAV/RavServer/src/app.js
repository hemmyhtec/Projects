var express = require('express');
// var path = require('path');
const cors = require('cors')
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const {sequelize} = require('./models')
const config = require ('./config/Auth')


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public/')));
// app.use('/static', express.static(path.join(__dirname, 'public')))
app.use(express.static('public'))

// app.use('/', indexRouter);
// app.use('/users', usersRouter);
require('./route')(app)

sequelize.sync({force: false})
    .then(() => {
        app.listen(config.port)
        console.log(`Server started on Local Server port ${config.port}...`)
    })

module.exports = app;
