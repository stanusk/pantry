
export default function (appModule) {

	appModule.config(config);

	function config ($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/pantry/select');

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
				'pantry.stats',
				{
					url: '/stats',
					template: require('./stats/pantry-stats.html'),
					controller: 'pantryStatsCtrl',
					controllerAs: 'vm'
				}
			)
		;
	}
}