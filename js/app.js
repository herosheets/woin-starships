/*global angular */

angular = require('angular');
require('../dist/templateCachePartials');

angular.module('woin-starship', ['starshipPartials', 'ui.bootstrap', 'ui.router', 'ui.router.tabs'])
	.config(function ($stateProvider, $urlRouterProvider) {
		'use strict';

		$urlRouterProvider.otherwise('/');

		$stateProvider
			.state('main', {
				url: '/',
				controller: 'StarshipCtrl',
				templateUrl: '/partials/starship-index.html'
			})
			.state('main.basics', {
				url: 'basics',
				views: {
					content: { templateUrl: '/partials/basics.html' }
				}
			})
			.state('main.hull', {
				url: 'hull',
				views: {
					content: { templateUrl: '/partials/hull.html' }
				}
			})
			.state('main.command', {
				url: 'commandcontrol',
				views: {
					content: { controller: 'CommandCtrl', templateUrl: '/partials/commandcontrol.html' }
				}
			})
			.state('main.crew', {
				url: 'crew',
				views: {
					content: { controller: "CrewCtrl", templateUrl: '/partials/crew.html' }
				}
			})
		;
	});

require('starshipCtrl');
require('commandCtrl');
require('crewCtrl');