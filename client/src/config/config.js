;(function () {
	'use strict';
	
	// global config object
	window.PANTRY = {
		config: {}
	};

	PANTRY.config.env = getEnv();
	
	////////////////////////////////////////////////
	// helpers
	
	function getEnv () {
		var env = 'dev';
		
		if (location.host != 'localhost')
			env = 'prod';
		
		return env;
	}
	
	
})();