'use strict';

/**
* @ngdoc function
* @name jessesManager2App.controller:OrdersCtrl
* @description
* # OrdersCtrl
* Controller of the jessesManager2App
*/
angular.module('jessesManager2App')
.controller('OrdersCtrl', ['$scope', '$q', '$location', '$window', 'UserService', 'RestaurantService', 'OrdersService',
function ($scope, $q, $location, $window, UserService, RestaurantService, OrdersService) {
	$scope.orders = [];
	io.socket.on("order", function(event){
		console.log("in on");
		console.log(event);
		if (event.verb == 'created') {
			console.log("in created");
			console.log($scope.orders);
			$scope.orders.push(event.data);
			console.log($scope.orders);
			$scope.$apply();
		}
	});
	io.socket.get("/order", function(resData, jwres) {
		console.log("in get");
		console.log(resData);
		$scope.orders = resData;
	})

	$q.all({
		user: UserService.getUserByApiToken($window.sessionStorage.apiToken)
	})
	.then(function(response){
		UserService.user = response.user.data;
		$scope.restaurants = UserService.user.ownsRestaurants;
		$scope.selectedRestaurantId = $window.sessionStorage.selectedRestaurant || $scope.restaurants[0].id;
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
	$scope.deleteOrder = function(orderId){
		$scope.orders = $scope.orders.filter(function(order){
			return order.id !== orderId;
		});

		OrdersService.deleteOrder(orderId)
		.then(function(results){
			console.log("Deleted:");
			console.log(results);
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
