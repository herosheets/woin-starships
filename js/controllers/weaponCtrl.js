
angular = require('angular');

angular.module('woin-starship')
  .controller('WeaponCtrl', function WeaponCtrl($scope) {

    var KEY = $scope.KEY = 'Weapon System';
    if(!$scope.ship[KEY]) $scope.ship[KEY] = {};

    $scope.weaponHash = {};
    _.each($scope.weapons, function(item) {
        $scope.weaponHash[item[KEY]] = item;
    });
  });