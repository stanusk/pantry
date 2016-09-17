;(function () {
	"use strict";
	angular.module('pantry')
		.service('app', AppService);
	
	function AppService ($http, _helpers) {
		this.getItems = getItems;
		this.getUsers = getUsers;
		this.saveSelection = saveSelection;
		
		this.getTopItemsStats = getTopItemsStats;
		this.getTopUsersStats = getTopUsersStats;
		this.getUserHistory = getUserHistory;
		
		this.addItem = addItem;
		this.removeItem = removeItem;
		this.addUser = addUser;
		this.removeUser = removeUser;
		
		var apiLink = PANTRY.config.apiLink;
		
		function getItems () {
			return $http.get(apiLink + 'items/list').then(_helpers.extractRes);
		}
		
		function getUsers () {
			return $http.get(apiLink + 'users').then(_helpers.extractRes);
		}
		
		function saveSelection (userId, itemId) {
			return $http.put(apiLink + 'items/' + itemId + '/users/' + userId).then(_helpers.extractRes);
		}
		
		function getTopItemsStats () {
			return $http.get(apiLink + 'stats/items/top/10').then(_helpers.extractRes);
		}
		
		function getTopUsersStats () {
			return $http.get(apiLink + 'stats/users/top/10').then(_helpers.extractRes);
		}
		
		function getUserHistory (userId) {
			return $http.get(apiLink + 'stats/users/' + userId).then(_helpers.extractRes);
		}
		
		function addItem (itemName) {
			return $http.post(apiLink + 'items', {name: itemName}).then(_helpers.extractRes);
		}
		
		function removeItem (itemId) {
			return $http.delete(apiLink + 'items/' + itemId).then(_helpers.extractRes);
		}
		
		function addUser (userName) {
			return $http.post(apiLink + 'users', {name: userName}).then(_helpers.extractRes);
		}
		
		function removeUser (userId) {
			return $http.delete(apiLink + 'users/' + userId).then(_helpers.extractRes);
		}
	}
	
})();