/*global angular */

/**
 * The main controller for the app. The controller:
 * - retrieves and persists the model via the todoStorage service
 * - exposes the model to the template and provides event handlers
 */
angular = require('angular');

var flatComponents = ['hull', 'sensor'];
var quantityComponents = ['crew', 'computers'];

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

var getQuantityValue = function (c, val) {
  var total = 0;
  if (c !== undefined && c !== null) {
    angular.forEach(c, function (component) {
      var quantity = component.quantity;
      if (_.has(component, val)) {
        total += c[val] * quantity;
      }
    });
  }
  return total;
};

var getTotalShipValue = function (ship, valueName) {
  var base = 0;
  angular.forEach(flatComponents, function (c) {
    base += getComponentValue(ship[c], valueName);
  });
  angular.forEach(quantityComponents, function (c) {
    base += getQuantityValue(ship[c], valueName);
  });
  return base;
};

var getCost = function (ship) {
  return getTotalShipValue(ship, 'Cost');
};

var getSpace = function (ship) {
  return getTotalShipValue(ship, 'Space');
};

var getSpaceMax = function (ship) {
  if (_.has(ship, 'hull')) {
    return ship.hull['Max CU'];
  } else {
    return 0;
  }
};

var getCpu = function (ship) {
  return getTotalShipValue(ship, 'CPU');
};

var getCpuMax = function (ship) {
  if (_.has(ship, 'computer')) {
    return getQuantityValue(ship.computer, 'Max CPU');
  } else {
    return 0;
  }
};

var loadCsvData = function (scope) {
  scope.hulls = [];
  scope.computers = [];
  scope.sensors = [];
  scope.deflectors = [];
  scope.facilities = [];
  scope.ftl = [];
  scope.subluminal = [];

  scope.systems = {
    cloaking: [],
    fueling: [],
    commandControl: [],
    tractor: [],
    hangars: [],
    engMods: [],
    electronicWarfare: []
  };

  scope.weapons = [];
  scope.hullConfigurations = hullConfigurations;
  scope.passengerOptions = passengers;

  Papa.parse(computers, {
    header: true,
    dynamicTyping: true,
    step: function (row) {
      scope.computers.push(row.data[0]);
    },
    complete: function () {
      console.log("Computers Loaded");
    }
  });

  Papa.parse(deflectors, {
    header: true,
    dynamicTyping: true,
    step: function (row) {
      scope.deflectors.push(row.data[0]);
    },
    complete: function () {
      console.log("Deflectors Loaded");
    }
  });

  Papa.parse(facilities, {
    header: true,
    dynamicTyping: true,
    step: function (row) {
      scope.facilities.push(row.data[0]);
    },
    complete: function () {
      console.log("Facilities Loaded");
    }
  });

  Papa.parse(ftl, {
    header: true,
    dynamicTyping: true,
    step: function (row) {
      scope.ftl.push(row.data[0]);
    },
    complete: function () {
      console.log("FTL Loaded");
    }
  });

  Papa.parse(hulls, {
    header: true,
    quotes: true,
    dynamicTyping: true,
    step: function (row) {
      scope.hulls.push(row.data[0]);
    },
    complete: function () {
      console.log("Hulls Loaded");
      console.log(scope.hulls);
    }
  });

  Papa.parse(sensors, {
    header: true,
    dynamicTyping: true,
    step: function (row) {
      scope.sensors.push(row.data[0]);
    },
    complete: function () {
      console.log("Sensors Loaded");
    }
  });

  Papa.parse(subluminal, {
    header: true,
    dynamicTyping: true,
    step: function (row) {
      scope.subluminal.push(row.data[0]);
    },
    complete: function () {
      console.log("Subluminal Loaded");
    }
  });

  // systems
  Papa.parse(cloaking, {
    header: true,
    dynamicTyping: true,
    step: function (row) {
      scope.systems.cloaking.push(row.data[0]);
    },
    complete: function () {
      console.log("cloaking Systems Loaded");
    }
  });

  Papa.parse(fueling, {
    header: true,
    dynamicTyping: true,
    step: function (row) {
      scope.systems.fueling.push(row.data[0]);
    },
    complete: function () {
      console.log("fueling Systems Loaded");
    }
  });

  Papa.parse(commandControl, {
    header: true,
    dynamicTyping: true,
    step: function (row) {
      scope.systems.commandControl.push(row.data[0]);
    },
    complete: function () {
      console.log("commandControl Systems Loaded");
    }
  });

  Papa.parse(tractor, {
    header: true,
    dynamicTyping: true,
    step: function (row) {
      scope.systems.tractor.push(row.data[0]);
    },
    complete: function () {
      console.log("tractor Systems Loaded");
    }
  });

  Papa.parse(hangars, {
    header: true,
    dynamicTyping: true,
    step: function (row) {
      scope.systems.hangars.push(row.data[0]);
    },
    complete: function () {
      console.log("hangar Systems Loaded");
    }
  });

  Papa.parse(engMods, {
    header: true,
    dynamicTyping: true,
    step: function (row) {
      scope.systems.engMods.push(row.data[0]);
    },
    complete: function () {
      console.log("engMods Systems Loaded");
    }
  });

  Papa.parse(electronicWarfare, {
    header: true,
    dynamicTyping: true,
    step: function (row) {
      scope.systems.electronicWarfare.push(row.data[0]);
    },
    complete: function () {
      console.log("electronicWarfare Systems Loaded");
    }
  });

  Papa.parse(commandControl, {
    header: true,
    dynamicTyping: true,
    step: function (row) {
      scope.systems.commandControl.push(row.data[0]);
    },
    complete: function () {
      console.log("commandControl Systems Loaded");
    }
  });
  // end systems

  Papa.parse(weapons, {
    header: true,
    dynamicTyping: true,
    step: function (row) {
      scope.weapons.push(row.data[0]);
    },
    complete: function () {
      console.log("Weapons Loaded");
    }
  });
};

var computers =
  "Control Computers,Cost,Size,Space,Max FTL,CPU,Crew,Rng Inc,SOAK,DEFENSE,Checks\n" +
  "Chemerkin-Liang Products LM-1,30,L,5,4,16,-,15,1,-,+0d6\n" +
  "Chemerkin-Liang Products LM-2,60,L,5,5,20,-1.00%,16,1,-,+0d6\n" +
  "Chemerkin-Liang Products LM-2H,380,L,5,10,40,-6.00%,18,2,1,+1d6\n" +
  "Chemerkin-Liang Products LM-2S,800,L,5,13,52,-11.00%,21,2,2,+1d6\n" +
  "Chemerkin-Liang Products LM-3S,1200,L,5,14,56,-13.00%,22,2,3,+1d6\n" +
  "Chemerkin-Liang Products LM-5S,2000,L,5,16,64,-15.00%,23,3,4,+1d6\n" +
  "Frontier Products Frontier Products MM-1,15,M,3,2,8,-,10,-,-,+0d6\n" +
  "Frontier Products MM-2,30,M,3,3,12,-1.00%,11,-,-,+0d6\n" +
  "Frontier Products MM-3,45,M,3,4,16,-2.00%,11,-,1,+0d6\n" +
  "Frontier Products MM-3H,345,M,3,8,32,-7.00%,13,1,2,+1d6\n" +
  "Frontier Products MM-4H,435,M,3,9,36,-8.00%,14,2,2,+1d6\n" +
  "Highwatch SM-1,3,S,1,2,8,-,5,-,-,+0d6\n" +
  "Highwatch SM-1H,109,S,1,4,16,-5.00%,7,1,1,+1d6\n" +
  "MicroCorp EM-2H,470,E,10,9,36,-11.00%,23,3,1,+1d6\n" +
  "MicroCorp EM-3S,1425,E,10,14,56,-17.00%,26,3,3,+1d6\n" +
  "Newstellar EM-1,45,E,10,4,16,-5.00%,20,2,-,+0d6\n" +
  "Newstellar EM-1H,235,E,10,8,32,-10.00%,22,3,1,+1d6\n" +
  "Terra Prime GM-1,75,G,20,4,16,-10.00%,25,3,-,+0d6\n" +
  "Terra Prime GM-1H,325,G,20,8,32,-15.00%,27,4,1,+1d6";

var hulls =
  "Class,Tonnage,Cost,Crew,Max CU,DEFENSE,FUEL,INITIATIVE\n" +
  "I,\"1,000-5,000\",5,4,50,20,1,-\n" +
  "II,\"5,000-15,000\",20,5,150,19,8,-\n" +
  "III,\"15,000-25,000\",45,7,250,18,27,-\n" +
  "IV,\"25,000-40,000\",80,12,400,17,64,-\n" +
  "V,\"40,000-60,000\",125,20,600,16,125,-1d6\n" +
  "VI,\"60,000-80,000\",180,30,800,15,216,-1d6\n" +
  "VII,\"80,000-100,000\",245,50,1000,14,343,-1d6\n" +
  "VIII,\"100,000-120,000\",320,100,1200,13,512,-1d6\n" +
  "IX,\"120,000-140,000\",405,200,1400,12,729,-1d6\n" +
  "X,\"140,000-160,000\",500,300,1600,11,1000,-2d6\n" +
  "XI,\"160,000-180,000\",605,400,1800,10,1331,-2d6\n" +
  "XII,\"180,000-210,000\",620,500,2100,9,1728,-2d6\n" +
  "XIII,\"210,000-240,000\",845,750,2400,8,2197,-2d6\n" +
  "XIV,\"240,000-300,000\",980,1000,3000,7,2744,-2d6\n" +
  "XV,\"300,000-350,000\",1125,2000,3500,6,3375,-3d6\n" +
  "XVI,\"350,000-400,000\",1280,3000,4000,5,4096,-3d6\n" +
  "XVII,\"400,000-450,000\",1445,4000,4500,4,4913,-3d6\n" +
  "XVIII,\"450,000-500,000\",1620,5000,5000,3,5832,-3d6";

var sensors =
  "Sensor Systems,Cost,Size,Space,Range,Range Inc,DEFENSE,Checks\n" +
  "Chen-Collins SS-1,4,S,1,2,5,-,+0d6\n" +
  "Chen-Collins SS-2,8,S,1,4,6,-,+0d6\n" +
  "Chen-Collins SS-2H,224,S,1,8,8,1,+1d6\n" +
  "Interstellar Enterprises MS-1,20,M,3,4,10,-,+0d6\n" +
  "Interstellar Enterprises MS-1H,160,M,3,8,12,1,+1 die\n" +
  "Interstellar Enterprises MS-2,40,M,3,6,11,-,+0d6\n" +
  "Lunar Works LS-1,40,L,5,6,15,-,+0d6\n" +
  "Lunar Works LS-2,80,L,5,8,16,-,+0d6\n" +
  "Lunar Works LS-2H,160,L,5,14,18,1,+1d6\n" +
  "Newwatch ES-1,60,E,10,8,20,-,+0d6\n" +
  "Newwatch ES-1H,280,E,10,16,22,1,+1d6\n" +
  "Newwatch ES-2,120,E,10,10,21,-,+0d6\n" +
  "Intergalactic Foundation GS-1,100,G,20,110,25,-,+0d6\n" +
  "Intergalactic Foundation GS-2,200,G,20,12,26,-,+0d6\n" +
  "Intergalactic Foundation GS-2H,800,G,20,22,28,1,+1d6";

var deflectors =
  "Deflector Shields,Cost,Size,CPU,Space,Power\n" +
  "Cui-Cui Systems ESM-1 combat deflector screens,60 MCr,E,6,69,60\n" +
  "Cui-Cui Systems ESM-2 combat deflector screens,128 MCr,E,6,68,76\n" +
  "DayCorp Systems SSN-1 navigational shield generator,2 MCr,S,1,2,1\n" +
  "DayCorp Systems SSN-2 navigational shield generator,4 MCr,,1,1,1\n" +
  "Highgraphics-Warpwide GSN-1 navigation screens,33 MCr,G,5,45,34\n" +
  "Highgraphics-Warpwide GSN-2 navigation screens,71 MCr,G,5,49,34\n" +
  "Huang DEFENSE GSM-1 ultimate series combat shield,152 MCr,G,8,144,93\n" +
  "Huang DEFENSE GSM-2 ultimate series combat shield,266 MCr,G,8,115,116\n" +
  "Liu Maltech LSC-1 civilian deflector screens,18 MCr,L,3,28,27\n" +
  "Liu Maltech LSC-2 civilian deflector screens,33 MCr,L,3,28,35\n" +
  "Lunar Foundation GSC-1 civilian deflector shields,52 MCr,G,7,75,51\n" +
  "Lunar Foundation GSC-2 civilian deflector shields,117 MCr,G,7,59,60\n" +
  "Mekhdiev LSN-1 navigational deflector shields,7 MCr,L,2,11,16\n" +
  "Mekhdiev LSN-2 navigational deflector shields,13 MCr,L,2,8,20\n" +
  "Overcorp-Pan Prime LSM-1 combat sheld generator,30 MCr,L,4,42,34\n" +
  "Overcorp-Pan Prime LSM-2 combat sheld generator,66 MCr,L,4,45,37\n" +
  "Parsec Group SSC-1 civilan deflector screen,3 MCr,S,1,4,3\n" +
  "Parsec Group SSC-2 civilan deflector screen,7 MCr,S,1,2,4\n" +
  "Satellite Yards MSM-1 combat deflector shields,23 MCr,M,3,15,23\n" +
  "Satellite Yards MSM-2 combat deflector shields,31 MCr,M,3,12,33\n" +
  "Sato-Litvak Syndicate MSN-1 navigational deflector screen,3 MCr,M,1,6,7\n" +
  "Sato-Litvak Syndicate MSN-2 navigational deflector screen,6 MCr,M,1,4,9\n" +
  "Tyler Mechanics SSM-1 combat shield system,8 MCr,S,2,4,5\n" +
  "Tyler Mechanics SSM-2 combat shield system,16 MCr,S,2,3,7\n" +
  "Waybreak Exploration MSC-1 civilian shield generator,9 MCr,M,2,14,10\n" +
  "Waybreak Exploration MSC-2 civilian shield generator,14 MCr,M,2,15,15\n" +
  "Westdyne Enterprises ESN-1 cruiser navishield solution,14 MCr,E,3,24,25\n" +
  "Westdyne Enterprises ESN-2 cruiser navishield solution,30 MCr,E,3,25,32\n" +
  "Yang-Chen Co ESC-1 civilian shield generator,30 MCr,E,5,56,32\n" +
  "Yang-Chen Co ESC-2 civilian shield generator,51 MCr,E,5,62,41";

var facilities =
  "Customization,Luxury/crew,Space (CU)/crew,Cost/crew,Notes,Recommended\n" +
  "Sick bay,2,3,20 MCr,Accomodates 1 patient,5% of crew capacity\n" +
  "'Cabin, standard',0.5,1,0.5 MCr,Accomodates 1 crewmember,-\n" +
  "'Cabin, double',0.3,0.5,0.3 MCr,,-\n" +
  "'Cabin, luxury/suite',1,2,2 MCr,Accomodates 1 crewmember,-\n" +
  "Chapel,1,3,2 MCr,,1% of crew capacity\n" +
  "Galley,2,3,4 MCr,,5% of crew capacity\n" +
  "Gymnasium,1,3,4 MCr,,5% of crew capacity\n" +
  "Laboratory,-,4,8 MCr,,-\n" +
  "Lounge/recreation area,1,1,1�MCr,,5% of crew capacity\n" +
  "Messhall,1,4,2 MCr,,10% of crew capacity\n" +
  "Bar/restaurant,2,4,10 MCr,0.5 MCr/m income,5% of crew capacity\n" +
  "Shop,2,3,8 MCr,0.6 MCr/m income; type should be specified,-\n" +
  "Observation lounge,0.5,3,2 MCr,,1% of crew capacity\n" +
  "Arborium,2,5,5 MCr,,1% of crew capacity\n" +
  "Brig,0.5,1,3 MCr,Each brig unit can hold 1 prisoner,1% of crew capacity\n" +
  "Escape pod,0.1,0.1,0.5 MCr,Each pod can carry 1 crewmember,100% of crew capacity\n" +
  "Transporter pad,-,1,20 MCr,A small transporter pad contains 1 transporter beam,5% of crew capacity\n" +
  "Stateroom,0.5,2,2 MCr,,-\n" +
  "Cinema/theater,2,1,4 MCr,,1% of crew capacity\n" +
  "Holographic suite,3,4,20 MCr,,1% of crew capacity";

var ftl =
  "FTL Engine,Cost,Size,CPU,Space,Power,Fuel Eff\n" +
  "Arakaki-Cao Union MC-1 tachyon conduit system,119 MCr,M,5.6,9,28,1.6\n" +
  "Butler Grav Vehicles GT-1 tachyon sail,569 MCr,G,11,117,55,-\n" +
  "Cui-Green Alliance SH-1 hyperdrive,12 MCr,S,0.8,2,4,0.8\n" +
  "Cui-Green Alliance SH-2 hyperdrive,26 MCr,S,1,3,5,1\n" +
  "Cui-Green Alliance SH-3 hyperdrive,53 MCr,S,1.6,2,8,1\n" +
  "Frontier Yards ET-1 tachyon sail,259 MCr,E,8.8,47,44,-\n" +
  "Highfarer Enterprises GH-1 hyperdrive,256 MCr,G,8.8,38,44,0.8\n" +
  "Highfarer Enterprises GH-2 hyperdrive,481 MCr,G,12,30,60,0.9\n" +
  "Highwatch SC-1 tachyon conduit system,64 MCr,S,3,4,15,1.6\n" +
  "Kinjo Hardware LH-1 hyperdrive,49 MCr,L,3.2,7,16,0.8\n" +
  "Kinjo Hardware LH-2 hyperdrive,118 MCr,L,4,6,20,0.8\n" +
  "Kinjo Hardware LH-2H hyperdrive,231 MCr,L,3.8,5,19,1\n" +
  "Long Transport GC-1 tachyon conduit system,'1,254 MCr',G,25,68,125,1.6\n" +
  "Micro PrimeTech MT-1 tachyon sail,93 MCr,M,3,15,15,-\n" +
  "Newdyne Concepts LA-1 antimatter engine,92 MCr,L,4,18,20,1\n" +
  "Newdyne Concepts LA-2 antimatter engine,180 MCr,L,5,19,25,0.9\n" +
  "Newdyne Concepts LA-3 antimatter engine,261 MCr,L,8.4,19,42,1.4\n" +
  "Outerdyne DayCorp MH-1 hyperdrive,33 MCr,M,1.8,4,9,0.8\n" +
  "Outerdyne DayCorp MH-2 hyperdrive,64 MCr,M,2,3,10,0.9\n" +
  "Panwatch-Microbeam EA-1 antimatter engine,140 MCr,E,6.4,33,32,1\n" +
  "Panwatch-Microbeam EA-2 antimatter engine,336 MCr,E,11.4,35,57,1\n" +
  "Panwatch-Microbeam EA-2H antimatter engine,589 MCr,E,14.6,51,73,1.1\n" +
  "Panwatch-Microbeam EA-2S antimatter engine,'1,369 MCr',E,15.2,44,76,1.4\n" +
  "Shooting Star LT-1 tachyon sail,160 MCr,L,5.4,26,27,-\n" +
  "Star Products EC-1 tachyon conduit system,515 MCr,E,15,30,75,1.6\n" +
  "Stellar Group EH-1 hyperdrive,109 MCr,E,4.8,13,24,0.8\n" +
  "Stellar Group EH-2 hyperdrive,240 MCr,E,6,10,30,0.9\n" +
  "TransCo NewStellar ST-1 tachyon sail,48 MCr,S,1.4,6,7,-\n" +
  "Transwide Products LC-1 tachyon conduit system,288 MCr,L,8,14,40,1.6\n" +
  "Warpdyne Asteroid Mining SA-1 antimatter engine,17 MCr,S,1.2,5,6,1\n" +
  "Warpdyne Asteroid Mining SA-2 antimatter engine,35 MCr,S,1.6,4,8,1.1\n" +
  "White AgriSpace MA-1 antimatter engine,34 MCr,M,3,11,15,1\n" +
  "White AgriSpace MA-2 antimatter engine,84 MCr,M,3.6,10,18,1\n" +
  "White AgriSpace MA-3 antimatter engine,114 MCr,M,5.6,9,28,1.3\n" +
  "Yang Astrotech GA-1 antimatter engine,374 MCr,G,14.4,87,72,1\n" +
  "Yang Astrotech GA-2 antimatter engine,721 MCr,G,15.8,79,79,1.1";

var subluminal =
  "Sub-luminal Engine,Cost,Size,CPU,Space,Power,Fuel Eff\n" +
  "Carter Psitech EL-1 liquid fuel rocket,14 MCr,E,5,9,50,0.5\n" +
  "Carter Psitech EL-2 liquid fuel rocket,30 MCr,E,7.1,10,71,0.7\n" +
  "Comet Lines SS-1 solar sail,1 MCr,S,0.3,5,3,-\n" +
  "DeltaLight products LI-1 ion engine,22 MCr,L,2.6,22,26,1.4\n" +
  "DeltaLight products LI-2 ion engine,41 MCr,L,3.2,25,32,1.4\n" +
  "Du-Bobrikov Company ES-1 solar sail,7 MCr,E,1.9,47,19,-\n" +
  "Highlight Robotics GL-1 liquid fuel rocket,30 MCr,G,6.9,16,69,0.5\n" +
  "Highlight Robotics GL-2 liquid fuel rocket,70 MCr,G,9.9,15,99,0.5\n" +
  "Narita-Guo Union LF-1 fusion reactor,26 MCr,L,5.3,40,53,1.2\n" +
  "Narita-Guo Union LF-2 fusion reactor,51 MCr,L,4.5,34,45,1.4\n" +
  "Newline-Silverwide Systems SL-1 liquid fuel rocket,1 MCr,S,1.1,1,11,0.5\n" +
  "Newline-Silverwide Systems SL-2 liquid fuel rocket,3 MCr,S,1.3,1,13,0.5\n" +
  "OmniDyne Lines EF-1 fusion reactor,94 MCr,E,9.2,73,92,1.4\n" +
  "OmniDyne Lines EF-1 fusion reactor,55 MCr,E,8.2,84,82,1.2\n" +
  "Oshiro Shipping MI-1 ion engine,11 MCr,M,1.8,10,18,1.4\n" +
  "Oshiro Shipping MI-2 ion engine,25 MCr,M,2.1,9,21,1.6\n" +
  "Panlight Universal MS-1 solar sail,2 MCr,M,0.7,10,7,-\n" +
  "Panwatch Metallurgy GS-1 solar sail,19 MCr,G,3.5,92,35,-\n" +
  "Satellite Concepts SI-1 ion engine,5 MCr,S,0.7,4,7,1.4\n" +
  "Satellite Concepts SI-2 ion engine,8 MCr,S,1.1,4,11,1.4\n" +
  "Star Corporation SF-1 fusion reactor,7 MCr,S,1.2,11,12,1.2\n" +
  "Star Corporation SF-2 fusion reactor,11 MCr,S,1.9,12,19,1.2\n" +
  "Stellar Products LS-1 solar sail,3 MCr,L,1.2,22,12,-\n" +
  "Sun Technologies GF-1 fusion reactor,134 MCr,G,10.5,131,105,1.2\n" +
  "Sun Technologies GF-2 fusion reactor,292 MCr,G,17.4,112,174,1.2\n" +
  "Sunbeam Technologies EI-1 ion engine,38 MCr,E,3.8,37,38,1.4\n" +
  "Sunbeam Technologies EI-2 ion engine,73 MCr,E,4.9,30,49,1.4\n" +
  "SunCo Livestock LL-1 liquid fuel rocket,6 MCr,L,3.5,4,35,0.5\n" +
  "SunCo Livestock LL-2 liquid fuel rocket,14 MCr,L,3,3,30,0.6\n" +
  "Turner-Koga Inc ML-1 liquid fuel rocket,3 MCr,M,1.7,1,17,0.5\n" +
  "Turner-Koga Inc ML-2 liquid fuel rocket,7 MCr,M,2.5,1,25,0.6\n" +
  "WarpCo Alliance MF-1 fusion reactor,11 MCr,M,3.3,23,33,1.2\n" +
  "WarpCo Alliance MF-2 fusion reactor,25 MCr,M,3.7,21,37,1.3\n" +
  "WayDyne Incorporated GI-1 ion engine,80 MCr,G,5.3,88,53,1.4\n" +
  "WayDyne Incorporated GI-2 ion engine,132 MCr,G,9.6,103,96,1.6";

var cloaking =
  "Item,Space,Size,Cost,CPU,Notes\n" +
  "Ultrabeam Y62 Cloaking Device,3,S,750 MCr,1,Ship classes I-III only\n" +
  "NorthCo GYN3 Starship Stealth System,10,M,'2,000 MCr',2,Ship classes IV-VII only\n" +
  "Highdyne S2 Stealth Solution,40,L,'10,000 MCr',3,Ship classes VIII-XI only\n" +
  "Daystellar-Silvertech Society JG51 Integrated Cloaking System,100,E,'40,000 MCr',4,Ship classes XII-XVI only\n" +
  "Waywatch BI95 Cloaking Device,300,G,'90,000 MCr',5,Ship classes XVII-XIX only";

var tractor =
  "Item,Space,Size,Cost,CPU,Notes\n" +
  "Galaxy Technologies X2 Tractor Beam,5,S,10 MCr,-,'STR 2, range 5'\n" +
  "Transwatch L4 Magnetic Beam,10,M,30 MCr,-,'STR 4, range 7'\n" +
  "Warp Sun Metallurgy G75 Tractor/Pressor System,15,L,75 MCr,-,'STR 6, range 10'\n" +
  "Omnibeam J21 Gravity Beam,20,E,120 MCr,-,'STR 8, range 12'\n" +
  "Outer Sun Merchants CCH80 Magnetic Projector,25,G,300 MCr,-,'STR 10, range 15'";

var fueling =
  "Item,Space,Size,Cost,CPU,Notes\n" +
  "Fuel bay alteration,1 CU/10 fuel,-,0.5 MCr/fuel,-,This can increase or decrease fuel capacity\n" +
  "Over Prime O68 Fuel Scoop,5,S,100 MCr,-,Gathers 1 fuel unit per hour\n" +
  "Black Hole Products P40 Fuel Scoop,40,M,250 MCr,-,Gathers 5 fuel units per hour\n" +
  "Davison Aeronautics SAA48 Fuel Scoop,90,E,'1,000 MCr',-,Gathers 20 fuel units per hour\n" +
  "Westbreak-NewCorp Partnership H80 External Cargo Bay,-,S,30 MCr,-,'Adds 20 CU; -2 DEFENSE, -2 SPEED'\n" +
  "Daylight KE27 External Cargo Bay,-,M,100 MCr,-,'Adds 250 CU; -2�DEFENSE, -2 SPEED'\n" +
  "SilverCorp E95 External Cargo Bay,-,L,250 MCr,-,'Adds 1,000 CU; -2�DEFENSE, -2 SPEED'";

var hangars =
  "Parsec Systems ZM2 Shuttle/fighter Bay,25,S,400 MCr,1,Room for 1 shuttle or fighter\n" +
  "Megalight EI93 Shuttle/fighter Bay,80,M,700 MCr,1,Room for 4 shuttles or fighters\n" +
  "Ultrabeam VN34 Shuttle/fighter Bay,150,L,'1,000 MCr',2,Room for 16 shuttles or fighters\n" +
  "Waydyne Shuttle/fighter Bay,250,E,'1,500 MCr',2,Room for 32 shuttles or fighters\n" +
  "'Newwide Gravitics DI11 Shuttle/fighter Bay,',460,G,'2,000 MCr',3,Room for 64 shuttles or fighters";

var engMods =
  "Ultradyne Lines CP97 Repair Bay,10,M,200 MCr,4,Repairs 1 SS per turn\n" +
  "Newwatch IE17 Remote Repair Bay,20,L,500 MCr,8,Repairs 1 SS per turn; range 4 hexes";

var commandControl =
  "Daylight CEA46 Tactical Command Center,2,S,200 MCr,3,Grants +1d6 bonus to 4 ships; range 8 hexes\n" +
  "OmniCo NE79 Tactical Operations Center,5,M,500 MCr,6,Grants +1d6 bonus to 10 ships; range 12 hexes\n" +
  "Terradyne TAC-COM WPA40�,10,L,'1,000 MCr',9,Grants +1d6 bonus to 25 ships; range 16 hexes\n" +
  "Omnibreak Group GO17 Tactical Command Center,20,E,'2,5000 MCr',12,Grants +1d6 bonus to 50 ships; range 20 hexes\n" +
  "Kavelin-Song Ltd. N82 Tactical Coordination Module,30,G,'5,000 MCr',15,Grants +1d6 bonus to 100 ships; range 25 hexes";

var electronicWarfare =
  "TerraCo L56 ECM System,5,S,50 MCr,2,'Missiles have a -1d6 penalty to hit the ship, as do scanning attempts; range 8 hexes'\n" +
  "Omniwide Productions YPO57 Electronic Countermeasures,10,M,100 MCr,3,'Missiles have a -1d6 penalty to hit the ship, as do scanning attempts; range 12 hexes'\n" +
  "Ultralight BMS55 Jamming System,15,L,250 MCr,4,'Missiles have a -1d6 penalty to hit the ship, as do scanning attempts; range 16 hexes'\n" +
  "Sun Prime LC84 Precision Electronic Warfare System,25,E,500 MCr,5,'Missiles have a -1d6 penalty to hit the ship, as do scanning attempts; range 20 hexes'\n" +
  "PanCorp Gravitics YN28 Active Decoy Transmitter,35,G,'1,000 MCr',6,'Missiles have a -1d6 penalty to hit the ship, as do scanning attempts; range 25 hexes'\n" +
  "Electronic Reinforcement,10/point,-,500 MCr/point,0.5/point,Control computer defenses grant a +1 ELECTRONIC DEFENSE bonus per point purchased.";

var weapons =
  "Weapon System,Cost,Size,CPU,Space,Range,Attack,Damage\n" +
  "Bai-Nakamura Fndtn ECPx-1 Blackflash concussion torpedo,202 MCr,E,4,8,16,+1d6,4d6 ballistic\n" +
  "Barker Consortium GCCl-1 Thundermaker concussion cluster,344 MCr,G,5,50,25,+0d6,6d6 ballistic\n" +
  "Brown Shipping ELS-1 Sunbat quad laser cannon,43 MCr,E,4,10,9,+0d6,4d6 heat\n" +
  "Cui Shipyards EDP-1 Hotbuster dual pulse disruptor,112 MCr,E,4,8,8,+0d6,5d6 heat\n" +
  "Cui-Cook Systems SNPx-1 Starspear nuclear warhead ,5 MCr,S,1,1,3,+1d6,2d6 heat/radiation\n" +
  "Daybeam-Microsun MpaC-1 Hellbolt particle cannon,31 MCr,M,2,3,5,+0d6,2d6 heat\n" +
  "Daywatch Art ENPx-1 Hellstorm nuclear warhead,63 MCr,E,4,8,15,+1d6,4d6 heat/radiation\n" +
  "Frontier partnership GIC-1 Deathflash dual heavy ion cannon,161 MCr,G,5,47,14,+0d6,5d6 ion\n" +
  "Galactic Company MLB-1 Skysteel beam laser,8 MCr,M,2,3,5,+0d6,2d6 heat\n" +
  "Galaxy Society LCCl-1 Stingbird cluster missiles,120 MCr,L,3,11,10,+0d6,4d6 ballistic\n" +
  "Green-Huang Enterprises EIP-1 Skyspear ion pulse,73 MCr,E,4,11,9,+0d6,5d6 ion\n" +
  "Highbreak Liquids MHP-1 Fireswarm pulse phaser,35 MCr,M,2,3,4,+0d6,3d6 heat\n" +
  "Highstellar Ltc. MNPx-1 Bigbow nuclear warhead,11 MCr,M,2,4,6,+1d6,2d6 heat/radiation\n" +
  "Highwide Works MPPx-1 Thunderbat proximity photonic torpedo,50 MCr,M,2,3,7,+1d6,2d6 heat\n" +
  "Hydyne Merccants LPR-1 Darksword railgun,15 MCr,L,3,11,4,+0d6,4d6 ballistic\n" +
  "Imperial Syndicate GLP-1 Redstorm quad heavy turbolaser,108 MCr,G,5,53,12,+0d6,6d6 heat\n" +
  "Imperial Syndicate GLP-2 Redstorm quad heavy turbolaser,236 MCr,G,5,43,14,+0d6,6d6 heat\n" +
  "Imperial Syndicate GLP-3 Redstorm quad heavy turbolaser,396 MCr,G,5,39,15,+0d6,7d6 heat\n" +
  "Long-Summers Industries SPPx-1 Stingstorm photonic torpedo,20 MCr,S,1,1,4,+1d6,1d6 heat\n" +
  "Lunar Alliance GNPx-1 Mushroom nuclear warhead,140 MCr,G,5,43,18,+1d6,5d6 heat/radiation\n" +
  "MegaCorp-Panstellar Lines LNPx-1 Blackfury nuclear warhead,26 MCr,L,3,8,7,+1d6,3d6 heat/radiation\n" +
  "Mekhdiev Construction SDB-1 Thunderray beam disruptor array,9 MCr,S,1,1,3,+0d6,1d6 heat\n" +
  "Meteor Concepts GPPx-1 Hellbow photonic torpedo,484 MCr,G,5,48,26,+0d6,5d6 heat\n" +
  "Microtech Alliance LBP-1 Stingmaker dual pulse blaster,21 MCr,L,3,9,3,+0d6,4d6 heat\n" +
  "Microwatch Hardware EPC-1 Leadbolt projectile cannon,31 MCr,E,4,9,8,+0d6,4d6 ballistic\n" +
  "Nakamura Robotics SIC-1 Starbird ion cannon,7 MCr,S,1,1,3,+0d6,1d6 ion\n" +
  "Narita Maltech SLP-1 Blackbuster pulse laser,5 MCr,S,1,1,2,+0d6,2d6 heat\n" +
  "North Prime Weapons LHB-1 Redsword phaser beam,68 MCr,L,3,11,8,+0d6,3d6 heat\n" +
  "North Prime Weapons LHB-1H Redsword phaser beam,216 MCr,L,3,9,7,+1d6,5d6 heat\n" +
  "Omnitech-Prime SPR-1 Skyrain magnetic railgun,3 MCr,S,1,1,2,+0d6,2d6 ballistic\n" +
  "Outer Sun Products EBP-1 Hellbuster pulse blaster,42 MCr,E,4,10,4,+0d6,5d6 heat\n" +
  "Outerwatch-Ultrabeam EHP-1 Hotflash pulse phaser,168 MCr,E,4,10,10,+0d6,5d6 heat\n" +
  "Overbeam Biotech MPC-1 Sunbow projectile cannon,6 MCr,M,2,3,5,+0d6,2d6 ballistic\n" +
  "Saito Cybernetics EPCl-1 Whiteswarm photonic torpedo cluster,233 MCr,E,4,8,17,+0d6,5d6 heat\n" +
  "Silverfarer Group EPaC-1 Skybolt particle cannon,148 MCr,E,4,8,10,+0d6,4d6 heat\n" +
  "Solar Industries GHB-1 Excelsior phaser beam emitter,276 MCr,G,5,57,15,+0d6,5d6 heat\n" +
  "Southtech Heavy Weapons LIC-1 Bigstreak ion cannon,33 MCr,L,3,8,7,+0d6,3d6 ion\n" +
  "Star Products SHB-1 Deathsword phaser system,13 MCr,S,1,1,3,+0d6,1d6 heat\n" +
  "Tan-Korovin Enterprises SBP-1 Hotbuster pulse blaster,5 MCr,S,1,1,2,+0d6,2d6 heat\n" +
  "Terra Prime SCCl-1 Starbuster cluster concussion missile launcher,23 MCr,S,1,1,4,+0d6,2d6 ballistic\n" +
  "Thomas Foundation Spab-1 Skybow particle beam,12 MCr,S,1,1,3,+0d6,1d6 heat\n" +
  "Transbeam Art MIB-1 Drainpipe ion beam,12 MCr,M,2,3,5,+0d6,2d6 ion\n" +
  "Transco Inc. GDB-1 Loudstream disruptor beam,162 MCr,G,5,56,13,+0d6,5d6 heat\n" +
  "Translight Colonization MBB-1 Bigflash beam blaster,9 MCr,M,2,3,3,+0d6,2d6 heat\n" +
  "UltraCo-NewCo LDP-1 Redfury disruptor beam,58 MCr,L,3,12,5,+0d6,3d6 heat\n" +
  "Ultrastellar Railguns GPR-1 Ultimate Rain magnetic railgun,70 MCr,G,5,41,14,+0d6,6d6 ballistic\n" +
  "WarpSun Incorprated MDB-1 Flamefury pulse disruptor,21 MCr,M,2,4,3,+0d6,3d6 heat\n" +
  "WayCorp Holography GPaB-1 Deathspear particle beam,296 MCr,G,5,48,17,+0d6,5d6 heat\n" +
  "Wayfarer Aeronautics LPPx-1 Flamespear photonic torpedo,117 MCr,L,3,8,10,+1d6,3d6 heat\n" +
  "Waywatch Lines LLP-1 Firespear pulse laser,21 MCr,L,3,8,4,+0d6,4d6 heat\n" +
  "Waywatch Lines MCPx-1 Redswarm proximity concussion missile,45 MCr,M,2,4,7,+1d6,2d6 ballistic\n" +
  "Weststellar Ltd. LPaB-1 Hellseeker particle beam,66 MCr,L,3,11,8,+0d6,3d6 heat\n" +
  "Young Asteroid Co. GBB-1 Flamebird blaster beam,109 MCr,G,5,60,8,+0d6,5d6 heat";

var hullConfigurations = [
  {name: "None", display: "None"},
  {name: "Evasive", display: "Evasive: Patrol craft gain +2 to their DEFENSE score."},
  {name: "Inspector", display: "Inspector: Patrol craft may make two scanning checks per turn as a single action."},
  {name: "Fast", display: "Fast: Couriers gain +1 to their FTL speed."},
  {
    name: "Silent-running",
    display: "Silent-running: A courier ship can operate stealthily. While this will not protect it from actual scans in the way that a cloaking device might, it can pass unnoticed when not actively being looked for."
  },
  {
    name: "Scientific",
    display: "Scientific: Research ships may treat all labs and medical facilities as high quality even when they are not."
  },
  {
    name: "Deep scan",
    display: "Deep scan: A research ship can perform a deep scan of the area in a radius equal to the range of its sensors and automatically detect the presence of (but not the exact location of) cloaked vessels within that area."
  },
  {name: "Well-appointed", display: "Well-appointed: Yachts gain a bonus LUXURY percentage of 20%."},
  {name: "Explorer", display: "Explorer: Scouts have a +20% operational range."},
  {
    name: "Hauler",
    display: "Hauler: Freighters gain +20% cargo space (which must be used for cargo, not components)."
  },
  {name: "Tactical", display: "Tactical: Escorts have 50% extra sensor range."},
  {name: "Heavily-armed", display: "Heavily-armed: Destroyers reduce the CPU requirement of each weapon by 1"},
  {name: "Gunboat", display: "Gunboat: Frigates increase weapon range by 10%."},
  {
    name: "Skeleton crew",
    display: "Skeleton crew: Transports have 10% the crew requirement of other ships as long as no weapons are installed."
  },
  {name: "5 year mission", display: "5 year mission: Cruisers have a +20% operational range."},
  {
    name: "Luxurious",
    display: "Luxurious: Liners gain a bonus LUXURY percentage of 20% and free passenger capacity equal to ten times their class."
  },
  {name: "Tough", display: "Tough: Battleships start with double the base SS for their class."},
  {name: "Scramble", display: "Scramble: Carriers may launch all fighters/shuttles as a single action."}
];

var passengers = [
  {Type: "Troops", Space: "2 CU", Cost: "0.1 Mcr"},
  {Type: "Standard Passengers", Space: "2 CU", Cost: "0.2 Mcr"},
  {Type: "Luxury Passengers", Space: "4 CU", Cost: "0.3 Mcr"}
];

var tabs = [
  {heading: 'Basics', route: 'main.basics'},
  {heading: 'Hull Class', route: 'main.hull'},
  {heading: 'Command & Control', route: 'main.command'},
  {heading: 'Crew', route: 'main.crew'},
  {heading: 'Sub-Liminal Engines', route: '/partials/subliminal.html'},
  {heading: 'FTL Engines', route: '/partials/ftl.html'},
  {heading: 'Superstructure', route: '/partials/superstructure.html'},
  {heading: 'Deflector Shields', route: '/partials/shields.html'},
  {heading: 'Point Defenses', route: '/partials/pointdefense.html'},
  {heading: 'Weaponry', route: '/partials/weaponry.html'},
  {heading: 'Additional Equipment', route: '/partials/equipment.html'},
  {heading: 'Fighter Bay', route: '/partials/fighter_bay.html'},
  {heading: 'Facilities', route: '/partials/facilities.html'},
  {heading: 'Misc', route: '/partials/misc.html'},
  {heading: 'Download CSV', route: '/partials/download.html'}
];

angular.module('woin-starship')
  .controller('StarshipCtrl', function StarshipCtrl($scope) {
    'use strict';

    // initialize data
    $scope.tabs = tabs;
    $scope.ship = {name: "", description: ""};

    loadCsvData($scope);

    // helper functions for cost & cargo calculations
    $scope.totalCost = function () {
      return getCost($scope.ship);
    };

    $scope.currentSpace = function () {
      return getSpace($scope.ship);
    };

    $scope.maxSpace = function () {
      return getSpaceMax($scope.ship);
    };

    $scope.maxCpu = function () {
      return getCpuMax($scope.ship);
    };

    $scope.currentCpu = function () {
      return getCpu($scope.ship);
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

    $scope.incrementItem = function (KEY, itemKey) {
      if (!$scope.ship[KEY][itemKey]) $scope.ship[KEY][itemKey] = 0;
      $scope.ship[KEY][itemKey]++;
    };

    $scope.decrementItem = function (KEY, itemKey) {
      $scope.ship[KEY][itemKey]--;
      if ($scope.ship[KEY][itemKey] <= 0) delete $scope.ship[KEY][itemKey];
    };

  });
