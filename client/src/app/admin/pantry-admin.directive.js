;(function () {
	"use strict";
	angular.module('pantry')
		.directive('pantryAdmin', PantryAdminDirective)
		.controller('pantryAdminCtrl', PantryAdminCtrl)
	;

	function PantryAdminDirective () {
		return {
			restrict: 'E',
			templateUrl: 'app/admin/pantry-admin.html',
			controller: 'pantryAdminCtrl',
			controllerAs: 'vm',
			scope: {}
		}
	}
	
	function PantryAdminCtrl () {
		console.log('pantryAdminCtrl');
	}
})();