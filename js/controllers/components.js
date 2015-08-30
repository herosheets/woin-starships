var angular = require('angular');

angular.module('woin-starship').service('Components',
    function() {
      var self = this;

      self.loadCsvData = function (scope) {
        scope.hulls = [];
        scope.computers = [];
        scope.sensors = [];
        scope.deflectors = [];
        scope.facilities = [];
        scope.ftl = [];
        scope.subluminal = [];
        scope.hangars = [];
        scope.hangarHash = {};
        scope.generalHash = {};

        scope.pointDefenses = [];
        scope.pointDefensesHash = {};

        scope.systems = {
          cloaking: [],
          fueling: [],
          commandControl: [],
          tractor: [],
          engMods: [],
          cargo: [],
          electronicWarfare: []
        };

        scope.weapons = [];
        scope.hullConfigurations = [];
        scope.passengerOptions = passengers;
        scope.superstructureOptions = superstructures;

        scope.crewHash = {};
        _.each(scope.passengerOptions, function (item) {
          scope.crewHash[item['Type']] = item;
        });

        scope.superstructureHash = {};
        _.each(scope.superstructureOptions, function (item) {
          scope.superstructureHash[item['Type']] = item;
        });

        Papa.parse(computers, {
          header: true,
          dynamicTyping: true,
          step: function (row) {
            var KEY = 'Control Computers';
            scope.computers.push(row.data[0]);
            scope.computerHash = {};
            _.each(scope.computers, function (item) {
              scope.computerHash[item[KEY]] = item;
            });
          },
          complete: function () {
            console.log("Computers Loaded");
          }
        });

        Papa.parse(deflectors, {
          header: true,
          dynamicTyping: true,
          step: function (row) {
            var KEY = 'Deflector Shields';
            scope.deflectors.push(row.data[0]);
            scope.deflectorHash = {};
            _.each(scope.deflectors, function (item) {
              scope.deflectorHash[item[KEY]] = item;
            });



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
            scope.facilitiesHash = {};
            _.each(scope.facilities, function (item) {
              scope.facilitiesHash[item['Customization']] = item;
            });
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
            var KEY = 'FTL Engine';
            scope.ftlHash = {};
            _.each(scope.ftl, function (item) {
              scope.ftlHash[item[KEY]] = item;
            });
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
          }
        });

        Papa.parse(types, {
          header: true,
          quotes: true,
          dynamicTyping: true,
          step: function (row) {
            scope.hullConfigurations.push(row.data[0]);
          },
          complete: function () {
            console.log("Hull Types Loaded");
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
            var KEY = 'Sub-luminal Engine';
            scope.subluminal.push(row.data[0]);
            scope.sublHash = {};
            _.each(scope.subluminal, function (item) {
              scope.sublHash[item[KEY]] = item;
            });
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

        Papa.parse(weapons, {
          header: true,
          dynamicTyping: true,
          step: function (row) {
            var KEY = 'Weapon System';
            scope.weapons.push(row.data[0]);

            scope.weaponHash = {};
            _.each(scope.weapons, function (item) {
              scope.weaponHash[item[KEY]] = item;
            });
          },
          complete: function () {
            console.log("Weapons Loaded");
          }
        });

        Papa.parse(systems, {
          header: true,
          dynamicTyping: true,
          step: function (row) {
            var s = row.data[0];
            console.log("Loaded s:" + s.Type);
            scope.generalHash[s.Item] = s;
            switch(s.Type) {
              case 'Tractor Beam':
                scope.systems.tractor.push(s);
                break;
              case 'Cargo Equipment':
                scope.systems.cargo.push(s);
                break;
              case 'Engineering Modification':
                scope.systems.engMods.push(s);
                break;
              case 'Fueling Equipment':
                scope.systems.fueling.push(s);
                break;
              case 'C&C':
                scope.systems.commandControl.push(s);
                break;
              case 'ECM':
                scope.systems.electronicWarfare.push(s);
                break;
              case 'Hangar':
                s['hangar'] = true;
                scope.hangarHash[s.Item] = s;
                scope.hangars.push(s);
                break;
              default:
                break;
            }
          }
        })

        Papa.parse(pointDefences, {
          header: true,
          dynamicTyping: true,
          step: function (row) {
            scope.pointDefenses.push(row.data[0]);
            scope.pointDefensesHash[row.data[0]['Point Defenses']] = row.data[0];
          },
          complete: function () {
            console.log("Point Defence Systems Loaded");
          }
        });
      };

      var types =
        "Type,Traits\n" +
        "Patrol Craft,\"Evasive, Inspector\"\n" +
        "Courier,\"Fast, Silent-running\"\n" +
        "Research Ship,\"Scientific, Deep Scan\"\n" +
        "Yacht,Well-appointed\n" +
        "Scout,Explorer\n" +
        "Freighter,Hauler\n" +
        "Escort,Tactical\n" +
        "Destroyer,Heavily-armed\n" +
        "Frigate,Gunboat\n" +
        "Transport,Skeleton Crew\n" +
        "Cruiser,5 Year Mission\n" +
        "Liner,\"Luxurious, Skeleton Crew\"\n" +
        "Battleship,Tough\n" +
        "Carrier,Scramble";

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
        "Cui-Cui Systems ESM-1 combat deflector screens,60,E,6,69,60\n" +
        "Cui-Cui Systems ESM-2 combat deflector screens,128,E,6,68,76\n" +
        "DayCorp Systems SSN-1 navigational shield generator,2,S,1,2,1\n" +
        "DayCorp Systems SSN-2 navigational shield generator,4,,1,1,1\n" +
        "Highgraphics-Warpwide GSN-1 navigation screens,33,G,5,45,34\n" +
        "Highgraphics-Warpwide GSN-2 navigation screens,71,G,5,49,34\n" +
        "Huang DEFENSE GSM-1 ultimate series combat shield,152,G,8,144,93\n" +
        "Huang DEFENSE GSM-2 ultimate series combat shield,266,G,8,115,116\n" +
        "Liu Maltech LSC-1 civilian deflector screens,18,L,3,28,27\n" +
        "Liu Maltech LSC-2 civilian deflector screens,33,L,3,28,35\n" +
        "Lunar Foundation GSC-1 civilian deflector shields,52,G,7,75,51\n" +
        "Lunar Foundation GSC-2 civilian deflector shields,117,G,7,59,60\n" +
        "Mekhdiev LSN-1 navigational deflector shields,7,L,2,11,16\n" +
        "Mekhdiev LSN-2 navigational deflector shields,13,L,2,8,20\n" +
        "Overcorp-Pan Prime LSM-1 combat sheld generator,30,L,4,42,34\n" +
        "Overcorp-Pan Prime LSM-2 combat sheld generator,66,L,4,45,37\n" +
        "Parsec Group SSC-1 civilan deflector screen,3,S,1,4,3\n" +
        "Parsec Group SSC-2 civilan deflector screen,7,S,1,2,4\n" +
        "Satellite Yards MSM-1 combat deflector shields,23,M,3,15,23\n" +
        "Satellite Yards MSM-2 combat deflector shields,31,M,3,12,33\n" +
        "Sato-Litvak Syndicate MSN-1 navigational deflector screen,3,M,1,6,7\n" +
        "Sato-Litvak Syndicate MSN-2 navigational deflector screen,6,M,1,4,9\n" +
        "Tyler Mechanics SSM-1 combat shield system,8,S,2,4,5\n" +
        "Tyler Mechanics SSM-2 combat shield system,16,S,2,3,7\n" +
        "Waybreak Exploration MSC-1 civilian shield generator,9,M,2,14,10\n" +
        "Waybreak Exploration MSC-2 civilian shield generator,14,M,2,15,15\n" +
        "Westdyne Enterprises ESN-1 cruiser navishield solution,14,E,3,24,25\n" +
        "Westdyne Enterprises ESN-2 cruiser navishield solution,30,E,3,25,32\n" +
        "Yang-Chen Co ESC-1 civilian shield generator,30,E,5,56,32\n" +
        "Yang-Chen Co ESC-2 civilian shield generator,51,E,5,62,41";

      var facilities =
        "Customization,Luxury/crew,Space/Crew,Cost/crew,CPU,Notes,Recommended\n" +
        "Sick bay,2,3,20,0,Accomodates 1 patient,5% of crew capacity\n" +
        "\"Cabin, standard\",0.5,1,0.5,0,Accomodates 1 crewmember,-\n" +
        "\"Cabin, double\",0.3,0.5,0.3,0,,-\n" +
        "\"Cabin, luxury/suite\",1,2,2,0,Accomodates 1 crewmember,-\n" +
        "Chapel,1,3,2,0,,1% of crew capacity\n" +
        "Galley,2,3,4,0,,5% of crew capacity\n" +
        "Gymnasium,1,3,4,,5% of crew capacity\n" +
        "Laboratory,-,4,8,0,,-\n" +
        "Lounge/recreation area,1,1,1,0,,5% of crew capacity\n" +
        "Messhall,1,4,2,0,,10% of crew capacity\n" +
        "Bar/restaurant,2,4,10,0,0.5/m income,5% of crew capacity\n" +
        "Shop,2,3,8,0,0.6/m income; type should be specified,-\n" +
        "Observation lounge,0.5,3,2,0,,1% of crew capacity\n" +
        "Arborium,2,5,5,0,,1% of crew capacity\n" +
        "Brig,0.5,1,3,0,Each brig unit can hold 1 prisoner,1% of crew capacity\n" +
        "Escape pod,0.1,0.1,0.5,0,Each pod can carry 1 crewmember,100% of crew capacity\n" +
        "Transporter pad,-,1,20,0,A small transporter pad contains 1 transporter beam,5% of crew capacity\n" +
        "Stateroom,0.5,2,2,0,,-\n" +
        "Cinema/theater,2,1,4,0,,1% of crew capacity\n" +
        "Holographic suite,3,4,20,0,,1% of crew capacity";

      var ftl =
        "FTL Engine,Cost,Size,CPU,Space,Power,Fuel Eff\n" +
        "Arakaki-Cao Union MC-1 tachyon conduit system,119,M,5.6,9,28,1.6\n" +
        "Butler Grav Vehicles GT-1 tachyon sail,569,G,11,117,55,-\n" +
        "Cui-Green Alliance SH-1 hyperdrive,12,S,0.8,2,4,0.8\n" +
        "Cui-Green Alliance SH-2 hyperdrive,26,S,1,3,5,1\n" +
        "Cui-Green Alliance SH-3 hyperdrive,53,S,1.6,2,8,1\n" +
        "Frontier Yards ET-1 tachyon sail,259,E,8.8,47,44,-\n" +
        "Highfarer Enterprises GH-1 hyperdrive,256,G,8.8,38,44,0.8\n" +
        "Highfarer Enterprises GH-2 hyperdrive,481,G,12,30,60,0.9\n" +
        "Highwatch SC-1 tachyon conduit system,64,S,3,4,15,1.6\n" +
        "Kinjo Hardware LH-1 hyperdrive,49,L,3.2,7,16,0.8\n" +
        "Kinjo Hardware LH-2 hyperdrive,118,L,4,6,20,0.8\n" +
        "Kinjo Hardware LH-2H hyperdrive,231,L,3.8,5,19,1\n" +
        "Long Transport GC-1 tachyon conduit system,\"1,254\",G,25,68,125,1.6\n" +
        "Micro PrimeTech MT-1 tachyon sail,93,M,3,15,15,-\n" +
        "Newdyne Concepts LA-1 antimatter engine,92,L,4,18,20,1\n" +
        "Newdyne Concepts LA-2 antimatter engine,180,L,5,19,25,0.9\n" +
        "Newdyne Concepts LA-3 antimatter engine,261,L,8.4,19,42,1.4\n" +
        "Outerdyne DayCorp MH-1 hyperdrive,33,M,1.8,4,9,0.8\n" +
        "Outerdyne DayCorp MH-2 hyperdrive,64,M,2,3,10,0.9\n" +
        "Panwatch-Microbeam EA-1 antimatter engine,140,E,6.4,33,32,1\n" +
        "Panwatch-Microbeam EA-2 antimatter engine,336,E,11.4,35,57,1\n" +
        "Panwatch-Microbeam EA-2H antimatter engine,589,E,14.6,51,73,1.1\n" +
        "Panwatch-Microbeam EA-2S antimatter engine,\"1,369\",E,15.2,44,76,1.4\n" +
        "Shooting Star LT-1 tachyon sail,160,L,5.4,26,27,-\n" +
        "Star Products EC-1 tachyon conduit system,515,E,15,30,75,1.6\n" +
        "Stellar Group EH-1 hyperdrive,109,E,4.8,13,24,0.8\n" +
        "Stellar Group EH-2 hyperdrive,240,E,6,10,30,0.9\n" +
        "TransCo NewStellar ST-1 tachyon sail,48,S,1.4,6,7,-\n" +
        "Transwide Products LC-1 tachyon conduit system,288,L,8,14,40,1.6\n" +
        "Warpdyne Asteroid Mining SA-1 antimatter engine,17,S,1.2,5,6,1\n" +
        "Warpdyne Asteroid Mining SA-2 antimatter engine,35,S,1.6,4,8,1.1\n" +
        "White AgriSpace MA-1 antimatter engine,34,M,3,11,15,1\n" +
        "White AgriSpace MA-2 antimatter engine,84,M,3.6,10,18,1\n" +
        "White AgriSpace MA-3 antimatter engine,114,M,5.6,9,28,1.3\n" +
        "Yang Astrotech GA-1 antimatter engine,374,G,14.4,87,72,1\n" +
        "Yang Astrotech GA-2 antimatter engine,721,G,15.8,79,79,1.1";

      var subluminal =
        "Sub-luminal Engine,Cost,Size,CPU,Space,Power,Fuel Eff\n" +
        "Carter Psitech EL-1 liquid fuel rocket,14,E,5,9,50,0.5\n" +
        "Carter Psitech EL-2 liquid fuel rocket,30,E,7.1,10,71,0.7\n" +
        "Comet Lines SS-1 solar sail,1,S,0.3,5,3,-\n" +
        "DeltaLight products LI-1 ion engine,22,L,2.6,22,26,1.4\n" +
        "DeltaLight products LI-2 ion engine,41,L,3.2,25,32,1.4\n" +
        "Du-Bobrikov Company ES-1 solar sail,7,E,1.9,47,19,-\n" +
        "Highlight Robotics GL-1 liquid fuel rocket,30,G,6.9,16,69,0.5\n" +
        "Highlight Robotics GL-2 liquid fuel rocket,70,G,9.9,15,99,0.5\n" +
        "Narita-Guo Union LF-1 fusion reactor,26,L,5.3,40,53,1.2\n" +
        "Narita-Guo Union LF-2 fusion reactor,51,L,4.5,34,45,1.4\n" +
        "Newline-Silverwide Systems SL-1 liquid fuel rocket,1,S,1.1,1,11,0.5\n" +
        "Newline-Silverwide Systems SL-2 liquid fuel rocket,3,S,1.3,1,13,0.5\n" +
        "OmniDyne Lines EF-1 fusion reactor,94,E,9.2,73,92,1.4\n" +
        "OmniDyne Lines EF-1 fusion reactor,55,E,8.2,84,82,1.2\n" +
        "Oshiro Shipping MI-1 ion engine,11,M,1.8,10,18,1.4\n" +
        "Oshiro Shipping MI-2 ion engine,25,M,2.1,9,21,1.6\n" +
        "Panlight Universal MS-1 solar sail,2,M,0.7,10,7,-\n" +
        "Panwatch Metallurgy GS-1 solar sail,19,G,3.5,92,35,-\n" +
        "Satellite Concepts SI-1 ion engine,5,S,0.7,4,7,1.4\n" +
        "Satellite Concepts SI-2 ion engine,8,S,1.1,4,11,1.4\n" +
        "Star Corporation SF-1 fusion reactor,7,S,1.2,11,12,1.2\n" +
        "Star Corporation SF-2 fusion reactor,11,S,1.9,12,19,1.2\n" +
        "Stellar Products LS-1 solar sail,3,L,1.2,22,12,-\n" +
        "Sun Technologies GF-1 fusion reactor,134,G,10.5,131,105,1.2\n" +
        "Sun Technologies GF-2 fusion reactor,292,G,17.4,112,174,1.2\n" +
        "Sunbeam Technologies EI-1 ion engine,38,E,3.8,37,38,1.4\n" +
        "Sunbeam Technologies EI-2 ion engine,73,E,4.9,30,49,1.4\n" +
        "SunCo Livestock LL-1 liquid fuel rocket,6,L,3.5,4,35,0.5\n" +
        "SunCo Livestock LL-2 liquid fuel rocket,14,L,3,3,30,0.6\n" +
        "Turner-Koga Inc ML-1 liquid fuel rocket,3,M,1.7,1,17,0.5\n" +
        "Turner-Koga Inc ML-2 liquid fuel rocket,7,M,2.5,1,25,0.6\n" +
        "WarpCo Alliance MF-1 fusion reactor,11,M,3.3,23,33,1.2\n" +
        "WarpCo Alliance MF-2 fusion reactor,25,M,3.7,21,37,1.3\n" +
        "WayDyne Incorporated GI-1 ion engine,80,G,5.3,88,53,1.4\n" +
        "WayDyne Incorporated GI-2 ion engine,132,G,9.6,103,96,1.6";

      var cloaking =
        "Item,Space,Size,Cost,CPU,Notes\n" +
        "Ultrabeam Y62 Cloaking Device,3,S,750,1,Restricted to ship classes I;II;III\n" +
        "NorthCo GYN3 Starship Stealth System,10,M,2000,2,Restricted to ship classes IV;V;VI;VII\n" +
        "Highdyne S2 Stealth Solution,40,L,10000,3,Restricted to ship classes VIII;IX;X;XI\n" +
        "Daystellar-Silvertech Society JG51 Integrated Cloaking System,100,E,40000,4,Restricted to ship classes XII;XIII;XIV;XV;XVI\n" +
        "Waywatch BI95 Cloaking Device,300,G,90000,5,Restricted to ship classes XVII;XVIII;XIX";

      var weapons =
        "Weapon System,Cost,Size,CPU,Space,Range,Attack,Damage\n" +
        "Bai-Nakamura Fndtn ECPx-1 Blackflash concussion torpedo,202,E,4,8,16,+1d6,4d6 ballistic\n" +
        "Barker Consortium GCCl-1 Thundermaker concussion cluster,344,G,5,50,25,+0d6,6d6 ballistic\n" +
        "Brown Shipping ELS-1 Sunbat quad laser cannon,43,E,4,10,9,+0d6,4d6 heat\n" +
        "Cui Shipyards EDP-1 Hotbuster dual pulse disruptor,112,E,4,8,8,+0d6,5d6 heat\n" +
        "Cui-Cook Systems SNPx-1 Starspear nuclear warhead ,5,S,1,1,3,+1d6,2d6 heat/radiation\n" +
        "Daybeam-Microsun MpaC-1 Hellbolt particle cannon,31,M,2,3,5,+0d6,2d6 heat\n" +
        "Daywatch Art ENPx-1 Hellstorm nuclear warhead,63,E,4,8,15,+1d6,4d6 heat/radiation\n" +
        "Frontier partnership GIC-1 Deathflash dual heavy ion cannon,161,G,5,47,14,+0d6,5d6 ion\n" +
        "Galactic Company MLB-1 Skysteel beam laser,8,M,2,3,5,+0d6,2d6 heat\n" +
        "Galaxy Society LCCl-1 Stingbird cluster missiles,120,L,3,11,10,+0d6,4d6 ballistic\n" +
        "Green-Huang Enterprises EIP-1 Skyspear ion pulse,73,E,4,11,9,+0d6,5d6 ion\n" +
        "Highbreak Liquids MHP-1 Fireswarm pulse phaser,35,M,2,3,4,+0d6,3d6 heat\n" +
        "Highstellar Ltc. MNPx-1 Bigbow nuclear warhead,11,M,2,4,6,+1d6,2d6 heat/radiation\n" +
        "Highwide Works MPPx-1 Thunderbat proximity photonic torpedo,50,M,2,3,7,+1d6,2d6 heat\n" +
        "Hydyne Merccants LPR-1 Darksword railgun,15,L,3,11,4,+0d6,4d6 ballistic\n" +
        "Imperial Syndicate GLP-1 Redstorm quad heavy turbolaser,108,G,5,53,12,+0d6,6d6 heat\n" +
        "Imperial Syndicate GLP-2 Redstorm quad heavy turbolaser,236,G,5,43,14,+0d6,6d6 heat\n" +
        "Imperial Syndicate GLP-3 Redstorm quad heavy turbolaser,396,G,5,39,15,+0d6,7d6 heat\n" +
        "Long-Summers Industries SPPx-1 Stingstorm photonic torpedo,20,S,1,1,4,+1d6,1d6 heat\n" +
        "Lunar Alliance GNPx-1 Mushroom nuclear warhead,140,G,5,43,18,+1d6,5d6 heat/radiation\n" +
        "MegaCorp-Panstellar Lines LNPx-1 Blackfury nuclear warhead,26,L,3,8,7,+1d6,3d6 heat/radiation\n" +
        "Mekhdiev Construction SDB-1 Thunderray beam disruptor array,9,S,1,1,3,+0d6,1d6 heat\n" +
        "Meteor Concepts GPPx-1 Hellbow photonic torpedo,484,G,5,48,26,+0d6,5d6 heat\n" +
        "Microtech Alliance LBP-1 Stingmaker dual pulse blaster,21,L,3,9,3,+0d6,4d6 heat\n" +
        "Microwatch Hardware EPC-1 Leadbolt projectile cannon,31,E,4,9,8,+0d6,4d6 ballistic\n" +
        "Nakamura Robotics SIC-1 Starbird ion cannon,7,S,1,1,3,+0d6,1d6 ion\n" +
        "Narita Maltech SLP-1 Blackbuster pulse laser,5,S,1,1,2,+0d6,2d6 heat\n" +
        "North Prime Weapons LHB-1 Redsword phaser beam,68,L,3,11,8,+0d6,3d6 heat\n" +
        "North Prime Weapons LHB-1H Redsword phaser beam,216,L,3,9,7,+1d6,5d6 heat\n" +
        "Omnitech-Prime SPR-1 Skyrain magnetic railgun,3,S,1,1,2,+0d6,2d6 ballistic\n" +
        "Outer Sun Products EBP-1 Hellbuster pulse blaster,42,E,4,10,4,+0d6,5d6 heat\n" +
        "Outerwatch-Ultrabeam EHP-1 Hotflash pulse phaser,168,E,4,10,10,+0d6,5d6 heat\n" +
        "Overbeam Biotech MPC-1 Sunbow projectile cannon,6,M,2,3,5,+0d6,2d6 ballistic\n" +
        "Saito Cybernetics EPCl-1 Whiteswarm photonic torpedo cluster,233,E,4,8,17,+0d6,5d6 heat\n" +
        "Silverfarer Group EPaC-1 Skybolt particle cannon,148,E,4,8,10,+0d6,4d6 heat\n" +
        "Solar Industries GHB-1 Excelsior phaser beam emitter,276,G,5,57,15,+0d6,5d6 heat\n" +
        "Southtech Heavy Weapons LIC-1 Bigstreak ion cannon,33,L,3,8,7,+0d6,3d6 ion\n" +
        "Star Products SHB-1 Deathsword phaser system,13,S,1,1,3,+0d6,1d6 heat\n" +
        "Tan-Korovin Enterprises SBP-1 Hotbuster pulse blaster,5,S,1,1,2,+0d6,2d6 heat\n" +
        "Terra Prime SCCl-1 Starbuster cluster concussion missile launcher,23,S,1,1,4,+0d6,2d6 ballistic\n" +
        "Thomas Foundation Spab-1 Skybow particle beam,12,S,1,1,3,+0d6,1d6 heat\n" +
        "Transbeam Art MIB-1 Drainpipe ion beam,12,M,2,3,5,+0d6,2d6 ion\n" +
        "Transco Inc. GDB-1 Loudstream disruptor beam,162,G,5,56,13,+0d6,5d6 heat\n" +
        "Translight Colonization MBB-1 Bigflash beam blaster,9,M,2,3,3,+0d6,2d6 heat\n" +
        "UltraCo-NewCo LDP-1 Redfury disruptor beam,58,L,3,12,5,+0d6,3d6 heat\n" +
        "Ultrastellar Railguns GPR-1 Ultimate Rain magnetic railgun,70,G,5,41,14,+0d6,6d6 ballistic\n" +
        "WarpSun Incorprated MDB-1 Flamefury pulse disruptor,21,M,2,4,3,+0d6,3d6 heat\n" +
        "WayCorp Holography GPaB-1 Deathspear particle beam,296,G,5,48,17,+0d6,5d6 heat\n" +
        "Wayfarer Aeronautics LPPx-1 Flamespear photonic torpedo,117,L,3,8,10,+1d6,3d6 heat\n" +
        "Waywatch Lines LLP-1 Firespear pulse laser,21,L,3,8,4,+0d6,4d6 heat\n" +
        "Waywatch Lines MCPx-1 Redswarm proximity concussion missile,45,M,2,4,7,+1d6,2d6 ballistic\n" +
        "Weststellar Ltd. LPaB-1 Hellseeker particle beam,66,L,3,11,8,+0d6,3d6 heat\n" +
        "Young Asteroid Co. GBB-1 Flamebird blaster beam,109,G,5,60,8,+0d6,5d6 heat";

      var systems =
        "Item,Type,Space,Size,Cost,CPU,Notes\n"+
        "Ultrabeam Y62 Cloaking Device,Cloaking Device,3,S,750,1,Ship classes I-III only\n"+
        "NorthCo GYN3 Starship Stealth System,Cloaking Device,10,M,2000,2,Ship classes IV-VII only\n"+
        "Highdyne S2 Stealth Solution,Cloaking Device,40,L,10000,3,Ship classes VIII-XI only\n"+
        "Daystellar-Silvertech Society JG51 Integrated Cloaking System,Cloaking Device,100,E,40000,4,Ship classes XII-XVI only\n"+
        "Waywatch BI95 Cloaking Device,Cloaking Device,300,G,90000,5,Ship classes XVII-XIX only\n"+
        "Galaxy Technologies X2 Tractor Beam,Tractor Beam,5,S,10,-,\"STR 2, range 5\"\n"+
        "Transwatch L4 Magnetic Beam,Tractor Beam,10,M,30,-,\"STR 4, range 7\"\n"+
        "Warp Sun Metallurgy G75 Tractor/Pressor System,Tractor Beam,15,L,75,-,\"STR 6, range 10\"\n"+
        "Omnibeam J21 Gravity Beam,Tractor Beam,20,E,120,-,\"STR 8, range 12\"\n"+
        "Outer Sun Merchants CCH80 Magnetic Projector,Tractor Beam,25,G,300,-,\"STR 10, range 15\"\n"+
        "Fuel bay alteration,Fueling Equipment,1 CU/10 fuel,-,0.5/fuel,-,This can increase or decrease fuel capacity\n"+
        "Over Prime O68 Fuel Scoop,Fueling Equipment,5,S,100,-,Gathers 1 fuel unit per hour\n"+
        "Black Hole Products P40 Fuel Scoop,Fueling Equipment,40,M,250,-,Gathers 5 fuel units per hour\n"+
        "Davison Aeronautics SAA48 Fuel Scoop,Fueling Equipment,90,E,1000,-,Gathers 20 fuel units per hour\n"+
        "Westbreak-NewCorp Partnership H80 External Cargo Bay,Cargo Equipment,-,S,30,-,\"Adds 20 CU; -2 DEFENSE, -2 SPEED\"\n"+
        "Daylight KE27 External Cargo Bay,Cargo Equipment,-,M,100,-,\"Adds 250 CU; -2 DEFENSE, -2 SPEED\"\n"+
        "SilverCorp E95 External Cargo Bay,Cargo Equipment,-,L,250,-,\"Adds 1,000 CU; -2 DEFENSE, -2 SPEED\"\n"+
        "Parsec Systems ZM2 Shuttle/fighter Bay,Hangar,25,S,400,1,Room for 1 shuttle or fighter\n"+
        "Megalight EI93 Shuttle/fighter Bay,Hangar,80,M,700,1,Room for 4 shuttles or fighters\n"+
        "Ultrabeam VN34 Shuttle/fighter Bay,Hangar,150,L,1000,2,Room for 16 shuttles or fighters\n"+
        "Waydyne Shuttle/fighter Bay,Hangar,250,E,1500,2,Room for 32 shuttles or fighters\n"+
        "\"Newwide Gravitics DI11 Shuttle/fighter Bay,Hangar,\",460,G,2000,3,Room for 64 shuttles or fighters\n"+
        "Ultradyne Lines CP97 Repair Bay,Engineering Modification,10,M,200,4,Repairs 1 SS per turn\n"+
        "Newwatch IE17 Remote Repair Bay,Engineering Modification,20,L,500,8,Repairs 1 SS per turn; range 4 hexes\n"+
        "Daylight CEA46 Tactical Command Center,C&C,2,S,200,3,Grants +1d6 bonus to 4 ships; range 8 hexes\n"+
        "OmniCo NE79 Tactical Operations Center,C&C,5,M,500,6,Grants +1d6 bonus to 10 ships; range 12 hexes\n"+
        "Terradyne TAC-COM WPA40,C&C,10,L,1000,9,Grants +1d6 bonus to 25 ships; range 16 hexes\n"+
        "Omnibreak Group GO17 Tactical Command Center,C&C,20,E,2500,12,Grants +1d6 bonus to 50 ships; range 20 hexes\n"+
        "Kavelin-Song Ltd. N82 Tactical Coordination Module,C&C,0,G,5000,15,Grants +1d6 bonus to 100 ships; range 25 hexes\n"+
        "TerraCo L56 ECM System,ECM,5,S,50,2,\"Missiles have a -1d6 penalty to hit the ship, as do scanning attempts; range 8 hexes\"\n"+
        "Omniwide Productions YPO57 Electronic Countermeasures,ECM,10,M,100,3,\"Missiles have a -1d6 penalty to hit the ship, as do scanning attempts; range 12 hexes\"\n"+
        "Ultralight BMS55 Jamming System,ECM,15,L,250,4,\"Missiles have a -1d6 penalty to hit the ship, as do scanning attempts; range 16 hexes\"\n"+
        "Sun Prime LC84 Precision Electronic Warfare System,ECM,25,E,500,5,\"Missiles have a -1d6 penalty to hit the ship, as do scanning attempts; range 20 hexes\"\n"+
        "PanCorp Gravitics YN28 Active Decoy Transmitter,ECM,35,G,1000,6,\"Missiles have a -1d6 penalty to hit the ship, as do scanning attempts; range 25 hexes\"\n"+
        "Electronic Reinforcement,ECM,10/point,-,500/point,0.5/point,Control computer defenses grant a +1 ELECTRONIC DEFENSE bonus per point purchased.\n";

      var passengers = [
        {Type: "Additional Crew", Space: "2", Cost: "0.1"},
        {Type: "Troops", Space: "2", Cost: "0.1"},
        {Type: "Standard Passengers", Space: "2", Cost: "0.2"},
        {Type: "Luxury Passengers", Space: "4", Cost: "0.3"}
      ];

      var superstructures = [
        {Type: "Additional SS", Space: "1", Cost: "0.5", Notes: "Base (free) SS = ship class"},
        {
          Type: "Armor, reactive",
          Space: "10",
          Cost: "10",
          Notes: "1 SOAK per armor point/class vs. ballistic; 1.5 SOAK per armor point/class vs energy."
        },
        {
          Type: "Armor, ablative",
          Space: "10",
          Cost: "10",
          Notes: "1 SOAK per armor point/class vs. energy; 1.5 SOAK per armor point/class vs ballistic."
        }
      ];

      var pointDefences =
        "Point Defenses,Space,CPU,Cost,DEFENSE,Aura\n"+
        "Railgun,10,0.5,10,2,0\n"+
        "Heavy turbolaser battery,20,0.5,10,1,2\n"+
        "Dual gauss gun,15,0.5,30,3,0\n"+
        "Micro-phaser turret,30,1,30,3,0\n"+
        "Kinetic energy flak weapon,10,0.5,10,3,0";
    });

