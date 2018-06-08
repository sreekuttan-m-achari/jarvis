 <?php
require_once 'config.php';
// Create connection
$conn = mysqli_connect($GLOBALS['servername'], $GLOBALS['username'], $GLOBALS['password'], $GLOBALS['dbname']);
// Check connection
if (!$conn) {
	die("Connection failed: " . mysqli_connect_error());
}

?>