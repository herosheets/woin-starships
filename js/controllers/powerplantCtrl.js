
angular = require('angular');

angular.module('woin-starship')
  .controller('PowerplantCtrl', function PowerplantCtrl($scope) {

    var KEY = $scope.KEY = 'Power Plants';
    if(!$scope.ship[KEY]) $scope.ship[KEY] = {};

    $scope.powerplantHash = $scope.$parent.powerplantHash;
  });