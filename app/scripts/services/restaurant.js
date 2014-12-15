'use strict';

/**
* @ngdoc function
* @name jessesManager2App.controller:AboutCtrl
* @description
* # AboutCtrl
* Controller of the jessesManager2App
*/
angular.module('jessesManager2App')
.factory('RestaurantService', ['$http', '$window', function($http, $window) {
    var apiToken = $window.sessionStorage.apiToken;
    var dev = 'http://localhost:2730';
    var staging = 'http://178.18.16.226:2730';
    var prod = 'http://api.jesseme.com:2730';

    var url = dev;
    var factory = {};

    factory.getRestaurantsBy = function(user) {
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



    factory.save = function(restaurant) {
        var uri = url + '/restaurant/create';
        console.log(apiToken);
        console.log("RestaurantService apitoken=" + apiToken);
        console.log(restaurant);
        return $http({
            method: 'POST',
            url: uri,
            data: {
                name: restaurant.name,
                latitude: restaurant.latitude,
                longitude: restaurant.longitude,
                apiToken: apiToken
            }
        });
    }
    return factory;
}]);
