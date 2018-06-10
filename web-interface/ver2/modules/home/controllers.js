'use strict';
 
angular.module('Home')
 
.controller('HomeController',
    
    ['$scope', '$rootScope', '$location' ,'$http' ,
    function ($scope, $rootScope, $location, $http) {

		if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
                $location.path('/login');
            }

    	var menuBar = angular.element(document.querySelector('.menuBar'));
        menuBar.show() ;
      
    }]);


