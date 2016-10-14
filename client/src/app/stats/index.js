import {pantryStats} from './pantry-stats.component';
import {pantryStatsState} from './pantry-stats.states';

export default function (module) {
	require('./pantry-stats.scss');
	
	module
		.component('pantryStats', pantryStats)
		.config( $stateProvider => {$stateProvider.state(pantryStatsState)} )
	;
}