
document.addEventListener("deviceready",onDeviceReadyPush,false);
function onDeviceReadyPush(){
	window.FirebasePlugin.grantPermission();
	alert("Device Ready") ;
	window.FirebasePlugin.getToken(function(token) {
	    // save this server-side and use it to push notifications to this device
	    console.log(token);
	    sessionStorage.setItem('DEVICE_TOKEN' , token) ;
	    alert(token) ;
	}, function(error) {
	    console.error(error);
	    alert(error) ;
	});

	window.FirebasePlugin.onNotificationOpen(function(notification) {
	    console.error(notification);
	    alert(JSON.stringify(notification) );
	}, function(error) {
	    console.error(error);
	    alert(JSON.stringify(error) );
	});

}




