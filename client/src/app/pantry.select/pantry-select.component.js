
class PantrySelectCtrl {
	constructor (AppService) {
		this.app = AppService;
		this.selected = {};
	}

	submit (selected) {
		this.app.saveSelection(selected.user._id, selected.item._id).then(
			function (res) {
				selected.item = null;
			}
		);
	}
}

export const pantrySelect = {
	controller: PantrySelectCtrl,
	template: require('./pantry-select.html'),
	bindings: {
		items: '<',
		users: '<'
	}
};