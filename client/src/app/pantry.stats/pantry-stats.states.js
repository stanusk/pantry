
export const pantryStatsState = {
	name: 'pantry.stats',
	url: '/stats',
	component: 'pantryStats',
	require: {
		users: AppService => {
			return AppService.getUsers();
		}
	}
};