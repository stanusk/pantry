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
					templateUrl: 'app/list/pantry-list.html',
					controller: 'pantryListCtrl',
					controllerAs: 'vm',
					resolve: {
						items: function (app) {
							// TODO: redo for async use once BE done
							return app.getItems();
						},
						users: function (app) {
							// TODO: redo for async use once BE done
							return app.getUsers();
						}
					}
				}
			)
			.state(
				'pantry.stats',
				{
					url: '/stats',
					templateUrl: 'app/stats/pantry-stats.html',
					controller: 'pantryStatsCtrl',
					controllerAs: 'vm'
				}
			)
			.state(
				'pantry.admin',
				{
					url: '/admin',
					templateUrl: 'app/admin/pantry-admin.html',
					controller: 'pantryAdminCtrl',
					controllerAs: 'vm',
					resolve: {
						items: function (app) {
							// TODO: redo for async use once BE done
							return app.getItems();
						},
						users: function (app) {
							// TODO: redo for async use once BE done
							return app.getUsers();
						}
					}
				}
			)
		;
	}
})();