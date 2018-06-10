'use strict';

//var baseurl = "http://localhost/homeAutomation"; //LOCAL SERVER
//var baseurl = "http://192.168.43.130/homeAutomation"; //testing
var baseurl = "http://api.mygreenrank.com/homeAutomation"; // production 

// declare modules
angular.module('Authentication', []);
angular.module('Home', []);
angular.module('Account', []);
angular.module('Device', []);
angular.module('Settings', []);

angular.module('HomeAutomationApp', [
    'Authentication',
    'Home',
    'Account',
    'Device',
    'Settings',
    'ngRoute',
])
 
.config(['$routeProvider', function ($routeProvider) {

    $routeProvider
        .when('/login', {
            controller: 'LoginController',
            templateUrl: 'modules/authentication/views/login.html',
            hideMenus: true
        })
 
        .when('/', {
            controller: 'HomeController',
            templateUrl: 'modules/home/views/home.html'
        })

        .when('/account', {
            controller: 'AccountController',
            templateUrl: 'modules/account/views/account.html'
        })

        .when('/device', {
            controller: 'DeviceController',
            templateUrl: 'modules/device/views/device.html'
        })

        .when('/settings', {
            controller: 'SettingsController',
            templateUrl: 'modules/settings/views/settings.html'
        })
 
        .otherwise({ redirectTo: '/login' });
}])
 
.run(['$rootScope', '$location',  '$http',
    function ($rootScope, $location,   $http) {
        // keep user logged in after page refresh
        $rootScope.globals = JSON.parse( localStorage.getItem('globals') ) || {};
        $rootScope.baseURL = baseurl ;
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }
 
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in
            if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
                $location.path('/login');
            }
        });

        var history = [];

        $rootScope.$on('$routeChangeSuccess', function() {
            history.push($location.$$path);
        });

        $rootScope.back = function () {
            var prevUrl = history.length > 1 ? history.splice(-2)[0] : "/";
            $location.path(prevUrl);
        };

    }]);