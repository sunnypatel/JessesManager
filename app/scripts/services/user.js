'use strict';

/**
* @ngdoc function
* @name jessesManager2App.controller:AboutCtrl
* @description
* # AboutCtrl
* Controller of the jessesManager2App
*/
angular.module('jessesManager2App')
.factory('UserService', ['$http', function($http) {
  var dev = 'http://localhost:2730';
  var staging = 'http://178.18.16.226:2730';
  var prod = 'http://restaurantapi.jesseme.com';

  var url = prod;
  var factory = {};

  factory.user = {};
  factory.restaurants = {};

  factory.doLogin = function(user) {
    var uri = url + '/user/login';

    return $http({
      method: 'POST',
      url: uri,
      data: {
        phone: user.phone,
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
