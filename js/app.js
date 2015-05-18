/*global angular */

/**
 * The main TodoMVC app module
 *
 * @type {angular.Module}
 */

angular = require('angular');
require('angular-route');
require('../dist/templateCachePartials');

angular.module('woin-starship', ['ngRoute','todoPartials', 'ui.bootstrap'])
	.config(function ($routeProvider) {
		'use strict';

		var routeConfig = {
			controller: 'StarshipCtrl',
			templateUrl: '/partials/todomvc-index.html',
			resolve: {
				store: ['todoStorage', function (todoStorage) {
					// Get the correct module (API or localStorage).
					return todoStorage;
				}]
			}
		};

		$routeProvider
			.when('/', routeConfig)
			.when('/:status', routeConfig)
			.otherwise({
				redirectTo: '/'
			});
	});

require('starshipCtrl');
require('todoStorage');
require('todoFocus');
require('todoEscape');
