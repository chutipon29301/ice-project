#include <GxFont_GFX.h>
#include <GxEPD.h>
#include <GxGDEH029A1/GxGDEH029A1.h>      // 2.9" b/w

// Normal Font
#include <Fonts/FreeSans12pt7b.h>
#include <Fonts/FreeSans18pt7b.h>
#include <Fonts/FreeSans24pt7b.h>
// Bold Font
#include <Fonts/FreeSansBold12pt7b.h>
#include <Fonts/FreeSansBold18pt7b.h>
#include <Fonts/FreeSansBold24pt7b.h>

#include <GxIO/GxIO_SPI/GxIO_SPI.h>
#include <GxIO/GxIO.h>

// PIN Setting
// BUSY -> 4, RST -> 16, DC -> 17, CS -> SS(5), CLK -> SCK(18), DIN -> MOSI(23), GND -> GND, 3.3V -> 3.3V
GxIO_Class io(SPI, /*CS=5*/ SS, /*DC=*/ 17, /*RST=*/ 16);   // arbitrary selection of 17, 16
GxEPD_Class display(io, /*RST=*/ 16, /*BUSY=*/ 4);          // arbitrary selection of (16), 4

#include "IMG_0001.h"
#include "qrcode.h"  //https://github.com/ricmoo/qrcode/

// EEPROM Library
#include "EEPROM.h"

// WiFi Library
#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>

//Set Username-Password WiFi
const char* ssid = "CTiPhone";
const char* password = "00000000";

QRCode qrcode;
int counter = 0;
const char* url = "www.google.com";

#define EEPROM_SIZE 37
int serialArray[EEPROM_SIZE];
String serial = "";
String serialString;
int idInt;

//int isRegistered = 0;

const char* lockerNumber;

int isLock;

#define DOOR_LOCK 25
int isLock_Switch;
#define DOOR_LOCK_SWITCH 26

//--------------------------------------------------------------------------------Setup-----------------------------------------------------------------------------//

void setup()
{
  Serial.begin(115200);
  display.init(115200);

  pinMode(LED_BUILTIN, OUTPUT);
  pinMode(DOOR_LOCK, OUTPUT);
  pinMode(DOOR_LOCK_SWITCH, INPUT);

  WiFi.begin(ssid, password);
  EEPROM.begin(EEPROM_SIZE);

  xTaskCreate(&doorLockSwitch, "doorLockSwitch", 2048, NULL, 10, NULL);
  xTaskCreate(&doorLock, "doorLock", 2048, NULL, 10, NULL);

  //  clearEEPROM();

  wifiConnection();

  for (int i = 0; i < EEPROM_SIZE; i++) {
    serialArray[i] = EEPROM.read(i);
  }

  char temp;
  for (int i = 0; i < EEPROM_SIZE; i++) {
    if (i == EEPROM_SIZE - 1) {
      idInt = serialArray[i];
    } else {
      temp = serialArray[i];
      serialString = serialString + temp;
    }
  }

  Serial.print("Current Serial: "); Serial.println(serialString); // ***Use >>>"serialString"<<< to GET/POST other requests
  delay(1000);
  Serial.print("Current ID: "); Serial.println(idInt);
  delay(1000);

  registerNewLocker();
}

//--------------------------------------------------------------------------------Loop-----------------------------------------------------------------------------//

void loop() {

  display.fillScreen(GxEPD_WHITE);
  display.drawBitmap(gImage_LS01, 10, 15, 108, 104, GxEPD_BLACK);

  //  showIdToRegister();

  Serial.println(counter);
  if (counter == 0) {                           // Update to be QRcode Display when start (counter=0)
    display.update();
    Serial.println("Initial");
  } else if (counter > 0 && counter <= 3) {    //Show QRcode for 3 second
    Serial.println("QR");
  } else if (counter > 3) {                    //Return to Logo display and Deep Sleep for 3 second
    Serial.println("Logo");

    // Initial partial update
    display.updateWindow(0, 0, 128, 296, false);
    display.fillRect(0, 120, 128, 176, GxEPD_WHITE);

    // Set Content in partial update
    display.fillScreen(GxEPD_WHITE);
    display.drawBitmap(gImage_LS01, 10, 15, 108, 104, GxEPD_BLACK);
    display.drawBitmap(gImage_Line, 10, 140, 108, 5, GxEPD_BLACK);
    showLockerNumber("Number", &FreeSans12pt7b);
    showLargeText("23", &FreeSansBold24pt7b);
    display.drawBitmap(gImage_Line, 10, 235, 108, 5, GxEPD_BLACK);
    //     display.update();
    display.updateWindow(0, 120, 128, 176, true);
    deepSleepMode();                      //Deep Sleep for 20 second
  }
  counter++;
  delay(1000);

}

//--------------------------------------------------------------------------------Methods-----------------------------------------------------------------------------//

//----------------------------print text in e-ink display--------------------------//

void showText(const char text[], const GFXfont * f) {
  display.setTextColor(GxEPD_BLACK);
  display.setFont(f);
  display.setCursor(36, 150);
  display.println(text);
}

void showLargeText(const char text[], const GFXfont * f) {
  display.setTextColor(GxEPD_BLACK);
  display.setFont(f);
  display.setCursor(39, 220);
  display.println(text);
}

void showLockerNumber(const char text[], const GFXfont * f) {
  display.setTextColor(GxEPD_BLACK);
  display.setFont(f);
  display.setCursor(25, 170);
  display.println(text);
}

//----------------------------print QRcode in e-ink display--------------------------//
//----------------------------"GET/qr/generateLink?serialNumber=..." request--------------------//
//----------------------------when button is pressed--------------------------//
void Display_QRcode(int offset_x, int offset_y, const char* Message) {
#define element_size 4
  // Create the QR code ~120 char maximum
  uint8_t qrcodeData[qrcode_getBufferSize(3)];
  qrcode_initText(&qrcode, qrcodeData, 3, 0, Message);
  for (int y = 0; y < qrcode.size; y++) {
    for (int x = 0; x < qrcode.size; x++) {
      if (qrcode_getModule(&qrcode, x, y)) {
        display.fillRect(x * element_size + offset_x, y * element_size + offset_y, element_size, element_size, GxEPD_BLACK);
      }
      else
      {
        display.fillRect(x * element_size + offset_x, y * element_size + offset_y, element_size, element_size , GxEPD_WHITE);
      }
    }
  }
}

//----------------------------Deep Sleep--------------------------//

void deepSleepMode() {
  esp_sleep_enable_timer_wakeup(20e6);    // DeepSleep for 20 sec.
  Serial.println("Going to sleep now");
  esp_deep_sleep_start();
}

void print_wakeup_reason() {
  esp_sleep_wakeup_cause_t wakeup_reason;
  wakeup_reason = esp_sleep_get_wakeup_cause();

  switch (wakeup_reason)
  {
    case ESP_SLEEP_WAKEUP_EXT0 : Serial.println("Wakeup caused by external signal using RTC_IO"); break;
    case ESP_SLEEP_WAKEUP_EXT1 : Serial.println("Wakeup caused by external signal using RTC_CNTL"); break;
    case ESP_SLEEP_WAKEUP_TIMER : Serial.println("Wakeup caused by timer"); break;
    case ESP_SLEEP_WAKEUP_TOUCHPAD : Serial.println("Wakeup caused by touchpad"); break;
    case ESP_SLEEP_WAKEUP_ULP : Serial.println("Wakeup caused by ULP program"); break;
    default : Serial.printf("Wakeup was not caused by deep sleep: %d\n", wakeup_reason); break;
  }
}

//----------------------------locker unlock status--------------------//
//----------------------------"GET/status" request--------------------//
//----------------------------Check all time--------------------------//

//void doorLockSwitch(void *p) {
//  while (1) {
//    isLock_Switch = digitalRead(DOOR_LOCK_SWITCH);
//    if (isLock_Switch == 1) {
//      Serial.println("Switch: Door is Close");
//      delay(100);
//    } else {
//      Serial.println("Switch: Door still Open");
//      delay(100);
//    }
//    delay(500);
//  }
//}

void doorLock(void *p) {
  while (1) {
    if ((WiFi.status() == WL_CONNECTED)) { //Check the current connection status
      HTTPClient http;
      http.begin("http://192.168.1.34:3000/status"); //Specify the URL
      int httpCode = http.GET(); //Make the request
      if (httpCode > 0) { //Check for the returning code
        const size_t bufferSize = JSON_OBJECT_SIZE(1) + 50;
        DynamicJsonDocument jsonDocument(bufferSize);
        DeserializationError error = deserializeJson(jsonDocument, http.getString());
        if (error) {
          Serial.println("There was an error while deserializing");
        }
        else {
          JsonObject root = jsonDocument.as<JsonObject>();
          isLock = root["status"];
          Serial.print("status:"); Serial.println(isLock);

          if (isLock == 1) {
            digitalWrite(LED_BUILTIN, LOW);
            digitalWrite(DOOR_LOCK, HIGH);
            Serial.println("LED ON");
          } else {
            digitalWrite(LED_BUILTIN, HIGH);
            digitalWrite(DOOR_LOCK, LOW);
            Serial.println("LED OFF");
          }
        }
        jsonDocument.clear();
      }
      else {
        Serial.println("Error on HTTP request");
      }
      http.end(); //Free the resources
    }
    delay(500);
  }
}

//----------------------------locker unlock status--------------------//
//----------------------------"POST/locker/lock" request--------------//
//----------------------------When the door is closed-----------------//
void doorLockSwitch(void *p) {
  while (1) {
    isLock_Switch = digitalRead(DOOR_LOCK_SWITCH);
    if (isLock_Switch == 1) {
      Serial.println("Switch: Door is Close");
      delay(100);
    } else {
      Serial.println("Switch: Door still Open");
      delay(100);
    }
    delay(500);
  }
}

//----------------------------EEPROM----------------------------//
//----------------------------Clear EEPROM----------------------------//
void clearEEPROM() {
  for (int i = 0 ; i < EEPROM_SIZE ; i++) {
    EEPROM.write(i, 0);
  }
  Serial.println("EEPROM is cleared.");
}



void registerNewLocker() {
  if (serialString == NULL) {
    Serial.println("request for serial");
    StaticJsonDocument<200> jsonBuffer;
    HTTPClient http;
    http.begin("https://api.lockerswarm.xyz/locker"); //destination
    http.addHeader("Content-Type" , "application/x-www-form-urlencoded"); // content-type, header
    int httpResponseCode = http.POST("secret=112233445566Aa");
    if (httpResponseCode > 0) {
      String response = http.getString();
      Serial.println(response);
      deserializeJson(jsonBuffer, response);
      int id = jsonBuffer["id"];
      const char* serial = jsonBuffer["serial"];

      Serial.print("id: "); Serial.println(id);
      Serial.print("serial: "); Serial.println(serial); //write string to EEPROM, must write 1 byte at a time

      for (int i = 0; i < EEPROM_SIZE; i++) {
        if (i == 0 || i < EEPROM_SIZE - 1) { // Array ช่องที่ 0-35 เก็บ Serial
          EEPROM.write(i, serial[i]);
          EEPROM.commit();
        } else if (i == EEPROM_SIZE - 1) { // Array ช่องที่ 36 เก็บ id
          EEPROM.write(i, id);
          EEPROM.commit();
        }
      }

    } else {
      Serial.print("Error on sending POST:  ");
      Serial.print(httpResponseCode);
    }
    http.end();
  } else {
    Serial.println("Already have Serial!!!");
    EEPROM.commit();
  }
}

boolean isRegistered() {

}

//void showIdToRegister() {
//  if (id == NULL && isRegistered == true) {
//
//    lockerNumber = "30A"; //***MOCK ONLY!!! //ตรงนี้ต้องยิงGET /Status
//
//    showText(lockerNumber, &FreeSansBold18pt7b); //Paste Locker Number here.
//    Display_QRcode(6, 175, url);   //Paste URL here.
//  } else {
//    showText("---", &FreeSansBold18pt7b);
//
//    while (lockerNumber == NULL) {
//      Serial.println("Waiting for Locker's Number...");
//      delay(1000);
//      lockerNumber = "30A"; //***MOCK ONLY!!! //ตรงนี้ต้องยิงGET /Status
//    }
//    Serial.println("Locker's Number Assigned!");
//    delay(1000);
//
//    display.fillScreen(GxEPD_WHITE);
//    display.drawBitmap(gImage_LS01, 10, 15, 108, 104, GxEPD_BLACK);
//    showText(lockerNumber, &FreeSansBold18pt7b); //Paste Locker Number here.
//    Display_QRcode(6, 175, url);   //Paste URL here.
//  }
//}

void wifiConnection() {
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi..");
  }
  Serial.println("Connected to the WiFi network");
  delay(1000);
}








// ---------Partial Update Template------------
//  display.updateWindow(0, 0, 128, 296, false);
//  display.fillRect(10, 15, 100, 100, GxEPD_WHITE);
//  showTestText("23", &FreeSansBold18pt7b);          //Input partial update part
//  display.updateWindow(10, 15, 100, 100, true);


//void showTestText(const char text[], const GFXfont * f){
//  display.setTextColor(GxEPD_BLACK);
//  display.setFont(f);
//  display.setCursor(20, 40);
//  display.println(text);
//}
