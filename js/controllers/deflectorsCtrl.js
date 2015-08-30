
angular = require('angular');

angular.module('woin-starship')
  .controller('DeflectorShieldCtrl', function DeflectorShieldCtrl($scope) {
    var KEY = $scope.KEY = 'Deflector Shields';
    if(!$scope.ship[KEY]) $scope.ship[KEY] = {};
    var PKEY = $scope.PKEY = 'Point Defenses';
    if(!$scope.ship[PKEY]) $scope.ship[PKEY] = {};

    $scope.deflectorHash = $scope.$parent.deflectorHash;
    $scope.pointDefensesHash = $scope.$parent.pointDefensesHash;


  });