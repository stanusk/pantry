;(function () {
	"use strict";
	
	/**
	 * Users endpoint controller
	 */
	
	module.exports = {
		createUser: createUser,
		deleteUser: deleteUser,
		getUsers: getUsers
	};
	
	
	var mongoose = require('mongoose');
	var User = require('./user.model.js');
	
	var ObjectId = mongoose.Types.ObjectId;

	var utils = require('../_shared/utils.js');

	/**
	 * Create new user
	 */
	function createUser (req, res, next) {
		var params = req.body;
		
		var user = new User({
			name: params.name
		});
		
		user.save(function (err, newUser) {
			if (err)
				return next({err: err, status: 400});
			
			if (!newUser)
				return next({message: 'User not created', status: 400});
			
			utils.sendJsonResponse(res, 201, newUser);
		});
	}

	/**
	 * Get all users
	 */
	function getUsers (req, res, next) {
		User.find({}, function (err, users) {
			if (err)
				return next({err: err, status: 400});
			
			utils.sendJsonResponse(res, 200, users || []);
		});
	}

	/**
	 * Delete user
	 */
	function deleteUser (req, res, next) {
		var params = req.params;
		User.findOneAndRemove({_id: ObjectId(params.userId)}, function (err, deletedUser) {
			if (err)
				return next({err: err, status: 400});

			if (!deletedUser)
				return next({message: 'User not found', status: 400});

			utils.sendJsonResponse(res, 200, deletedUser);
		});
	}
	
})();