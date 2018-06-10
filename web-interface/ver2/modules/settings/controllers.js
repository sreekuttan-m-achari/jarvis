'use strict';
 
angular.module('Settings')
 
.controller('SettingsController',
    ['$scope',
    function ($scope) {

    	var menuBar = angular.element(document.querySelector('.menuBar'));
        menuBar.show() ;
      
    }]);