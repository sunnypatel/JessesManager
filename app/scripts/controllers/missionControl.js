'use strict';

/**
* @ngdoc function
* @name jessesManager2App.controller:AboutCtrl
* @description
* # AboutCtrl
* Controller of the jessesManager2App
*/
angular.module('jessesManager2App')
.controller('MissionControlCtrl', ['$scope', '$q', '$location',
function ($scope, $q, $location, UserService) {
  this.user = {};
  $scope.test = "asdf";
  $scope.links = [
        {
            name: 'Vitals',
            state: 'missionControl.vitals'
        },
        {
            name: 'Restaurants',
            state: 'missionControl.restaurants'
        },
        {
            name: 'Items',
            state: 'missionControl.items'
        }
    ];
}]);
