;(function () {
	"use strict";
	var mongoose = require('mongoose');
	var Schema = mongoose.Schema;

	/**
	 * User schema definition
	 */
	var userSchema = new Schema({
		username: {
			type: String,
			trim: true,
			unique: 'vajcia',
			required: 'gule'
		},
		createdAt: {
			type: Date,
			default: Date.now
		}
	});
	
	var User = mongoose.model('User', userSchema);
	
	module.exports = User;
})();