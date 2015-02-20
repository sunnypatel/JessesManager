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
	io.socket.on("item", function(event){
		console.log("erer");
		console.log(event);
	});
	io.socket.get("/item", function(resData, jwres) {console.log(resData);})

}
]);
