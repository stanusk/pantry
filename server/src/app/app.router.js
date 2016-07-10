;(function() {

	'use strict';

	/*==================================
	=            API Router            =
	==================================*/

	var express = require('express');
	var router = express.Router();

	var usersCtrl = require('./user/user.controller');

	/**
	 * Users
	 */
	router.get('/users', usersCtrl.getUsers);
	router.post('/users', usersCtrl.createUser);
	router.delete('/users', usersCtrl.deleteUser);

	module.exports = router;

})();
