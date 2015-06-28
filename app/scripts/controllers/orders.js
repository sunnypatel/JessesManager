'use strict';

/**
* @ngdoc function
* @name jessesManager2App.controller:OrdersCtrl
* @description
* # OrdersCtrl
* Controller of the jessesManager2App
*/
angular.module('jessesManager2App')
.controller('OrdersCtrl', ['$scope', '$q', '$location', '$window', 'UserService', 'RestaurantService',
function ($scope, $q, $location, $window, UserService, RestaurantService) {
	console.log("asdfasdf");

	io.socket.on("order", function(event){
		console.log("erer");
		console.log(event);
	});
	io.socket.get("/order?id=1", function(resData, jwres) {console.log(resData);})

}
]);
