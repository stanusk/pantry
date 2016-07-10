;(function() {

	'use strict';

	/*============================
	=            Base            =
	============================*/
	var express = require('express');
	var config = require('../config/config.js');
	var path = require('path');
	var errorHandling = require('./app.error-handling.js');

	/*=============================
	=            Utils            =
	=============================*/
	var utils = require('./_shared/utils.js');

	/*==================================
	=            Middleware            =
	==================================*/
	var bodyParser = require('body-parser');

	/*==========================
	=            DB            =
	==========================*/
	require('../config/db.js');

	/*==============================
	=            Routes            =
	==============================*/
	var routes = require('./app.router.js');

	/*===========================================
	=            Fire up express app            =
	===========================================*/
	var app = express();

	/**
	 * Standard middleware
	 */
	app.use(bodyParser.json());
	app.use(bodyParser.text());
	app.use(bodyParser.urlencoded({ extended: false }));

	/**
	 * Content-type json type check
	 */
	app.use(function(req, res, next) {
		errorHandling.checkJsonContentType(req, res, next);
	});


	/**
	 * Router
	 */
	app.use(config.apiRoute, routes);


	/*======================================
	=            Error handling            =
	======================================*/

	/**
	 * Catch 404 and forward to error handler
	 */
	app.use(function(req, res, next) {
		errorHandling.routeNotFound(req, res, next);
	});

	/**
	 * Development error handler
	 * will print stacktrace
	 */
	if (app.get('env') === 'development') {
		app.use(function(err, req, res, next) {
			errorHandling.dev(utils, err, req, res, next);
		});
	}

	/**
	 * production error handler
	 * no stacktraces leaked to user
	 */
	app.use(function(err, req, res, next) {
		errorHandling.prod(utils, err, req, res, next);
	});


	/**
	 * App start
	 */
	if (process.env.NODE_ENV != 'production') {

		// LOCAL
		var PORT = process.env.PORT || 5000;
		app.listen(PORT, 'localhost', function() {
			console.log(`Express server listening on port ${PORT} in LOCAL DEVELOPMENT mode`);
		});
	}
	else {

		// PRODUCTION
		var PORT = process.env.PORT || 5000;
		app.listen(PORT, function() {
			console.log('Node app is running at localhost:' + PORT)
		});
	}

	module.exports = app;

})();
