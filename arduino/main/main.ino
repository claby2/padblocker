#include <Wire.h>
#include <Adafruit_MotorShield.h>
#include <Servo.h>

Servo servo;

Adafruit_MotorShield AFMS = Adafruit_MotorShield(); // create object

Adafruit_DCMotor *motor1 = AFMS.getMotor(1); // port selection
Adafruit_DCMotor *motor2 = AFMS.getMotor(2);

const int SPEED_UP = 130;
const int SPEED_DOWN = 90;
const int TIME = 300;

int inputSpeed;
int upArray[] = {55, 70, 57, 57, 65, 65, 65, 60, 65};
int downArray[] = {20, 20, 20, 20, 20, 20, 20, 20, 20};
int currentPos = 0;

void setup() {
  Serial.begin(9600);  
  Serial.setTimeout(2000);
  Serial.println("Running");

  AFMS.begin();  // create with the default frequency 1.6KHz
  
  motor1->setSpeed(SPEED_UP);  // 0-255
  motor2->setSpeed(SPEED_UP);
  motor1->run(RELEASE);
  motor2->run(RELEASE);
  // servo control (for the 'brake')
  servo.attach(9);
  closeservo();
  /*
  for (int i=1; i<=18; i++) {
    Serial.print("i "); Serial.println(i);
    goup(i);
    reset();
  }
  */
}

void closeservo() {
  servo.write(45);
}

void openservo() {
  servo.write(125);
}

void runall(uint8_t dir) {
  motor1->run(dir);
  motor2->run(dir);
}

void runforward(int am) {
  motor1->setSpeed(SPEED_UP);
  motor2->setSpeed(SPEED_UP);
  openservo();
  delay(200);
  runall(FORWARD);
  delay(am);
  closeservo();
  runall(RELEASE);
}

void reset() {
  Serial.println("reset");
  motor1->setSpeed(SPEED_DOWN);
  motor2->setSpeed(SPEED_DOWN);
  openservo();
  runall(BACKWARD);
  delay(500);
  runall(RELEASE);
  closeservo();
  currentPos = 0;
  delay(700);
  runall(30);
  delay(100);
}

void goup(int cm) {
  for (int i = currentPos; i<cm; i+=2) {
    runforward(upArray[i/2]);
    Serial.print("going up "); Serial.println(i/2);
    delay(500);
  }
  currentPos = cm;
}


void loop() {
  if (Serial.available()) {
    inputSpeed = Serial.parseInt();
    if (inputSpeed < 0) inputSpeed = 0;
    if (inputSpeed > 18) inputSpeed = 18;
    Serial.println(inputSpeed);
    if (currentPos == inputSpeed) return;
    else if (currentPos < inputSpeed) goup(inputSpeed);
    else {
      reset();
      goup(inputSpeed);
    }
  }
}
