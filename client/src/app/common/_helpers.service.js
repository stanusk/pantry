
export default function (commonModule) {
	commonModule
		.service('_helpers', _helpers);

	function _helpers () {
		this.extractRes = extractRes;
		this.defaultErrHandler = defaultErrHandler;

		function extractRes (res) {
			return res.data.data;
		}

		function defaultErrHandler (err) {
			console.log(err);
		}
	}
};