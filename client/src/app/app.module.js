;(function () {
	'use strict';
	angular.module('pantry', ['ui.router', 'ui.bootstrap', 'common'])
		.run(run);

	function run ($http) {

		// add angular to global for easier debugging
		if (PANTRY.config.env == 'dev')
			window.angular = angular;

		// set common request headers for whole app
		$http.defaults.headers.common['Content-Type'] = 'application/json';
	}
})();
