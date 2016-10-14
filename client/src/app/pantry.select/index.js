import {pantrySelect} from './pantry-select.component';
import {pantrySelectState} from './pantry-select.states';

//var states =

export default function (module) {
	require('./pantry-select.scss');

	module
		.component('pantrySelect', pantrySelect)
		.config( $stateProvider => {$stateProvider.state(pantrySelectState)} )
	;
}