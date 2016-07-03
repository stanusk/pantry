;(function () {
	"use strict";
	angular.module('pantry')
		.service('app', AppService);
	
	function AppService () {
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
		
		function getItems () {
			// todo: BE
			return mockItems;
		}
		
		function getUsers () {
			// todo: BE
			return mockUsers;
		}
		
		function saveSelection (userId, itemId) {
			// todo: BE
		}
		
		function getTopItemsStats () {
			// todo: BE
			return mockTopItems;
		}
		
		function getTopUsersStats () {
			// todo: BE
			return mockTopUsers;
		}
		
		function getUserHistory (userId) {
			// todo: BE
			return mockUserHist[userId];
		}
		
		function addItem (itemName) {
			// todo: BE
		}
		
		function removeItem (itemId) {
			// todo: BE
		}
		
		function addUser (userName) {
			// todo: BE
		}
		
		function removeUser (userId) {
			// todo: BE
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