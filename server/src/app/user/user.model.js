;(function () {
	"use strict";
	var mongoose = require('mongoose');
	var Schema = mongoose.Schema;

	/**
	 * User schema definition
	 */
	var userSchema = new Schema({
		name: {
			type: String,
			trim: true,
			unique: true,
			required: true
		},
		createdAt: {
			type: Date,
			default: Date.now
		}
	});
	
	var User = mongoose.model('User', userSchema);
	
	module.exports = User;
})();