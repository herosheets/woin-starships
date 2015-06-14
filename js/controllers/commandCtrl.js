
angular = require('angular');

angular.module('woin-starship')
  .controller('CommandCtrl', function CommandCtrl($scope) {

    var KEY = $scope.KEY = 'Control Computers';
    if(!$scope.ship[KEY]) $scope.ship[KEY] = {};

    $scope.computerHash = $scope.$parent.computerHash;
  });