#define DOORLOCK 23
#define SWITCH 26
int previousSwitchStatus = 0;
int currentSwitchStatus = 0;
int state = 0;

void setup()
{
  Serial.begin(9600);
  pinMode(SWITCH, INPUT);
  pinMode(DOORLOCK, OUTPUT); 
  pinMode(LED_BUILTIN, OUTPUT);
  Serial.println("connect");
}

void loop()
{
  // put your main code here, to run repeatedly:
  currentSwitchStatus = digitalRead(SWITCH);
  if(currentSwitchStatus==1 && previousSwitchStatus==0){    
    if (state == 1)
      state = 0;
    else
      state = 1;
  }
  digitalWrite(LED_BUILTIN,state);
  digitalWrite(DOORLOCK,state);

  previousSwitchStatus = currentSwitchStatus;
  delay(100);
}
