;(function () {
	"use strict";
	
	angular.module('common')
		.service('_helpers', _helpers);
	
	function _helpers () {
		this.extractRes = extractRes;
		
		function extractRes (res) {
			return res.data.data;
		}
	}
	
})();