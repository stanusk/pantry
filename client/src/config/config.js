;(function () {
	'use strict';
	
	// global config object
	window.PANTRY = {
		config: {}
	};

	PANTRY.config.env = getEnv();
	PANTRY.config.apiLink = getApiLink(PANTRY.config.env);
	
	////////////////////////////////////////////////
	// helpers
	
	function getEnv () {
		var env = 'development';
		
		if (!/localhost/.test(location.host))
			env = 'production';
		
		return env;
	}

	function getApiLink (env) {
		var apiConfigs = {
			// local dev
			development: {
				url: 'http://localhost:5000/api/v1/'
			},
			// production
			production: {
				url: 'api/v1/'
			}
		};

		return apiConfigs[env].url;
	}
	
	
})();