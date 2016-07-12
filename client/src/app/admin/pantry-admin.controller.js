;(function () {
	"use strict";
	angular.module('pantry')
		.controller('pantryAdminCtrl', PantryAdminCtrl)
	;
	
	function PantryAdminCtrl ($scope, app) {
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
				function (res) {
					var created = res.data.data;
					var item = {
						_id: created._id,
						name: created.name
					};
					vm.items.push(item);
					resetInput('newItem');
				},
				function (err) {
					console.log(err);
				}
			);

			// todo: add error handler modal (BE duplicity check)
		}

		function removeItem (itemId) {
			app.removeItem(itemId).then(
				function (res) {
					vm.items.forEach(function (item, index) {
						if (res.data.data._id == item._id) {
							vm.items.splice(index, 1);
						}
					});
				},
				function (err) {

				}
			);
		}
		
		function addUser (userName) {
			app.addUser(userName).then(
				function (res) {
					var created = res.data.data;
					var user = {
						_id: created._id,
						name: created.name
					};
					vm.users.push(user);
					resetInput('newUser');
				},
				function (err) {

				}
			);
			
			// todo: add error handler modal (BE duplicity check)
		}
		
		function removeUser (userId) {
			app.removeUser(userId).then(
				function (res) {
					vm.users.forEach(function (user, index) {
						if (res.data.data._id == user._id) {
							vm.users.splice(index, 1);
						}
					});
				},
				function (err) {

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
})();