
angular = require('angular');

angular.module('woin-starship')
  .controller('DeflectorShieldCtrl', function DeflectorShieldCtrl($scope) {
    var KEY = $scope.KEY = 'Deflector Shields';
    if(!$scope.ship[KEY]) $scope.ship[KEY] = {};

    $scope.deflectorHash = {};
    _.each($scope.deflectors, function(item) {
      $scope.deflectorHash[item[KEY]] = item;
    });

    var PKEY = $scope.PKEY = 'Point Defense';
    if(!$scope.ship[PKEY]) $scope.ship[PKEY] = {};
    $scope.pointDefensesHash = {};
    _.each($scope.pointDefenses, function(item) {
      $scope.pointDefensesHash[item[PKEY]] = item;
    });
  });