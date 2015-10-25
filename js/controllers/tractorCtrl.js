
angular = require('angular');

angular.module('woin-starship')
  .controller('TractorCtrl', function TractorCtrl($scope) {

    var KEY = $scope.KEY = 'Tractor Beam';
    if(!$scope.ship[KEY]) $scope.ship[KEY] = {};
    $scope.generalHash = $scope.$parent.generalHash;
  });