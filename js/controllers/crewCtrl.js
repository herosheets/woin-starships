// common function for crew calculation
var getTotalCrew = function (ship, scope) {
    try {
        var baseCrew = ship.hull.Crew;
        var totalCrew = baseCrew;
        if (_.has(ship, 'Crew')) {
            angular.forEach(ship.Crew, function(quantity, crewType) {
                if (crewType === 'Additional Crew') {
                    totalCrew += quantity;
                }
            });
        }
        var modPercent = 0;

        _.each(scope.ship['Control Computers'], function(num, key) {
            var baseString = scope.computerHash[key].Crew;
            if(!_.contains(baseString, '%')) return;
            var mod = +(baseString.split('%')[0]);
            modPercent = Math.min(modPercent, mod);
        });

        return Math.floor(totalCrew + (baseCrew*(modPercent/100)));
    } catch (e) {
        return 0;
    }
};

angular = require('angular');

angular.module('woin-starship')
  .controller('CrewCtrl', function CrewCtrl($scope) {
    var KEY = $scope.KEY = 'Crew';
    if(!$scope.ship[KEY]) $scope.ship[KEY] = {};

    $scope.crewValueAddHash = {};
    $scope.crewValueRemoveHash = {};

    $scope.crewHash = $scope.$parent.crewHash;

    $scope.getTotalCrew = function() {
        return getTotalCrew($scope.ship, $scope.$parent);
    }
  });