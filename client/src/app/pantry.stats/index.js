import {loadNg1Module, ngmodule} from "../bootstrap/ngmodule";

import {pantryStats} from './pantry-stats.component';
import {pantryStatsState} from './pantry-stats.states';

const appModule = {
	components: {pantryStats},
	states: [pantryStatsState]
};

loadNg1Module(ngmodule, appModule);
require('./pantry-stats.scss');