/*global angular */

/**
 * The main controller for the app. The controller:
 * - retrieves and persists the model via the todoStorage service
 * - exposes the model to the template and provides event handlers
 */
var angular = require('angular');

var flatComponents = ['hull', 'sensor'];

var quantityComponents = {
  'Crew': 'crewHash',
  'Control Computers': "computerHash",
  'Sub-luminal Engine': 'sublHash',
  'FTL Engine': 'ftlHash',
  'Point Defense': 'pointDefensesHash',
  'Deflector Shields': 'deflectorHash',
  'Superstructure': 'superstructureHash',
  'Weapon System': 'weaponHash',
  'Facilities': 'facilitiesHash',
  'Hangars': 'hangarHash',
  'General': 'generalHash'
};

var crewValues = ['Space', 'Cost', 'Luxury'];

var getComponentValue = function (c, val) {
  if (c !== undefined && c !== null) {
    if (_.has(c, val)) {
      return c[val];
    } else {
      return 0;
    }
  }
  return 0;
};

var getQuantityValue = function (shipPart, val, partsList) {
  var total = 0;
  if (shipPart !== undefined && shipPart !== null) {
    angular.forEach(shipPart, function (quantity, component) {
      if (_.has(partsList[component], val)) {
        var b = +(partsList[component][val]);
        if (!(isNaN(b))) {
          total += b * quantity;
        }
      }
    });
  }
  return total;
};

var getCrewValue = function (shipPart, val, partsList, crewSize) {
  try {
    if (_.contains(crewValues, val) && crewSize > 0) {
      var key = val + "/crew";
      return getQuantityValue(shipPart, key, partsList);
    } else {
      return 0;
    }
  } catch (e) {
    console.log(e);
    return 0;
  }
}

var getTotalShipValue = function (ship, valueName, scope) {
  var base = 0;
  var crewSize = getTotalCrew(ship, scope);
  angular.forEach(flatComponents, function (c) {
    base += getComponentValue(ship[c], valueName);
  });
  angular.forEach(quantityComponents, function (hashName, componentName) {
    var hash = scope[hashName];
    base += getQuantityValue(ship[componentName], valueName, hash);
    base += getCrewValue(ship[componentName], valueName, hash, crewSize);
  });
  return base;
};

var getAllShipValues = function (ship, valueName, scope) {
  return getTotalShipValue(ship, valueName, scope);
};

var getCost = function (ship, scope) {
  return getTotalShipValue(ship, 'Cost', scope);
};

var getSpace = function (ship, scope) {
  return getTotalShipValue(ship, 'Space', scope);
};

var getSpaceMax = function (ship) {
  if (_.has(ship, 'hull')) {
    return ship.hull['Max CU'];
  } else {
    return 0;
  }
};

var getCpu = function (ship, scope) {
  return getTotalShipValue(ship, 'CPU', scope);
};

var getCpuMax = function (ship, scope) {
  return getTotalShipValue(ship, 'Max CPU', scope);
  /*if (_.has(ship, 'Control Computers')) {
    return getQuantityValue(ship['Control Computers'], 'Max CPU', scope);
  } else {
    return 0;
  }*/
};

var getHullClassInteger = function (ship, hulls) {
  var index = hulls.indexOf(ship.hull);
  return index + 1;
};

var getTotalCrew = function (ship, scope) {
  try {
    var baseCrew = ship.hull.Crew;
    if (_.has(ship, 'Crew')) {
      angular.forEach(ship.Crew, function(quantity, crewType) {
        baseCrew += quantity;
      });
    }
    return baseCrew;
  } catch (e) {
    return 0;
  }
};

var tabs = [
  {heading: 'Basics', route: 'main.basics'},
  {heading: 'Hull Class', route: 'main.hull'},
  {heading: 'Command & Control', route: 'main.command'},
  {heading: 'Ship Sensors', route: 'main.sensors'},
  {heading: 'Crew', route: 'main.crew'},
  {heading: 'Sub-Luminal Engines', route: 'main.subluminal'},
  {heading: 'FTL Engines', route: 'main.ftl'},
  {heading: 'Superstructure', route: 'main.superstructure'},
  {heading: 'Deflector Shields', route: 'main.deflectors'},
  {heading: 'Weaponry', route: 'main.weaponry'},
  {heading: 'Facilities', route: 'main.facilities'},
  {heading: 'Hangars', route: 'main.hangars'},
  {heading: 'General Equipment', route: 'main.general'},
  {heading: 'Your Ship', route: 'main.ship'}
];

angular.module('woin-starship')
  .controller('StarshipCtrl', ['$scope', 'Components', function StarshipCtrl($scope, Components) {
    'use strict';

    // initialize data
    $scope.tabs = tabs;
    $scope.ship = {name: "", description: "", hullConfig: {}};

    Components.loadCsvData($scope);

    // helper functions for cost & cargo calculations
    $scope.totalCost = function () {
      return getCost($scope.ship, $scope);
    };

    $scope.currentSpace = function () {
      return getSpace($scope.ship, $scope);
    };

    $scope.maxSpace = function () {
      return getSpaceMax($scope.ship, $scope);
    };

    $scope.maxCpu = function () {
      return getCpuMax($scope.ship, $scope);
    };

    $scope.currentCpu = function () {
      return getCpu($scope.ship, $scope);
    };

    $scope.isHullConfigDisabled = function(config) {
      if(!config.levels) return false;
      if(config.levels && !$scope.ship.hull) return true;
      return config.levels.indexOf($scope.ship.hull.Class) === -1;
    };

    $scope.calculateSublSpeed = function (engineName, quantity) {
      var totalPower = $scope.sublHash[engineName]['Power'] * quantity;
      var hullClass = getHullClassInteger($scope.ship, $scope.hulls);

      if (totalPower !== undefined && hullClass !== undefined) {
        return totalPower/hullClass;
      } else {
        return 0;
      }
    };

    $scope.calculateFtl = function (engineName, quantity) {
      var totalPower = $scope.ftlHash[engineName]['Power'] * quantity;
      var hullClass = getHullClassInteger($scope.ship, $scope.hulls);
      var maxFtl = getTotalShipValue($scope.ship, 'Max FTL', $scope);

      if (totalPower !== undefined && hullClass !== undefined) {
        var max = totalPower/hullClass;
        if (max <= maxFtl) {
          return max;
        } else {
          return maxFtl;
        }
      } else {
        return 0;
      }
    };

    $scope.calculateOperationalRange = function() {
      if (!$scope.ship.hull) return;
      var shipClass = Number.fromRoman($scope.ship.hull.Class);
      var modifier = getAllShipValues($scope.ship, 'Fuel Eff', $scope);

      return Math.pow(shipClass, 3) * modifier;
    };

    $scope.calculateSuperstructure = function() {
      try {
        var hullClass = getHullClassInteger($scope.ship, $scope.hulls);
        var baseSs = hullClass * 3;
        var additional = $scope.ship.Superstructure["Additional SS"];
        if (additional !== undefined) {
          baseSs += additional;
        }
        return baseSs;
      } catch(e) {
        return 0;
      }

    };

    $scope.calculateDefense = function() {
      var base = getAllShipValues($scope.ship, 'DEFENSE', $scope);
      if ($scope.ship['Point Defense'] && $scope.ship['Point Defense']['Point defenses']) {
        var pointDefense = $scope.ship['Point Defense']['Point defenses'];
        var hullClass = getHullClassInteger($scope.ship, $scope.hulls);
        base -= (pointDefense * 2);
        base += ((pointDefense * 2)/hullClass);
      }
      return base;
    };

    $scope.calculateElectronicDefense = function() {
      try {
        var bonus = getAllShipValues($scope.ship, 'ELECTRONIC DEFENSE', $scope);
        var base = getCpu($scope.ship, $scope);
        return Math.floor((base/2) + bonus);
      } catch (e) {
        return 0;
      }

    };

    $scope.presentArmor = function() {
      var base = "";
      var ballistic = 0;
      var energy = 0;
      var hullClass = getHullClassInteger($scope.ship, $scope.hulls);
      var reactive = 0;
      var ablative = 0;

      if ($scope.ship.Superstructure !== undefined) {
        reactive = $scope.ship.Superstructure["Armor, reactive"];
        ablative = $scope.ship.Superstructure["Armor, ablative"];
      }

      if (reactive !== undefined && reactive !== 0) {
        ballistic += (reactive/hullClass);
        energy += (1.5 * reactive / hullClass);
        base += reactive + "x reactive ";
      }

      if (ablative !== undefined && ablative !== 0) {
        ballistic += (1.5 * ablative/hullClass);
        energy += (ablative / hullClass);
        base += ablative + "x ablative ";
      }

      if (base === "") {
        base = "-";
      } else {
        base += "(SOAK " + ballistic + " ballistic, " + energy + " energy.)";
      }
      return base;
    };

    $scope.presentCargo = function() {
      if ($scope.ship.hull !== undefined) {
        var initialCargo = $scope.ship.hull['Max CU'];
        var amountRemaining = $scope.maxSpace() - $scope.currentSpace();
        var tonnage = $scope.maxSpace() * 50;
        return "[" + initialCargo + "] ("+amountRemaining+" : " + tonnage + " tons)";
      } else {
        return "-";
      }
    };

    $scope.presentType = function(type) {
      if (type.Traits === undefined) {
        return "None";
      } else {
        return type.Type;
      }
    };

    $scope.calculateLuxury = function() {
      var luxuryTotal = getAllShipValues($scope.ship, 'Luxury/crew', $scope);
      var crewTotal = getTotalCrew($scope.ship, $scope);
      var lux = (luxuryTotal / crewTotal) * 100;

      if(_.isNaN(lux)) lux = 0;

      if (lux < 50) {
        return lux + "% (Spartan: -2d6)";
      } else if (lux < 90) {
        return lux + "% (Poor: -1d6)";
      } else if (lux < 150) {
        return lux + "% (Adequate: -)";
      } else if (lux < 199) {
        return lux + "% (Comfortable: +1d6)";
      } else {
        return lux + "% (Decadent: -1d6)";
      }
    };

    $scope.clearCloaking = function() {
      if(!$scope.ship.General) return;
      _.each($scope.ship.General, function(value, key) {
        if(_.findWhere($scope.systems.cloaking, {Item: key})) {
          delete $scope.ship.General[key];
        }
      });
    };

    $scope.calculateSoak = function(power, quantity) {
      var hullClass = getHullClassInteger($scope.ship, $scope.hulls);
      return parseInt(power * quantity / hullClass);
    };

    $scope.isHangar = function(itemName) {
      return ($scope.generalHash[itemName] && $scope.generalHash[itemName].hangar !== undefined);
    };

    $scope.getCrewSize = function() {
      return getTotalCrew($scope.ship, $scope);
    };

    $scope.getHangarQty = function(hangar) {
      var notes = $scope.generalHash[hangar].Notes;
      return notes.split('Room for ')[1].split(' ')[0];
    };

    $scope.addQuantitied = function (component, key, item) {
      if (component[key] === undefined) {
        component[key] = item;
        component[key].quantity = 1;
      } else {
        component[key].quantity += 1;
      }
    };

    $scope.removeQuantitied = function (component, key) {
      if (component[key].quantity > 1) {
        component[key].quantity -= 1;
      } else {
        var index = component.indexOf(key);
        component.splice(index, 1);
      }
    };

    $scope.isEmpty = function (KEY) {
      return _.size($scope.ship[KEY]) === 0;
    };

    $scope.incrementItem = function (KEY, itemKey, value) {
      if(!value) value = 1;
      if (!$scope.ship[KEY][itemKey]) $scope.ship[KEY][itemKey] = 0;
      $scope.ship[KEY][itemKey] += value;

      if(_.isNaN($scope.ship[KEY][itemKey])) $scope.ship[KEY][itemKey] = 0;
    };

    // only allow one type of the item at a time
    $scope.incrementOneItem = function (KEY, itemKey) {
      var keys = Object.getOwnPropertyNames($scope.ship[KEY]);

      if (keys.length === 0 ||  (_.includes(keys, itemKey))) {
        $scope.incrementItem(KEY, itemKey);
      }
    };

    $scope.hasThisItem = function (KEY, itemKey) {
      var keys = Object.getOwnPropertyNames($scope.ship[KEY]);

      return (keys.length === 0 || (_.includes(keys, itemKey)));
    };

    $scope.decrementItem = function (KEY, itemKey, value) {
      if(!value) value = 1;
      $scope.ship[KEY][itemKey] -= value;
      if ($scope.ship[KEY][itemKey] <= 0 || _.isNaN($scope.ship[KEY][itemKey])) delete $scope.ship[KEY][itemKey];
    };

    $scope.save = function() {
      var filename = "starship-"+Date.now()+".json";
      var str = JSON.stringify($scope.ship, null, 4);
      var blob = new Blob([str], {type: 'application/json'});
      var a = document.createElement('a');

      if (navigator.msSaveBlob) {
        return navigator.msSaveBlob(blob, filename);

      } else if('download' in a) {
        var url = URL.createObjectURL(blob);
        a.download = filename;
        a.href = url;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        return true;
      }
    };

    $scope.load = function(files) {
      if(!files.length) return;

      var reader = new FileReader();

      reader.onload = function() {
        var text = reader.result;
        $scope.ship = JSON.parse(text);
        _.each($scope.hulls, function(hull) {
          if(hull.Class === $scope.ship.hull.Class) {
            $scope.ship.hull = hull;
          }
        });
        $scope.$apply(); // wtf angular?
      };

      reader.readAsText(files[0], 'UTF-8');
    };

  }]);
