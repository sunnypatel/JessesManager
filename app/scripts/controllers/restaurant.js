'use strict';

/**
* @ngdoc function
* @name jessesManager2App.controller:AboutCtrl
* @description
* # AboutCtrl
* Controller of the jessesManager2App
*/
angular.module('jessesManager2App')
.controller('RestaurantCtrl', [
    '$scope',
    '$q',
    '$location',
    '$window',
    'UserService',
    'RestaurantService',
    'uiGmapGoogleMapApi',
    'uiGmapLogger',
    function ($scope, $q, $location, $window, UserService, RestaurantService, uiGmapGoogleMapApi, uiGmapLogger) {
        $scope.createNewOn = false;
        uiGmapLogger.doLog = true;
        $q.all({
            user: UserService.getUserByApiToken($window.sessionStorage.apiToken),
            login: UserService.doLogin({"phone": "2154590332", "password": "password"})
        })
        .then(function(response){
            UserService.user = response.user.data;
            $scope.restaurants = UserService.user.ownsRestaurants;
        })
        .catch(function(err) {
            if (err.status == 400) {
                console.log(err);
            } else if(err.status == 401) {
                console.log(err);
            } else {
                console.log('Unknown error');
                console.log(err);
            }
        });
        $scope.save = function(restaurant) {
            RestaurantService.save(restaurant)
            .then(function(saved){
                console.log("Saved new restaurant");
                $scope.newRestaurant = {};
            })
            .catch(function(err){
                console.log("Error saving new restaurant");
            });
        }

        $scope.saveNewRestaurant = function(newRestaurant) {
            console.log("saving new restaurant");
        }

        $scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8, lat:23, long:25};
        $scope.shown = false;

        $('#newRestaurantModal').on('show.bs.modal', function (e) {
            $scope.shown = true;
        });
    }
]);
