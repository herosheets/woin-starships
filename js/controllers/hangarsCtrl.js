
angular = require('angular');

angular.module('woin-starship')
  .controller('HangarsCtrl', function HangarsCtrl($scope) {

    var KEY = $scope.KEY = 'Hangar Bay';
    if(!$scope.ship[KEY+' Fighter']) $scope.ship[KEY+' Fighter'] = {};
    if(!$scope.ship[KEY+' Shuttle']) $scope.ship[KEY+' Shuttle'] = {};
    if(!$scope.ship[KEY+' Vehicle']) $scope.ship[KEY+' Vehicle'] = {};
    $scope.hangarHash = $scope.$parent.hangarHash;
  });
