
export const pantryAdminState = {
	name: 'pantry.admin',
	url: '/admin',
	component: 'pantryAdmin',
	resolve: {
		items: AppService => {
			return AppService.getItems();
		},
		users: AppService => {
			return AppService.getUsers();
		}
	}
};