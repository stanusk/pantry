
export const pantryAdminState = {
	name: 'pantry.admin',
	url: '/admin',
	component: 'pantryAdmin',
	resolve: {
		items: function (app) {
			return app.getItems();
		},
		users: function (app) {
			return app.getUsers();
		}
	}
};