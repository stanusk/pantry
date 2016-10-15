
class PantryStatsCtrl {
	constructor (AppService) {
		"ngInject";
		
		this.app = AppService;
	}

	$onInit () {

		this.selectedTop = 'items';
		this.userHistoryList = [];

		var self = this;

		loadItemsStats();
		loadUsersStats();

		function loadItemsStats () {
			self.app.getTopItemsStats()
				.then( itemStats => {
					self.itemsStats = itemStats;
				})
			;
		}

		function loadUsersStats () {
			self.app.getTopUsersStats()
				.then( userStats => {
					self.usersStats = userStats;
				})
			;
		}
	}

	showUserHist (userId) {
		if (!userId)
			return;
		
		this.app.getUserHistory(userId)
			.then( userHistory => {
				this.selectedUser.history = userHistory;
			})
		;
	}
}

export const pantryStats = {
	template: require('./pantry-stats.html'),
	controller: PantryStatsCtrl,
	bindings: {
		users: '<'
	}
};
