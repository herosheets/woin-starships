angular = require('angular');

angular.module('woin-starship')
  .controller('SuperstructureCtrl', function CrewCtrl($scope) {
    var KEY = $scope.KEY = 'Superstructure';
    if(!$scope.ship[KEY]) $scope.ship[KEY] = {};

    $scope.superstructureHash = $scope.$parent.superstructureHash;

    $scope.calculateSuperstructure = function() {
        return $scope.$parent.calculateSuperstructure();
    };
  });