;(function () {
	"use strict";
	
	/**
	 * Items endpoint controller
	 */
	
	module.exports = {
		createItem: createItem,
		deleteItem: deleteItem,
		getItems: getItems,
		getItemsList: getItemsList,
		increaseCountForUser: increaseCountForUser
	};
	
	
	var mongoose = require('mongoose');
	var Item = require('./item.model.js');
	
	var ObjectId = mongoose.Types.ObjectId;

	var utils = require('../_shared/utils.js');

	/**
	 * Create new item
	 */
	function createItem (req, res, next) {
		var params = req.body;
		
		var item = new Item({
			name: params.name
		});
		
		item.save(function (err, newItem) {
			if (err)
				return next({err: err, status: 400});
			
			if (!newItem)
				return next({message: 'Item not created', status: 400});
			
			utils.sendJsonResponse(res, 201, newItem);
		});
	}

	/**
	 * Get all items
	 */
	function getItems (req, res, next) {
		Item.find({}, '_id name history', function (err, items) {
			if (err)
				return next({err: err, status: 400});
			
			utils.sendJsonResponse(res, 200, items || []);
		});
	}

	/**
	 * Get all items without users history
	 */
	function getItemsList (req, res, next) {
		Item.find({}, '_id name',function (err, items) {
			if (err)
				return next({err: err, status: 400});
			
			utils.sendJsonResponse(res, 200, items || []);
		});
	}

	/**
	 * Delete item
	 */
	function deleteItem (req, res, next) {
		var params = req.params;
		Item.findOneAndRemove({_id: ObjectId(params.itemId)}, function (err, deletedItem) {
			if (err)
				return next({err: err, status: 400});

			if (!deletedItem)
				return next({message: 'Item not found', status: 400});

			utils.sendJsonResponse(res, 200, deletedItem);
		});
	}

	/**
	 * Increase count for user by userId
	 */
	function increaseCountForUser (req, res, next) {
		var itemId = req.params.itemId;
		var userId = req.params.userId;

		Item.findOne({_id: itemId}, function (err, item) {
			if (err)
				return next({err: err, status: 400});

			if (!item)
				return next({message: 'Item not found', status: 400});

			item.history = item.history || [];

			var oldUserHistory = item.history.filter(function (userHist) {
				return userHist.userId == userId;
			})[0];

			if (oldUserHistory)
				oldUserHistory.count++;
			else {
				item.history.push({userId: userId, count: 1})
			}

			item.save(function (err, item) {
				if (err)
					return next({err: err, status: 400});

				utils.sendJsonResponse(res, 200, item);
			});
		});
	}

})();