'use strict';

/**
* @ngdoc function
* @name jessesManager2App.controller:AboutCtrl
* @description
* # AboutCtrl
* Controller of the jessesManager2App
*/
angular.module('jessesManager2App')
.controller('LoginCtrl', ['$scope', '$q', '$location', 'UserService', '$window',
function ($scope, $q, $location, UserService, $window) {
  this.user = {};
  this.doLogin = function(user) {

    $q.all({
      login: UserService.doLogin(user)
    })
    .then(function(response){
      var loginData = response.login.data;
      $window.sessionStorage.setItem('apiToken', loginData.apiToken);
      $location.path('/missionControl');
    })
    .catch(function(err) {
        if (err.status == 400) {
          console.log('User not found');
          // user not found
        } else if(err.status == 404) {
          console.log('Invalid password');
          // invalid password
        } else {
          console.log('Unknown error');
          // unknown response
        }
    });

  }

}]);
