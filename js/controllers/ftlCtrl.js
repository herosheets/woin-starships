
angular = require('angular');

angular.module('woin-starship')
  .controller('FtlCtrl', function FtlCtrl($scope) {
    var KEY = $scope.KEY = 'FTL Engine';
    if(!$scope.ship[KEY]) $scope.ship[KEY] = {};
    $scope.ftlHash = $scope.$parent.ftlHash;
  });