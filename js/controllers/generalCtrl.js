
angular = require('angular');

angular.module('woin-starship')
  .controller('GeneralCtrl', function GeneralCtrl($scope) {
    var KEY = $scope.KEY = 'General';
    if(!$scope.ship[KEY]) $scope.ship[KEY] = {};

    $scope.generalHash = {};
    _.each($scope.systems.hangars, function(item) {
      $scope.generalHash[item.Item] = item;
    });

    _.each($scope.systems.fueling, function(item) {
      $scope.generalHash[item.Item] = item;
    });

    _.each($scope.systems.tractor, function(item) {
      $scope.generalHash[item.Item] = item;
    });

    _.each($scope.systems.engMods, function(item) {
      $scope.generalHash[item.Item] = item;
    });

    _.each($scope.systems.electronicWarfare, function(item) {
      $scope.generalHash[item.Item] = item;
    });
  });