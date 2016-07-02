;(function () {
	"use strict";
	angular.module('pantry')
		.service('app', AppService);
	
	function AppService () {
		this.getItems = getItems;
		this.getUsers = getUsers;
		this.saveSelection = saveSelection;
		
		function getItems () {
			return mockItems;
		}
		
		function getUsers () {
			return mockUsers;
		}
		
		function saveSelection (userId, itemId) {
			return mockUsers;
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
	
	var mockUsers = [
		{
			_id: 1,
			name: 'Doro'
		},
		{
			_id: 2,
			name: 'Duňa'
		}
	]
})();