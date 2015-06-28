'use strict';

/**
* @ngdoc function
* @name jessesManager2App.controller:AboutCtrl
* @description
* # AboutCtrl
* Controller of the jessesManager2App
*/
angular.module('jessesManager2App')
.factory('OrdersService', ['$http', 'ConnectionsService', function($http, ConnectionsService) {
  var url = ConnectionsService.getUrl();
  var factory = {};

  factory.deleteOrder = function(orderId) {
      var uri = url + '/order/' + orderId
      return $http({
        method: 'DELETE',
        url: uri
      });
  }

  return factory;
}]);
