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

QRCode qrcode;
int counter = 0;
const char* url;

//--------------------------------------------------------------------------------Setup-----------------------------------------------------------------------------//

void setup()
{
  //  pinMode(LED_BUILTIN, OUTPUT);
  //  pinMode(26, INPUT);
  Serial.begin(115200);

  display.init(115200); // enable diagnostic output on Serial
  counter = 0;

  //  display.update();
  Serial.println("Start");
  url = "www.google.com";

  // Trigger DeepSleepMode by Button INPUT33
  esp_sleep_enable_ext0_wakeup(GPIO_NUM_33, 1); //1 = High, 0 = Low
  print_wakeup_reason();

  //EEPROM Setup
  EEPROMClass SERIALNUMBER("eeprom0", 0x1000);

  //  if (!SERIALNUMBER.begin(SERIALNUMBER.length())) {
  //    Serial.println("Failed to initialise SERIALNUMBER");
  //    Serial.println("Restarting...");
  //    delay(1000);
  //    ESP.restart();
  //  }

  // Set Serial No.
  char* serialNumber = "abcdefg1234567";

  // >>>Write: Variables ---> EEPROM partitions
//  SERIALNUMBER.put(0, serialNumber);
//  Serial.print("serialNumber: ");   Serial.println(serialNumber);

  //>>>Clear variables
//  serialNumber = '\0';
//  Serial.print("serialNumber: ");   Serial.println(serialNumber);

  // Read: Variables <--- EEPROM partitions
  SERIALNUMBER.get(0, serialNumber);
  Serial.print("serialNumber: ");   Serial.println(serialNumber);
  Serial.println("Done!");

}

//--------------------------------------------------------------------------------Loop-----------------------------------------------------------------------------//

void loop() {
  display.fillScreen(GxEPD_WHITE);
  display.drawBitmap(gImage_LS01, 10, 15, 108, 104, GxEPD_BLACK);
  showText("23", &FreeSansBold18pt7b);                    //Paste Locker Number here.
  Display_QRcode(6, 175, url);   //Paste URL here.

  // ---------Partial Update Template------------
  //    display.updateWindow(0, 0, 128, 296, false);
  //    display.fillRect(10, 15, 100, 100, GxEPD_WHITE);
  //  showTestText("23", &FreeSansBold18pt7b);          //Input partial update part
  //  display.updateWindow(10, 15, 100, 100, true);

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
    // display.update();
    display.updateWindow(0, 120, 128, 176, true);
    deepSleepMode();                      //Deep Sleep for 1 second
  }
  counter++;
  delay(1000);

}

//--------------------------------------------------------------------------------Methods-----------------------------------------------------------------------------//

void showText(const char text[], const GFXfont * f)
{
  display.setTextColor(GxEPD_BLACK);
  display.setFont(f);
  display.setCursor(45, 150);
  display.println(text);
}

void showLargeText(const char text[], const GFXfont * f)
{
  display.setTextColor(GxEPD_BLACK);
  display.setFont(f);
  display.setCursor(39, 220);
  display.println(text);
}

void showLockerNumber(const char text[], const GFXfont * f)
{
  display.setTextColor(GxEPD_BLACK);
  display.setFont(f);
  display.setCursor(25, 170);
  display.println(text);
}

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

void showTestText(const char text[], const GFXfont * f)
{
  display.setTextColor(GxEPD_BLACK);
  display.setFont(f);
  display.setCursor(20, 40);
  display.println(text);
}

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
