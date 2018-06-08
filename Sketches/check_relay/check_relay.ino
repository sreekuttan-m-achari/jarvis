int relay1 = 8;
int relay2 = 9;

// the setup function runs once when you press reset or power the board
void setup() {
  // initialize digital pin LED_BUILTIN as an output.
  pinMode(8, OUTPUT);
  pinMode(9, OUTPUT);
}

// the loop function runs over and over again forever
void loop() {
  digitalWrite(relay1, HIGH);    
  delay(1000);                       
  digitalWrite(relay1, LOW);    
  delay(1000); 
  digitalWrite(relay2, HIGH);    
  delay(1000);                       
  digitalWrite(relay2, LOW);    
  delay(1000);                    
}
