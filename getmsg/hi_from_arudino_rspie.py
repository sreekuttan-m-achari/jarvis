import serial
import RPi.GPIO as GPIO
import time

cnf_dat = config_data()

ser=serial.Serial(cnf_dat["serial_port"],9600)  #change ACM number as found from ls /dev/ttyUSB*
ser.baudrate=9600

def blink(pin):
	GPIO.output(pin,GPIO.HIGH)  
	time.sleep(1)  
	GPIO.output(pin,GPIO.LOW)  
	time.sleep(1)  
	return

GPIO.setmode(GPIO.BOARD)
GPIO.setup(11, GPIO.OUT)

while True:
	read_ser=ser.readline()
	print(read_ser)
	if(read_ser=="Hello From Arduino!"):
		blink(11)