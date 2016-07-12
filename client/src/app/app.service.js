;(function () {
	"use strict";
	angular.module('pantry')
		.service('app', AppService);
	
	function AppService ($http) {
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
			return $http.get(apiLink + 'items/list');
		}
		
		function getUsers () {
			return $http.get(apiLink + 'users');
		}
		
		function saveSelection (userId, itemId) {
			return $http.put(apiLink + 'items/' + itemId + '/users/' + userId);
		}
		
		function getTopItemsStats () {
			return $http.get(apiLink + 'stats/items/top/10');
		}
		
		function getTopUsersStats () {
			return $http.get(apiLink + 'stats/users/top/10');
		}
		
		function getUserHistory (userId) {
			return $http.get(apiLink + 'stats/users/' + userId);
		}
		
		function addItem (itemName) {
			return $http.post(apiLink + 'items', {name: itemName})
		}
		
		function removeItem (itemId) {
			return $http.delete(apiLink + 'items/' + itemId)
		}
		
		function addUser (userName) {
			return $http.post(apiLink + 'users', {name: userName})
		}
		
		function removeUser (userId) {
			return $http.delete(apiLink + 'users/' + userId)
		}
	}
	
	var mockItems = [
		{
			_id: 1,
			name: 'milka tender',
			//history: [
			//	{
			//		userId: 1,
			//		count: 3
			//	},
			//	{
			//		userId: 2,
			//		count: 1
			//	},
			//]
		},
		{
			_id: 2,
			name: 'pistachios',
			//history: [
			//	{
			//		userId: 1,
			//		count: 1
			//	}
			//]
		}

	];
	
	var mockTopItems = [
		{
			_id: 1,
			name: 'milka tender',
			consumed: 8
		},
		{
			_id: 2,
			name: 'pistachios',
			consumed: 1
		}

	];
	
	var mockUsers = [
		{
			_id: 1,
			name: 'Doro'
		},
		{
			_id: 2,
			name: 'Duňa'
		}
	];
	
	var mockTopUsers = [
		{
			_id: 1,
			name: 'Doro',
			consumedTotal: 3
		},
		{
			_id: 2,
			name: 'Duňa',
			consumedTotal: 6
		}
	];
	
	var mockUserHist = {
		1: {
			userId: 1,
			consumedItems: [
				{
					itemId: 1,
					name: 'milka tender',
					consumed: 2
				},
				{
					itemId: 2,
					name: 'pistachios',
					consumed: 1
				}
			]
		},
		2 : {
			userId: 2,
			consumedItems: [
				{
					itemId: 1,
					name: 'milka tender',
					consumed: 6
				}
			]
		}
	}
})();