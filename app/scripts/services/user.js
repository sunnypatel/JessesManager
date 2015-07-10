'use strict';

/**
* @ngdoc function
* @name jessesManager2App.controller:AboutCtrl
* @description
* # AboutCtrl
* Controller of the jessesManager2App
*/
angular.module('jessesManager2App')
.factory('UserService', ['$http', 'ConnectionsService', function($http, ConnectionsService) {
  var url = ConnectionsService.getUrl();
  var factory = {};

  factory.user = {};
  factory.restaurants = {};

  factory.doLogin = function(user) {
    var uri = url + '/user/login';

    return $http({
      method: 'POST',
      url: uri,
      data: {
        phone: String(user.phone),
        password: user.password
      }
    });
  }

  factory.getUserByApiToken = function(apiToken) {
      var uri = url + '/user/apiToken';

      return $http({
          method: 'POST',
          url: uri,
          data: {
              apiToken: apiToken
          }
      });
  }

  return factory;
}]);
