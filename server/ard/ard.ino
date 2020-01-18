void setup() {
  pinMode(LED_BUILTIN, OUTPUT);
  Serial.begin(9600); // set the baud rate
  Serial.println("Ready"); // print "Ready" once
}
void loop() {
  int inByte;
  if (Serial.available()) { // only send data back if data has been sent
    int inByte = Serial.parseInt(); // read the incoming data
    if(inByte == 3) {
      digitalWrite(LED_BUILTIN, HIGH);
      delay(1000);
      digitalWrite(LED_BUILTIN, LOW); 
      delay(1000);
    }
    Serial.println((char)inByte); // send the data back in a new line so that it is not all one long line
  }
  delay(100); // delay for 1/10 of a second
}
