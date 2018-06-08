#include <ArduinoJson.h>

String device_status="";
String sensor="";
int relay1=8;
int relay2=9;

DynamicJsonBuffer jsonBuffer;

void setup() {
  // initialize digital pin LED_BUILTIN as an output.
  pinMode(8, OUTPUT);
  pinMode(9, OUTPUT);
  // initialize digital pin LED_BUILTIN as an output.
  pinMode(LED_BUILTIN, OUTPUT);
  // start serial port at 9600 bps:
  Serial.begin(9600);
  while (!Serial) {
    //; // wait for serial port to connect. Needed for native USB port only
    digitalWrite(LED_BUILTIN, HIGH);   // turn the LED on (HIGH is the voltage level)
    delay(100);                       // wait for a second
    digitalWrite(LED_BUILTIN, LOW);    // turn the LED off by making the voltage LOW
    delay(100);
  }
  
  establishContact();  // send a byte to establish contact until receiver responds
}

void loop() {
  // if we get a valid byte, read analog ins:
  if (Serial.available() > 0) {
    // get incoming byte:
    device_status = Serial.readString();
    // send sensor values:
    Serial.println(device_status);
    
    JsonObject& root = jsonBuffer.parseObject(device_status);
   
    // Test if parsing succeeds.
    if (!root.success()) {
      Serial.println("parseObject() failed");
      return;
    }


    digitalWrite(LED_BUILTIN, HIGH);   // turn the LED on (HIGH is the voltage level)
    delay(1000);                       // wait for a second

    
    for (int i = 0; i > root ; i = i++ ){
      digitalWrite(relay2, LOW);
    }    
    
    
    digitalWrite(LED_BUILTIN, LOW);    // turn the LED off by making the voltage LOW
    delay(1000);
  }
}

void establishContact() {
  while (Serial.available() <= 0) {
    Serial.println("check");   // check status
    delay(1000);
  }
}
