
angular = require('angular');

angular.module('woin-starship')
  .controller('CrewCtrl', function CrewCtrl($scope) {
    var KEY = $scope.KEY = 'Crew';
    if(!$scope.ship[KEY]) $scope.ship[KEY] = {};

    $scope.crewValueAddHash = {};
    $scope.crewValueRemoveHash = {};

    $scope.crewHash = $scope.$parent.crewHash;

  });