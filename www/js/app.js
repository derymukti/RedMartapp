// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic','ui.router']);

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})


app.config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'home.html',
                controller: 'HomeController'
            })
            .state('product', {
                url: '/product/:prodID',
                templateUrl: 'product.html',
                controller: 'ProductController'
            });


        $urlRouterProvider.otherwise('/home');
    });

app.controller("HomeController", function($scope, $http) {

    $scope.matrixList = function(data, n) {
        var grid = [], i = 0, x = data.length, col, row = -1;
        for (var i = 0; i < x; i++) {
            col = i % n;
            if (col === 0) {
                grid[++row] = [];
            }
            grid[row][col] = data[i];
        }
        return grid;
    };

    $scope.NavTitle = "RedMart";

    $http({method: 'GET', url: 'https://api.redmart.com/v1.6.0/catalog/search?page=0&pageSize=18'}).success(function(data) {
      $scope.products = $scope.matrixList(data.products, 3); // response data 
    })

    
    

});
app.controller("ProductController",function($scope, $http, $stateParams){
    prod_id = $stateParams.prodID;
    $http({method: 'GET', url: 'https://api.redmart.com/v1.6.0/products/'+prod_id}).success(function(data) {
      $scope.item = data.product; // response data 
      
      $scope.NavTitle = $scope.item.title;
    })
    
    

});
