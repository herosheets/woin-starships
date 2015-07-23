
angular = require('angular');

angular.module('woin-starship')
  .controller('HangarsCtrl', function HangarsCtrl($scope) {

    var KEY = $scope.KEY = 'Hangars';
    if(!$scope.ship[KEY]) $scope.ship[KEY] = {};
    $scope.hangarHash = $scope.$parent.hangarHash;
  });
