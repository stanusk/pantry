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
				function (res) {
				    vm.itemsStats = res.data.data;
				},
				function (err) {
				    console.log(err);
				}
			);
		}

		function loadUsersStats () {
			app.getTopUsersStats().then(
				function (res) {
					vm.usersStats = res.data.data;
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
				function (res) {
					vm.selectedUser.history = res.data.data;
				},
				function (err) {

				}
			);
		}
	}
})();