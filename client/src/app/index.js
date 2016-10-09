

import angular from 'angular';

require('angular-ui-router');
require('angular-bootstrap');

// common services
import commonServices from './common';
commonServices(angular);

// app
require('./app.scss');

import appModuleSetup from './app.module';
var appModule = appModuleSetup(angular);

import appService from './app.service';
appService(appModule);

import appRouting from './app.routing';
appRouting(appModule);


// components
import list from './list';
list(appModule);

import stats from './stats';
stats(appModule);

import admin from './admin';
admin(appModule);