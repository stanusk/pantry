;(function () {
	"use strict";
	
	/**
	 * Items endpoint controller
	 */
	
	module.exports = {
		getItemsFotUser: getItemsFotUser,
		getTopItems: getTopItems,
		getTopUsers: getTopUsers
	};
	
	
	var Item = require('../item/item.model.js');
	var User = require('../user/user.model.js');

	var utils = require('../_shared/utils.js');

	/**
	 * Get name and count of all items by user
	 */
	function getItemsFotUser (req, res, next) {
		var userId = req.params.userId;

		Item.aggregate(
			// aggregate items with user in history records, sum up counts for the user and return
			[
				{$match: {'history.userId': userId}},
				{$unwind: '$history'},
				{$match: {'history.userId': userId}},
				{$group: {
					_id: {_id: '$_id', name: '$name'},
					count: {$sum: '$history.count'}
				}},
				{$project: {_id: '$_id._id', name: '$_id.name', consumed: '$count'}},
				{$sort: {consumed: -1, name: 1}}
			],
			function (err, userItems) {
				if (err)
					return next({err: err, status: 400});

				utils.sendJsonResponse(res, 200, userItems);
			}
		)
	}

	/**
	 * Get items with top counts
	 */
	function getTopItems (req, res, next) {
		var limit = parseInt(req.params.limit, 10);

		Item.aggregate(
			// aggregate items with history records, sum up counts, order by counts limit and return
			[
				{$match: {'history.0': {$exists: true}}},
				{$unwind: '$history'},
				{$group: {
					_id: {_id: '$_id', name: '$name'},
					count: {$sum: '$history.count'}
				}},
				{$project: {_id: '$_id._id', name: '$_id.name', consumed: '$count'}},
				{$sort: {count: -1, name: 1}},
				{$limit: limit}
			],
			function (err, topItems) {
				if (err)
					return next({err: err, status: 400});

				utils.sendJsonResponse(res, 200, topItems);
			}
		)
	}

	/**
	 * Get users with top counts
	 */
	function getTopUsers (req, res, next) {
		var limit = parseInt(req.params.limit, 10);

		Item.aggregate(
			// aggregate items with history records, sum up counts for each user, order by counts
			// limit and return
			[
				{$match: {'history.0': {$exists: true}}},
				{$unwind: '$history'},
				{$group: {
					_id: '$history.userId',
					count: {$sum: '$history.count'}
				}},
				{$project: {_id: 0, userId: '$_id', count: '$count'}},
				{$sort: {count: -1}},
				{$limit: limit}
			],
			function (err, topUsersStats) {
				if (err)
					return next({err: err, status: 400});

				if (!topUsersStats.length)
					return utils.sendJsonResponse(res, 200, []);

				var userIds = extractFromObjects(topUsersStats, 'userId');

				User.find({_id: {$in: userIds}}, '_id name')
					.lean()
					.exec(function (err, users) {
						if (err)
							return next({err: err, status: 400});

						if (!users.length)
							return utils.sendJsonResponse(res, 200, []);

						users.forEach(function (user) {
							var userStats = topUsersStats.filter(function (stats) {
								return stats.userId == user._id;
							})[0];

							user.consumed = userStats.count;
						});

						utils.sendJsonResponse(res, 200, users);
					})
				;
			}
		)
	}


	/**
	 * Helpers
	 */
	function extractFromObjects (arrayOfObjects, prop) {
		return arrayOfObjects.map(function (obj) {
			return obj[prop];
		});
	}

})();