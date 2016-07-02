;(function () {
	"use strict";
	angular.module('pantry').config(config);

	function config ($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/pantry/list');

		$stateProvider
			.state(
				'pantry',
				{
					abstract: true,
					url: '/pantry',
					templateUrl: 'app/app.html'
				}
			)
			.state(
				'pantry.list',
				{
					url: '/list',
					template: '<pantry-list></pantry-list>'
				}
			)
			.state(
				'pantry.stats',
				{
					url: '/stats',
					template: '<pantry-stats></pantry-stats>'
				}
			)
			.state(
				'pantry.admin',
				{
					url: '/admin',
					template: '<pantry-admin></pantry-admin>'
				}
			)
		;
	}
})();