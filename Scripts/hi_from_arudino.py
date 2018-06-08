import serial
import time

from config import config_data

cnf_dat = config_data()

ser=serial.Serial(cnf_dat["serial_port"],9600)  #change ACM number as found from ls /dev/ttyUSB*
ser.baudrate=9600
 
while True:
	read_ser=ser.readline()
	print(read_ser)
	if(read_ser=="Hello From Arduino!"):
		print("Blinked")