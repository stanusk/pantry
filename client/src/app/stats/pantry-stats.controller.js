;(function () {
	"use strict";
	angular.module('pantry')
		.controller('pantryStatsCtrl', PantryStatsCtrl)
	;
	
	function PantryStatsCtrl ($scope, app) {
		var vm = this;

		vm.selectedTop = 'items';
		vm.users = $scope.users;

		vm.showUserHist = showUserHist;
		vm.userHistoryList = [];

		init();

		function init () {
			loadItemsStats();
			loadUsersStats();
		}

		function loadItemsStats () {
			app.getTopItemsStats().then(
				function (itemStats) {
				    vm.itemsStats = itemStats;
				},
				function (err) {
				    console.log(err);
				}
			);
		}

		function loadUsersStats () {
			app.getTopUsersStats().then(
				function (userStats) {
					vm.usersStats = userStats;
				},
				function (err) {
					console.log(err);
				}
			);
		}

		function showUserHist (userId) {
			if (!userId)
				return;
			app.getUserHistory(userId).then(
				function (userHistory) {
					vm.selectedUser.history = userHistory;
				},
				function (err) {

				}
			);
		}
	}
})();