
angular = require('angular');

angular.module('woin-starship')
  .controller('FacilitiesCtrl', function FacilitiesCtrl($scope) {
    var KEY = $scope.KEY = 'Facilities';
    if(!$scope.ship[KEY]) $scope.ship[KEY] = {};

    $scope.facilitiesValueAddHash = {};
    $scope.facilitiesValueRemoveHash = {};

    $scope.facilitiesHash = $scope.$parent.facilitiesHash;

      $scope.calculateLuxury = function() {
          return $scope.$parent.calculateLuxury();
      }
  });