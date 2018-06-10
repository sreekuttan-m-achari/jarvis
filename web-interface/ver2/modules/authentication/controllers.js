'use strict';
 
angular.module('Authentication')
 
.controller('LoginController',
    ['$scope', '$rootScope', '$location', 'AuthenticationService',
    function ($scope, $rootScope, $location, AuthenticationService) {

        $scope.username = 'user@maximprof.com' ;
        $scope.password = 'password' ;

        var  menuBar = angular.element(document.querySelector('.menuBar'));
        menuBar.hide() ;
        // reset login response
        AuthenticationService.ClearCredentials();
 
        $scope.login = function () {
            $scope.dataLoading = true;
            AuthenticationService.Login($scope.username, $scope.password, function(APICALL) {
                if(APICALL.response) {
                    AuthenticationService.SetCredentials($scope.username, $scope.password);
                    $location.path('/');
                } else {
                    $scope.error = APICALL.message;
                    $scope.dataLoading = false;
                }
            });
        };
    }]);