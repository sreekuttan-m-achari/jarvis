<?php
require_once 'config.php';
require_once 'DB.php';
require_once 'DeviceModel.php';

$op = ($_GET['op'] != null)?$_GET['op']:'get_device_status';

switch ($op) {

	case 'set_device_status':

		if (isset($_GET['device_id']) && isset($_GET['status'])) {

			$device_id = $_GET['device_id'];
			$status    = $_GET['status'];

			if (set_device_status($conn, $device_id, $status)) {
				$response['status']  = 1;
				$response['message'] = 'Device Status Updated Successfully';
			} else {
				$response['status']  = 0;
				$response['message'] = 'Device Status Update Failed!';
			}

		} else {
			$response['status']  = -1;
			$response['message'] = 'Invalid / Incomplete Info! Update Failed!';
		}

		break;

	case 'get_device_status':
	default:
		$devices                     = get_device_status($conn);
		$response['status']          = (count($devices) > 0)?1:0;
		$response['data']['devices'] = $devices;
		break;

}

header('Content-Type: application/json');
echo json_encode($response);