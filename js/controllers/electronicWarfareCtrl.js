
angular = require('angular');

angular.module('woin-starship')
  .controller('ElectronicWarfareCtrl', function ElectronicWarfareCtrl($scope) {

    var KEY = $scope.KEY = 'Electronic Warfare';
    if(!$scope.ship[KEY]) $scope.ship[KEY] = {};
    $scope.generalHash = $scope.$parent.generalHash;
  });