;(function () {
	"use strict";
	var mongoose = require('mongoose');
	var Schema = mongoose.Schema;

	/**
	 * Item schema definition
	 */
	var userSchema = new Schema({
		name: {
			type: String,
			trim: true,
			unique: true,
			required: true
		},
		history: [{
			_id: false,
			userId: String,
			count: Number
		}],
		createdAt: {
			type: Date,
			default: Date.now
		}
	});
	
	var Item = mongoose.model('Item', userSchema);
	
	module.exports = Item;
})();