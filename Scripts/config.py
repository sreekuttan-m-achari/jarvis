def config_data():
	cnf = {}
	cnf['serial_port'] = "/dev/ttyUSB0"
	#cnf['api_endpoint'] = "http://192.168.43.163/data-api//devices.php"
	cnf['api_endpoint'] = "https://us-central1-jarvis-auto-sys.cloudfunctions.net/get_device_list"
	return cnf