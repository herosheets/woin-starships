
angular = require('angular');

angular.module('woin-starship')
  .controller('ShipViewCtrl', function ShipViewCtrl($scope) {
    $scope = $scope.$parent;

    $scope.calculateWeight = function(weightString) {
      try {
        var split = weightString.split(',').join('').split('-');
        var min = parseInt(split[0].trim());
        var max = parseInt(split[1].trim());

        var diff = max - min;

        var currentSpace = $scope.currentSpace();
        var maxSpace = $scope.maxSpace();

        return min + (currentSpace/maxSpace * diff);
      } catch(e) {
        return 0;
      }

    };

      $scope.calculateCrew = function() {
        var base = +$scope.ship.hull.Crew;
        var modPercent = 0;

        _.each($scope.ship['Control Computers'], function(num, key) {
          var baseString = $scope.computerHash[key].Crew;
          if(!_.contains(baseString, '%')) return;
          var mod = +(baseString.split('%')[0]);
          modPercent += mod*num;
        });

        return Math.floor(base + (base*(modPercent/100)));
      };

      $scope.calculateWeaponRange = function(weaponName) {
        return Math.min($scope.weaponHash[weaponName]['Range'], $scope.ship.sensor.Range);
      };

  });
