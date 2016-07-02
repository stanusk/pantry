;(function () {
	"use strict";
	angular.module('pantry')
		.controller('pantryListCtrl', PantryListCtrl)
	;
	
	function PantryListCtrl (items, users, app) {
		var vm = this;
	
		vm.items = items;
		vm.users = users;
		vm.selected = {};

		vm.submit = submit;

		function submit (selected) {
			app.saveSelection(selected.user._id, selected.item._id);
			// TODO: then
			selected.item = null;
		}
	}
})();