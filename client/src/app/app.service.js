
/**
 * todo: make into docu
 * 
 * this.getItems = getItems;
 * this.getUsers = getUsers;
 * this.saveSelection = saveSelection;

 * this.getTopItemsStats = getTopItemsStats;
 * this.getTopUsersStats = getTopUsersStats;
 * this.getUserHistory = getUserHistory;

 * this.addItem = addItem;
 * this.removeItem = removeItem;
 * this.addUser = addUser;
 * this.removeUser = removeUser;
 */

export class AppService {
	constructor ($http, _helpers) {
		"ngInject";
		
		this.$http = $http;
		this._helpers = _helpers;

		// todo: make local variable
		this.apiLink = PANTRY.config.apiLink;
	}


	getItems () {
		return this.$http.get(this.apiLink + 'items/list')
			.then(this._helpers.extractRes)
			.catch(this._helpers.defaultErrHandler);
	}

	getUsers () {
		return this.$http.get(this.apiLink + 'users')
			.then(this._helpers.extractRes)
			.catch(this._helpers.defaultErrHandler);
	}

	saveSelection (userId, itemId) {
		return this.$http.put(this.apiLink + 'items/' + itemId + '/users/' + userId)
			.then(this._helpers.extractRes)
			.catch(this._helpers.defaultErrHandler);
	}

	getTopItemsStats () {
		return this.$http.get(this.apiLink + 'stats/items/top/10')
			.then(this._helpers.extractRes)
			.catch(this._helpers.defaultErrHandler);
	}

	getTopUsersStats () {
		return this.$http.get(this.apiLink + 'stats/users/top/10')
			.then(this._helpers.extractRes)
			.catch(this._helpers.defaultErrHandler);
	}

	getUserHistory (userId) {
		return this.$http.get(this.apiLink + 'stats/users/' + userId)
			.then(this._helpers.extractRes)
			.catch(this._helpers.defaultErrHandler);
	}

	addItem (itemName) {
		return this.$http.post(this.apiLink + 'items', {name: itemName})
			.then(this._helpers.extractRes)
			.catch(this._helpers.defaultErrHandler);
	}

	removeItem (itemId) {
		return this.$http.delete(this.apiLink + 'items/' + itemId)
			.then(this._helpers.extractRes)
			.catch(this._helpers.defaultErrHandler);
	}

	addUser (userName) {
		return this.$http.post(this.apiLink + 'users', {name: userName})
			.then(this._helpers.extractRes)
			.catch(this._helpers.defaultErrHandler);
	}

	removeUser (userId) {
		return this.$http.delete(this.apiLink + 'users/' + userId)
			.then(this._helpers.extractRes)
			.catch(this._helpers.defaultErrHandler);
	}
}