#include <GxFont_GFX.h>
#include <GxEPD.h>
#include <GxGDEH029A1/GxGDEH029A1.h>      // 2.9" b/w

// FreeFonts from Adafruit_GFX
#include <Fonts/FreeMonoBold9pt7b.h>
#include <Fonts/FreeMonoBold12pt7b.h>
#include <Fonts/FreeMonoBold18pt7b.h>
#include <Fonts/FreeMonoBold24pt7b.h>

#include <GxIO/GxIO_SPI/GxIO_SPI.h>
#include <GxIO/GxIO.h>

// BUSY -> 4, RST -> 16, DC -> 17, CS -> SS(5), CLK -> SCK(18), DIN -> MOSI(23), GND -> GND, 3.3V -> 3.3V
GxIO_Class io(SPI, /*CS=5*/ SS, /*DC=*/ 17, /*RST=*/ 16);   // arbitrary selection of 17, 16
GxEPD_Class display(io, /*RST=*/ 16, /*BUSY=*/ 4);          // arbitrary selection of (16), 4

#include "IMG_0001.h"

#include "qrcode.h"            // Copyright (c) //https://github.com/ricmoo/qrcode/

//#define SCREEN_WIDTH  296.0    // Set for landscape mode, don't remove the decimal place!
//#define SCREEN_HEIGHT 128.0
//#define BITS_PER_PIXEL 1
//uint16_t palette[] = { 0, 1 };

QRCode qrcode;

//--------------------------------------------------------------------------------Setup-----------------------------------------------------------------------------//

void setup()
{
  pinMode(LED_BUILTIN, OUTPUT);
  pinMode(26, INPUT);
  Serial.begin(115200);

  display.init(115200); // enable diagnostic output on Serial

  display.fillScreen(GxEPD_WHITE);
  display.drawBitmap(gImage_LS01, 10, 15, 108, 104, GxEPD_BLACK); //Actually dimensions are 108*105 bit
  showText("23", &FreeMonoBold18pt7b);
  Display_QRcode(6, 175, "http://www.lockerswarm.xyz"); //Paste URL here.
  display.update();
  delay(1000);

}

//--------------------------------------------------------------------------------Loop-----------------------------------------------------------------------------//

void loop()
{
  int previousState = 0;
  int currentState = 0;

  Serial.println("-----------New Loop-----------");
  currentState = digitalRead(26);
  Serial.println(previousState);
  Serial.println(currentState);

//  display.fillScreen(GxEPD_WHITE);
//  showText("QR", &FreeMonoBold18pt7b);

  if (previousState == 0 && currentState == 0) {
    Serial.println("0-0 >>> Logo");
    if (previousState == 0 && currentState == 0) {
      display.fillScreen(GxEPD_WHITE);
      showText("Logo", &FreeMonoBold18pt7b);
      display.update();
      Serial.println("Deep Sleep");
      ESP.deepSleep(5e6);
    } else if (previousState == 0 && currentState == 1) {
      display.update();
    }

  } else if (previousState == 0 && currentState == 1) {
    Serial.println("0-1 >>> QRcode");
    display.fillScreen(GxEPD_WHITE);
    showText("QR", &FreeMonoBold18pt7b);
    display.update();
    delay(5000);

  }
  previousState = currentState;
  delay(1000);
}

//--------------------------------------------------------------------------------Methods-----------------------------------------------------------------------------//

void showText(const char text[], const GFXfont * f)
{
  //  display.fillScreen(GxEPD_WHITE);
  display.setTextColor(GxEPD_BLACK);
  display.setFont(f);
  display.setCursor(43, 150);
  display.println(text);
  //  display.update();
  //  delay(2000);
}

void showTextFooter(const char text[], const GFXfont * f)
{
  //  display.fillScreen(GxEPD_WHITE);
  display.setTextColor(GxEPD_BLACK);
  display.setFont(f);
  display.setCursor(14, 280);
  display.println(text);
  //  display.update();
  //  delay(2000);
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



void HeaderWriter() {
  display.drawBitmap(gImage_LS01,     10, 15,   108, 105,  GxEPD_BLACK);
  display.update();
}
