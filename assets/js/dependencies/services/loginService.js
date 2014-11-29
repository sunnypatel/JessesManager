(function() {
  var app = angular.module('LoginService', []);

  app.factory('LoginService', ['$http', function($http) {
    var devUrl = 'http://localhost:2730';
    var prodUrl = 'http://54.149.0.6:2730'
    var url = devUrl;
    var factory = {};

    factory.doLogin = function(user) {
      console.log("LoginService: doLogin = " + user);
      var uri = url + '/user/login';
      
      return $http({
        method: 'POST',
        url: uri,
        data: {
          phone: user.phone,
          password: user.password
        }
      });
    }

    return factory;
  }]);

})();
