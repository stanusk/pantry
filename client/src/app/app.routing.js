
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
					template: require('./app.html')
				}
			)
		;
	}
}