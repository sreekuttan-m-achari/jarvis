<?php

require_once 'config.php';
require_once 'DB.php';
require_once 'DeviceModel.php';

$devices_set = get_device_status($conn);

//print_r($devices);
//exit;

?>
<!DOCTYPE html>
<html>
<head>
<script src="assets/js/jquery.min.js"></script>
<script>
$(document).ready(function(){
	//refresh_device_list();

    $("#refresh_device_list").click(function(){
        //refresh_device_list();
        location.reload();

    });

    $(".device_action").click(function(){

    	console.log(  "ID : " + this.id + "Status : " + this.value ) ;

    	status = this.value ;
    	device_id_combo = this.id ;
    	device = device_id_combo.split('_');
    	device_id = device[1] ;

    	if(this.value == "1") status = 2 ;
    	if(this.value == "2") status = 1 ;

        set_device_status( device_id   , status );
    });

});


function set_device_status( device_id , status) {

	/*http://192.168.43.163/data-api/devices.php?op=set_device_status&device_id=1&status=2*/

	service_url = "devices.php?op=set_device_status&device_id="+device_id+"&status="+status ;

	$.get(service_url  , function(data, status){
            console.log ("Data: " + JSON.stringify(data )+ "\nStatus: " + status);
             location.reload();

    });


}

function refresh_device_list(){
	$.get("devices.php", function(data, status){
            console.log ("Data: " + JSON.stringify(data )+ "\nStatus: " + status);

            /*Data: {"status":1,"data":{"devices":[{"id":"2","title":"Switch 002","name":"switch002","port":"9","category":"SWITCH","status":"on","status_code":"HIGH"},{"id":"1","title":"Switch 001","name":"switch001","port":"8","category":"SWITCH","status":"off","status_code":"LOW"}]}}
			Status: success*/

            var trHTML = '<tbody>';

            $("#devices > tbody").empty();

			$.each(data.data.devices, function (i, device) {
			    trHTML += '<tr><td>' + device['id'] + '</td><td>' + device['title'] +'</td><td>' + device['name'] +'</td><td>' + device['port'] +'</td><td>' + device['category'] +'</td><td>' + device['status'] +'</td><td>' + device['status_code'] +'</td><td> <button class = "device_action" id="device_' + device['id'] + 'value="' + device['device_stat'] + '"> ' + Switch + ' </button> </td></tr>';
			});

			trHTML += '</tbody>' ;

			$('#devices').append(trHTML);


        });
}


</script>
</head>
<body>

<button id="refresh_device_list">Refresh Device List</button>


<table id="devices" border='1'>
    <thead>
    	<tr>
	        <th>Device ID</th>
	        <th>Title</th>
			<th>Name</th>
			<th>Port</th>
			<th>Category</th>
	        <th>Status</th>
			<th>Status Code</th>
			<th>Action</th>
	    </tr>
	</thead>

	<tbody>
<?php foreach ($devices_set as $device_item) {?>
														<tr>
														<td> <?=$device_item['id']?> </td>
														<td><?=$device_item['title']?></td>
														<td><?=$device_item['name']?></td>
														<td><?=$device_item['port']?></td>
														<td><?=$device_item['category']?></td>
														<td><?=$device_item['status']?></td>
														<td><?=$device_item['status_code']?></td>
														<td>
														<button class = "device_action" id="device_<?=$device_item['id']?>" value="<?=$device_item['device_stat']?>" > Switch </button>
														</td>

														</tr>
	<?php }?>
</tbody>


</table>


</body>
</html>
