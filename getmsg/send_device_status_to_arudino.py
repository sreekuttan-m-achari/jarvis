import serial
import time
import requests
import json

from config import config_data

cnf_dat = config_data()

ser=serial.Serial(cnf_dat["serial_port"],9600)  #change ACM number as found from ls /dev/ttyUSB*
ser.baudrate=9600

def get_device_status():
  	print("Calling Device API")
	# Get the feed
	r = requests.get(cnf_dat["api_endpoint"]+"/devices.php")
	r.text

	# Convert it to a Python dictionary
	data = json.loads(r.text)

	# Loop through the result.
	# for device in data['data']['devices']:

	#     print "ID: %s" % (device['id'])
	#     print "Title: %s" % (device['title']) 
	#     print "Category: %s" % (device['category'])
	#     print "Status: %s" % (device['status'])
	#     print "Status Code: %s" % (device['status_code'])
	#     print ""

	return data['data']['devices'] 

while True:
	read_ser=ser.readline()
	print("")
	print("Message from Arduino")
	print(read_ser)

	if(read_ser):
		device_status=get_device_status()
		device_status_json=json.dumps(device_status)
		print(device_status_json)

		for device in device_status:
	    		ds=device['port']+" : "+device['status_code']
	    		ser.write(ds.encode())

		time.sleep(1)