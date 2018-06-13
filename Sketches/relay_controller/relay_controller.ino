#include <ArduinoJson.h>

String device_status=""; 

const int relay[] = { 2, 3 , 4, 5, 6, 7, 8, 9, 10, 12 };
const int relayCount = sizeof(relay);           // the number of relays (i.e. the length of the array)


//DynamicJsonBuffer jsonBuffer;
//StaticJsonBuffer<200> jsonBuffer;

void setup() {

  // initialize digital pin LED_BUILTIN as an output.
  pinMode(LED_BUILTIN, OUTPUT); 


  for (int thisPin = 0; thisPin < relayCount; thisPin++) {
    pinMode(relay[thisPin], OUTPUT);
    digitalWrite(relay[thisPin], HIGH);
  }
 
  // start serial port at 9600 bps:
  Serial.begin(9600);
  while (!Serial) {
    ; // wait for serial port to connect. Needed for native USB port only
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
    //Serial.println(device_status);

    DynamicJsonBuffer jsonBuffer;
    
    JsonObject& root = jsonBuffer.parseObject(device_status);
   
    // Test if parsing succeeds.
    if (!root.success()) {
      Serial.println("parseObject() failed");
      return;
    }
    
    digitalWrite(LED_BUILTIN, HIGH);   // turn the LED on (HIGH is the voltage level)
    delay(1000);                       // wait for a second


    String msg = "DEVICE STATUS : {  ";

    for (int thisPin = 0; thisPin < relayCount; thisPin++) {

      char* relay_status = root[String(relay[thisPin])] ;
      
      if(String(relay_status) == "HIGH"){
        digitalWrite(relay[thisPin], HIGH);
        msg +=  " Relay " + String(thisPin) + ": Off , ";
      }
      if(String(relay_status) == "LOW"){
        digitalWrite(relay[thisPin], LOW);
        msg +=  " Relay " + String(thisPin) + ": On , ";
      }
          
    }

    msg +=  " } " ;
     
    Serial.println(msg);   // check status
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
