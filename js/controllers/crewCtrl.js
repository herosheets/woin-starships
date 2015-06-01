
angular = require('angular');

angular.module('woin-starship')
  .controller('CrewCtrl', function CrewCtrl($scope) {
    var KEY = 'Crew';
    if(!$scope.ship[KEY]) $scope.ship[KEY] = {};

    $scope.isEmpty = function() {
      return _.size($scope.ship[KEY]) === 0;
    };

    $scope.incrementItem = function(itemKey) {
      if(!$scope.ship[KEY][itemKey]) $scope.ship[KEY][itemKey] = 0;
      $scope.ship[KEY][itemKey]++;
    };

    $scope.decrementItem = function(itemKey) {
      $scope.ship[KEY][itemKey]--;
      if($scope.ship[KEY][itemKey] <= 0) delete $scope.ship[KEY][itemKey];
    };


    $scope.crewHash = {};
    _.each($scope.passengerOptions, function(item) {
      $scope.crewHash[item['Type']] = item;
    });
  });