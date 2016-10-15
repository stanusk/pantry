import {loadNg1Module, ngmodule} from "../bootstrap/ngmodule";

import {pantrySelect} from './pantry-select.component';
import {pantrySelectState} from './pantry-select.states';

const appModule = {
	components: {pantrySelect},
	states: [pantrySelectState]
};

loadNg1Module(ngmodule, appModule);
require('./pantry-select.scss');