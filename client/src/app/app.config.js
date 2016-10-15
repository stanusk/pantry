
import {visualizer} from 'ui-router-visualizer';

export const otherwiseConfigBlock = ['$urlRouterProvider', $urlRouterProvider => {
	$urlRouterProvider.otherwise("/pantry/select");
}];

export const defaultContentTypeRunBlock = ['$http', $http => {
	// set common request headers for whole app
	$http.defaults.headers.common['Content-Type'] = 'application/json';
}];

// Show ui-router-visualizer
export const uiRouterVisualiserRunBlock = ['$uiRouter', $uiRouter => {
	if (PANTRY.config.env = 'development')
		visualizer($uiRouter);
}];
