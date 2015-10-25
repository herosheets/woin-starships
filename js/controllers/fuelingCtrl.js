
angular = require('angular');

angular.module('woin-starship')
  .controller('FuelingCtrl', function FuelingCtrl($scope) {

    var KEY = $scope.KEY = 'Fueling';
    if(!$scope.ship[KEY]) $scope.ship[KEY] = {};

    $scope.generalHash = $scope.$parent.generalHash;
  });