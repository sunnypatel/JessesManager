'use strict';

/**
 * @ngdoc overview
 * @name jessesManager2App
 * @description
 * # jessesManager2App
 *
 * Main module of the application.
 */
angular
  .module('jessesManager2App', [
	'ngAnimate',
	'ngCookies',
	'ngResource',
	'ngRoute',
	'ngSanitize',
	'ngTouch',
	'ui.router',
	'ngTagsInput',
	'uiGmapgoogle-maps'
  ])
  .config(function ($routeProvider, $stateProvider, $urlRouterProvider, uiGmapGoogleMapApiProvider) {
	$urlRouterProvider.otherwise('/login');

	$stateProvider
	.state('login', {
		url: '/login',
		templateUrl: '/views/login.html',
		controller: 'LoginCtrl'
	})
	.state('missionControl', {
		url: '/missionControl',
		templateUrl: '/views/mc.html',
		controller: 'MissionControlCtrl'
	})
	.state('missionControl.orders', {
		url: '/orders',
		templateUrl: '/views/orders.html',
		controller: 'OrdersCtrl'
	})
	.state('missionControl.restaurants', {
		url: '/restaurants',
		templateUrl: '/views/restaurants.html',
		controller: 'RestaurantCtrl'
	})
	.state('missionControl.items', {
		url: '/items',
		templateUrl: '/views/items.html',
		controller: 'ItemCtrl'
	});

	uiGmapGoogleMapApiProvider.configure({
		key: 'AIzaSyBeGxejqsFtYezedrrV21WWIc1b_EivI7E',
		v: '3.17',
		libraries: 'weather,geometry,visualization,places'
	});
});
