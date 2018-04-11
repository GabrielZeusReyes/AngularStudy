//Module created!
//ngRoute is from the angular-route.min.js
//ngAnimate is from the angular-animate.min.js
var myNinjaApp = angular.module('myNinjaApp', ['ngRoute', 'ngAnimate']);

//just a function before the application runs
//$routeProvider comes from the 'ngRoute' dependency above
myNinjaApp.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider){
	//pretty links #!, then go to the index.html and add <base href="/">
	// $locationProvider.html5Mode(true);

	$routeProvider
		// when someone visits /home url
		.when('/home', {
			templateUrl: 'views/home.html',
			controller: 'NinjaController'
		})
		.when('/directory', {
			templateUrl: 'views/directory.html',
			//tell angular that in the directory view, use this controller
			controller: 'NinjaController'
		})
		.when('/contact', {
			templateUrl: 'views/contact.html',
			//tell angular that in the contact view, use this controller
			controller: 'ContactController'
		})
		.when('/contact-success', {
			templateUrl: 'views/contact-success.html',
			//tell angular that in the contact view, use this controller
			controller: 'ContactController'
		})
		.otherwise({
			redirectTo: '/home'
		});
}]);

//just a function that runs when the application runs
myNinjaApp.run(function (){

});

// custom directive
//on html, it is random-ninja
//in js, it is randomNinja
myNinjaApp.directive('randomNinja',[function (){
	return {
		// E - Element
		// A - Attribute
		// EA - both
		restrict: 'E',
		scope: {
			// binding
			ninjas: '=',
			title: '='
		},
		// output
		// template: '<img ng-src="{{ninjas[random].thumb}}">',
		templateUrl: 'views/random.html',
		//tells Angular not to delete all the elements inside the custom directives
		transclude: true,
		//replaces the name of the custom directive so that it can be standards compliant in inspect element
		replace: true,
		controller: function ($scope){
			// random number from 0 to 3
			$scope.random = Math.floor(Math.random() * 4);
		}
	}
}]);

//Controller created!
//take note of the scope
//dependency --> protect the variable name
//dependency is the '$scope'
//$http is to get the external json file so that there's an object
myNinjaApp.controller('NinjaController',['$scope', '$http', function ($scope, $http){
	$scope.removeNinja = function(ninja){
		var removeNinja = $scope.ninjas.indexOf(ninja);
		// a javascript method
		$scope.ninjas.splice(removeNinja, 1)
	};

	$scope.addNinja = function (){
		//javascript push method
		$scope.ninjas.push({
			name: $scope.newninja.name,
			belt: $scope.newninja.belt,
			rate: parseInt($scope.newninja.rate),
			available: true
		});
		//just to clear after submitting
		$scope.newninja.name = "";
		$scope.newninja.belt = "";
		$scope.newninja.rate = "";
	};

	$scope.message = "Hey y'all";

	$scope.removeAll = function (){
		//clear all ninjas!
		$scope.ninjas = [];
	};

	//get the json file
	// $http.get('/data/ninjas.json').success(function (data){
	// 	$scope.ninjas = data;
	// });
	$http.get('data/ninjas.json').then(function(response){
      $scope.ninjas = response.data;
	});

	// $scope.ninjas = [
	// 	{
	// 		name: "Yoshi",
	// 		belt: "Green",
	// 		rate: 50,
	// 		available: true,
	// 		thumb: 'http://via.placeholder.com/30x30'
	// 	},
	// 	{
	// 		name: "Crystal",
	// 		belt: "Orange",
	// 		rate: 30,
	// 		available: true,
	// 		thumb: 'http://via.placeholder.com/30x30'
	// 	},
	// 	{
	// 		name: "Ryu",
	// 		belt: "Orange",
	// 		rate: 10,
	// 		available: false,
	// 		thumb: 'http://via.placeholder.com/30x30'
	// 	},
	// 	{
	// 		name: "Shaun",
	// 		belt: "Black",
	// 		rate: 1000,
	// 		available: true,
	// 		thumb: 'http://via.placeholder.com/30x30'
	// 	}
	// ];
	// //convert the javascript object to json
	// // for checking json https://jsonlint.com/
	// console.log(angular.toJson($scope.ninjas));
}]);

//Controller for Contact submit button
//take note of $location for Location service
myNinjaApp.controller('ContactController', ['$scope', '$location', function ($scope, $location){
	$scope.sendMessage = function (){
		//redirect
		$location.path('/contact-success')
	};
}]);