;(function () {
	"use strict";
	angular.module('pantry')
		.controller('pantryListCtrl', PantryListCtrl)
	;
	
	function PantryListCtrl ($scope, app) {
		var vm = this;
	
		vm.items = $scope.items;
		vm.users = $scope.users;
		vm.selected = {};

		vm.submit = submit;

		function submit (selected) {
			app.saveSelection(selected.user._id, selected.item._id).then(
				function (res) {
					selected.item = null;
				},
				function (err) {
				    console.log(err);
				}
			);
			
			
		}
	}
})();