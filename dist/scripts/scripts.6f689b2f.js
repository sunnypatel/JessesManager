"use strict";angular.module("jessesManager2App",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","ui.router","ngTagsInput","uiGmapgoogle-maps"]).config(["$routeProvider","$stateProvider","$urlRouterProvider","uiGmapGoogleMapApiProvider",function(a,b,c,d){c.otherwise("/login"),b.state("login",{url:"/login",templateUrl:"/views/login.html",controller:"LoginCtrl"}).state("missionControl",{url:"/missionControl",templateUrl:"/views/mc.html",controller:"MissionControlCtrl"}).state("missionControl.restaurants",{url:"/restaurants",templateUrl:"/views/restaurants.html",controller:"RestaurantCtrl"}).state("missionControl.items",{url:"/items",templateUrl:"/views/items.html",controller:"ItemCtrl"}),d.configure({key:"AIzaSyDXIVV5zLW1cQNCkqgSzH_zUreskJ0SfYk",v:"3.17",libraries:"weather,geometry,visualization,places"})}]),angular.module("jessesManager2App").controller("MainCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("jessesManager2App").controller("LoginCtrl",["$scope","$q","$location","UserService","$window",function(a,b,c,d,e){this.user={},this.doLogin=function(a){b.all({login:d.doLogin(a)}).then(function(a){var b=a.login.data;e.sessionStorage.setItem("apiToken",b.apiToken),c.path("/missionControl")}).catch(function(a){console.log(400==a.status?"User not found":404==a.status?"Invalid password":"Unknown error")})}}]),angular.module("jessesManager2App").controller("AboutCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("jessesManager2App").controller("MissionControlCtrl",["$scope","$q","$location","UserService","$window",function(a,b,c,d,e){b.all({user:d.getUserByApiToken(e.sessionStorage.apiToken),login:d.doLogin({phone:"2154590332",password:"password"})}).then(function(b){d.user=b.user.data,a.user=d.user,"admin"==a.user.role}).catch(function(a){400==a.status?console.log(a):401==a.status?console.log(a):(console.log("Unknown error"),console.log(a))}),a.links=[{name:"Vitals",state:"missionControl.vitals",glyphicon:"glyphicon glyphicon-stats"},{name:"Restaurants",state:"missionControl.restaurants",glyphicon:"glyphicon glyphicon-list"},{name:"Items",state:"missionControl.items",glyphicon:"glyphicon glyphicon-th"}]}]),angular.module("jessesManager2App").factory("UserService",["$http",function(a){var b="http://localhost:2730",c=b,d={};return d.user={},d.restaurants={},d.doLogin=function(b){var d=c+"/user/login";return a({method:"POST",url:d,data:{phone:b.phone,password:b.password}})},d.getUserByApiToken=function(b){var d=c+"/user/apiToken";return a({method:"POST",url:d,data:{apiToken:b}})},d}]),angular.module("jessesManager2App").factory("RestaurantService",["$http","$window",function(a,b){var c=b.sessionStorage.apiToken,d="http://localhost:2730",e=d,f={};return f.getRestaurantsBy=function(b){var c=e+"/user/login";return a({method:"POST",url:c,data:{phone:b.phone,password:b.password}})},f.createRestaurant=function(b){var d=e+"/restaurant/create";return b.apiToken=c,a({method:"POST",url:d,data:b})},f.destroy=function(b){var c=e+"/restaurant/destroy/"+b;return a({method:"GET",url:c})},f.getItemsByRestaurant=function(b){var c=e+"/item?restaurantId="+b;return a({method:"GET",url:c})},f.addItem=function(b){var c=e+"/item";return a({method:"POST",url:c,data:b})},f.removeItem=function(b){var c=e+"/item/destroy/"+b.id;return a({method:"GET",url:c,data:b})},f}]),angular.module("jessesManager2App").controller("RestaurantCtrl",["$scope","$q","$location","$window","UserService","RestaurantService","uiGmapGoogleMapApi",function(a,b,c,d,e,f,g){a.refreshRestaurants=function(){b.all({user:e.getUserByApiToken(d.sessionStorage.apiToken)}).then(function(b){e.user=b.user.data,a.restaurants=e.user.ownsRestaurants}).catch(function(a){400==a.status?console.log(a):401==a.status?console.log(a):(console.log("Unknown error"),console.log(a))})},a.saveNewRestaurant=function(b){f.createRestaurant(b).then(function(){a.refreshRestaurants()}).catch(function(){console.log("Error creating new restaurant")})},a.delete=function(b){f.destroy(b.id).then(function(){a.refreshRestaurants()})},a.edit=function(){alert("this functionality doesnt exist yet!")},a.refreshRestaurants(),a.shown=!1,a.newRestaurant={},g.then(function(){a.map={center:{latitude:40.1451,longitude:-99.668},zoom:18},a.options={mapMaker:!0},a.marker={id:1};var b=new google.maps.places.Autocomplete(document.getElementById("autocomplete"),{types:[]});b.bindTo("bound",a.map),google.maps.event.addListener(b,"place_changed",function(){var c=b.getPlace();console.log(c),a.restaurant.name=c.name,5==c.address_components.length?(a.restaurant.street=c.address_components[0].long_name,a.restaurant.city=c.address_components[1].long_name,a.restaurant.state=c.address_components[2].short_name,a.restaurant.country=c.address_components[3].short_name,a.restaurant.zipcode=c.address_components[4].long_name):(a.restaurant.street=c.address_components[0].long_name+" "+c.address_components[1].long_name,a.restaurant.city=c.address_components[2].long_name,a.restaurant.state=c.address_components[3].short_name,a.restaurant.country=c.address_components[4].short_name,a.restaurant.zipcode=c.address_components[5].long_name),a.restaurant.fullAddress=c.formatted_address,a.restaurant.phone=c.international_phone_number,a.restaurant.latitude=c.geometry.location.k,a.restaurant.longitude=c.geometry.location.C;var d={latitude:a.restaurant.latitude,longitude:a.restaurant.longitude};a.map.refresh(d),a.marker.coords=d})})}]),angular.module("jessesManager2App").controller("ItemCtrl",["$scope","$q","$location","$window","UserService","RestaurantService",function(a,b,c,d,e,f){b.all({user:e.getUserByApiToken(d.sessionStorage.apiToken)}).then(function(b){e.user=b.user.data,a.restaurants=e.user.ownsRestaurants,a.selectedRestaurantId=a.restaurants[0].id||d.sessionStorage.selectedRestaurant,a.selectedRestaurant=g(a.selectedRestaurantId,a.restaurants),a.refreshItems(a.selectedRestaurantId)}).catch(function(a){400==a.status?console.log(a):401==a.status?console.log(a):(console.log("Unknown error"),console.log(a))}),a.refreshItems=function(){f.getItemsByRestaurant(a.selectedRestaurantId).then(function(b){a.items=b.data})},a.changeSelRestaurant=function(b){d.sessionStorage.setItem("selectedRestaurant",b.id),a.selectedRestaurant=b,f.getItemsByRestaurant(b.id).then(function(b){console.log(b),a.items=b.data})},a.addItem=function(b){console.log(b),b.restaurantId=a.selectedRestaurant.id,b.apiToken=d.sessionStorage.apiToken,f.addItem(b).then(function(b){console.log(b),$("#newItemModal").modal("hide"),a.refreshItems(a.selectedRestaurant.id)})},a.removeItem=function(b){b.apiToken=d.sessionStorage.apiToken,f.removeItem(b).then(function(){console.log("Removed item"),a.refreshItems(a.selectedRestaurant.id)})};var g=function(a,b){for(var c=0;c<b.length;c++)if(b[c].id==a)return b[c];return null}}]);