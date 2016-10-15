
export const pantryAdminState = {
	name: 'pantry.admin',
	url: '/admin',
	component: 'pantryAdmin',
	resolve: {
		items: AppService => {
			"ngInject";
			return AppService.getItems();
		},
		users: AppService => {
			"ngInject";
			return AppService.getUsers();
		}
	}
};