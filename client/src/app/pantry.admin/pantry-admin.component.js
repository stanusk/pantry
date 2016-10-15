
class PantryAdminCtrl {
	constructor (AppService) {
		"ngInject";
		this.app = AppService;
	}

	$onInit () {
		this.invalid = {
			newItem: false,
			newUser: false
		};
	}

	addItem (itemName) {
		this.app.addItem(itemName)
			.then( createdItem => {
				var item = {
					_id: createdItem._id,
					name: createdItem.name
				};
				this.items.push(item);
				this.resetInput('newItem');
			})
		;

		// todo: add error handler modal (BE duplicity check)
	}

	removeItem (itemId) {
		this.app.removeItem(itemId)
			.then( removedItem => {
				this.items.forEach( (item, index) => {
					if (removedItem._id == item._id) {
						this.items.splice(index, 1);
					}
				});
			})
		;
	}

	addUser (userName) {
		this.app.addUser(userName)
			.then( createdUser => {
				var user = {
					_id: createdUser._id,
					name: createdUser.name
				};
				this.users.push(user);
				this.resetInput('newUser');

			})
		;

		// todo: add error handler modal (BE duplicity check)
	}

	removeUser (userId) {
		this.app.removeUser(userId)
			.then( removedUser => {
				this.users.forEach( (user, index) => {
					if (removedUser._id == user._id) {
						this.users.splice(index, 1);
					}
				});
			})
		;
	}

	validate (name, type) {
		if (!this[type])
			return;

		var records = this[type];
		var target = type == 'items' ? 'newItem' : 'newUser';

		var duplicate = records.filter( rec => { return rec.name == name;})[0];

		this.invalid[target] = !!duplicate;
	}

	////////////////////////////////////////////////
	// helpers

	resetInput (inputType) {
		if (this[inputType])
			this[inputType] = null;
	}
}

export const pantryAdmin = {
	template: require('./pantry-admin.html'),
	controller: PantryAdminCtrl,
	bindings: {
		items: '<',
		users: '<'
	}
};