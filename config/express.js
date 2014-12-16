var express = require('express');
var glob = require('glob');

var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compress = require('compression');
var methodOverride = require('method-override');

module.exports = function(app, config) {
    app.set('views', config.root + '/app/views');
    app.set('view engine', 'jade');

    // app.use(favicon(config.root + '/public/img/favicon.ico'));
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(cookieParser());
    app.use(compress());
    app.use(express.static(config.root + '/public'));
    app.use(methodOverride());

    global.appRoot =config.root;

//  var controllers = glob.sync(config.root + '/app/controllers/*.js');
//  controllers.forEach(function (controller) {
//    require(controller)(app);
//  });
    app.get('/:controller/:action', function (req, res, next) {
        var controller = require('../app/controllers/' + req.params.controller + 'Controller');
        controller[req.params.action](req,res)
    });
    app.post('/:controller/:action', function (req, res, next) {
        var controller = require('../app/controllers/' + req.params.controller + 'Controller');
        controller[req.params.action](req,res)
    });

    app.use(function (req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    if(app.get('env') === 'development'){
        app.use(function (err, req, res, next) {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: err,
                title: 'error'
            });
        });
    }

    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {},
            title: 'error'
        });
    });

};
