import pantryListCtrl from './pantry-list.controller';

export default function (module) {
	require('./pantry-list.scss');
	
	module
		.controller('pantryListCtrl', pantryListCtrl);
}