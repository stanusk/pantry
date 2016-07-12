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
					templateUrl: 'app/app.html',
					resolve: {
						items: function (app) {
							return app.getItems().then(
								function (res) {
									return res.data.data;
								},
								function (err) {
									console.log(err);
								}
							);
						},
						users: function (app) {
							return app.getUsers().then(
								function (res) {
									return res.data.data;
								},
								function (err) {
									console.log(err);
								}
							);
						}
					},
					controller: function ($scope, items, users) {
						$scope.items = items;
						$scope.users = users;
					}
				}
			)
			.state(
				'pantry.list',
				{
					url: '/list',
					templateUrl: 'app/list/pantry-list.html',
					controller: 'pantryListCtrl',
					controllerAs: 'vm'
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
					controllerAs: 'vm'
				}
			)
		;
	}
})();