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
    function ($scope, $q, $location, $window, UserService, RestaurantService, uiGmapGoogleMapApi) {
        $scope.createNewOn = false;

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

        $scope.shown = false;
        $scope.newRestaurant = {};
        uiGmapGoogleMapApi.then(function(maps) {

            $scope.map = {center: {latitude: 40.1451, longitude: -99.6680 }, zoom: 18 };
            $scope.options = {
                mapMaker: true,
            };

            $scope.marker = {
                id:1
            };

            var autocomplete = new google.maps.places.Autocomplete( document.getElementById('autocomplete'), { types: [] });
            autocomplete.bindTo('bound', $scope.map);
            google.maps.event.addListener(autocomplete, 'place_changed', function() {

                var place = autocomplete.getPlace();
                console.log(place);
                $scope.newRestaurant.phone = place.formatted_phone_number;
                $scope.newRestaurant.address = place.formatted_address;
                var longi = place.geometry.location.C;
                var lat = place.geometry.location.k;
                $scope.map.center.latitude = lat;
                $scope.map.center.longitude = longi;
                $scope.map.refresh({latitude: lat, longitude: longi});
                $scope.marker.coords = {latitude: lat, longitude: longi};

            });
        });


    }
]);
