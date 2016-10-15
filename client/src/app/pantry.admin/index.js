import {loadNg1Module, ngmodule} from "../bootstrap/ngmodule";

import {pantryAdmin} from './pantry-admin.component';
import {pantryAdminState} from './pantry-admin.states';

const appModule = {
	components: {pantryAdmin},
	states: [pantryAdminState]
};

loadNg1Module(ngmodule, appModule);
require('./pantry-admin.scss');