import 'angular-ui-router';
import 'angular-ui-bootstrap';

export default function (angular) {
	var pantryModule = angular.module('pantry', ['ui.router', 'ui.bootstrap', 'common']);

	pantryModule
		.run(run);

	function run ($http) {

		// add angular to global for easier debugging
		if (PANTRY.config.env == 'dev')
			window.angular = angular;

		// set common request headers for whole app
		$http.defaults.headers.common['Content-Type'] = 'application/json';
	}
	
	return pantryModule;
};
