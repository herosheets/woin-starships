/*global angular */

/**
 * The main TodoMVC app module
 *
 * @type {angular.Module}
 */

angular = require('angular');
require('angular-route');
require('../dist/templateCachePartials');

angular.module('woin-starship', ['ngRoute','starshipPartials', 'ui.bootstrap', 'ui.router', 'ui.router.tabs'])
	.config(function ($stateProvider, $urlRouterProvider) {
		'use strict';

		$urlRouterProvider.otherwise('/');

		$stateProvider
			.state('main', {
				url: '/',
				controller: 'StarshipCtrl',
				templateUrl: '/partials/starship-index.html'
			})
			.state('main.command', {
				url: 'commandcontrol',
				controller: 'CommandCtrl',
				views: {
					content: { templateUrl: '/partials/commandcontrol.html' }
				}
			})
		;
	});

require('starshipCtrl');
require('commandCtrl');