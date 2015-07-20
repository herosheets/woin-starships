/*global angular */

var angular = require('angular');
require('../dist/templateCachePartials');

angular.module('woin-starship', ['starshipPartials', 'ui.bootstrap', 'ui.router', 'ui.router.tabs', 'ngFileUpload'])
	.config(function ($stateProvider, $urlRouterProvider) {
		'use strict';

		$urlRouterProvider.otherwise('/basics');

		$stateProvider
			.state('main', {
				url: '/',
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
			.state('main.sensors', {
				url: 'sensors',
				views: {
					content: { controller: 'SensorCtrl', templateUrl: '/partials/sensors.html' }
				}
			})
			.state('main.crew', {
				url: 'crew',
				views: {
					content: { controller: "CrewCtrl", templateUrl: '/partials/crew.html' }
				}
			})
			.state('main.subluminal', {
				url: 'subluminal',
				views: {
					content: { controller: "SubluminalCtrl", templateUrl: '/partials/subluminal.html' }
				}
			})
			.state('main.ftl', {
				url: 'ftl',
				views: {
					content: { controller: "FtlCtrl", templateUrl: '/partials/ftl.html' }
				}
			})
			.state('main.facilities', {
				url: 'facilities',
				views: {
					content: { controller: "FacilitiesCtrl", templateUrl: '/partials/facilities.html' }
				}
			})
			.state('main.general', {
				url: 'general',
				views: {
					content: { controller: "GeneralCtrl", templateUrl: '/partials/general.html' }
				}
			})
			.state('main.superstructure', {
				url: 'superstructure',
				views: {
					content: { controller: "SuperstructureCtrl", templateUrl: '/partials/superstructure.html' }
				}
			})
			.state('main.weaponry', {
				url: 'weaponry',
				views: {
					content: { controller: "WeaponCtrl", templateUrl: '/partials/weaponry.html' }
				}
			})
			.state('main.deflectors', {
				url: 'deflectors',
				views: {
					content: { controller: "DeflectorShieldCtrl", templateUrl: '/partials/shields.html' }
				}
			})
			.state('main.ship', {
				url: 'ship',
				views: {
					content: { controller: "ShipViewCtrl", templateUrl: '/partials/ship.html' }
				}
			})
		;
	});

require('starshipCtrl');
require('commandCtrl');
require('crewCtrl');
require('facilitiesCtrl');
require('subluminalCtrl');
require('ftlCtrl');
require('weaponCtrl');
require('deflectorsCtrl');
require('generalCtrl');
require('superstructureCtrl');
require('sensorCtrl');
require('shipViewCtrl');
