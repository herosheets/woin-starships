
angular = require('angular');

angular.module('woin-starship')
  .controller('EngineModsCtrl', function EngineModsCtrl($scope) {

    var KEY = $scope.KEY = 'Engine Mods';
    if(!$scope.ship[KEY]) $scope.ship[KEY] = {};
    $scope.generalHash = $scope.$parent.generalHash;
  });