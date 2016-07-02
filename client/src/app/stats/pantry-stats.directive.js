;(function () {
	"use strict";
	angular.module('pantry')
		.directive('pantryStats', PantryStatsDirective)
		.controller('pantryStatsCtrl', PantryStatsCtrl)
	;

	function PantryStatsDirective () {
		return {
			restrict: 'E',
			templateUrl: 'app/stats/pantry-stats.html',
			controller: 'pantryStatsCtrl',
			controllerAs: 'vm',
			scope: {}
		}
	}
	
	function PantryStatsCtrl () {
		console.log('pantryStatsCtrl');
	}
})();