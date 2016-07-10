;(function() {

	'use strict';

	/*==================================
	=            API Router            =
	==================================*/

	var express = require('express');
	var router = express.Router();

	var usersCtrl = require('./user/user.controller');
	var itemsCtrl = require('./item/item.controller');

	/**
	 * Users
	 */
	router.post('/users', usersCtrl.createUser);
	router.delete('/users', usersCtrl.deleteUser);
	router.get('/users', usersCtrl.getUsers);

	/**
	 * Items
	 */
	router.post('/items', itemsCtrl.createItem);
	router.delete('/items', itemsCtrl.deleteItem);
	router.get('/items', itemsCtrl.getItems);
	
	router.get('/items/list', itemsCtrl.getItemsList);
	
	router.put('/items/:itemId/users/:userId', itemsCtrl.increaseCountForUser);

	module.exports = router;

})();
