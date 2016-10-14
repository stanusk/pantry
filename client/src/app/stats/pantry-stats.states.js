
export const pantryStatsState = {
	name: 'pantry.stats',
	url: '/stats',
	component: 'pantryStats',
	require: {
		users: app => {
			return app.getUsers();
		}
	}
};