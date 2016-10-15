
import {ngmodule, loadNg1Module} from './bootstrap/ngmodule';

import {app} from './app.component';
import {appRootState} from './app.states';
import {AppService} from './app.service';

// todo: common module
import {_helpers} from '../app/common/_helpers.service';

import {otherwiseConfigBlock, defaultContentTypeRunBlock, uiRouterVisualiserRunBlock} from '../app/app.config'

const appModule = {
	components: {app},
	services: {_helpers, AppService},
	states: [appRootState],
	configBlocks: [otherwiseConfigBlock],
	runBlocks: [defaultContentTypeRunBlock, uiRouterVisualiserRunBlock]
};

loadNg1Module(ngmodule, appModule);

require('./app.scss');
