/*
  Before you begin, make sure that you have the correct libraries installed.
  You must install Modbus Library given here: https://code.google.com/archive/p/arduino-modbus-slave/downloads
  This is just an example taken from that library. I have written no part of this code. All credit goes to the original authors.
  - xandfury
*/
#include <modbus.h>
#include <modbusDevice.h>
#include <modbusRegBank.h>
#include <modbusSlave.h>
#include <SPI.h>
#include <Servo.h>

#define SENSORH1PIN A0
#define SENSORH2PIN A1
#define SENSORH3PIN A2

#define PIN1_CS_MAX6675 10
#define PIN2_CS_MAX6675 11

Servo actuator;

//Setup the brewtrollers register bank
//All of the data accumulated will be stored here
modbusDevice regBank;
//Create the modbus slave protocol handler
modbusSlave slave;

const byte interruptPin = 3;
volatile byte state = LOW;

int readTemperature1() {
  digitalWrite(PIN1_CS_MAX6675, LOW); 
  int temp = SPI.transfer(0); 
  temp <<= 8; 
  temp |= SPI.transfer(0); 
  digitalWrite(PIN1_CS_MAX6675, HIGH); 
  temp >>= 3;
  temp = (float)temp / 4.0;
  return temp; 
}

int readTemperature2() {
  digitalWrite(PIN2_CS_MAX6675, LOW); 
  int temp = SPI.transfer(0); 
  temp <<= 8; 
  temp |= SPI.transfer(0); 
  digitalWrite(PIN2_CS_MAX6675, HIGH); 
  temp >>= 3;
  temp = ((float)temp / 4.0)+10;
  return temp; 
}

int safeAnalogRead(int pin){
  int x = analogRead(pin);  // make an initial reading to set up the ADC
  delay(100);                // let the ADC stabilize
  x = analogRead(pin);      // toss the first reading and take one we will keep
  delay(100);                // delay again to be friendly to future readings
  return x;
}

void toggleActuator(){
  state = !state;
  if (state){
    actuator.writeMicroseconds(1000);
  } else{
    actuator.writeMicroseconds(2000);
  }
}

void setup()
{
  SPI.begin();
  Serial.begin(9600);
  
  pinMode(interruptPin, INPUT_PULLUP);
  attachInterrupt(digitalPinToInterrupt(interruptPin), toggleActuator, CHANGE);

  actuator.attach(9);
  
  pinMode(PIN1_CS_MAX6675, OUTPUT);
  digitalWrite(PIN1_CS_MAX6675, HIGH);
  pinMode(PIN2_CS_MAX6675, OUTPUT);
  digitalWrite(PIN2_CS_MAX6675, HIGH);

  //Assign the modbus device ID.
  regBank.setId(1);

  /*
    modbus registers follow the following format
    00001-09999  Digital Outputs, A master device can read and write to these registers
    10001-19999  Digital Inputs, A master device can only read the values from these registers
    30001-39999  Analog Inputs, A master device can only read the values from these registers
    40001-49999  Analog Outputs, A master device can read and write to these registers
    Analog values are 16 bit unsigned words stored with a range of 0-32767
    Digital values are stored as bytes, a zero value is OFF and any nonzer value is ON
    It is best to configure registers of like type into contiguous blocks.  this
    allows for more efficient register lookup and and reduces the number of messages
    required by the master to retrieve the data
  */

  //Add Digital Output registers 00001-00016 to the register bank
  regBank.add(1);
  regBank.add(2);
  regBank.add(3);
  regBank.add(4);
  regBank.add(5);
  regBank.add(6);
  regBank.add(7);
  regBank.add(8);
  regBank.add(9);
  regBank.add(10);
  regBank.add(11);
  regBank.add(12);
  regBank.add(13);
  regBank.add(14);
  regBank.add(15);
  regBank.add(16);

  //Add Digital Input registers 10001-10008 to the register bank
  regBank.add(10001);
  regBank.add(10002);
  regBank.add(10003);
  regBank.add(10004);
  regBank.add(10005);
  regBank.add(10006);
  regBank.add(10007);
  regBank.add(10008);

  //Add Analog Input registers 30001-10010 to the register bank
  regBank.add(30001);
  regBank.add(30002);
  regBank.add(30003);
  regBank.add(30004);
  regBank.add(30005);
  regBank.add(30006);
  regBank.add(30007);
  regBank.add(30008);
  regBank.add(30009);
  regBank.add(30010);

  //Add Analog Output registers 40001-40020 to the register bank
  regBank.add(40001);
  regBank.add(40002);
  regBank.add(40003);
  regBank.add(40004);
  regBank.add(40005);
  regBank.add(40006);
  regBank.add(40007);
  regBank.add(40008);
  regBank.add(40009);
  regBank.add(40010);
  regBank.add(40011);
  regBank.add(40012);
  regBank.add(40013);
  regBank.add(40014);
  regBank.add(40015);
  regBank.add(40016);
  regBank.add(40017);
  regBank.add(40018);
  regBank.add(40019);
  regBank.add(40020);

  /*
    Assign the modbus device object to the protocol handler
    This is where the protocol handler will look to read and write
    register data.  Currently, a modbus slave protocol handler may
    only have one device assigned to it.
  */
  slave._device = &regBank;

  // Initialize the serial port for coms at 9600 baud
  slave.setBaud(9600);
}

void loop()
{
  //put some data into the registers
  regBank.set(1, 1);
  regBank.set(2, 1);
  regBank.set(3, 0);
  regBank.set(4, 1);
  regBank.set(5, 1);
  regBank.set(6, 0);
  regBank.set(7, 1);
  regBank.set(8, 0);

  regBank.set(10001, 1);
  regBank.set(10002, 1);
  regBank.set(10003, 1);
  regBank.set(10004, 1);
  regBank.set(10005, 0);
  regBank.set(10006, 0);
  regBank.set(10007, 0);
  regBank.set(10008, 0);


  regBank.set(30001, 1);
  regBank.set(30002, 2);
  
  regBank.set(30003, 3);
  regBank.set(30004, 4);
  regBank.set(30005, 5);
  regBank.set(30006, 6);
  regBank.set(30007, 7);
  regBank.set(30008, 8);
  regBank.set(30009, 9);
  regBank.set(30010, 10);

  regBank.set(40001, 1);
  regBank.set(40002, 2);
  regBank.set(40003, 2);
  regBank.set(40004, 4);
  regBank.set(40005, 5);
  regBank.set(40006, 6);
  regBank.set(40007, 7);
  regBank.set(40008, 8);
  regBank.set(40009, 9);
  regBank.set(40010, 10);

  while (1)
  {
    regBank.set(40001, (word) safeAnalogRead(SENSORH1PIN));
    regBank.set(40002, (word) safeAnalogRead(SENSORH2PIN));
    regBank.set(40003, (word) safeAnalogRead(SENSORH3PIN));
    regBank.set(40004, (word) readTemperature1());
    regBank.set(40005, (word) readTemperature2());

    slave.run();
  }
}
