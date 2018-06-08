#include <ArduinoJson.h>

String device_status="";
String sensor="";
int relay1=8;
int relay2=9;

//DynamicJsonBuffer jsonBuffer;
//StaticJsonBuffer<200> jsonBuffer;

void setup() {
  // initialize digital pin LED_BUILTIN as an output.
  pinMode(8, OUTPUT);
  pinMode(9, OUTPUT);
  // initialize digital pin LED_BUILTIN as an output.
  pinMode(LED_BUILTIN, OUTPUT);
  // start serial port at 9600 bps:
  Serial.begin(9600);
  while (!Serial) {
    ; // wait for serial port to connect. Needed for native USB port only
    digitalWrite(LED_BUILTIN, HIGH);   // turn the LED on (HIGH is the voltage level)
    delay(100);                       // wait for a second
    digitalWrite(LED_BUILTIN, LOW);    // turn the LED off by making the voltage LOW
    delay(100);
  }

  digitalWrite(relay1, HIGH);
  digitalWrite(relay2, HIGH);
  
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

    const char* relay_status1 = root[String(relay1)] ;
    const char* relay_status2 = root[String(relay2)] ;
    
    //Serial.println(relay1_status);
    //Serial.println(relay2_status);

    String msg = "MSG : RCVD ( RLY1 " + String(relay_status1) + " , RLY2 " + String (relay_status2) + " )";

    if(String(relay_status1) == "HIGH"){
         digitalWrite(relay1, HIGH);
         msg +=  " Relay 1 : High ";
    }
    if(String(relay_status1) == "LOW"){
       digitalWrite(relay1, LOW);
       msg +=  " Relay 1 : LOW ";
    }
    if(String(relay_status2) == "HIGH"){ 
       digitalWrite(relay2, HIGH);
       msg +=  " Relay 2 : HIGH ";
    }
    if(String(relay_status2) == "LOW"){
       digitalWrite(relay2, LOW);
       msg +=  " Relay 2 : LOW ";
    }
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
