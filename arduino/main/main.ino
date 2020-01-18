#include <Wire.h>
#include <Adafruit_MotorShield.h>
#include <Servo.h>

Servo servo;

Adafruit_MotorShield AFMS = Adafruit_MotorShield(); // create object

Adafruit_DCMotor *motor1 = AFMS.getMotor(1); // port selection
Adafruit_DCMotor *motor2 = AFMS.getMotor(2);

const int SPEED_UP = 120;
const int SPEED_DOWN = SPEED_UP;
const int TIME = 300;

int inputSpeed;

void setup() {
  Serial.begin(9600);  
  Serial.println("Running");

  AFMS.begin();  // create with the default frequency 1.6KHz
  
  motor1->setSpeed(SPEED_UP);  // 0-255
  motor2->setSpeed(SPEED_UP);
  motor1->run(RELEASE);
  motor2->run(RELEASE);
  // servo control (for the 'brake')
  servo.attach(9);
  closeservo();
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

void loop() {
  if (Serial.available()) {
    inputSpeed = Serial.parseInt();
    Serial.println(inputSpeed);
    openservo();
    delay(100);
    runall(FORWARD);
    delay(inputSpeed);
    closeservo();
    runall(RELEASE);
    delay(100);
  }
}
