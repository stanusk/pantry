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
			app.addItem(itemName);
			
			// todo: then
			var item = {
				_id: 'xxx',
				name: itemName
			};
			vm.items.push(item);
			reset('newItem');
			
			// todo: add error handler (bg duplicity check)
		}

		function removeItem (itemId) {
			app.removeItem(itemId);

			// todo: then
			vm.items.forEach(function (item, index) {
				if (itemId == item._id) {
					vm.items.splice(index, 1);
				}
			});
		}
		
		function addUser (userName) {
			app.addUser(userName);
			
			// todo: then
			var user = {
				_id: 'xxx',
				name: userName
			};
			vm.users.push(user);
			reset('newUser');
			
			// todo: add error handler (bg duplicity check)
		}
		
		function removeUser (userId) {
			app.removeUser(userId);
			
			// todo: then
			vm.users.forEach(function (user, index) {
				if (userId == user._id) {
					vm.users.splice(index, 1);
				}
			});
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
		
		function reset (inputType) {
			if ($scope[inputType])
				$scope[inputType] = null;
		}
	}
})();