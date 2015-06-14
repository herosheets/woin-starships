
angular = require('angular');

angular.module('woin-starship')
  .controller('SubluminalCtrl', function SubluminalCtrl($scope) {
    var KEY = $scope.KEY = 'Sub-luminal Engine';
    if(!$scope.ship[KEY]) $scope.ship[KEY] = {};
    $scope.sublHash = $scope.$parent.sublHash;
  });