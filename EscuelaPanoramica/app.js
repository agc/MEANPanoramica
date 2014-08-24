'use strict';

var express         = require('express');
var path            = require('path');
var favicon         = require('static-favicon');
var logger          = require('morgan');
var cookieParser    = require('cookie-parser');
var bodyParser      = require('body-parser');
var consolidate     = require('consolidate')

var app             = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.use(require('stylus').middleware(__dirname + '/public'));

var handlebars = require('express-handlebars').create({

    defaultLayout:'main',
    extname:'.hbs',

    helpers: {
        section: function(name, options){
            if(!this._sections) this._sections = {};
            this._sections[name] = options.fn(this);
            return null;
        },
        static: function(name) {
            var baseUrl=''
            return baseUrl+name;
        }
    },

    partialsDir:[ 'views/parciales']
});

app.engine('.hbs', handlebars.engine);
app.set('view engine', '.hbs');

app.engine('jade',consolidate.jade)
app.engine('ejs',consolidate.ejs)

//app.set('view engine', 'jade'); para que fuera por defecto

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static(path.join(__dirname, 'public/cellar/parte1')));

var rutas = require('./routes/rutas_app')

rutas(app)

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
