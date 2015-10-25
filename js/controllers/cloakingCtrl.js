
angular = require('angular');

angular.module('woin-starship')
  .controller('CloakingCtrl', function CloakingCtrl($scope) {

    var KEY = $scope.KEY = 'Cloaking';
    if(!$scope.ship[KEY]) $scope.ship[KEY] = {};
    $scope.generalHash = $scope.$parent.generalHash;

    $scope.notValidHull = function(string) {
      if(!$scope.ship.hull) return true;
      var arr = string.split(' ');
      var validHulls = arr[arr.length-1].split(';');
      return validHulls.indexOf($scope.ship.hull.Class) === -1;
    };
  });