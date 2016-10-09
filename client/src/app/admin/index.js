import pantryAdminCtrl from './pantry-admin.controller';

export default function (module) {
	require('./pantry-admin.scss');
	
	module
		.controller('pantryAdminCtrl', pantryAdminCtrl);
}