;(function() {

	'use strict';

	/**
	 * App configuration inluding MongoDB env settings, API route folder etc.
	 */

	var path = require('path');
	var root = path.normalize(__dirname + '/..');

	var settings = {
		db: {
			// lokalny vyvoj
			development: {
				url: 'mongodb://localhost/pantrydev'
			},
			// TODO: 
			// PRODUKCNA verzia
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
