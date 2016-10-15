
export const pantrySelectState = {
	name: 'pantry.select',
	url: '/select',
	component: 'pantrySelect',
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
