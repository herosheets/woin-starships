(function(module) {
try {
  module = angular.module('starshipPartials');
} catch (e) {
  module = angular.module('starshipPartials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/partials/basics.html',
    '<h2>Basic Ship Facts</h2>\n' +
    '<p class="explainer">\n' +
    '    Name your vessel!\n' +
    '</p>\n' +
    '\n' +
    '<div class="row display-row">\n' +
    '    <div class="col-md-3">Name</div>\n' +
    '    <div class="col-md-9">\n' +
    '        <input class="form-control" type="text" ng-model="ship.name">\n' +
    '    </div>\n' +
    '</div>\n' +
    '\n' +
    '<div class="row display-row margin-top-15">\n' +
    '    <div class="col-md-3">Description</div>\n' +
    '    <div class="col-md-9">\n' +
    '        <textarea class="form-control" ng-model="ship.description" rows="3">\n' +
    '    </div>\n' +
    '</div>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('starshipPartials');
} catch (e) {
  module = angular.module('starshipPartials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/partials/commandcontrol.html',
    '<h2>Control Computer</h2>\n' +
    '<p class="explainer">\n' +
    '\n' +
    '    Nearly every function on a vessel interacts in some way with the computer. The computers, sensors, and engineering facilities on a starship make a up a large part of its efficiency and effectiveness. Faster computers allow a ship to react more quickly in combat situations, while more sensitive sensor systems enable the crew to gather more information about their surroundings. A basic hull comes with a standard integrated computer and sensors, but more powerful systems are needed for effective combat calculations and FTL planning. The computing power aboard a starship cannot be overestimated in its importance.\n' +
    '\n' +
    '    A ship\'s computer system is able to perform faster-than-light calculations for FTL travel, and ties directly into the sensor array. Data storage in a ship\'s computer is so efficient that the concept of storage capacity does not factor into computer design any more. Some computer systems have a basic AI, while others do not.<br><br>\n' +
    'Items marked with an asterisk (*) are AL 10 items; they are only available in AL 10 settings. These items can drastically change the nature of a setting, especially in terms of FTL speeds.<br><br>\n' +
    '\n' +
    '<b>Navigation computers</b> (navcomps or astrogation units) are an AL 10 technology which increases FTL\n' +
    'speeds by an order of magnitude by engaging in hyper-fast calculations and route-plott ing formulae far\n' +
    'beyond most AL 9 computer systems. A navcomp operates alongside a regular control computer system\n' +
    'and simply replaces its Max FTL limit while leaving all of its other functionality intact. Navcomps also\n' +
    'maintain detailed navigational charts of the fastest travel routes, which are not necessarily in straight\n' +
    'lines when dealing with hyperspace, intense gravity wells, dark energy fluctuations, and non-euclidian\n' +
    'geometry. The introduction of navcomps makes galaxy-wide travel a trivial issue. A navigation computer eff ectively multiplies a ship\'s FTL capability by 10, subject to the na vcomp\'s\n' +
    'Max FTL value<br><br>\n' +
    '<b>Fire control systems</b> are used to coordinate point defenses on extremely large ships.  They can effectively operate hundreds or thousands of point defense batteries.  These systems offer a much higher CPU allocation specifically for this purpose.\n' +
    '\n' +
    '</p>\n' +
    '<h3>Your Computers</h3>\n' +
    '<table class="table table-striped">\n' +
    '    <thead>\n' +
    '    <tr>\n' +
    '        <th></th>\n' +
    '        <th>Quantity</th>\n' +
    '        <th>Control Computers</th>\n' +
    '        <th>Cost</th>\n' +
    '        <th>Size</th>\n' +
    '        <th>Space</th>\n' +
    '        <th>Max FTL</th>\n' +
    '        <th>Max CPU</th>\n' +
    '        <th>Crew</th>\n' +
    '        <th>Rng Inc</th>\n' +
    '        <th>SOAK</th>\n' +
    '        <th>DEFENSE</th>\n' +
    '        <th>Checks</th>\n' +
    '    </tr>\n' +
    '    </thead>\n' +
    '    <tbody>\n' +
    '    <tr ng-repeat="(name, count) in ship[\'Control Computers\']">\n' +
    '        <td><button type="button" class="btn btn-primary" ng-click="decrementItem(KEY, name)">-</button></td>\n' +
    '        <td ng-bind="count"></td>\n' +
    '        <td ng-bind="name"></td>\n' +
    '        <td ng-bind="computerHash[name].Cost"></td>\n' +
    '        <td ng-bind="computerHash[name].Size"></td>\n' +
    '        <td ng-bind="computerHash[name].Space"></td>\n' +
    '        <td ng-bind="computerHash[name][\'Max FTL\']"></td>\n' +
    '        <td ng-bind="computerHash[name][\'CPU\']"></td>\n' +
    '        <td ng-bind="computerHash[name].Crew"></td>\n' +
    '        <td ng-bind="computerHash[name][\'Rng Inc\']"></td>\n' +
    '        <td ng-bind="computerHash[name].SOAK"></td>\n' +
    '        <td ng-bind="computerHash[name].DEFENSE"></td>\n' +
    '        <td ng-bind="computerHash[name].Checks"></td>\n' +
    '    </tr>\n' +
    '    <tr ng-if="isEmpty(KEY)">\n' +
    '        <td colspan="13" class="text-center">No control computers selected.</td>\n' +
    '    </tr>\n' +
    '    </tbody>\n' +
    '</table>\n' +
    '\n' +
    '<table class="table table-striped">\n' +
    '    <thead>\n' +
    '    <tr>\n' +
    '        <th></th>\n' +
    '        <th>Control Computers</th>\n' +
    '        <th>Cost</th>\n' +
    '        <th>Size</th>\n' +
    '        <th>Space</th>\n' +
    '        <th>Max FTL</th>\n' +
    '        <th>Max CPU</th>\n' +
    '        <th>Crew</th>\n' +
    '        <th>Rng Inc</th>\n' +
    '        <th>SOAK</th>\n' +
    '        <th>DEFENSE</th>\n' +
    '        <th>Checks</th>\n' +
    '    </tr>\n' +
    '    </thead>\n' +
    '    <tbody>\n' +
    '    <tr ng-repeat="c in computers">\n' +
    '        <td><button type="button" class="btn btn-primary" ng-click="incrementItem(KEY, c[\'Control Computers\'])">+</button></td>\n' +
    '        <td ng-bind="c[\'Control Computers\']"></td>\n' +
    '        <td ng-bind="c.Cost"></td>\n' +
    '        <td ng-bind="c.Size"></td>\n' +
    '        <td ng-bind="c.Space"></td>\n' +
    '        <td ng-bind="c[\'Max FTL\']"></td>\n' +
    '        <td ng-bind="c[\'CPU\']"></td>\n' +
    '        <td ng-bind="c.Crew"></td>\n' +
    '        <td ng-bind="c[\'Rng Inc\']"></td>\n' +
    '        <td ng-bind="c.SOAK"></td>\n' +
    '        <td ng-bind="c.DEFENSE"></td>\n' +
    '        <td ng-bind="c.Checks"></td>\n' +
    '    </tr>\n' +
    '    </tbody>\n' +
    '</table>\n' +
    '\n' +
    '    Status API Training Shop Blog About Pricing \n' +
    '\n' +
    '    © 2015 GitHub, Inc. Terms Privacy Security Contact Help \n' +
    '\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('starshipPartials');
} catch (e) {
  module = angular.module('starshipPartials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/partials/crew.html',
    '<h2>Troops & Passengers</h2>\n' +
    '<p class="explainer">\n' +
    '    In addition to the crew, a ship can carry troops (military personnel of various kinds). Troops add to the crew\n' +
    '    complement for the purposes of calculating LUXURY (see below), and each uses 2 CU of cargo space.\n' +
    '\n' +
    '    Passenger capacity also uses cargo space. Standard passengers use 2 CU each, while Luxury passengers use 4 CU. As\n' +
    '    with troops, passengers add to the crew complement for the purposes of calculating LUXURY.<br><br>\n' +
    '    Your minimum crew is already set by your hull class and control computer.  Additional crew can be used to supplement this minimum value, and are useful if the ship takes casualties.  Vessels which fall below minimum crew through casualties start to suffer penalties, so it is always advisable to carry more than the absolute minimum.</p>\n' +
    '\n' +
    '<h3>Your Crew</h3>\n' +
    '<table class="table table-striped">\n' +
    '    <thead>\n' +
    '    <tr>\n' +
    '        <th></th>\n' +
    '        <th>Quantity</th>\n' +
    '        <th>Type</th>\n' +
    '        <th>Space</th>\n' +
    '        <th>Cost</th>\n' +
    '    </tr>\n' +
    '    </thead>\n' +
    '    <tbody>\n' +
    '    <tr ng-repeat="(name, count) in ship[\'Crew\']">\n' +
    '        <td>\n' +
    '            <div class="input-group">\n' +
    '                <input type="number" class="form-control small-input" ng-init="crewValueRemoveHash[name] = 1" ng-model="crewValueRemoveHash[name]" />\n' +
    '                <button type="button" class="input-group-addon btn btn-primary" ng-click="decrementItem(KEY, name, crewValueRemoveHash[name])">-</button>\n' +
    '            </div>\n' +
    '        </td>\n' +
    '        <td ng-bind="count"></td>\n' +
    '        <td ng-bind="name"></td>\n' +
    '        <td ng-bind="crewHash[name].Space"></td>\n' +
    '        <td ng-bind="crewHash[name].Cost"></td>\n' +
    '    </tr>\n' +
    '    <tr ng-if="isEmpty(KEY)">\n' +
    '        <td colspan="13" class="text-center">No crew selected.</td>\n' +
    '    </tr>\n' +
    '    </tbody>\n' +
    '</table>\n' +
    '\n' +
    '<table class="table table-striped">\n' +
    '    <thead>\n' +
    '    <tr>\n' +
    '        <th>Select</th>\n' +
    '        <th>Type</th>\n' +
    '        <th>Space</th>\n' +
    '        <th>Cost</th>\n' +
    '    </tr>\n' +
    '    </thead>\n' +
    '    <tbody>\n' +
    '    <tr ng-repeat="p in passengerOptions">\n' +
    '        <td>\n' +
    '            <div class="input-group">\n' +
    '                <input type="number" class="form-control small-input" ng-init="crewValueAddHash[p.Type] = 1" ng-model="crewValueAddHash[p.Type]" />\n' +
    '                <button type="button" class="input-group-addon btn btn-primary" ng-click="incrementItem(KEY, p.Type, crewValueAddHash[p.Type])">+</button>\n' +
    '            </div>\n' +
    '        </td>\n' +
    '        <td ng-bind="p.Type"></td>\n' +
    '        <td ng-bind="p.Space"></td>\n' +
    '        <td ng-bind="p.Cost"></td>\n' +
    '    </tr>\n' +
    '    </tbody>\n' +
    '</table>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('starshipPartials');
} catch (e) {
  module = angular.module('starshipPartials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/partials/equipment.html',
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('starshipPartials');
} catch (e) {
  module = angular.module('starshipPartials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/partials/facilities.html',
    '<h2>Facilities</h2>\n' +
    '<p class="explainer">\n' +
    '    They A basic ship comes with a bridge, dormitory accommodations for crew and one cabin for the captain. Ships of smaller than class I do not include accommodations, and have a cockpit instead of a bridge.\n' +
    '\n' +
    '    Like all equipment, shipboard facilities have degrees of quality. Sometimes, in the case of a cabin or chapel, this only affects the furnishings and general amenities, creating a happier crew. In the case of functional facilities like sick bays and laboratories, the quality directly affects tasks performed using them..\n' +
    '</p>\n' +
    '<h3>Your Facilities</h3>\n' +
    '<table class="table table-striped">\n' +
    '    <thead>\n' +
    '    <tr>\n' +
    '        <th class="input-cell"></th>\n' +
    '        <th>Quantity</th>\n' +
    '        <th>Customization</th>\n' +
    '        <th>Cost/crew</th>\n' +
    '        <th>Luxury/crew</th>\n' +
    '        <th>Space/crew</th>\n' +
    '        <th>Recommended</th>\n' +
    '        <th>Notes</th>\n' +
    '    </tr>\n' +
    '    </thead>\n' +
    '    <tbody>\n' +
    '    <tr ng-repeat="(name, count) in ship.Facilities">\n' +
    '        <td>\n' +
    '            <div class="input-group">\n' +
    '                <input type="number" class="form-control small-input" ng-init="facilitiesValueRemoveHash[name] = 1" ng-model="facilitiesValueRemoveHash[name]" />\n' +
    '                <button type="button" class="input-group-addon btn btn-primary" ng-click="decrementItem(KEY, name, facilitiesValueRemoveHash[name])">-</button>\n' +
    '            </div>\n' +
    '        </td>\n' +
    '        <td ng-bind="count"></td>\n' +
    '        <td ng-bind="name"></td>\n' +
    '        <td>{{facilitiesHash[name][\'Cost/crew\']}}</td>\n' +
    '        <td>{{facilitiesHash[name][\'Luxury/crew\']}}</td>\n' +
    '        <td>{{facilitiesHash[name][\'Space/crew\']}}</td>\n' +
    '        <td>{{facilitiesHash[name].Recommended}}</td>\n' +
    '        <td>{{facilitiesHash[name].Notes}}</td>\n' +
    '    </tr>\n' +
    '    <tr ng-if="isEmpty(KEY)">\n' +
    '        <td colspan="7" class="text-center">No facilities selected.</td>\n' +
    '    </tr>\n' +
    '    </tbody>\n' +
    '</table>\n' +
    '\n' +
    '<table class="table table-striped">\n' +
    '    <thead>\n' +
    '    <tr>\n' +
    '        <th class="input-cell"></th>\n' +
    '        <th>Customization</th>\n' +
    '        <th>Cost/crew</th>\n' +
    '        <th>Luxury/crew</th>\n' +
    '        <th>Space/crew</th>\n' +
    '        <th>Recommended</th>\n' +
    '        <th>Notes</th>\n' +
    '    </tr>\n' +
    '    </thead>\n' +
    '    <tbody>\n' +
    '    <tr ng-repeat="c in facilities">\n' +
    '        <td>\n' +
    '            <div class="input-group">\n' +
    '                <input type="number" class="form-control small-input" ng-init="facilitiesValueAddHash[c.Customization] = 1" ng-model="facilitiesValueAddHash[c.Customization]" />\n' +
    '                <button type="button" class="input-group-addon btn btn-primary" ng-click="incrementItem(KEY, c.Customization, facilitiesValueAddHash[c.Customization])">+</button>\n' +
    '            </div>\n' +
    '        </td>\n' +
    '        <td>{{c.Customization}}</td>\n' +
    '        <td>{{c[\'Cost/crew\']}}</td>\n' +
    '        <td>{{c[\'Luxury/crew\']}}</td>\n' +
    '        <td>{{c[\'Space/crew\']}}</td>\n' +
    '        <td>{{c.Recommended}}</td>\n' +
    '        <td>{{c.Notes}}</td>\n' +
    '    </tr>\n' +
    '    </tbody>\n' +
    '</table>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('starshipPartials');
} catch (e) {
  module = angular.module('starshipPartials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/partials/footer.html',
    '<footer id="footer" ng-show="todos.length" ng-cloak>\n' +
    '					<span id="todo-count"><strong>{{remainingCount}}</strong>\n' +
    '						<ng-pluralize count="remainingCount" when="{ one: \'item left\', other: \'items left\' }"></ng-pluralize>\n' +
    '					</span>\n' +
    '    <ul id="filters">\n' +
    '        <li>\n' +
    '            <a ng-class="{selected: status == \'\'} " href="#/">All</a>\n' +
    '        </li>\n' +
    '        <li>\n' +
    '            <a ng-class="{selected: status == \'active\'}" href="#/active">Active</a>\n' +
    '        </li>\n' +
    '        <li>\n' +
    '            <a ng-class="{selected: status == \'completed\'}" href="#/completed">Completed</a>\n' +
    '        </li>\n' +
    '    </ul>\n' +
    '    <button id="clear-completed" ng-click="clearCompletedTodos()" ng-show="completedCount">Clear completed ({{completedCount}})</button>\n' +
    '</footer>');
}]);
})();

(function(module) {
try {
  module = angular.module('starshipPartials');
} catch (e) {
  module = angular.module('starshipPartials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/partials/ftl.html',
    '<h2>FTL Propulsion Systems\n' +
    '</h2>\n' +
    '<p class="explainer">\n' +
    '    A ship\'s power comes from its engines. Basic engines come integrated in a ship\'s hull type, and provide minimal power. Upgrading the engines is often a new captain\'s first project. The existing engines cannot be sold or exchanged; they have an effective value of zero. There are many types of starship propulsion and power systems. Listed below are some common civilian systems, from liquid fuel or fusion systems to more advanced antimatter or hyperdrive engines. Not all engines provide FTL capability; and FTL engines cannot be used at sub-luminal speeds. For this reason, a vessel may need more than one engine – perhaps a fusion reactor and a hyperdrive system. An engineer will need to balance ship class, space, power, FTL capability and fuel efficiency to obtain her desired outcome.<br><br>Choose the primary FTL engines and (optionally) select a backup FTL engine.</p>\n' +
    '<h3>Your FTL Engine</h3>\n' +
    '<table class="table table-striped">\n' +
    '    <thead>\n' +
    '        <tr>\n' +
    '            <th></th>\n' +
    '            <th>Count</th>\n' +
    '            <th>FTL Engine</th>\n' +
    '            <th>Cost</th>\n' +
    '            <th>Size</th>\n' +
    '            <th>CPU</th>\n' +
    '            <th>Space</th>\n' +
    '            <th>Power</th>\n' +
    '            <th>Fuel Eff</th>\n' +
    '        </tr>\n' +
    '    </thead>\n' +
    '    <tbody>\n' +
    '    <tr ng-repeat="(name, count) in ship[KEY]">\n' +
    '        <td><button type="button" class="btn btn-primary" ng-click="decrementItem(KEY, name)">-</button></td>\n' +
    '        <td ng-bind="count"></td>\n' +
    '        <td ng-bind="name"></td>\n' +
    '        <td>{{ftlHash[name].Cost}}</td>\n' +
    '        <td>{{ftlHash[name].Size}}</td>\n' +
    '        <td>{{ftlHash[name].CPU}}</td>\n' +
    '        <td>{{ftlHash[name].Space}}</td>\n' +
    '        <td>{{ftlHash[name].Power}}</td>\n' +
    '        <td>{{ftlHash[name][\'Fuel Eff\']}}</td>\n' +
    '    </tr>\n' +
    '    </tbody>\n' +
    '</table>\n' +
    '\n' +
    '<h3>Your Backup Engines</h3>\n' +
    '<table class="table table-striped">\n' +
    '    <thead>\n' +
    '        <tr>\n' +
    '            <th></th>\n' +
    '            <th>Count</th>\n' +
    '            <th>FTL Engine</th>\n' +
    '            <th>Cost</th>\n' +
    '            <th>Size</th>\n' +
    '            <th>CPU</th>\n' +
    '            <th>Space</th>\n' +
    '            <th>Power</th>\n' +
    '            <th>Fuel Eff</th>\n' +
    '        </tr>\n' +
    '    </thead>\n' +
    '    <tbody>\n' +
    '    <tr ng-repeat="(name, count) in ship[BKEY]">\n' +
    '        <td><button type="button" class="btn btn-primary" ng-click="decrementItem(BKEY, name)">-</button></td>\n' +
    '        <td ng-bind="count"></td>\n' +
    '        <td ng-bind="name"></td>\n' +
    '        <td>{{ftlHash[name].Cost}}</td>\n' +
    '        <td>{{ftlHash[name].Size}}</td>\n' +
    '        <td>{{ftlHash[name].CPU}}</td>\n' +
    '        <td>{{ftlHash[name].Space}}</td>\n' +
    '        <td>{{ftlHash[name].Power}}</td>\n' +
    '        <td>{{ftlHash[name][\'Fuel Eff\']}}</td>\n' +
    '    </tr>\n' +
    '    </tbody>\n' +
    '</table>\n' +
    '\n' +
    '<table class="table table-striped">\n' +
    '    <thead>\n' +
    '        <tr>\n' +
    '            <th>Add</th>\n' +
    '            <th>Backup</th>\n' +
    '            <th>FTL Engine</th>\n' +
    '            <th>Cost</th>\n' +
    '            <th>Size</th>\n' +
    '            <th>CPU</th>\n' +
    '            <th>Space</th>\n' +
    '            <th>Power</th>\n' +
    '            <th>Fuel Eff</th>\n' +
    '        </tr>\n' +
    '    </thead>\n' +
    '    <tbody>\n' +
    '    <tr ng-repeat="item in ftl">\n' +
    '        <td><button\n' +
    '                type="button"\n' +
    '                class="btn btn-primary"\n' +
    '                ng-disabled="!hasThisItem(KEY, item[\'FTL Engine\'])"\n' +
    '                ng-click="incrementOneItem(KEY, item[\'FTL Engine\'])">\n' +
    '            +</button>\n' +
    '        </td>\n' +
    '        <td><button type="button" class="btn btn-primary" ng-click="incrementItem(BKEY, item[\'FTL Engine\'])">+</button></td>\n' +
    '        <td>{{item[\'FTL Engine\']}}</td>\n' +
    '        <td>{{item.Cost}}</td>\n' +
    '        <td>{{item.Size}}</td>\n' +
    '        <td>{{item.CPU}}</td>\n' +
    '        <td>{{item.Space}}</td>\n' +
    '        <td>{{item.Power}}</td>\n' +
    '        <td>{{item[\'Fuel Eff\']}}</td>\n' +
    '    </tr>\n' +
    '    </tbody>\n' +
    '</table>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('starshipPartials');
} catch (e) {
  module = angular.module('starshipPartials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/partials/general.html',
    '<h2>General Equipment & Systems</h2>\n' +
    '<p class="explainer">\n' +
    '    Starships also have a variety of individual pieces of equipment. These cover a wide range of purposes, including fuel scoops, tractor beams, fuel-bay alterations, cloaking devices, and more.</p>\n' +
    '<h3>Your General Equipment</h3>\n' +
    '<table class="table table-striped">\n' +
    '    <thead>\n' +
    '    <tr>\n' +
    '        <th></th>\n' +
    '        <th>Count</th>\n' +
    '        <th>Item</th>\n' +
    '        <th>Space</th>\n' +
    '        <th>Size</th>\n' +
    '        <th>Cost</th>\n' +
    '        <th>CPU</th>\n' +
    '        <th>Notes</th>\n' +
    '    </tr>\n' +
    '    </thead>\n' +
    '    <tbody>\n' +
    '    <tr ng-repeat="(name, count) in ship.General">\n' +
    '        <td><button type="button" class="btn btn-primary" ng-click="decrementItem(KEY, name)">-</button></td>\n' +
    '        <td ng-bind="count"></td>\n' +
    '        <td ng-bind="name"></td>\n' +
    '        <td>{{generalHash[name].Space}}</td>\n' +
    '        <td>{{generalHash[name].Size}}</td>\n' +
    '        <td>{{generalHash[name].Cost}}</td>\n' +
    '        <td>{{generalHash[name].CPU}}</td>\n' +
    '        <td>{{generalHash[name].Notes}}</td>\n' +
    '    </tr>\n' +
    '    <tr ng-if="isEmpty(KEY)">\n' +
    '        <td colspan="7" class="text-center">No general equipment selected.</td>\n' +
    '    </tr>\n' +
    '    </tbody>\n' +
    '</table>\n' +
    '\n' +
    '\n' +
    '<table class="table table-striped">\n' +
    '    <thead>\n' +
    '    <tr colspan="7">\n' +
    '        <th></th>\n' +
    '        <th>Item</th>\n' +
    '        <th>Space</th>\n' +
    '        <th>Size</th>\n' +
    '        <th>Cost</th>\n' +
    '        <th>CPU</th>\n' +
    '        <th>Notes</th>\n' +
    '    </tr>\n' +
    '    </thead>\n' +
    '    <tbody>\n' +
    '    <tr><td colspan="7" class="text-center"><strong>Fueling</strong></td></tr>\n' +
    '    <tr ng-repeat="c in systems.fueling">\n' +
    '        <td><button type="button" class="btn btn-primary" ng-click="incrementItem(KEY, c.Item)">+</button></td>\n' +
    '        <td>{{c.Item}}</td>\n' +
    '        <td>{{c.Space}}</td>\n' +
    '        <td>{{c.Size}}</td>\n' +
    '        <td>{{c.Cost}}</td>\n' +
    '        <td>{{c.CPU}}</td>\n' +
    '        <td>{{c.Notes}}</td>\n' +
    '    </tr>\n' +
    '    <tr><td colspan="7" class="text-center"><strong>Tractor Beams</strong></td></tr>\n' +
    '    <tr ng-repeat="c in systems.tractor">\n' +
    '        <td><button type="button" class="btn btn-primary" ng-click="incrementItem(KEY, c.Item)">+</button></td>\n' +
    '        <td>{{c.Item}}</td>\n' +
    '        <td>{{c.Space}}</td>\n' +
    '        <td>{{c.Size}}</td>\n' +
    '        <td>{{c.Cost}}</td>\n' +
    '        <td>{{c.CPU}}</td>\n' +
    '        <td>{{c.Notes}}</td>\n' +
    '    </tr>\n' +
    '    <tr><td colspan="7" class="text-center"><strong>Engine Mods</strong></td></tr>\n' +
    '    <tr ng-repeat="c in systems.engMods">\n' +
    '        <td><button type="button" class="btn btn-primary" ng-click="incrementItem(KEY, c.Item)">+</button></td>\n' +
    '        <td>{{c.Item}}</td>\n' +
    '        <td>{{c.Space}}</td>\n' +
    '        <td>{{c.Size}}</td>\n' +
    '        <td>{{c.Cost}}</td>\n' +
    '        <td>{{c.CPU}}</td>\n' +
    '        <td>{{c.Notes}}</td>\n' +
    '    </tr>\n' +
    '    <tr><td colspan="7" class="text-center"><strong>Electronic Warfare</strong></td></tr>\n' +
    '    <tr ng-repeat="c in systems.electronicWarfare">\n' +
    '        <td><button type="button" class="btn btn-primary" ng-click="incrementItem(KEY, c.Item)">+</button></td>\n' +
    '        <td>{{c.Item}}</td>\n' +
    '        <td>{{c.Space}}</td>\n' +
    '        <td>{{c.Size}}</td>\n' +
    '        <td>{{c.Cost}}</td>\n' +
    '        <td>{{c.CPU}}</td>\n' +
    '        <td>{{c.Notes}}</td>\n' +
    '    </tr>\n' +
    '    <tr><td colspan="7" class="text-center"><strong>Cloaking Systems</strong></td></tr>\n' +
    '    <tr ng-repeat="c in systems.cloaking">\n' +
    '        <td><button type="button" class="btn btn-primary" ng-click="incrementItem(KEY, c.Item)" ng-disabled="notValidHull(c.Notes)">+</button></td>\n' +
    '        <td>{{c.Item}}</td>\n' +
    '        <td>{{c.Space}}</td>\n' +
    '        <td>{{c.Size}}</td>\n' +
    '        <td>{{c.Cost}}</td>\n' +
    '        <td>{{c.CPU}}</td>\n' +
    '        <td>{{c.Notes}}</td>\n' +
    '    </tr>\n' +
    '    </tbody>\n' +
    '</table>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('starshipPartials');
} catch (e) {
  module = angular.module('starshipPartials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/partials/hangars.html',
    '<h2>Hangars</h2>\n' +
    '<p class="explainer">\n' +
    '  A small shuttlebay or fighter bay is able to accommodate one class 0-III vessel; the bay\'s size correlates to its shuttle capacity. Some larger ships have multiple shuttle bays if they need to carry more than 64 shuttles or fighters. A shuttlebay comes already stocked with fighters or shuttles as part of the price. Launching a fighter squadron or a single shuttle requires one action; one squadron is typically 6-8 ships.\n' +
    '</p>\n' +
    '<h3>Your Fighter Hangars</h3>\n' +
    '<table class="table table-striped">\n' +
    '    <thead>\n' +
    '    <tr>\n' +
    '        <th></th>\n' +
    '        <th>Count</th>\n' +
    '        <th>Item</th>\n' +
    '        <th>Space</th>\n' +
    '        <th>Size</th>\n' +
    '        <th>Cost</th>\n' +
    '        <th>CPU</th>\n' +
    '        <th>Craft</th>\n' +
    '        <th>Notes</th>\n' +
    '    </tr>\n' +
    '    </thead>\n' +
    '    <tbody>\n' +
    '    <tr ng-repeat="(name, count) in ship[\'Hangar Bay Fighter\']">\n' +
    '        <td><button type="button" class="btn btn-primary" ng-click="decrementItem(KEY+\' Fighter\', name)">-</button></td>\n' +
    '        <td ng-bind="count"></td>\n' +
    '        <td ng-bind="name"></td>\n' +
    '        <td>{{hangarHash[name].Space}}</td>\n' +
    '        <td>{{hangarHash[name].Size}}</td>\n' +
    '        <td>{{hangarHash[name].Cost}}</td>\n' +
    '        <td>{{hangarHash[name].CPU}}</td>\n' +
    '        <td>{{hangarHash[name].Craft}}</td>\n' +
    '        <td>{{hangarHash[name].Notes}}</td>\n' +
    '    </tr>\n' +
    '    <tr ng-if="isEmpty(KEY+\' Fighter\')">\n' +
    '        <td colspan="7" class="text-center">No Hangars selected</td>\n' +
    '    </tr>\n' +
    '    </tbody>\n' +
    '</table>\n' +
    '<h3>Your Shuttle Hangars</h3>\n' +
    '<table class="table table-striped">\n' +
    '    <thead>\n' +
    '    <tr>\n' +
    '        <th></th>\n' +
    '        <th>Count</th>\n' +
    '        <th>Item</th>\n' +
    '        <th>Space</th>\n' +
    '        <th>Size</th>\n' +
    '        <th>Cost</th>\n' +
    '        <th>CPU</th>\n' +
    '        <th>Craft</th>\n' +
    '        <th>Notes</th>\n' +
    '    </tr>\n' +
    '    </thead>\n' +
    '    <tbody>\n' +
    '    <tr ng-repeat="(name, count) in ship[\'Hangar Bay Shuttle\']">\n' +
    '        <td><button type="button" class="btn btn-primary" ng-click="decrementItem(KEY+\' Shuttle\', name)">-</button></td>\n' +
    '        <td ng-bind="count"></td>\n' +
    '        <td ng-bind="name"></td>\n' +
    '        <td>{{hangarHash[name].Space}}</td>\n' +
    '        <td>{{hangarHash[name].Size}}</td>\n' +
    '        <td>{{hangarHash[name].Cost}}</td>\n' +
    '        <td>{{hangarHash[name].CPU}}</td>\n' +
    '        <td>{{hangarHash[name].Craft}}</td>\n' +
    '        <td>{{hangarHash[name].Notes}}</td>\n' +
    '    </tr>\n' +
    '    <tr ng-if="isEmpty(KEY+\' Shuttle\')">\n' +
    '        <td colspan="7" class="text-center">No Hangars selected</td>\n' +
    '    </tr>\n' +
    '    </tbody>\n' +
    '</table>\n' +
    '\n' +
    '<table class="table table-striped">\n' +
    '    <thead>\n' +
    '    <tr colspan="7">\n' +
    '        <th></th>\n' +
    '        <th></th>\n' +
    '        <th>Hangar</th>\n' +
    '        <th>Space</th>\n' +
    '        <th>Size</th>\n' +
    '        <th>Cost</th>\n' +
    '        <th>CPU</th>\n' +
    '        <th>Craft</th>\n' +
    '        <th>Notes</th>\n' +
    '    </tr>\n' +
    '    </thead>\n' +
    '    <tbody>\n' +
    '      <tr ng-repeat="c in hangars">\n' +
    '          <td><button type="button" class="btn btn-primary" ng-click="incrementItem(KEY+\' Fighter\', c[\'Hangar Bay\'])">+Fighter</button></td>\n' +
    '          <td><button type="button" class="btn btn-primary" ng-click="incrementItem(KEY+\' Shuttle\', c[\'Hangar Bay\'])">+Shuttle</button></td>\n' +
    '          <td>{{c[\'Hangar Bay\']}}</td>\n' +
    '          <td>{{c.Space}}</td>\n' +
    '          <td>{{c.Size}}</td>\n' +
    '          <td>{{c.Cost}}</td>\n' +
    '          <td>{{c.CPU}}</td>\n' +
    '          <td>{{c.Craft}}</td>\n' +
    '          <td>{{c.Notes}}</td>\n' +
    '      </tr>\n' +
    '  </tbody>\n' +
    '</table>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('starshipPartials');
} catch (e) {
  module = angular.module('starshipPartials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/partials/hull.html',
    '<h2>Starship Hull Configuration</h2>\n' +
    '<p class="explainer">\n' +
    '    Select an (optional) hull configuration. There are as many different vessel types as there are stars in the\n' +
    '    sky. The following list is a summary of some common classifications listed in approximate typical size order. Each\n' +
    '    configuration grants the ship one exploit. The system does not apply the exploit.\n' +
    '</p>\n' +
    '<select class=\'form-control\' style=\'overflow:hidden;max-width:500px;\'\n' +
    '        ng-model="ship.hullConfig"\n' +
    '        ng-options="presentType(config) for config in hullConfigurations">\n' +
    '</select>\n' +
    '\n' +
    '<h2>Starship Hull Class</h2>\n' +
    '<p class="explainer">\n' +
    '\n' +
    '    Starships are categorized by class, which is a rough measure of tonnage. This initial decision determines the size\n' +
    '    parameters of your ship design. It also determines your crew requirement, fuel capacity, cargo space, and DEFENSE\n' +
    '    values.\n' +
    '</p>\n' +
    '<table class="table table-striped">\n' +
    '    <thead>\n' +
    '    <tr>\n' +
    '        <th>Select</th>\n' +
    '        <th>Class</th>\n' +
    '        <th>Tonnage</th>\n' +
    '        <th>Cost</th>\n' +
    '        <th>Crew</th>\n' +
    '        <th>Max CU</th>\n' +
    '        <th>DEFENSE</th>\n' +
    '        <th>Fuel</th>\n' +
    '        <th>Initiative</th>\n' +
    '    </tr>\n' +
    '    </thead>\n' +
    '    <tbody>\n' +
    '    <tr ng-repeat="h in hulls">\n' +
    '        <td><input type="radio" ng-model="ship.hull" ng-value="h" ng-change="clearCloaking()"></td>\n' +
    '        <td ng-bind="h.Class"></td>\n' +
    '        <td ng-bind="h.Tonnage"></td>\n' +
    '        <td ng-bind="h.Cost"></td>\n' +
    '        <td ng-bind="h.Crew"></td>\n' +
    '        <td ng-bind="h[\'Max CU\']"></td>\n' +
    '        <td ng-bind="h.DEFENSE"></td>\n' +
    '        <td ng-bind="h.FUEL"></td>\n' +
    '        <td ng-bind="h.INITIATIVE"></td>\n' +
    '    </tr>\n' +
    '    </tbody>\n' +
    '</table>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('starshipPartials');
} catch (e) {
  module = angular.module('starshipPartials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/partials/misc.html',
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('starshipPartials');
} catch (e) {
  module = angular.module('starshipPartials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/partials/sensors.html',
    '<h2>Sensor Systems</h2>\n' +
    '<p class="explainer">\n' +
    '\n' +
    '    A sensor array is a collection of sensors and sub processors designed to gather and collate information. They include navigational and combat sensors, as well as equipment which measures and records the environment capable of detecting a wide range of phenomena. Sensors also include communications equipment, and are used for offensive electronic warfare.</p>\n' +
    '<table class="table table-striped">\n' +
    '    <thead>\n' +
    '    <tr>\n' +
    '        <th></th>\n' +
    '        <th>Sensor Systems</th>\n' +
    '        <th>Cost</th>\n' +
    '        <th>Size</th>\n' +
    '        <th>Space</th>\n' +
    '        <th>Range</th>\n' +
    '        <th>Range Inc</th>\n' +
    '        <th>DEFENSE</th>\n' +
    '        <th>Checks</th>\n' +
    '    </tr>\n' +
    '    </thead>\n' +
    '    <tbody>\n' +
    '    <tr ng-repeat="s in sensors">\n' +
    '        <td><input type="radio" ng-model="ship.sensor" ng-value="s"></td>\n' +
    '        <td ng-bind="s[\'Sensor Systems\']"></td>\n' +
    '        <td ng-bind="s.Cost"></td>\n' +
    '        <td ng-bind="s.Size"></td>\n' +
    '        <td ng-bind="s.Space"></td>\n' +
    '        <td ng-bind="s.Range"></td>\n' +
    '        <td ng-bind="s[\'Range Inc\']"></td>\n' +
    '        <td ng-bind="s.DEFENSE"></td>\n' +
    '        <td ng-bind="s.Checks"></td>\n' +
    '    </tr>\n' +
    '    </tbody>\n' +
    '</table>');
}]);
})();

(function(module) {
try {
  module = angular.module('starshipPartials');
} catch (e) {
  module = angular.module('starshipPartials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/partials/shields.html',
    '<h2>Your Point Defenses</h2>\n' +
    '<p class="explainer">\n' +
    '    Point defenses are close-in weaponry batteries and active protection systems which automatically detect, track, and destroy incoming missiles and fighter craft. They are ineffective against energy weapons such as lasers and distruptors, but very effective against torpedoes. Unlike shields and armor, point defense batteries do not grant a SOAK bonus; instead they provide a DEFENSE bonus against missile weapons (but not energy weapons). Because they\'re automated, point defenses have a high CPU overhead.\n' +
    '</p>\n' +
    '<table class="table table-striped">\n' +
    '    <thead>\n' +
    '    <tr>\n' +
    '        <th></th>\n' +
    '        <th>Amount</th>\n' +
    '        <th>Name</th>\n' +
    '        <th>Space</th>\n' +
    '        <th>CPU</th>\n' +
    '        <th>Cost/point</th>\n' +
    '        <th>DEFENSE</th>\n' +
    '        <th>Aura<th>\n' +
    '    </tr>\n' +
    '    </thead>\n' +
    '    <tbody>\n' +
    '    <tr ng-repeat="(name, count) in ship[PKEY]">\n' +
    '        <td><button type="button" class="btn btn-primary" ng-click="decrementItem(PKEY, name)">-</button></td>\n' +
    '        <td ng-bind="count"></td>\n' +
    '        <td ng-bind="name"></td>\n' +
    '        <td>{{pointDefensesHash[name].Space}}</td>\n' +
    '        <td>{{pointDefensesHash[name].CPU}}</td>\n' +
    '        <td>{{pointDefensesHash[name].Cost}}</td>\n' +
    '        <td>{{pointDefensesHash[name].DEFENSE}}</td>\n' +
    '        <td>{{pointDefensesHash[name].Aura}}</td>\n' +
    '    </tr>\n' +
    '    <tr ng-if="isEmpty(KEY)">\n' +
    '        <td colspan="7" class="text-center">No point defenses selected.</td>\n' +
    '    </tr>\n' +
    '    </tbody>\n' +
    '</table>\n' +
    '\n' +
    '<table class="table table-striped">\n' +
    '    <thead>\n' +
    '    <tr>\n' +
    '        <th></th>\n' +
    '        <th>Point Defense</th>\n' +
    '        <th>Space</th>\n' +
    '        <th>CPU</th>\n' +
    '        <th>Cost/point</th>\n' +
    '        <th>DEFENSE</th>\n' +
    '        <th>Aura</th>\n' +
    '    </tr>\n' +
    '    </thead>\n' +
    '    <tbody>\n' +
    '    <tr ng-repeat="c in pointDefenses">\n' +
    '        <td><button type="button" class="btn btn-primary" ng-click="incrementItem(PKEY, c[PKEY])">+</button></td>\n' +
    '        <td>{{c[\'Point Defenses\']}}</td>\n' +
    '        <td>{{c.Space}}</td>\n' +
    '        <td>{{c.CPU}}</td>\n' +
    '        <td>{{c.Cost}}</td>\n' +
    '        <td>{{c.DEFENSE}}</td>\n' +
    '        <td>{{c.Aura}}</td>\n' +
    '    </tr>\n' +
    '    </tbody>\n' +
    '</table>\n' +
    '\n' +
    '<h2>Deflector Shields</h2>\n' +
    '<p class="explainer">\n' +
    '    Deflector shields (also referred to as screens or force-fields) are a technology devised to protect ships, stations, and sometimes even planets from damage. A deflector shield is a (usually invisible) field projected around an object which disperses or deflects energy and projectiles. The shields may use various energy types to create the fields – magnetic fields, gravitons, and so on – but most have much the same effect. Shields are not typically raised at all times (although navigational shields stay active permanently; larger shields have a lower navigational power level which is used during normal travel). Shield capacity is directly proportional to the power generated divided by the size of the area to be protected. Earlier shields typically project an elliptical field around the object to be protected, while more advanced versions conform to the contours of the ship within a few feet or so.</p>\n' +
    '<h3>Your Deflector Shields</h3>\n' +
    '<table class="table table-striped">\n' +
    '    <thead>\n' +
    '    <tr>\n' +
    '        <th></th>\n' +
    '        <th>Amount</th>\n' +
    '        <th>Deflector Shield</th>\n' +
    '        <th>Cost</th>\n' +
    '        <th>Size</th>\n' +
    '        <th>CPU</th>\n' +
    '        <th>Space</th>\n' +
    '        <th>Power</th>\n' +
    '    </tr>\n' +
    '    </thead>\n' +
    '    <tbody>\n' +
    '    <tr ng-repeat="(name, count) in ship[KEY]">\n' +
    '        <td><button type="button" class="btn btn-primary" ng-click="decrementItem(KEY, name)">-</button></td>\n' +
    '        <td ng-bind="count"></td>\n' +
    '        <td ng-bind="name"></td>\n' +
    '        <td>{{deflectorHash[name].Cost}}</td>\n' +
    '        <td>{{deflectorHash[name].Size}}</td>\n' +
    '        <td>{{deflectorHash[name].CPU}}</td>\n' +
    '        <td>{{deflectorHash[name].Space}}</td>\n' +
    '        <td>{{deflectorHash[name].Power}}</td>\n' +
    '    </tr>\n' +
    '    <tr ng-if="isEmpty(KEY)">\n' +
    '        <td colspan="7" class="text-center">No deflectors selected.</td>\n' +
    '    </tr>\n' +
    '    </tbody>\n' +
    '</table>\n' +
    '\n' +
    '<table class="table table-striped">\n' +
    '    <thead>\n' +
    '    <tr>\n' +
    '        <th></th>\n' +
    '        <th>Deflector Shield</th>\n' +
    '        <th>Cost</th>\n' +
    '        <th>Size</th>\n' +
    '        <th>CPU</th>\n' +
    '        <th>Space</th>\n' +
    '        <th>Power</th>\n' +
    '    </tr>\n' +
    '    </thead>\n' +
    '    <tbody>\n' +
    '    <tr ng-repeat="c in deflectors">\n' +
    '        <td><button type="button" class="btn btn-primary" ng-click="incrementItem(KEY, c[KEY])">+</button></td>\n' +
    '        <td>{{c[\'Deflector Shields\']}}</td>\n' +
    '        <td>{{c.Cost}}</td>\n' +
    '        <td>{{c.Size}}</td>\n' +
    '        <td>{{c.CPU}}</td>\n' +
    '        <td>{{c.Space}}</td>\n' +
    '        <td>{{c.Power}}</td>\n' +
    '    </tr>\n' +
    '    </tbody>\n' +
    '</table>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('starshipPartials');
} catch (e) {
  module = angular.module('starshipPartials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/partials/ship.html',
    '{{ship}}\n' +
    '\n' +
    '<div class="row">\n' +
    '    <div class="col-md-8">\n' +
    '        <table class=\'centered\' cols="10" frame="void" rules="none" border="0" cellspacing="0">\n' +
    '            <colgroup>\n' +
    '                <col width="157">\n' +
    '                <col width="72">\n' +
    '                <col width="61">\n' +
    '                <col width="71">\n' +
    '                <col width="52">\n' +
    '                <col width="50">\n' +
    '                <col width="43">\n' +
    '                <col width="48">\n' +
    '                <col width="48">\n' +
    '                <col width="48">\n' +
    '            </colgroup>\n' +
    '            <tbody>\n' +
    '            <tr>\n' +
    '                <td colspan="10" align="center" height="23" bgcolor="#cccccc"\n' +
    '                    valign="bottom" width="650">{{ship.name}} Class {{ship.hull.Class}} {{ship.hullConfig.Type}}</b></td>\n' +
    '            </tr>\n' +
    '            <tr>\n' +
    '                <td colspan="10" align="left" height="17" valign="bottom">\n' +
    '                    <span style="font-weight: bold;">Weight</span>\n' +
    '                    <span ng-bind="calculateWeight(ship.hull.Tonnage) | number:0 "></span> tons;\n' +
    '                    <span style="font-weight: bold;">Cargo Units</span>\n' +
    '                    <span ng-bind="presentCargo()"></span>\n' +
    '                    <span style="font-weight: bold;">Hull Class </span>\n' +
    '                    <span ng-bind=\'ship.hull.Class || "none"\'></span> (INIT <span ng-bind="ship.hull.INITIATIVE || 0"></span>)<br>\n' +
    '                    <span style="font-weight: bold;">Traits</span> {{ship.hullConfig.Traits}}<br>\n' +
    '                </td>\n' +
    '            </tr>\n' +
    '            <tr>\n' +
    '                <td colspan="10" align="left" height="17" valign="bottom">\n' +
    '                    <span style="font-weight: bold;">Crew</span>\n' +
    '                    <span ng-bind="calculateCrew() || 0"></span> (cost <span ng-bind="(calculateCrew() * 200)"></span>Cr/m);\n' +
    '                    <span style="font-weight: bold;">Troops</span>\n' +
    '                    <span ng-bind="ship.Crew.Troops || 0"></span>; <strong>Passengers</strong>\n' +
    '                    <span ng-bind="ship.Crew[\'Standard Passengers\'] + ship.Crew[\'Luxury Passengers\'] || 0"></span>\n' +
    '                    (<span ng-bind="ship.Crew[\'Standard Passengers\'] || 0"></span> standard, <span ng-bind="ship.Crew[\'Luxury Passengers\'] || 0"></span> luxury)\n' +
    '                </td>\n' +
    '            </tr>\n' +
    '            <tr>\n' +
    '                <td colspan="10" align="left" height="17" bgcolor="#dddddd" valign="bottom">\n' +
    '                    <b>Command &amp; Control Systems</b>\n' +
    '                </td>\n' +
    '            </tr>\n' +
    '            <tr>\n' +
    '                <td colspan="10" align="left" height="17" valign="bottom">\n' +
    '                    <span style="font-weight: bold;">Computers: </span>\n' +
    '                    <span ng-repeat="(name, quantity) in ship[\'Control Computers\']">\n' +
    '                        <span ng-bind="quantity"></span>x <span ng-bind="name"></span>\n' +
    '                        (CPU cycles: <span ng-bind="computerHash[name][\'CPU\']"></span>;\n' +
    '                        max FTL: <span ng-bind="computerHash[name][\'Max FTL\']"></span>;\n' +
    '                        checks: <span ng-bind="computerHash[name].Checks"></span>)\n' +
    '                    </span>\n' +
    '                </td>\n' +
    '            </tr>\n' +
    '            <tr>\n' +
    '                <td colspan="10" align="left" height="17" valign="bottom">\n' +
    '                    <span style="font-weight: bold;">Sensors</span>\n' +
    '                    <span ng-bind="ship.sensor[\'Sensor Systems\'] || \'none\'"></span>\n' +
    '                    (range <span ng-bind="ship.sensor.Range || 0"></span>; check <span ng-bind="ship.sensor.Checks || 0"></span>)\n' +
    '                </td>\n' +
    '            </tr>\n' +
    '            <tr>\n' +
    '                <td colspan="10" align="left" height="17" bgcolor="#dddddd" valign="bottom">\n' +
    '                    <b>Engine &amp; Power Data</b>\n' +
    '                </td>\n' +
    '            </tr>\n' +
    '            <tr>\n' +
    '                <td colspan="10" align="left" height="17" valign="bottom">\n' +
    '                    <span style="font-weight: bold;">Subluminal</span>\n' +
    '                      <span ng-repeat="(name, quantity) in ship[\'Sub-luminal Engine\']">\n' +
    '                        <span ng-bind="quantity"></span>x <span ng-bind="name"></span>\n' +
    '                        (power: <span ng-bind="sublHash[name][\'Power\']"></span>;\n' +
    '                        SPEED: <span ng-bind="calculateSublSpeed(name, quantity) | number:1"></span>;\n' +
    '                        fuel efficiency: <span ng-bind="sublHash[name][\'Fuel Eff\']"></span>)\n' +
    '                    </span>\n' +
    '                </td>\n' +
    '            </tr>\n' +
    '            <tr>\n' +
    '                <td colspan="10" align="left" height="17" valign="bottom">\n' +
    '                    <span style="font-weight: bold;">FTL</span>\n' +
    '                    <span ng-if="ship[\'FTL Engine\'] === undefined || isEmpty(\'FTL Engine\')">-</span>\n' +
    '                      <span ng-repeat="(name, quantity) in ship[\'FTL Engine\']">\n' +
    '                        <span ng-bind="quantity"></span>x <span ng-bind="name"></span>\n' +
    '                        (power: <span ng-bind="ftlHash[name][\'Power\']"></span>;\n' +
    '                        FTL: <span ng-bind="calculateFtl(name, quantity) | number:1"></span>;\n' +
    '                        fuel efficiency: <span ng-bind="ftlHash[name][\'Fuel Eff\']"></span>)\n' +
    '                    <br>\n' +
    '                    <span style="font-weight: bold;">Backup FTL</span>\n' +
    '                     <span ng-if="ship[\'Backup FTL Engine\'] === undefined || isEmpty(\'Backup FTL Engine\')">-</span>\n' +
    '                     <span ng-repeat="(name, quantity) in ship[\'Backup FTL Engine\']">\n' +
    '                        <span ng-bind="quantity"></span>x <span ng-bind="name"></span>\n' +
    '                        (power: <span ng-bind="ftlHash[name][\'Power\']"></span>;\n' +
    '                        FTL: <span ng-bind="calculateFtl(name, quantity) | number:1"></span>;\n' +
    '                        fuel efficiency: <span ng-bind="ftlHash[name][\'Fuel Eff\']"></span>)\n' +
    '                    </span>\n' +
    '                </td>\n' +
    '            </tr>\n' +
    '            <tr>\n' +
    '                <td colspan="10" align="left" height="17" valign="bottom">\n' +
    '                    <span style="font-weight: bold;">Operational Range</span>\n' +
    '                    <span ng-bind="calculateOperationalRange()"></span> parsecs\n' +
    '                </td>\n' +
    '            </tr>\n' +
    '            <tr>\n' +
    '                <td colspan="10" align="left" height="17" bgcolor="#dddddd" valign="bottom"><b>Defensive Data</b></td>\n' +
    '            </tr>\n' +
    '            <tr>\n' +
    '                <td colspan="10" align="left" height="17" valign="bottom">\n' +
    '                    <span style="font-weight: bold;">Superstructure</span>\n' +
    '                    <span ng-bind="calculateSuperstructure() || \'none\'"></span>\n' +
    '                    <span style="font-weight: bold;">DEFENSE</span>\n' +
    '                    <span>{{calculateDefense() | number:0}}</span>\n' +
    '                    <span style="font-weight: bold;">ELECTRONIC DEFENSE</span>\n' +
    '                    <span ng-bind="calculateElectronicDefense()"></span>\n' +
    '                </td>\n' +
    '            </tr>\n' +
    '            <tr>\n' +
    '                <td colspan="10" align="left" height="17" valign="bottom">\n' +
    '                    <span style="font-weight: bold;">Armor</span>\n' +
    '                    <span ng-bind="presentArmor() || \'none\'"></span>\n' +
    '                </td>\n' +
    '            </tr>\n' +
    '            <tr>\n' +
    '                <td colspan="10" align="left" height="17" valign="bottom">\n' +
    '                    <span style="font-weight: bold;">Shields</span>\n' +
    '                     <span ng-repeat="(name, quantity) in ship[\'Deflector Shields\']">\n' +
    '                        <span ng-bind="quantity"></span>x <span ng-bind="name"></span>\n' +
    '                        (power <span ng-bind="deflectorHash[name][\'Power\'] * quantity"></span>;\n' +
    '                        SOAK <span ng-bind="calculateSoak(deflectorHash[name][\'Power\'], quantity)"></span>)\n' +
    '                    </span>\n' +
    '                </td>\n' +
    '            </tr>\n' +
    '            <tr>\n' +
    '                <td colspan="10" align="left" height="17" valign="bottom">\n' +
    '                    <span style="font-weight: bold;">Point Defenses</span>\n' +
    '                    <span ng-if="ship[\'Point Defenses\'] === undefined">-</span>\n' +
    '                     <span ng-repeat="(name, quantity) in ship[\'Point Defenses\']">\n' +
    '                        <span ng-bind="quantity"></span>x <span ng-bind="name"></span>\n' +
    '                        (+{{pointDefensesHash[name][\'DEFENSE\'] * quantity/getNumericShipClass() | number:0}} vs. missiles and fighters)\n' +
    '\n' +
    '                    </span>\n' +
    '                </td>\n' +
    '            </tr>\n' +
    '            <tr>\n' +
    '                <td colspan="10" align="left" height="17" bgcolor="#dddddd" valign="bottom"><b>Weapons Data</b></td>\n' +
    '            </tr>\n' +
    '            <tr>\n' +
    '                <td colspan="10" align="left" height="17" valign="bottom">\n' +
    '                     <span ng-repeat="(name, quantity) in ship[\'Weapon System\']">\n' +
    '                        <span ng-bind="quantity"></span>x <span ng-bind="name"></span>\n' +
    '                        (range <span ng-bind="calculateWeaponRange(name)"></span>;\n' +
    '                        damage <span ng-bind="weaponHash[name][\'Damage\']"></span>;\n' +
    '                        attack <span ng-bind="weaponHash[name][\'Attack\']"></span>)<br/>\n' +
    '                    </span>\n' +
    '                </td>\n' +
    '            </tr>\n' +
    '            <tr>\n' +
    '                <td colspan="10" align="left" height="17" bgcolor="#dddddd" valign="bottom"><b>Facilities</b></td>\n' +
    '            </tr>\n' +
    '            <tr>\n' +
    '                <td colspan="10" sdnum="2057;0;0" align="left" height="17" valign="bottom">\n' +
    '                    <span style="font-weight: bold;">Luxury</span>\n' +
    '                    <span ng-bind="calculateLuxury() || \'none\'"></span>\n' +
    '                </td>\n' +
    '            </tr>\n' +
    '            <tr>\n' +
    '                <td colspan="11" align="left" height="17" valign="bottom"><span style="font-weight: bold;">Facilities</span>\n' +
    '                    <span ng-repeat="(name, quantity) in ship[\'Facilities\']">\n' +
    '                        <span ng-bind="name"></span> (<span ng-bind="quantity"></span>),\n' +
    '                    </span>\n' +
    '                </td>\n' +
    '            </tr>\n' +
    '            <tr>\n' +
    '                <td colspan="12" align="left" height="17" valign="bottom">\n' +
    '                    <span style="font-weight: bold;">Other Systems</span>\n' +
    '                    <span ng-if="ship[\'General\'] === undefined">-</span>\n' +
    '                     <span ng-repeat="(name, quantity) in ship[\'General\']">\n' +
    '                         <span ng-if="!(isHangar(name))">\n' +
    '                            <span ng-bind="quantity"></span>x <span ng-bind="name"></span> (<span ng-bind="quantity"></span>),\n' +
    '                         </span>\n' +
    '                    </span>\n' +
    '                </td>\n' +
    '            </tr>\n' +
    '            <tr>\n' +
    '                <td colspan="10" align="left" height="17" valign="bottom">\n' +
    '                    <span style="font-weight: bold;">Shuttles</span>\n' +
    '                    {{countShuttles()}} (\n' +
    '                        <span ng-repeat="(name, quantity) in ship[\'Hangar Bay Shuttle\']">\n' +
    '                           <span ng-bind="quantity"></span>x <span ng-bind="name"></span>,\n' +
    '                        </span>\n' +
    '                    )\n' +
    '                </td>\n' +
    '            </tr>\n' +
    '\n' +
    '            <tr>\n' +
    '                <td colspan="10" align="left" height="17" valign="bottom">\n' +
    '                    <span style="font-weight: bold;">Fighters</span>\n' +
    '                    {{countFighters()}} (\n' +
    '                        <span ng-repeat="(name, quantity) in ship[\'Hangar Bay Fighter\']">\n' +
    '                           <span ng-bind="quantity"></span>x <span ng-bind="name"></span>,\n' +
    '                        </span>\n' +
    '                    )\n' +
    '                </td>\n' +
    '            </tr>\n' +
    '\n' +
    '            <tr>\n' +
    '                <td colspan="10" align="left" height="17" bgcolor="#dddddd" valign="bottom">\n' +
    '                    <b>Market Value {{ totalCost() }} MCr</b>\n' +
    '                </td>\n' +
    '            </tr>\n' +
    '            </tbody>\n' +
    '        </table>\n' +
    '        <div class="well">\n' +
    '            {{ ship[\'description\'] }}\n' +
    '        </div>\n' +
    '    </div>\n' +
    '\n' +
    '</div>');
}]);
})();

(function(module) {
try {
  module = angular.module('starshipPartials');
} catch (e) {
  module = angular.module('starshipPartials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/partials/starship-index.html',
    '<div class="row">\n' +
    '    <div class="col-md-3 hidden-sm hidden-xs">\n' +
    '        <tabs data="tabs" vertical="true" type="pills"></tabs>\n' +
    '    </div>\n' +
    '    <div class="col-md-9">\n' +
    '        <div ui-view="content"></div>\n' +
    '    </div>\n' +
    '</div>\n' +
    '\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('starshipPartials');
} catch (e) {
  module = angular.module('starshipPartials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/partials/subluminal.html',
    '<h2>Sub-luminal Propulsion Systems\n' +
    '</h2>\n' +
    '<p class="explainer">\n' +
    '    A ship\'s power comes from its engines. Basic engines come integrated in a ship\'s hull type, and provide minimal power. Upgrading the engines is often a new captain\'s first project. The existing engines cannot be sold or exchanged; they have an effective value of zero. There are many types of starship propulsion and power systems. Listed below are some common civilian systems, from liquid fuel or fusion systems to more advanced antimatter or hyperdrive engines. Not all engines provide FTL capability; and FTL engines cannot be used at sub-luminal speeds. For this reason, a vessel may need more than one engine – perhaps a fusion reactor and a hyperdrive system. An engineer will need to balance ship class, space, power, FTL capability and fuel efficiency to obtain her desired outcome.</p>\n' +
    '<h3>Your Sub-luminal Engine</h3>\n' +
    '<table class="table table-striped">\n' +
    '    <thead>\n' +
    '    <tr>\n' +
    '        <th></th>\n' +
    '        <th>Count</th>\n' +
    '        <th>Sub-luminal Engine</th>\n' +
    '        <th>Cost</th>\n' +
    '        <th>Size</th>\n' +
    '        <th>CPU</th>\n' +
    '        <th>Space</th>\n' +
    '        <th>Power</th>\n' +
    '        <th>Fuel Eff</th>\n' +
    '    </tr>\n' +
    '    </thead>\n' +
    '    <tbody>\n' +
    '    <tr ng-repeat="(name, count) in ship[KEY]">\n' +
    '        <td><button type="button" class="btn btn-primary" ng-click="decrementItem(KEY, name)">-</button></td>\n' +
    '        <td ng-bind="count"></td>\n' +
    '        <td ng-bind="name"></td>\n' +
    '        <td>{{item[\'Sub-luminal Engine\']}}</td>\n' +
    '        <td>{{item.Cost}}</td>\n' +
    '        <td>{{item.Size}}</td>\n' +
    '        <td>{{item.CPU}}</td>\n' +
    '        <td>{{item.Space}}</td>\n' +
    '        <td>{{item.Power}}</td>\n' +
    '        <td>{{item[\'Fuel Eff\']}}</td>\n' +
    '    </tr>\n' +
    '    </tbody>\n' +
    '</table>\n' +
    '\n' +
    '<table class="table table-striped">\n' +
    '    <thead>\n' +
    '    <tr>\n' +
    '        <th></th>\n' +
    '        <th>Sub-luminal Engine</th>\n' +
    '        <th>Cost</th>\n' +
    '        <th>Size</th>\n' +
    '        <th>CPU</th>\n' +
    '        <th>Space</th>\n' +
    '        <th>Power</th>\n' +
    '        <th>Fuel Eff</th>\n' +
    '    </tr>\n' +
    '    </thead>\n' +
    '    <tbody>\n' +
    '    <tr ng-repeat="item in subluminal">\n' +
    '        <td><button type="button" class="btn btn-primary" ng-click="incrementOneItem(KEY, item[KEY])">+</button></td>\n' +
    '        <td>{{item[KEY]}}</td>\n' +
    '        <td>{{item.Cost}}</td>\n' +
    '        <td>{{item.Size}}</td>\n' +
    '        <td>{{item.CPU}}</td>\n' +
    '        <td>{{item.Space}}</td>\n' +
    '        <td>{{item.Power}}</td>\n' +
    '        <td>{{item[\'Fuel Eff\']}}</td>\n' +
    '    </tr>\n' +
    '    </tbody>\n' +
    '</table>');
}]);
})();

(function(module) {
try {
  module = angular.module('starshipPartials');
} catch (e) {
  module = angular.module('starshipPartials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/partials/superstructure.html',
    '<h2>Superstructure</h2>\n' +
    '<p class="explainer">\n' +
    '    A basic ship\'s SUPERSTRUCTURE is equal to three times its ship class. This typically isn\'t a lot, and many ships have additional superstructure added to the hull. Superstructure is cheaper and lighter than armor; but it does deplete, which armor does not tend to do.\n' +
    '    <br><br><b>Recommended amounts.</b> A ship should typically have around ten times its class in superstructure, and considerably more if it is designed as a combat vessel.  Less than this can make it very fragile. Weapons can do in the region of 3d6-6d6 damage (averaging 12-25 damage per shot), so a salvo can easily destroy a ship with too little superstructure.\n' +
    '</p>\n' +
    '<h3>Your Superstructure</h3>\n' +
    '<table class="table table-striped">\n' +
    '    <thead>\n' +
    '    <tr>\n' +
    '        <th></th>\n' +
    '        <th>Quantity</th>\n' +
    '        <th>Type</th>\n' +
    '        <th>Space</th>\n' +
    '        <th>Cost</th>\n' +
    '        <th>Notes</th>\n' +
    '    </tr>\n' +
    '    </thead>\n' +
    '    <tbody>\n' +
    '    <tr ng-repeat="(name, count) in ship[\'Superstructure\']">\n' +
    '        <td><button type="button" class="btn btn-primary" ng-click="decrementItem(KEY, name)">-</button></td>\n' +
    '        <td ng-bind="count"></td>\n' +
    '        <td ng-bind="name"></td>\n' +
    '        <td ng-bind="superstructureHash[name].Space"></td>\n' +
    '        <td ng-bind="superstructureHash[name].Cost"></td>\n' +
    '        <td ng-bind="superstructureHash[name].Notes"></td>\n' +
    '    </tr>\n' +
    '    <tr ng-if="isEmpty(KEY)">\n' +
    '        <td colspan="13" class="text-center">No additional superstructure selected.</td>\n' +
    '    </tr>\n' +
    '    </tbody>\n' +
    '</table>\n' +
    '\n' +
    '<table class="table table-striped">\n' +
    '    <thead>\n' +
    '    <tr>\n' +
    '        <th>Select</th>\n' +
    '        <th>Type</th>\n' +
    '        <th>Space</th>\n' +
    '        <th>Cost</th>\n' +
    '        <th>Notes</th>\n' +
    '    </tr>\n' +
    '    </thead>\n' +
    '    <tbody>\n' +
    '    <tr ng-repeat="p in superstructureOptions">\n' +
    '        <td><button type="button" class="btn btn-primary" ng-click="incrementItem(KEY, p[\'Type\'])">+</button></td>\n' +
    '        <td ng-bind="p.Type"></td>\n' +
    '        <td ng-bind="p.Space"></td>\n' +
    '        <td ng-bind="p.Cost"></td>\n' +
    '        <td ng-bind="p.Notes"></td>\n' +
    '    </tr>\n' +
    '    </tbody>\n' +
    '</table>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('starshipPartials');
} catch (e) {
  module = angular.module('starshipPartials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/partials/weaponry.html',
    '<h2>Weaponry</h2>\n' +
    '<p class="explainer">\n' +
    '    Weaponry is a vital part of starship design. From lasers, phasers, blasters, and disruptors to torpedoes, warheads, and railguns, the number of ways the basic idea of “fire something at your target to damage it” is immeasurable. This page can only hope to skim a few examples, but entire libraries would be needed to catalog all the weapons and their variations available. For that reason, this section is only a very basic overview of a few common weapon types.\n' +
    '</p>\n' +
    '<h3>Your Weaponry</h3>\n' +
    '<table class="table table-striped">\n' +
    '    <thead>\n' +
    '    <tr>\n' +
    '        <th></th>\n' +
    '        <th>Amount</th>\n' +
    '        <th>Weapon System</th>\n' +
    '        <th>Cost</th>\n' +
    '        <th>Size</th>\n' +
    '        <th>CPU</th>\n' +
    '        <th>Space</th>\n' +
    '        <th>Range</th>\n' +
    '        <th>Attack</th>\n' +
    '        <th>Damage</th>\n' +
    '    </tr>\n' +
    '    </thead>\n' +
    '    <tbody>\n' +
    '    <tr ng-repeat="(name, count) in ship[\'Weapon System\']">\n' +
    '        <td><button type="button" class="btn btn-primary" ng-click="decrementItem(KEY, name)">-</button></td>\n' +
    '        <td ng-bind="count"></td>\n' +
    '        <td ng-bind="name"></td>\n' +
    '        <td>{{weaponHash[name].Cost}}</td>\n' +
    '        <td>{{weaponHash[name].Size}}</td>\n' +
    '        <td>{{weaponHash[name].CPU}}</td>\n' +
    '        <td>{{weaponHash[name].Space}}</td>\n' +
    '        <td>{{weaponHash[name].Range}}</td>\n' +
    '        <td>{{weaponHash[name].Attack}}</td>\n' +
    '        <td>{{weaponHash[name].Damage}}</td>\n' +
    '    </tr>\n' +
    '    <tr ng-if="isEmpty(KEY)">\n' +
    '        <td colspan="10" class="text-center">No weaponry selected.</td>\n' +
    '    </tr>\n' +
    '    </tbody>\n' +
    '</table>\n' +
    '\n' +
    '<table class="table table-striped">\n' +
    '    <thead>\n' +
    '    <tr>\n' +
    '        <th></th>\n' +
    '        <th>Weapon System</th>\n' +
    '        <th>Cost</th>\n' +
    '        <th>Size</th>\n' +
    '        <th>CPU</th>\n' +
    '        <th>Space</th>\n' +
    '        <th>Range</th>\n' +
    '        <th>Attack</th>\n' +
    '        <th>Damage</th>\n' +
    '    </tr>\n' +
    '    </thead>\n' +
    '    <tbody>\n' +
    '    <tr ng-repeat="c in weapons">\n' +
    '        <td><button type="button" class="btn btn-primary" ng-click="incrementItem(KEY, c[\'Weapon System\'])">+</button></td>\n' +
    '        <td>{{c[\'Weapon System\']}}</td>\n' +
    '        <td>{{c.Cost}}</td>\n' +
    '        <td>{{c.Size}}</td>\n' +
    '        <td>{{c.CPU}}</td>\n' +
    '        <td>{{c.Space}}</td>\n' +
    '        <td>{{c.Range}}</td>\n' +
    '        <td>{{c.Attack}}</td>\n' +
    '        <td>{{c.Damage}}</td>\n' +
    '    </tr>\n' +
    '    </tbody>\n' +
    '</table>');
}]);
})();
