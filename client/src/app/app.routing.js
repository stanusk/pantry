export default function (appModule) {

	appModule.config(config);

	function config ($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/pantry/list');

		$stateProvider
			.state(
				'pantry',
				{
					abstract: true,
					url: '/pantry',
					template: require('./app.html'),
					resolve: {
						items: function (app) {
							return app.getItems();
						},
						users: function (app) {
							return app.getUsers();
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
					template: require('./list/pantry-list.html'),
					controller: 'pantryListCtrl',
					controllerAs: 'vm'
				}
			)
			.state(
				'pantry.stats',
				{
					url: '/stats',
					template: require('./stats/pantry-stats.html'),
					controller: 'pantryStatsCtrl',
					controllerAs: 'vm'
				}
			)
			.state(
				'pantry.admin',
				{
					url: '/admin',
					template: require('./admin/pantry-admin.html'),
					controller: 'pantryAdminCtrl',
					controllerAs: 'vm'
				}
			)
		;
	}
}