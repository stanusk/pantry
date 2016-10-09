export default PantryAdminCtrl;

function PantryAdminCtrl ($scope, app) {
	"ngInject";
	
	var vm = this;

	vm.addItem = addItem;
	vm.removeItem = removeItem;
	vm.addUser = addUser;
	vm.removeUser = removeUser;
	vm.validate = validate;

	vm.items = $scope.items;
	vm.users = $scope.users;

	vm.invalid = {
		newItem: false,
		newUser: false
	};

	function addItem (itemName) {
		app.addItem(itemName).then(
			function (createdItem) {
				var item = {
					_id: createdItem._id,
					name: createdItem.name
				};
				vm.items.push(item);
				resetInput('newItem');
			}
		);

		// todo: add error handler modal (BE duplicity check)
	}

	function removeItem (itemId) {
		app.removeItem(itemId).then(
			function (removedItem) {
				vm.items.forEach(function (item, index) {
					if (removedItem._id == item._id) {
						vm.items.splice(index, 1);
					}
				});
			}
		);
	}

	function addUser (userName) {
		app.addUser(userName).then(
			function (createdUser) {
				var user = {
					_id: createdUser._id,
					name: createdUser.name
				};
				vm.users.push(user);
				resetInput('newUser');
			}
		);

		// todo: add error handler modal (BE duplicity check)
	}

	function removeUser (userId) {
		app.removeUser(userId).then(
			function (removedUser) {
				vm.users.forEach(function (user, index) {
					if (removedUser._id == user._id) {
						vm.users.splice(index, 1);
					}
				});
			}
		);
	}

	function validate (name, type) {
		if (!vm[type])
			return;

		var records = vm[type];
		var target = type == 'items' ? 'newItem' : 'newUser';

		var duplicate = records.filter(function (rec) {
			return rec.name == name;
		})[0];

		vm.invalid[target] = !!duplicate;
	}

	////////////////////////////////////////////////
	// helpers

	function resetInput (inputType) {
		if ($scope[inputType])
			$scope[inputType] = null;
	}
}
