
angular = require('angular');

angular.module('woin-starship')
  .controller('SubluminalCtrl', function SubluminalCtrl($scope) {
    var KEY = $scope.KEY = 'Subluminal';
    if(!$scope.ship[KEY]) $scope.ship[KEY] = {};

    $scope.sublHash = {};
    _.each($scope.subluminal, function(item) {
      $scope.sublHash[item.Item] = item;
    });
  });