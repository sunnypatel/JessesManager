(function() {
  var app = angular.module('login', ['LoginService']);

  app.controller('LoginController', function($scope, LoginService, $q){
    this.user = {};

    this.doLogin = function(user) {
      console.log(user);
      // call service to do login action

      $q.all({
        login: LoginService.doLogin(user)
      }).then(function(response) {
        console.log('got response');
        var loginData = response.login.data;
        $scope.apiToken = loginData.apiToken;
        console.log('Token = ' + $scope.apiToken);
      })
      .catch(function (err) {
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
    };
  });

  /*app.factory('LoginService', ['$http', function($http) {
    var devUrl = 'http://localhost:2730';
    var prodUrl = 'http://54.149.0.6:2730'
    var url = devUrl;
    var factory = {};

    factory.doLogin = function(user) {
      console.log("in dologin");
      var uri = url + '/user/login';
      var req = {
        method: 'POST',
        url: uri,
        data: {
          phone: user.phone,
          password: user.password
        }
      }

      $http(req).success(function() {
        // successful
      })
      .error(function() {
        // on error
      });
    }

    return factory;
  }]);*/

})();
