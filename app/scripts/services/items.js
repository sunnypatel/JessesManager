'use strict';

/**
* @ngdoc function
* @name jessesManager2App.controller:AboutCtrl
* @description
* # AboutCtrl
* Controller of the jessesManager2App
*/
angular.module('jessesManager2App')
.factory('ItemsService', ['$http', 'ConnectionsService', function($http, ConnectionsService) {
  var url = ConnectionsService.getUrl();
  var factory = {};

  factory.getItemsByRestaurant = function(restaurant) {

  }

  return factory;
}]);
