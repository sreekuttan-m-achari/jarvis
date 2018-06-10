'use strict';
 
angular.module('Device')
 
.factory('DeviceService',
    ['Base64', '$http', '$rootScope', '$timeout',
    function ($http, $rootScope, $timeout) {
        var service = {};
        //var baseurl = 'http://52.34.85.226/homeAutomation' ;

        //var baseurl = AppConfigService.getBaseUrl() ;

        var baseurl = $rootScope.baseURL ;

        service.ListDevices = function (user_id) {

            $http.post(baseurl+'/api/devices.php?type=list', { user_id: user_id })
               .success(function (response) {
                   callback(response);
               });

        };
 
        return service;
    }]) ;