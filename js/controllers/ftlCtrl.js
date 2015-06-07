
angular = require('angular');

angular.module('woin-starship')
  .controller('FtlCtrl', function FtlCtrl($scope) {
    var KEY = $scope.KEY = 'Ftl';
    if(!$scope.ship[KEY]) $scope.ship[KEY] = {};

    $scope.ftlHash = {};
    _.each($scope.ftl, function(item) {
      $scope.ftlHash[item.Item] = item;
    });
  });