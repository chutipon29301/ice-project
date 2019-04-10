#include <SPI.h>               // Built-in 
#include "EPD_WaveShare.h"     // Copyright (c) 2017 by Daniel Eichhorn https://github.com/ThingPulse/minigrafx
#include "EPD_WaveShare_29.h"  // Copyright (c) 2017 by Daniel Eichhorn https://github.com/ThingPulse/minigrafx
#include "MiniGrafx.h"         // Copyright (c) 2017 by Daniel Eichhorn https://github.com/ThingPulse/minigrafx
#include "DisplayDriver.h"     // Copyright (c) 2017 by Daniel Eichhorn https://github.com/ThingPulse/minigrafx
#include "qrcode.h"            // Copyright (c) //https://github.com/ricmoo/qrcode/

#define SCREEN_WIDTH  296.0    // Set for landscape mode, don't remove the decimal place!
#define SCREEN_HEIGHT 128.0
#define BITS_PER_PIXEL 1
#define EPD_BLACK 0
#define EPD_WHITE 1
uint16_t palette[] = { 0, 1 };

// pins_arduino.h, e.g. LOLIN32
// BUSY -> 4, RST -> 16, DC -> 17, CS -> SS(5), CLK -> SCK(18), DIN -> MOSI(23), GND -> GND, 3.3V -> 3.3V
static const uint8_t EPD_BUSY = 4;
static const uint8_t EPD_SS   = 5;
static const uint8_t EPD_RST  = 16;
static const uint8_t EPD_DC   = 17;
static const uint8_t EPD_SCK  = 18;
static const uint8_t EPD_MOSI = 23;

EPD_WaveShare29 epd(EPD_SS, EPD_RST, EPD_DC, EPD_BUSY);
MiniGrafx gfx = MiniGrafx(&epd, BITS_PER_PIXEL, palette);

QRCode qrcode;

//#########################################################################################
void setup() {
  gfx.init();
  gfx.setRotation(0);
  gfx.fillBuffer(EPD_WHITE);
  Serial.begin(115200);
}

//#########################################################################################
void loop() {
  Display_QRcode(6, 165, "http://www.lockerswarm.com/unlock?id=foe93mvpdkw03fo"); //Paste URL here.
  gfx.commit();
  delay(5000);
  Clear_Screen();
}

//#########################################################################################
void Display_QRcode(int offset_x, int offset_y, const char* Message) {
#define element_size 4
  // Create the QR code ~120 char maximum
  uint8_t qrcodeData[qrcode_getBufferSize(3)];
  qrcode_initText(&qrcode, qrcodeData, 3, 0, Message);
      for (int y = 0; y < qrcode.size; y++) {
        for (int x = 0; x < qrcode.size; x++) {
          if (qrcode_getModule(&qrcode, x, y)) {
            display.setColor(EPD_BLACK);
            display.fillRect(x*element_size+offset_x,y*element_size+offset_y,element_size,element_size);
          }
          else
          {
            display.setColor(EPD_WHITE);
            gfx.fillRect(x*element_size+offset_x,y*element_size+offset_y,element_size,element_size);
          }
        }
      }
//  for (int y = 0; y < qrcode.size; y++) {
//    for (int x = 0; x < qrcode.size; x++) {
//      if (qrcode_getModule(&qrcode, x, y)) {
//      Serial.print("**");
//      } else {
//        Serial.print("  ");
//      }
//    }
//     Serial.print("\n");
//  }
}

//#########################################################################################
void Clear_Screen() {
  gfx.fillBuffer(EPD_WHITE);
  gfx.commit();
  delay(2000);
}
