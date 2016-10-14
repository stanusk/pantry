import {pantryAdmin} from './pantry-admin.component';
import {pantryAdminState} from './pantry-admin.states';

export default function (module) {
	require('./pantry-admin.scss');
	
	module
		.component('pantryAdmin', pantryAdmin)
		.config( $stateProvider => {$stateProvider.state(pantryAdminState)} )
	;
}