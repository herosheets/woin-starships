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
  'Power Plant': "powerplantHash",
  'Sub-luminal Engine': 'sublHash',
  'FTL Engine': 'ftlHash',
  'Point Defenses': 'pointDefensesHash',
  'Deflector Shields': 'deflectorHash',
  'Superstructure': 'superstructureHash',
  'Weapon System': 'weaponHash',
  'Facilities': 'facilitiesHash',
  'Hangar Bay Shuttle': 'hangarHash',
  'Hangar Bay Fighter': 'hangarHash',
  'General': 'generalHash',
  'Cloaking': 'generalHash',
  'Electronic Warfare': 'generalHash',
  'Tractor Beam': 'generalHash',
  'Fueling': 'generalHash',
  'Engine Mods': 'generalHash'
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
        var b = +(parseFloat(partsList[component][val]));
        if (!(_.isNaN(b))) {
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
    var res = getComponentValue(ship[c], valueName);
    base += _.isNumber(res) ? res : 0;
  });
  angular.forEach(quantityComponents, function (hashName, componentName) {
    var hash = scope[hashName];
    base += getQuantityValue(ship[componentName], valueName, hash);
    base += getCrewValue(ship[componentName], valueName, hash, crewSize);
  });
  return base;
};

var getBackupVal = function (ship, valueName, scope) {
  var hash = scope['ftlHash'];
  var componentName = 'Backup FTL Engine';
  var base = 0;
  base += getQuantityValue(ship[componentName], valueName, hash);
  return base;
};

var getAllShipValues = function (ship, valueName, scope) {
  return getTotalShipValue(ship, valueName, scope);
};

var getCost = function (ship, scope) {
  var backup = getBackupVal(ship, 'Cost', scope);
  return backup + getTotalShipValue(ship, 'Cost', scope);
};

var getSpace = function (ship, scope) {
  var backup = getBackupVal(ship, 'Space', scope);
  return backup + getTotalShipValue(ship, 'Space', scope);
};

var getSpaceMax = function (ship) {
  if (_.has(ship, 'hull')) {
    return ship.hull['Max CU'];
  } else {
    return 0;
  }
};

var getCpu = function (ship, scope) {
  var backup = getBackupVal(ship, 'CPU', scope);
  return (backup + getTotalShipValue(ship, 'CPU', scope) - getCpuMax(ship, scope));
};

var getCpuMax = function (ship, scope) {
  if (_.has(ship, 'Control Computers')) {
    var q = getQuantityValue(ship['Control Computers'], 'CPU', scope.computerHash);
    return q;
  } else {
    return 0;
  }
};



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
      modPercent += mod*num;
    });

    return Math.floor(totalCrew + (baseCrew*(modPercent/100)));
  } catch (e) {
    return 0;
  }
};

// http://stackoverflow.com/questions/9083037/convert-a-number-into-a-roman-numeral-in-javascript
fromRoman = function (roman, accept) {
  var s = roman.toUpperCase().replace(/ +/g, ''),
    L = s.length, sum = 0, i = 0, next, val,
    R = { M: 1000, D: 500, C: 100, L: 50, X: 10, V: 5, I: 1 };

  function fromBigRoman(rn) {
    var n = 0, x, n1, S, rx =/(\(*)([MDCLXVI]+)/g;

    while ((S = rx.exec(rn)) != null) {
      x = S[1].length;
      n1 = fromRoman(S[2]);
      if (isNaN(n1)) return NaN;
      if (x) n1 *= Math.pow(1000, x);
      n += n1;
    }
    return n;
  }

  if (/^[MDCLXVI)(]+$/.test(s)) {
    if (s.indexOf('(') == 0) return fromBigRoman(s);

    while (i < L) {
      val = R[s.charAt(i++)];
      next = R[s.charAt(i)] || 0;
      if (next - val > 0) val *= -1;
      sum += val;
    }
    return sum;
  }
  return NaN;
};

var getHullClassInteger = function (ship, hulls) {
  return ship.hull ? Number.fromRoman(ship.hull['Class'], true): '';
};

var tabs = [
  {heading: 'Basics', route: 'main.basics'},
  {heading: 'Hull Class', route: 'main.hull'},
  {heading: 'Command & Control', route: 'main.command'},
  {heading: 'Power Plants', route: 'main.powerplants'},
  {heading: 'Ship Sensors', route: 'main.sensors'},
  {heading: 'Crew', route: 'main.crew'},
  {heading: 'Sub-Luminal Engines', route: 'main.subluminal'},
  {heading: 'FTL Engines', route: 'main.ftl'},
  {heading: 'Superstructure', route: 'main.superstructure'},
  {heading: 'Deflector Shields', route: 'main.deflectors'},
  {heading: 'Point Defense', route: 'main.pointdefense'},
  {heading: 'Weaponry', route: 'main.weaponry'},
  {heading: 'Facilities', route: 'main.facilities'},
  {heading: 'Hangars', route: 'main.hangars'},
  {heading: 'Tractor Beams', route: 'main.tractor'},
  {heading: 'Engine Mods', route: 'main.enginemods'},
  {heading: 'Fueling', route: 'main.fueling'},
  {heading: 'Cloaking Devices', route: 'main.cloaking'},
  {heading: 'Electronic Warfare', route: 'main.electronicwarfare'},
  {heading: 'Your Ship', route: 'main.ship'}
];

angular.module('woin-starship')
  .factory('Sidenav', ['cnOffCanvas', function(cnOffCanvas) {
    return cnOffCanvas({
      controller: 'SidenavCtrl',
      controllerAs: 'offCanvas',
      template: '<div class="off-canvas__nav"><tabs data="tabs" vertical="true" type="pills"></tabs></div>'
    })
  }])
  .controller('SidenavCtrl', ['$scope', function($scope) {
      $scope.tabs = tabs;
  }])
  .controller('StarshipCtrl', ['$scope', '$filter', 'Components', 'Sidenav', function StarshipCtrl($scope, $filter, Components, Sidenav) {
    'use strict';

    // initialize data
    $scope.toggleSidenav = Sidenav.toggle;
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
      console.log("Engine name: " + engineName + " , power: " + $scope.sublHash[engineName]['Power'] + " x" + quantity);
      var hullClass = getHullClassInteger($scope.ship, $scope.hulls);
      console.log(" hull: " + hullClass + " divided = " + totalPower/hullClass);

      if (totalPower !== undefined && hullClass !== undefined) {
        return totalPower/hullClass;
      } else {
        return 0;
      }
    };

    $scope.getTotalCrew = function() {
      return getTotalCrew($scope.ship, $scope);
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
      if (!$scope.ship.hull || !$scope.ship['FTL Engine']) return;
      var shipClass = Number.fromRoman($scope.ship.hull.Class);
      try {
        var engines = Object.keys($scope.ship['FTL Engine']);
        var engineName = engines[0];
        var fuelEff = $scope.ftlHash[engineName]['Fuel Eff'];
        if (fuelEff === '-') {
          return "-";
        } else {
          return Math.pow(shipClass, 3) * fuelEff;
        }
      } catch (e) {
        return "-";
      }
    };

    $scope.calculateSuperstructure = function() {
      try {
        var hullClass = getHullClassInteger($scope.ship, $scope.hulls);
        var baseSs = hullClass * 3;
        if ($scope.ship.Superstructure !== undefined) {
          var additional = $scope.ship.Superstructure["Additional SS"];
          if (additional !== undefined) {
            baseSs += additional;
          }
        }
        return baseSs;
      } catch(e) {
        return 0;
      }

    };

    $scope.calculateDefense = function() {
      var base = getAllShipValues($scope.ship, 'DEFENSE', $scope);
      base -= getQuantityValue($scope.ship['Point Defenses'], 'DEFENSE', $scope.pointDefensesHash);
      return Math.max(10, base);
    };

    $scope.calculateElectronicDefense = function() {
      try {
        var bonus = getAllShipValues($scope.ship, 'ELECTRONIC DEFENSE', $scope);

        var base = 0;
        _.each($scope.ship['Control Computers'], function(num, key) {
          var p = parseInt($scope.computerHash[key].CPU);
          if (p > base) {
            base = p;
          }
        });

        return Math.max(10, Math.floor((base/2) + bonus));
      } catch (e) {
        return 10;
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
        base += "(SOAK " + Math.round(ballistic) + " ballistic, " + Math.round(energy) + " energy.)";
      }
      return base;
    };

    $scope.presentCargo = function() {
      if ($scope.ship.hull !== undefined) {
        var initialCargo = $scope.ship.hull['Max CU'];
        var amountRemaining = $scope.maxSpace() - $scope.currentSpace();
        var tonnage = amountRemaining * 50;
        return initialCargo + " ("+$filter('number')(amountRemaining, 1)+" available; capacity " + $filter('number')(tonnage, 1) + " tons)";
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

      var crewTotal = $scope.getTotalCrew();

      if ($scope.ship.Crew !== undefined) {
        if ($scope.ship.Crew['Standard Passengers'] !== undefined) {
          crewTotal = crewTotal + $scope.ship.Crew['Standard Passengers']
          // console.log(" + standard Passengers = " + crewTotal);
        }
        if ($scope.ship.Crew['Luxury Passengers'] !== undefined) {
          crewTotal = crewTotal + $scope.ship.Crew['Luxury Passengers'];
          // console.log(" + luxury Passengers = " + crewTotal);
        }
        if ($scope.ship.Crew['Troops'] !== undefined) {
          crewTotal = crewTotal + $scope.ship.Crew['Troops'];
          // console.log(" + troops = " + crewTotal);
        }
      }

      var lux = (luxuryTotal / crewTotal) * 100;

      if(_.isNaN(lux)) lux = 0;

      lux = Math.round(lux * 100) / 100;
      lux = lux.toFixed(0);

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

    $scope.calculateAura = function(aura) {
      var hullClass = getHullClassInteger($scope.ship, $scope.hulls);
      if (aura !== undefined) {
        return Math.round(hullClass/4) + aura;
      } else {
        return Math.round(hullClass/4);
      }
    };

    $scope.isHangar = function(itemName) {
      return ($scope.generalHash[itemName] && $scope.generalHash[itemName].hangar !== undefined);
    };

    $scope.getCrewSize = function() {
      return getTotalCrew($scope.ship, $scope);
    };

    $scope.getHangarQty = function(hangar) {
      return $scope.generalHash[hangar].Craft;
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
      saveAs(blob, filename);
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
