import pantryStatsCtrl from './pantry-stats.controller';

export default function (module) {
	require('./pantry-stats.scss');
	
	module
		.controller('pantryStatsCtrl', pantryStatsCtrl);
}