'use strict';
 
angular.module('Device')
 
.controller('DeviceController',
    ['$scope', '$rootScope', '$location', 'DeviceService',
    function ($scope, $rootScope, $location, DeviceService) {

    	var menuBar = angular.element(document.querySelector('.menuBar'));
        menuBar.show() ;

        var loaderDiv = angular.element(document.querySelector('#loaderDiv'));
        var contentDiv = angular.element(document.querySelector('.deviceList'));
        var notFoundMsg = angular.element(document.querySelector('.notFoundMsg'));

        DeviceService.ListDevices(1 , 
        	function(APICALL) {
                if(APICALL.status) {
                    console.log("DATA :"+ JSON.stringify( APICALL.response ) );

                    var deviceList = APICALL.response ;

                    var showDataCnt = 0;
					if(deviceList){
		                $scope.deviceList = deviceList;
		                if(showDataCnt > 0){
		                    $scope.$apply();
		                }
		                loaderDiv.addClass('ng-hide');
		                contentDiv.removeClass('ng-hide');
		                if(deviceList.length <= 0){
		                    notFoundMsg.removeClass('ng-hide');
		                }
		            }
		            else{
		                setTimeout(function(){ showDataCnt++; showData(); }, 1000);
		            }



                } else {
                    //$scope.error = APICALL.message;
                    //$scope.responseLoading = false;
                    console.log("ERROR :"+ JSON.stringify( APICALL ) );
                }
            });

            $scope.add = function () {
                console.log("Add Device");
            };

            $scope.onDevice = function ( deviceId ) {
                console.log("On Device :"+deviceId );

                var user_id = 1 ;

                var onButton = angular.element(document.querySelector('#btnOn'+deviceId));
                var offButton = angular.element(document.querySelector('#btnOff'+deviceId));

                DeviceService.SwitchDevice(user_id , deviceId, 'on' , function(APICALL) {
                    if(APICALL.status) {
                        console.log("DATA :"+ JSON.stringify( APICALL.response ) );
                        onButton.removeClass('btn-warning');
                        onButton.addClass('btn-default disabled');
                        offButton.removeClass('btn-default disabled');
                        offButton.addClass('btn-danger');

                        /*offButton.disabled = false ;
                        onButton.disabled =  true ;*/
                        
                    } else {
                        //$scope.error = APICALL.message;
                        //$scope.responseLoading = false;
                        console.log("ERROR :"+ JSON.stringify( APICALL ) );
                    }
                }) ;
            };

            $scope.offDevice = function ( deviceId) {
                console.log("Off Device :"+deviceId );

                var user_id = 1 ;

                var onButton = angular.element(document.querySelector('#btnOn'+deviceId));
                var offButton = angular.element(document.querySelector('#btnOff'+deviceId));

                DeviceService.SwitchDevice(user_id , deviceId, 'off'  , function(APICALL) {
                    if(APICALL.status) {
                        console.log("DATA :"+ JSON.stringify( APICALL.response ) );
                        onButton.removeClass('btn-default disabled');
                        onButton.addClass('btn-warning');
                        offButton.removeClass('btn-danger');
                        offButton.addClass('btn-default disabled');

                        /*offButton.disabled = true ;
                        onButton.disabled =  false ;*/

                    } else {
                        //$scope.error = APICALL.message;
                        //$scope.responseLoading = false;
                        console.log("ERROR :"+ JSON.stringify( APICALL ) );
                    }
                }) ;
            };

            $scope.goToDeviceDetails = function ( deviceId ) {
                console.log("Device Details : "+deviceId );
            };

      
    }]);