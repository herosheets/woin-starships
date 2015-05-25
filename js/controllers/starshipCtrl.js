/*global angular */

/**
 * The main controller for the app. The controller:
 * - retrieves and persists the model via the todoStorage service
 * - exposes the model to the template and provides event handlers
 */
angular = require('angular');

angular.module('woin-starship')
	.controller('StarshipCtrl', function TodoCtrl($scope, $routeParams, $filter, store) {
		'use strict';

		$scope.tabs = [
			{ title:'Hull Class', content:'/partials/hull.html' },
			{ title:'Command & Control', content:'/partials/commandcontrol.html' },
			{ title:'Crew', content:'/partials/crew.html' },
			{ title:'Sub-Liminal Engines', content:'/partials/subliminal.html' },
			{ title:'FTL Engines', content:'/partials/ftl.html' },
			{ title:'Superstructure', content:'/partials/superstructure.html' },
			{ title:'Deflector Shields', content:'/partials/shields.html' },
			{ title:'Point Defenses', content:'/partials/pointdefense.html' },
			{ title:'Weaponry', content:'/partials/weaponry.html' },
			{ title:'Additional Equipment', content:'/partials/equipment.html' },
			{ title:'Fighter Bay', content:'/partials/fighter_bay.html' },
			{ title:'Facilities', content:'/partials/facilities.html' },
			{ title:'Misc', content:'/partials/misc.html' },
			{ title:'Download CSV', content:'/partials/download.html' }
		];

		$scope.setPartial = function(tab) {
			console.log(tab);
			console.log("Setting choice partial to:" + tab.content);
      $scope.chosenPartial = tab.content;
		};

		var todos = $scope.todos = store.todos;

		$scope.newTodo = '';
		$scope.editedTodo = null;

		$scope.$watch('todos', function () {
			$scope.remainingCount = $filter('filter')(todos, { completed: false }).length;
			$scope.completedCount = todos.length - $scope.remainingCount;
			$scope.allChecked = !$scope.remainingCount;
		}, true);

		// Monitor the current route for changes and adjust the filter accordingly.
		$scope.$on('$routeChangeSuccess', function () {
			var status = $scope.status = $routeParams.status || '';

			$scope.statusFilter = (status === 'active') ?
				{ completed: false } : (status === 'completed') ?
				{ completed: true } : {};
		});

		$scope.addTodo = function () {
			var newTodo = {
				title: $scope.newTodo.trim(),
				completed: false
			};

			if (!newTodo.title) {
				return;
			}

			store.insert(newTodo);
			$scope.newTodo = '';
		};

		$scope.editTodo = function (todo) {
			$scope.editedTodo = todo;
			// Clone the original todo to restore it on demand.
			$scope.originalTodo = angular.extend({}, todo);
		};

		$scope.saveEdits = function (todo, event) {
			// Blur events are automatically triggered after the form submit event.
			// This does some unfortunate logic handling to prevent saving twice.
			if (event === 'blur' && $scope.saveEvent === 'submit') {
				$scope.saveEvent = null;
				return;
			}

			$scope.saveEvent = event;

			if ($scope.reverted) {
				// Todo edits were reverted-- don't save.
				$scope.reverted = null;
				return;
			}

			todo.title = todo.title.trim();

			if (todo.title === $scope.originalTodo.title) {
				$scope.editedTodo = null;
				return;
			}

			store[todo.title ? 'put' : 'delete'](todo);
			$scope.editedTodo = null;
		};

		$scope.revertEdits = function (todo) {
			todos[todos.indexOf(todo)] = $scope.originalTodo;
			$scope.editedTodo = null;
			$scope.originalTodo = null;
			$scope.reverted = true;
		};

		$scope.removeTodo = function (todo) {
			store.delete(todo);
		};

		$scope.saveTodo = function (todo) {
			store.put(todo);
		};

		$scope.toggleCompleted = function (todo, completed) {
			if (angular.isDefined(completed)) {
				todo.completed = completed;
			}
			store.put(todo, todos.indexOf(todo));
		};

		$scope.clearCompletedTodos = function () {
			store.clearCompleted();
		};

		$scope.markAll = function (completed) {
			todos.forEach(function (todo) {
				if (todo.completed !== completed) {
					$scope.toggleCompleted(todo, completed);
				}
			});
		};
	});
