<?php
require_once 'config.php';
/*
SELECT `id`, `title`, `name`, `port`, `category_id`, `status` FROM `devices` WHERE 1
SELECT `id`, `category` FROM `device_categories` WHERE 1
SELECT  `id`, `status`, `status_code` FROM `device_status` WHERE 1

 */
function get_device_status($conn) {

	$sql = "
	SELECT devices.id, devices.title, devices.name , devices.port , device_categories.category,  device_status.status , device_status.status_code
	FROM devices
	JOIN device_categories  ON devices.category_id = device_categories.id
	JOIN device_status ON devices.status = device_status.id
	WHERE 1  ";

	$result = mysqli_query($conn, $sql);

	$devices = [];

	if (!$result) {
		die("Error description: ".mysqli_error($con));
	} else if (mysqli_num_rows($result) > 0) {
		// output data of each row
		while ($row = mysqli_fetch_assoc($result)) {
			$devices[] = $row;
		}
	}

	mysqli_close($conn);
	return $devices;

}

function set_device_status($conn, $device_id, $status) {

	$sql = "UPDATE  devices SET status = $status  WHERE id = $device_id ";

	$result = mysqli_query($conn, $sql);

	if (!$result) {
		die("Error description: ".mysqli_error($con));
	}

	mysqli_close($conn);
	return $result;

}
