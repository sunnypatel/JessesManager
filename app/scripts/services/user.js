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
  var devUrl = 'http://localhost:2730';
  var prodUrl = 'http://api.jesseme.com:2730';

  var url = devUrl;
  var factory = {};

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

  return factory;
}]);
