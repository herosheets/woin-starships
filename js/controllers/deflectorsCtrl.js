
angular = require('angular');

angular.module('woin-starship')
  .controller('DeflectorShieldCtrl', function DeflectorShieldCtrl($scope) {
    var KEY = $scope.KEY = 'Deflector Shields';
    if(!$scope.ship[KEY]) $scope.ship[KEY] = {};

    $scope.deflectorHash = $scope.$parent.deflectorHash;


  });