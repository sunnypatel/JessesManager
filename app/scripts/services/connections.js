'use strict';

/**
* @ngdoc function
* @name jessesManager2App.controller:AboutCtrl
* @description
* # AboutCtrl
* Controller of the jessesManager2App
*/
angular.module('jessesManager2App')
.factory('ConnectionsService', ['$http', '$window', function($http, $window) {
    var apiToken = $window.sessionStorage.apiToken;
    var dev = 'http://localhost:2730';
    var staging = 'http://stagingjesseme.ddns.net:4830';
    var prod = 'http://restaurantapi.jesseme.com';

    var url = staging;
    var factory = {};

    factory.getUrl = function() {
        return url;
    }
    return factory;
}]);
