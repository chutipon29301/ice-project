#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>

const char* ssid = "CTiPhone";
const char* password = "00000000";

const char* serial;
const char* id;

void setup() {
  xTaskCreate(&LEDTwo_Task, "LEDTwo_Task", 2048, NULL, 10, NULL);

  Serial.begin(115200);

  delay(1000);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi..");
  }

  Serial.println("Connected to the WiFi network");


}

void loop() {
  getReq();
}

void getReq() {
  if ((WiFi.status() == WL_CONNECTED)) { //Check the current connection status

    HTTPClient http;

    http.begin("http://172.20.10.2:3000/test"); //Specify the URL
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
        // Parameters
        serial = root["serial"];
        Serial.print("serial:");
        Serial.println(serial);

        id = root["id"];
        Serial.print("id:");
        Serial.println(id);


        delay(100);
      }
    }

    else {
      Serial.println("Error on HTTP request");
    }

    http.end(); //Free the resources
  }

  delay(500);
}

void blinkBlink() {
  digitalWrite(LED_BUILTIN, HIGH);   // turn the LED on (HIGH is the voltage level)
  delay(1000);                       // wait for a second
  digitalWrite(LED_BUILTIN, LOW);    // turn the LED off by making the voltage LOW
  delay(1000);                       // wait for a second
}

void LEDTwo_Task(void *p){
  pinMode(LED_BUILTIN, OUTPUT);
  while(1) {
    digitalWrite(LED_BUILTIN, !digitalRead(LED_BUILTIN));
    delay(300);
  }
}
