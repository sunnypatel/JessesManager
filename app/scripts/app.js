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
    'ui.router'
  ])
  .config(function ($routeProvider, $stateProvider, $urlRouterProvider) {
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

});
