'use strict';

/**
* @ngdoc function
* @name jessesManager2App.controller:AboutCtrl
* @description
* # AboutCtrl
* Controller of the jessesManager2App
*/
angular.module('jessesManager2App')
.controller('ItemCtrl', ['$scope', '$q', '$location', '$window', 'UserService', 'RestaurantService',
function ($scope, $q, $location, $window, UserService, RestaurantService) {

    $q.all({
        user: UserService.getUserByApiToken($window.sessionStorage.apiToken)
    })
    .then(function(response){
        UserService.user = response.user.data;
        $scope.restaurants = UserService.user.ownsRestaurants;
        $scope.selectedRestaurantId = $scope.restaurants[0].id || $window.sessionStorage.selectedRestaurant;
        $scope.selectedRestaurant = findById($scope.selectedRestaurantId, $scope.restaurants);
        $scope.refreshItems($scope.selectedRestaurantId);
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
    $scope.refreshItems = function(restaurantId) {
        RestaurantService.getItemsByRestaurant(restaurantId)
        .then(function(resultItems){
            $scope.items = resultItems.data;
        });
    }
    $scope.changeSelRestaurant = function(restaurant) {
        $window.sessionStorage.setItem('selectedRestaurant', restaurant.id);
        $scope.selectedRestaurant = restaurant;
        $scope.selectedRestaurantId = restaurant.id;
        RestaurantService.getItemsByRestaurant(restaurant.id)
        .then(function(resultItems){
            console.log(resultItems);
            $scope.items = resultItems.data;
        });
    }

    $scope.addItem = function(newItem) {
        console.log(newItem);
        newItem.restaurantId = $scope.selectedRestaurant.id;
        newItem.apiToken = $window.sessionStorage.apiToken;
        RestaurantService.addItem(newItem)
        .then(function(results){
            console.log(results);
            $('#newItemModal').modal('hide');
            $scope.refreshItems($scope.selectedRestaurant.id);
        });
    }
    $scope.removeItem = function(item) {
        item.apiToken = $window.sessionStorage.apiToken;
        RestaurantService.removeItem(item)
        .then(function(results){
            console.log('Removed item');
            $scope.refreshItems($scope.selectedRestaurant.id);
        });
    }

    var findById = function(index, collection) {
        for (var i=0 ; i < collection.length ; i++)
        {
            if (collection[i].id == index) {
                return collection[i];
            }
        }
        return null;
    }
}
]);
