;(function() {

	'use strict';

	var errorHandling = {
		checkJsonContentType: checkJsonContentType,
		routeNotFound: routeNotFound,
		dev: dev,
		prod: prod
	};

	module.exports = errorHandling;
	
	var utils = require('./_shared/utils');

	// on javascript exception, print out nice stack
	process.on('uncaughtException', function(err) {
		console.log('');
		console.error(err.stack);
		process.exit();
	});


	function checkJsonContentType (req, res, next) {
		var contentType = req.header('Content-Type');
		var reqContentTypeIsJson = contentType && contentType.includes('application/json'); //es6

		// force content/type to be 'application/json'
		if (!utils.isEmptyObj(req.body) && !reqContentTypeIsJson)
		// 415 - Unsupported Media Type
			return next({
				message: 'Content-Type should be set to "application/json"!',
				status: 415
			});

		next();
	}

	function routeNotFound (req, res, next) {
		var err = new Error('API endpoint not found. Please double check URL and HTTP method.');
		err.status = 404;
		next(err);
	}

	function dev (utils, err, req, res, next) {
		if (!err) return next();
	
		var host = req.get('host');
		var reqUrl = req.protocol + '://' + req.get('host') + req.url;
		var status = err.status || 500;
		var detail = err.message || err.err.message || '';
	
		var errMsg = {
			status: status,
			detail: detail,
			stack: err.stack || err.err && err.err.stack,
			error: err
		};
	
		utils.sendJsonResponse(res, status, errMsg, reqUrl);
	}

	function prod (utils, err, req, res, next) {
		if (!err) return next();

		var status = err.status || 500;
		var detail = err.message || err.err.message || '';

		var errMsg = {
			status: status,
			detail: detail,
			error: {}
		};

		utils.sendJsonResponse(res, status, errMsg);
	}

})();
