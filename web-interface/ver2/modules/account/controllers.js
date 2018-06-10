'use strict';
 
angular.module('Account')
 
.controller('AccountController',
    ['$scope',
    function ($scope) {

    	var menuBar = angular.element(document.querySelector('.menuBar'));
        menuBar.show() ;
      
    }]);