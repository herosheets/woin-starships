
angular = require('angular');

angular.module('woin-starship')
  .controller('PointDefenseCtrl', function PointDefenseCtrl($scope) {
    var PKEY = $scope.PKEY = 'Point Defenses';
    if(!$scope.ship[PKEY]) $scope.ship[PKEY] = {};

    $scope.pointDefensesHash = $scope.$parent.pointDefensesHash;


  });