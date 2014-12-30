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
    //    $scope.createNewOn = false;

        $scope.refreshRestaurants = function() {
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
        }
        $scope.saveNewRestaurant = function(newRestaurant) {
            RestaurantService.createRestaurant(newRestaurant)
            .then(function(){
                $scope.refreshRestaurants();
            })
            .catch(function(err){
                console.log("Error creating new restaurant");
            })
        }
        $scope.delete = function(restaurant) {
            RestaurantService.destroy(restaurant.id)
            .then(function(){
                $scope.refreshRestaurants();
            })

        }
        $scope.edit = function(restaurant) {
            alert('this functionality doesnt exist yet!');
        }
        $scope.refreshRestaurants();
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

                $scope.restaurant.name = place.name;
                $scope.restaurant.street = place.address_components[1].long_name;
                $scope.restaurant.city = place.address_components[2].long_name;
                $scope.restaurant.state = place.address_components[3].short_name;
                $scope.restaurant.country = place.address_components[4].short_name;
                $scope.restaurant.zipcode = place.address_components[5].long_name;
                $scope.restaurant.fullAddress = place.formatted_address;
                $scope.restaurant.phone = place.international_phone_number;
                $scope.restaurant.latitude = place.geometry.location.k;
                $scope.restaurant.longitude = place.geometry.location.C;

                var geolocation = {
                    latitude: $scope.restaurant.latitude,
                    longitude: $scope.restaurant.longitude
                };

                $scope.map.refresh(geolocation);
                $scope.marker.coords = geolocation;
            });
        });


    }
]);
