;(function() {

	'use strict';

	var mongoose = require('mongoose');
	var config = require('./config.js');

	// local dev by default
	var ENV = 'development';
	
	if (process.env.NODE_ENV && process.env.NODE_ENV != ENV)
		ENV = process.env.NODE_ENV;
	
	var dbURI = config.db[ENV].url;

	console.log('======================================');
	console.log('  STARTING UP PANTRY NODEJS PROJECT  ');
	console.log('');
	console.log('	- NODE_ENV: ', process.env.NODE_ENV);
	console.log('	- ENV:      ', ENV);
	console.log('	- dbURI:    ', dbURI);
	console.log('');

	mongoose.connect(dbURI);

	// CONNECTION EVENTS
	mongoose.connection.on('connected', function() {
		console.log(`Mongoose connected to ${dbURI}`);
	});

	mongoose.connection.on('error', function(err) {
		console.log(`Mongoose connection error: ${err}`);
	});

	mongoose.connection.on('disconnected', function() {
		console.log('Mongoose disconnected');
	});

	mongoose.connection.once('open', function(err, data) {
		console.log('Mongo working!');
	});

	// CAPTURE APP TERMINATION / RESTART EVENTS
	// For nodemon restarts
	process.once('SIGUSR2', function() {
		gracefulShutdown('nodemon restart', function() {
			process.kill(process.pid, 'SIGUSR2');
		});
	});

	process.on('uncaughtException', function (err) {
	  console.log('Caught exception: ' + err);
	});

	// For app termination
	process.on('SIGINT', function() {
		gracefulShutdown('app termination', function() {
			process.exit(0);
		});
	});

	// To be called when process is restarted or terminated
	function gracefulShutdown(msg, callback) {
		mongoose.connection.close(function() {
			console.log(`Mongoose disconnected through ${msg}`);
			callback();
		});
	}

})();
