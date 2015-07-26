
angular = require('angular');

angular.module('woin-starship')
  .controller('FtlCtrl', function FtlCtrl($scope) {
    var KEY = $scope.KEY = 'FTL Engine';
    var BKEY = $scope.BKEY = 'Backup FTL Engine';
    if(!$scope.ship[KEY]) $scope.ship[KEY] = {};
    if(!$scope.ship[BKEY]) $scope.ship[BKEY] = {};
    $scope.ftlHash = $scope.$parent.ftlHash;
  });