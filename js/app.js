/*global angular */

angular = require('angular');
require('../dist/templateCachePartials');

angular.module('woin-starship', ['starshipPartials', 'ui.bootstrap', 'ui.router', 'ui.router.tabs'])
	.config(function ($stateProvider, $urlRouterProvider) {
		'use strict';

		$urlRouterProvider.otherwise('/basics');

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
			.state('main.facilities', {
				url: 'facilities',
				views: {
					content: { controller: "FacilitiesCtrl", templateUrl: '/partials/facilities.html' }
				}
			})
			.state('main.fighterbay', {
				url: 'fighterbay',
				views: {
					content: { controller: "FighterBayCtrl", templateUrl: '/partials/fighter_bay.html' }
				}
			})
		;
	});

require('starshipCtrl');
require('commandCtrl');
require('crewCtrl');
require('facilitiesCtrl');
require('fighterbayCtrl');