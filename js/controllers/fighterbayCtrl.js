
angular = require('angular');

angular.module('woin-starship')
  .controller('FighterBayCtrl', function FacilitiesCtrl($scope) {
    var KEY = $scope.KEY = 'Hangar';
    if(!$scope.ship[KEY]) $scope.ship[KEY] = {};

    $scope.hangarHash = {};
    _.each($scope.systems.hangars, function(item) {
      $scope.hangarHash[item.Item] = item;
    });
  });