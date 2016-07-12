;(function() {

	'use strict';

	/*==================================
	=            API Router            =
	==================================*/

	var express = require('express');
	var router = express.Router();

	var usersCtrl = require('./user/user.controller');
	var itemsCtrl = require('./item/item.controller');
	var statsCtrl = require('./stats/stats.controller');

	/**
	 * Users
	 */
	router.post('/users', usersCtrl.createUser);
	router.delete('/users/:userId', usersCtrl.deleteUser);
	router.get('/users', usersCtrl.getUsers);

	/**
	 * Items
	 */
	router.post('/items', itemsCtrl.createItem);
	router.delete('/items/:itemId', itemsCtrl.deleteItem);
	router.get('/items', itemsCtrl.getItems);
	router.get('/items/list', itemsCtrl.getItemsList);

	router.put('/items/:itemId/users/:userId', itemsCtrl.increaseCountForUser);

	/**
	 * Stats
	 */
	router.get('/stats/users/:userId', statsCtrl.getItemsFotUser);
	router.get('/stats/items/top/:limit', statsCtrl.getTopItems);
	router.get('/stats/users/top/:limit', statsCtrl.getTopUsers);
	

	module.exports = router;

})();
