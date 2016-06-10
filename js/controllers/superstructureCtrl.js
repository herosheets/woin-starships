angular = require('angular');

angular.module('woin-starship')
  .controller('SuperstructureCtrl', function CrewCtrl($scope) {
    var KEY = $scope.KEY = 'Superstructure';
    if(!$scope.ship[KEY]) $scope.ship[KEY] = {};

    $scope.superstructureHash = $scope.$parent.superstructureHash;

    $scope.calculateSuperstructure = function() {
        return $scope.$parent.calculateSuperstructure();
    };

      $scope.calculateArmor = function() {
          try {
            var b = $scope.$parent.presentArmor();
            var armor = b.split('(')[1];
            if (armor === undefined || armor === 'none') {
              return ""
            } else {
              return "- (" + armor;
            }
          } catch (e) {
            return "";
          }
      }
  });