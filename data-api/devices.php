<?php
require_once 'config.php';
require_once 'DB.php';
require_once 'DeviceModel.php';

$devices = get_device_status($conn);

$response['status'] = (count($devices) > 0) ? 1 : 0;
$response['data']['devices'] = $devices;

header('Content-Type: application/json');
echo json_encode($response);