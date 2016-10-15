
export const pantrySelectState = {
	name: 'pantry.select',
	url: '/select',
	component: 'pantrySelect',
	resolve: {
		items: AppService => {
			return AppService.getItems();
		},
		users: AppService => {
			return AppService.getUsers();
		}
	}
};
