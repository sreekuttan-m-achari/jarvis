<?php

require_once 'config.php';

$relay_ctrl_loc = $GLOBALS['relay_control_location'];

echo "location : ".$relay_ctrl_loc.'\n';

$command = "python ".$relay_ctrl_loc."/send_device_status_to_arudino.py";

echo "command : ".$command.'\n';

echo exec($command);