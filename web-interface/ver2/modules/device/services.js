'use strict';
 
angular.module('Device')
 
.factory('DeviceService',
    [ '$http', '$rootScope', '$timeout',
    function ($http, $rootScope, $timeout) {
        var service = {};
        //var baseurl = 'http://52.34.85.226/homeAutomation' ;

        //var baseurl = AppConfigService.getBaseUrl() ;

        var baseurl = $rootScope.baseURL ;

        service.ListDevices = function (user_id ,callback ) {

            $http.post(baseurl+'/api/device/list', { user_id: user_id })
               .success(function (response) {
                   callback(response);
               });

        };

        service.SwitchDevice = function (user_id , device_id, status ,callback ) {

            $http.post(baseurl+'/api/device/switch', { user_id: user_id , device_id : device_id , status : status })
               .success(function (response) {
                   callback(response);
               });

        };
 
        return service;
    }]) ;