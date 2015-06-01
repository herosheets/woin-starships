
angular = require('angular');

angular.module('woin-starship')
  .controller('CommandCtrl', function CommandCtrl($scope) {

    var KEY = 'Control Computers';
    if(!$scope.ship[KEY]) $scope.ship[KEY] = {};

    $scope.isEmpty = function() {
        return _.size($scope.ship[KEY]) === 0;
    };

    $scope.incrementItem = function(itemKey) {
        if(!$scope.ship[KEY][itemKey]) $scope.ship[KEY][itemKey] = 0;
        $scope.ship[KEY][itemKey]++;
    };

    $scope.decrementItem = function(itemKey) {
        $scope.ship[KEY][itemKey]--;
        if($scope.ship[KEY][itemKey] <= 0) delete $scope.ship[KEY][itemKey];
    };

    $scope.computerHash = {};
    _.each($scope.computers, function(item) {
        $scope.computerHash[item[KEY]] = item;
    });
  });