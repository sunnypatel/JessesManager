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
    var prod = 'http://restaurantapi.jesseme.com';

    var url = staging;
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
    factory.createRestaurant = function(restaurant) {
        var uri = url + '/restaurant/create';
        restaurant.apiToken = apiToken;
        return $http({
            method: 'POST',
            url: uri,
            data: restaurant
        });
    }
    factory.destroy = function(id) {
        var uri = url + "/restaurant/destroy/" + id;
        return $http({
            method: 'GET',
            url: uri
        });
    }
    factory.getItemsByRestaurant = function(restaurantId) {
        var uri = url + '/item?restaurantId=' + restaurantId;
        return $http({
            method: 'GET',
            url: uri
        });
    }
    factory.addItem = function(newItem) {
        var uri = url + '/item';
        return $http({
            method: 'POST',
            url: uri,
            data: newItem
        });
    }
    factory.removeItem = function(item) {
        var uri = url + '/item/destroy/' + item.id;
        return $http({
            method: 'GET',
            url: uri,
            data: item
        });
    }
    return factory;
}]);
