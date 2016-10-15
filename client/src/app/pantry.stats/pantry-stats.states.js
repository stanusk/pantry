
export const pantryStatsState = {
	name: 'pantry.stats',
	url: '/stats',
	component: 'pantryStats',
	require: {
		users: AppService => {
			"ngInject";
			return AppService.getUsers();
		}
	}
};