'use strict';

var express = require('express');
var kraken = require('kraken-js');
var db=require('./lib/db');
var flash=require('connect-flash');


var options, app;


options = {
    onconfig: function (config, next) {
        
        db.config(config.get('databaseConfig'));
        next(null, config);
    }
};

app = module.exports = express();
app.use(kraken(options));

//Connecting Flash
app.use(flash());
app.use(function (req, res, next) {
   res.locals.message=require('express-messages')(req, res);
   next();
});

app.on('start', function () {
    console.log('Application ready to serve requests.');
    console.log('Environment: %s', app.kraken.get('env:env'));
});
