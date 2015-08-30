/*global angular */

Number.fromRoman= function(roman){
	var accept = true;
	var s= roman.toUpperCase().replace(/ +/g, ''),
			L= s.length, sum= 0, i= 0, next, val,
			R={M: 1000, D: 500, C: 100, L: 50, X: 10, V: 5, I: 1},
			fromBigRoman= function(rn){
				var n= 0, x, n1, S, rx=/(\(*)([MDCLXVI]+)/g;
				while((S= rx.exec(rn))!= null){
					x= S[1].length;
					n1= Number.fromRoman(S[2]);
					if(isNaN(n1)) return NaN;
					if(x) n1*= Math.pow(1000, x);
					n+= n1;
				}
				return n;
			};
	if (/^[MDCLXVI)(]+$/.test(s)){
		if(s.indexOf('(')== 0) return fromBigRoman(s);
		while(i<L){
			val= R[s.charAt(i++)];
			next= R[s.charAt(i)] || 0;
			if(next-val>0) val*= -1;
			sum+= val;
		}
		if(accept || sum.toRoman()=== s) return sum;
	}
	return NaN;
};

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
			.state('main.hangars', {
				url: 'hangars',
				views: {
					content: { controller: "HangarsCtrl", templateUrl: '/partials/hangars.html' }
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

require('components');
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
require('hangarsCtrl');
