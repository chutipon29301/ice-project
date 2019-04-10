#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>

const char* ssid = "CTiPhone";
const char* password = "00000000";
int status = 0;
#define DOOR_LOCK 23

int req = 0;

void setup() {

  Serial.begin(115200);
  pinMode(LED_BUILTIN, OUTPUT);
  pinMode(DOOR_LOCK, OUTPUT);

  delay(2000);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi..");
  }

  Serial.println("Connected to the WiFi network");


}

void loop() {

  if ((WiFi.status() == WL_CONNECTED)) { //Check the current connection status

    HTTPClient http;

    http.begin("https://ice-project-liff.herokuapp.com/locker-status"); //Specify the URL
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
        status = root["status"];
        Serial.print("status:");
        Serial.println(status);

        if (status == 1) {
          digitalWrite(LED_BUILTIN, LOW);
          digitalWrite(DOOR_LOCK, LOW); //
          Serial.println("LED ON");
        }else{
          digitalWrite(LED_BUILTIN,HIGH);
          digitalWrite(DOOR_LOCK, HIGH);
          Serial.println("LED OFF");
        }
      }

      req++;
      Serial.println(req);
    }

    else {
      Serial.println("Error on HTTP request");
    }

    http.end(); //Free the resources
  }

  delay(500);

}
