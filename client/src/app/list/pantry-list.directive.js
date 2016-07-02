;(function () {
	"use strict";
	angular.module('pantry')
		.directive('pantryList', PantryListDirective)
		.controller('pantryListCtrl', PantryListCtrl)
	;

	function PantryListDirective () {
		return {
			restrict: 'E',
			templateUrl: 'app/list/pantry-list.html',
			controller: 'pantryListCtrl',
			controllerAs: 'vm',
			scope: {}
		}
	}
	
	function PantryListCtrl () {
		console.log('pantryListCtrl');
	}
})();