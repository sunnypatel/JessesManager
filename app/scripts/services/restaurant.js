'use strict';

/**
* @ngdoc function
* @name jessesManager2App.controller:AboutCtrl
* @description
* # AboutCtrl
* Controller of the jessesManager2App
*/
angular.module('jessesManager2App')
.factory('RestaurantService', ['$http', '$window', 'ConnectionsService', function($http, $window, ConnectionsService) {
    var apiToken = $window.sessionStorage.apiToken;
    var factory = {};
    var url = ConnectionsService.getUrl();
    
    factory.getUrl = function() {
        return url;
    }
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
    factory.uploadItemImage = function(file, itemId) {

        var uri = url + '/item/imageUpload';
        var data = {
          itemId: itemId,
          image: file
        };
        return $http({
            method: 'POST',
            headers : {
              'Content-Type': 'multipart/form-data'
            },
            url: uri,
            data: data
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
