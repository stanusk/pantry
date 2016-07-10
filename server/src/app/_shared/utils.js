;(function() {

	'use strict';

	var utils = {
		sendJSONresponse: sendJSONresponse
	};

	module.exports = utils;

	function sendJSONresponse(res, status, content, url) {
		var response = {};

		// structure response
		var type = content.hasOwnProperty('error') ? 'error' : 'data';
		if (content.docs)
			response[type] = content.docs;
		else {
			response[type] = content;

			if (content.type)
				response[type].type = content.type;

			if (url)
				response.url = url;
		}

		res.status(status).json(response);
	}

})();
