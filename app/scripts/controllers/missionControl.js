'use strict';

/**
* @ngdoc function
* @name jessesManager2App.controller:AboutCtrl
* @description
* # AboutCtrl
* Controller of the jessesManager2App
*/
angular.module('jessesManager2App')
.controller('MissionControlCtrl', ['$scope', '$q', '$location', 'UserService', '$window',
function ($scope, $q, $location, UserService, $window) {
    $q.all({
        user: UserService.getUserByApiToken($window.sessionStorage.apiToken),
        login: UserService.doLogin({"phone": "2154590332", "password": "password"})
    })
    .then(function(response){
        UserService.user = response.user.data;
        $scope.user = UserService.user;

        if ($scope.user.role == 'admin') {
            // Special Rules for Admin

        }

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
    $scope.links = [
        {
            name: 'Vitals',
            state: 'missionControl.vitals',
            glyphicon: 'glyphicon glyphicon-stats'
        },
        {
            name: 'Restaurants',
            state: 'missionControl.restaurants',
            glyphicon: 'glyphicon glyphicon-list'
        },
        {
            name: 'Items',
            state: 'missionControl.items',
            glyphicon: 'glyphicon glyphicon-th'
        }
    ];
}]);
