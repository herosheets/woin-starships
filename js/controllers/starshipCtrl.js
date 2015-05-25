/*global angular */

/**
 * The main controller for the app. The controller:
 * - retrieves and persists the model via the todoStorage service
 * - exposes the model to the template and provides event handlers
 */
angular = require('angular');

var loadCsvData = function (scope) {
	Papa.parse(computers, {
		header: true,
		step: function(row) {
			//console.log("Row:", row.data);
			scope.computers.push(row.data);
		},
		complete: function() {
			console.log("Computers Loaded");
		}
	});

	Papa.parse(hulls, {
		header: true,
    quotes: true,
		step: function(row) {
			console.log("Row:", row.data);
			scope.hulls.push(row.data[0]);
		},
		complete: function() {
			console.log("Hulls Loaded");
      console.log(scope.hulls);
    }
	});

	Papa.parse(sensors, {
		header: true,
		step: function(row) {
			//console.log("Row:", row.data);
			scope.sensors.push(row.data);
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


angular.module('woin-starship')
	.controller('StarshipCtrl', function StarshipCtrl($scope, $routeParams, $filter, store) {
		'use strict';

		$scope.tabs = [
			{ title:'Hull Class', content:'/partials/hull.html' },
			{ title:'Command & Control', content:'/partials/commandcontrol.html' },
			{ title:'Crew', content:'/partials/crew.html' },
			{ title:'Sub-Liminal Engines', content:'/partials/subliminal.html' },
			{ title:'FTL Engines', content:'/partials/ftl.html' },
			{ title:'Superstructure', content:'/partials/superstructure.html' },
			{ title:'Deflector Shields', content:'/partials/shields.html' },
			{ title:'Point Defenses', content:'/partials/pointdefense.html' },
			{ title:'Weaponry', content:'/partials/weaponry.html' },
			{ title:'Additional Equipment', content:'/partials/equipment.html' },
			{ title:'Fighter Bay', content:'/partials/fighter_bay.html' },
			{ title:'Facilities', content:'/partials/facilities.html' },
			{ title:'Misc', content:'/partials/misc.html' },
			{ title:'Download CSV', content:'/partials/download.html' }
		];

		$scope.setPartial = function(tab) {
			console.log(tab);
			console.log("Setting choice partial to:" + tab.content);
      $scope.chosenPartial = tab.content;
		};

		$scope.hulls = [];
		$scope.computers = [];
		$scope.sensors = [];

		loadCsvData($scope);

	});
