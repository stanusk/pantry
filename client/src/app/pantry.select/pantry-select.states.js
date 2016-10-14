
export const pantrySelectState = {
	name: 'pantry.select',
	url: '/select',
	component: 'pantrySelect',
	resolve: {
		items: function (app) {
			return app.getItems();
		},
		users: function (app) {
			return app.getUsers();
		}
	}
};
