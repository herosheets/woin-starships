
angular = require('angular');

angular.module('woin-starship')
  .controller('GeneralCtrl', function GeneralCtrl($scope) {
    var KEY = $scope.KEY = 'General';
    if(!$scope.ship[KEY]) $scope.ship[KEY] = {};

    $scope.generalHash = $scope.$parent.generalHash;

  });