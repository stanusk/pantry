;(function () {
	"use strict";
	angular.module('pantry')
		.controller('pantryStatsCtrl', PantryStatsCtrl)
	;
	
	function PantryStatsCtrl (app) {
		var vm = this;

		vm.selectedTop = 'items';
		vm.users = app.getUsers();
		vm.items = app.getTopItemsStats();
		vm.usersStats = app.getTopUsersStats();

		vm.showUserHist = showUserHist;
		vm.userHistoryList = [];

		function showUserHist (userId) {
			if (!userId)
				return;
			
			// TODO: redo for async use once BE done
			var userHist = app.getUserHistory(userId);

			vm.selectedUser.history = userHist.consumedItems;
		}
	}
})();