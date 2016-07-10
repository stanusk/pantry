;(function() {

	'use strict';

	/**
	 * App configuration inluding MongoDB env settings, API route folder etc.
	 */

	var path = require('path');
	var root = path.normalize(__dirname + '/..');

	var settings = {
		db: {
			// local dev db
			development: {
				url: 'mongodb://localhost/pantrydev'
			},
			// local test db
			test: {
				url: 'mongodb://localhost/pantrytest'
			},
			// TODO: 
			// prod db
			production: {
 				 url: ''
			}
		},
		root: root,
		apiRoute: '/api/v1/',
		secret: 'mySuperTopSecret2016word:)'
	};

	module.exports = settings;

})();
