
export const pantrySelectState = {
	// todo: prerobit na pantry-select
	name: 'pantry.select',
	url: '/list',
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
