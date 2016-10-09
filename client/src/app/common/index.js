import helpers from './_helpers.service'

export default function (angular) {
	var commonModule = angular.module('common', []);
	
	helpers(commonModule);
};