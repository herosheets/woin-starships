/*global angular */

/**
 * The main controller for the app. The controller:
 * - retrieves and persists the model via the todoStorage service
 * - exposes the model to the template and provides event handlers
 */
angular = require('angular');

var flatComponents =  ['hull', 'sensor'];
var quantityComponents = ['crew', 'computers'];

var getComponentValue = function(c, val) {
  if (c !== undefined && c !== null) {
    if (_.has(c, val)) {
      return c[val];
    } else {
      return 0;
    }
  }
  return 0;
};

var getQuantityValue = function(c, val) {
  var total = 0;
  if (c !== undefined && c !== null) {
    angular.forEach(c, function(component) {
      var quantity = component.quantity;
      if (_.has(component, val)) {
        total += c[val] * quantity;
      }
    });
  }
  return total;
};

var getTotalShipValue = function(ship, valueName) {
  var base = 0;
  angular.forEach(flatComponents, function(c) {
    base += getComponentValue(ship[c], valueName);
  });
  angular.forEach(quantityComponents, function(c) {
    base += getQuantityValue(ship[c], valueName);
  });
  return base;
};

var getCost = function(ship) {
  return getTotalShipValue(ship, 'Cost');
};

var getSpace = function(ship) {
  return getTotalShipValue(ship, 'Space');
};

var getSpaceMax = function(ship) {
  if (_.has(ship, 'hull')) {
    return ship.hull['Max CU'];
  } else {
    return 0;
  }
};

var getCpu = function(ship) {
  return getTotalShipValue(ship, 'CPU');
};

var getCpuMax = function(ship) {
  if (_.has(ship, 'computer')) {
    return getQuantityValue(ship.computer, 'Max CPU');
  } else {
    return 0;
  }};

var loadCsvData = function (scope) {
  scope.hulls = [];
  scope.computers = [];
  scope.sensors = [];
  scope.hullConfigurations = hullConfigurations;
  scope.passengerOptions = passengers;

	Papa.parse(computers, {
		header: true,
    dynamicTyping: true,
    step: function(row) {
			scope.computers.push(row.data[0]);
		},
		complete: function() {
			console.log("Computers Loaded");
		}
	});

	Papa.parse(hulls, {
		header: true,
    quotes: true,
    dynamicTyping: true,
    step: function(row) {
			scope.hulls.push(row.data[0]);
		},
		complete: function() {
			console.log("Hulls Loaded");
      console.log(scope.hulls);
    }
	});

	Papa.parse(sensors, {
		header: true,
    dynamicTyping: true,
		step: function(row) {
			scope.sensors.push(row.data[0]);
		},
		complete: function() {
			console.log("Sensors Loaded");
		}
	});
}

var computers =
	 "Control Computers,Cost,Size,Space,Max FTL,CPU,Crew,Rng Inc,SOAK,DEFENSE,Checks\n"+
	 "Chemerkin-Liang Products LM-1,30,L,5,4,16,-,15,1,-,+0d6\n"+
	 "Chemerkin-Liang Products LM-2,60,L,5,5,20,-1.00%,16,1,-,+0d6\n"+
	 "Chemerkin-Liang Products LM-2H,380,L,5,10,40,-6.00%,18,2,1,+1d6\n"+
	 "Chemerkin-Liang Products LM-2S,800,L,5,13,52,-11.00%,21,2,2,+1d6\n"+
	 "Chemerkin-Liang Products LM-3S,1200,L,5,14,56,-13.00%,22,2,3,+1d6\n"+
	 "Chemerkin-Liang Products LM-5S,2000,L,5,16,64,-15.00%,23,3,4,+1d6\n"+
	 "Frontier Products Frontier Products MM-1,15,M,3,2,8,-,10,-,-,+0d6\n"+
	 "Frontier Products MM-2,30,M,3,3,12,-1.00%,11,-,-,+0d6\n"+
	 "Frontier Products MM-3,45,M,3,4,16,-2.00%,11,-,1,+0d6\n"+
	 "Frontier Products MM-3H,345,M,3,8,32,-7.00%,13,1,2,+1d6\n"+
	 "Frontier Products MM-4H,435,M,3,9,36,-8.00%,14,2,2,+1d6\n"+
	 "Highwatch SM-1,3,S,1,2,8,-,5,-,-,+0d6\n"+
	 "Highwatch SM-1H,109,S,1,4,16,-5.00%,7,1,1,+1d6\n"+
	 "MicroCorp EM-2H,470,E,10,9,36,-11.00%,23,3,1,+1d6\n"+
	 "MicroCorp EM-3S,1425,E,10,14,56,-17.00%,26,3,3,+1d6\n"+
	 "Newstellar EM-1,45,E,10,4,16,-5.00%,20,2,-,+0d6\n"+
	 "Newstellar EM-1H,235,E,10,8,32,-10.00%,22,3,1,+1d6\n"+
	 "Terra Prime GM-1,75,G,20,4,16,-10.00%,25,3,-,+0d6\n"+
	 "Terra Prime GM-1H,325,G,20,8,32,-15.00%,27,4,1,+1d6";

var hulls =
		"Class,Tonnage,Cost,Crew,Max CU,DEFENSE,FUEL,INITIATIVE\n"+
		"I,\"1,000-5,000\",5,4,50,20,1,-\n"+
		"II,\"5,000-15,000\",20,5,150,19,8,-\n"+
		"III,\"15,000-25,000\",45,7,250,18,27,-\n"+
		"IV,\"25,000-40,000\",80,12,400,17,64,-\n"+
		"V,\"40,000-60,000\",125,20,600,16,125,-1d6\n"+
		"VI,\"60,000-80,000\",180,30,800,15,216,-1d6\n"+
		"VII,\"80,000-100,000\",245,50,1000,14,343,-1d6\n"+
		"VIII,\"100,000-120,000\",320,100,1200,13,512,-1d6\n"+
		"IX,\"120,000-140,000\",405,200,1400,12,729,-1d6\n"+
		"X,\"140,000-160,000\",500,300,1600,11,1000,-2d6\n"+
		"XI,\"160,000-180,000\",605,400,1800,10,1331,-2d6\n"+
		"XII,\"180,000-210,000\",620,500,2100,9,1728,-2d6\n"+
		"XIII,\"210,000-240,000\",845,750,2400,8,2197,-2d6\n"+
		"XIV,\"240,000-300,000\",980,1000,3000,7,2744,-2d6\n"+
		"XV,\"300,000-350,000\",1125,2000,3500,6,3375,-3d6\n"+
		"XVI,\"350,000-400,000\",1280,3000,4000,5,4096,-3d6\n"+
		"XVII,\"400,000-450,000\",1445,4000,4500,4,4913,-3d6\n"+
		"XVIII,\"450,000-500,000\",1620,5000,5000,3,5832,-3d6";

var sensors =
	"Sensor Systems,Cost,Size,Space,Range,Range Inc,DEFENSE,Checks\n"+
	"Chen-Collins SS-1,4,S,1,2,5,-,+0d6\n"+
	"Chen-Collins SS-2,8,S,1,4,6,-,+0d6\n"+
	"Chen-Collins SS-2H,224,S,1,8,8,1,+1d6\n"+
	"Interstellar Enterprises MS-1,20,M,3,4,10,-,+0d6\n"+
	"Interstellar Enterprises MS-1H,160,M,3,8,12,1,+1 die\n"+
	"Interstellar Enterprises MS-2,40,M,3,6,11,-,+0d6\n"+
	"Lunar Works LS-1,40,L,5,6,15,-,+0d6\n"+
	"Lunar Works LS-2,80,L,5,8,16,-,+0d6\n"+
	"Lunar Works LS-2H,160,L,5,14,18,1,+1d6\n"+
	"Newwatch ES-1,60,E,10,8,20,-,+0d6\n"+
	"Newwatch ES-1H,280,E,10,16,22,1,+1d6\n"+
	"Newwatch ES-2,120,E,10,10,21,-,+0d6\n"+
	"Intergalactic Foundation GS-1,100,G,20,110,25,-,+0d6\n"+
	"Intergalactic Foundation GS-2,200,G,20,12,26,-,+0d6\n"+
	"Intergalactic Foundation GS-2H,800,G,20,22,28,1,+1d6";

var hullConfigurations = [
  { name: "None", display: "None"},
  { name: "Evasive", display: "Evasive: Patrol craft gain +2 to their DEFENSE score."},
  { name: "Inspector", display: "Inspector: Patrol craft may make two scanning checks per turn as a single action."},
  { name: "Fast", display: "Fast: Couriers gain +1 to their FTL speed."},
  { name: "Silent-running", display: "Silent-running: A courier ship can operate stealthily. While this will not protect it from actual scans in the way that a cloaking device might, it can pass unnoticed when not actively being looked for."},
  { name: "Scientific", display: "Scientific: Research ships may treat all labs and medical facilities as high quality even when they are not."},
  { name: "Deep scan", display: "Deep scan: A research ship can perform a deep scan of the area in a radius equal to the range of its sensors and automatically detect the presence of (but not the exact location of) cloaked vessels within that area."},
  { name: "Well-appointed", display: "Well-appointed: Yachts gain a bonus LUXURY percentage of 20%."},
  { name: "Explorer", display: "Explorer: Scouts have a +20% operational range."},
  { name: "Hauler", display: "Hauler: Freighters gain +20% cargo space (which must be used for cargo, not components)."},
  { name: "Tactical", display: "Tactical: Escorts have 50% extra sensor range."},
  { name: "Heavily-armed", display: "Heavily-armed: Destroyers reduce the CPU requirement of each weapon by 1"},
  { name: "Gunboat", display: "Gunboat: Frigates increase weapon range by 10%."},
  { name: "Skeleton crew", display: "Skeleton crew: Transports have 10% the crew requirement of other ships as long as no weapons are installed."},
  { name: "5 year mission", display: "5 year mission: Cruisers have a +20% operational range."},
  { name: "Luxurious", display: "Luxurious: Liners gain a bonus LUXURY percentage of 20% and free passenger capacity equal to ten times their class."},
  { name: "Tough", display: "Tough: Battleships start with double the base SS for their class."},
  { name: "Scramble", display: "Scramble: Carriers may launch all fighters/shuttles as a single action."}
];

var passengers = [
  { Type: "Troops", Space: "2 CU", Cost: "0.1 Mcr" },
  { Type: "Standard Passengers", Space: "2 CU", Cost: "0.2 Mcr" },
  { Type: "Luxury Passengers", Space: "4 CU", Cost: "0.3 Mcr" }
];

var tabs = [
  { heading:'Basics', route:'/partials/basics.html' },
  { heading:'Hull Class', route:'/partials/hull.html' },
  { heading:'Command & Control', route:'main.command' },
  { heading:'Crew', route:'/partials/crew.html' },
  { heading:'Sub-Liminal Engines', route:'/partials/subliminal.html' },
  { heading:'FTL Engines', route:'/partials/ftl.html' },
  { heading:'Superstructure', route:'/partials/superstructure.html' },
  { heading:'Deflector Shields', route:'/partials/shields.html' },
  { heading:'Point Defenses', route:'/partials/pointdefense.html' },
  { heading:'Weaponry', route:'/partials/weaponry.html' },
  { heading:'Additional Equipment', route:'/partials/equipment.html' },
  { heading:'Fighter Bay', route:'/partials/fighter_bay.html' },
  { heading:'Facilities', route:'/partials/facilities.html' },
  { heading:'Misc', route:'/partials/misc.html' },
  { heading:'Download CSV', route:'/partials/download.html' }
];

angular.module('woin-starship')
	.controller('StarshipCtrl', function StarshipCtrl($scope) {
		'use strict';

    // initialize data
    $scope.tabs = tabs;
    $scope.ship = { name: "", description: "" };

    loadCsvData($scope);

		$scope.setPartial = function(tab) {
      $scope.chosenPartial = tab.content;
		};

    // helper functions for cost & cargo calculations
    $scope.totalCost = function() {
      return getCost($scope.ship);
    };

    $scope.currentSpace = function() {
      return getSpace($scope.ship);
    };

    $scope.maxSpace = function() {
      return getSpaceMax($scope.ship);
    };

    $scope.maxCpu = function() {
      return getCpuMax($scope.ship);
    };

    $scope.currentCpu = function() {
      return getCpu($scope.ship);
    };

    $scope.addQuantitied = function(component, key, item) {
      if (component[key] === undefined) {
        component[key] = item;
        component[key].quantity = 1;
      } else {
        component[key].quantity += 1;
      }
    };

    $scope.removeQuantitied = function(component, key) {
      if (component[key].quantity > 1) {
        component[key].quantity -= 1;
      } else {
        var index = component.indexOf(key);
        component.splice(index, 1);
      }
    };

	});
