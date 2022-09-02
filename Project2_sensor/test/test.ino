#if defined(ESP32)
#include <WiFi.h>
#elif defined(ESP8266)
#include <ESP8266WiFi.h>
#endif
#include <Firebase_ESP_Client.h>

//Provide the token generation process info.
#include "addons/TokenHelper.h"
//Provide the RTDB payload printing info and other helper functions.
#include "addons/RTDBHelper.h"

#define WIFI_SSID "1280"
#define WIFI_PASSWORD "12345678"

#define API_KEY "AIzaSyAJqC_6ghou_tttkOzmB04A-uC3J9RSTQ8"

#define USER_EMAIL "hienchamhoc@gmail.com"
#define USER_PASSWORD "123456"

#define DATABASE_URL "https://esp32-firebase-demo-3f5c6-default-rtdb.asia-southeast1.firebasedatabase.app/"

//Define Firebase Data object
FirebaseData fbdo;

FirebaseAuth auth;
FirebaseConfig config;
unsigned long sendDataPrevMillis = 0;
bool signupOK = false;

const int ledPin = 2;
bool air_conditioner_status = false;
void setup() {
  // initialize digital pin ledPin as an output.
  pinMode(ledPin, OUTPUT);

  
  Serial.begin(115200);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to Wi-Fi");
  while (WiFi.status() != WL_CONNECTED){
    Serial.print(".");
    delay(300);
  }
  Serial.println();
  Serial.print("Connected with IP: ");
  Serial.println(WiFi.localIP());
  Serial.println();

   /* Assign the api key (required) */
  config.api_key = API_KEY;

  /* Assign the user sign in credentials */
  auth.user.email = USER_EMAIL;
  auth.user.password = USER_PASSWORD;

  /* Assign the RTDB URL (required) */
  config.database_url = DATABASE_URL;

  /* Sign up */
//  if (Firebase.signUp(&config, &auth, "", "")){
//    Serial.println("ok");
//    signupOK = true;
//  }
//  else{
//    Serial.printf("%s\n", config.signer.signupError.message.c_str());
//  }
  
  /* Assign the callback function for the long running token generation task */
  config.token_status_callback = tokenStatusCallback; //see addons/TokenHelper.h
  
  Firebase.begin(&config, &auth);
  signupOK = true;
  Firebase.reconnectWiFi(true);
}

// the loop function runs over and over again forever
void loop() {

  //get air_conditioner_status
  if (Firebase.RTDB.getBool(&fbdo, "storage1/air_conditioner_status")) {
      if (fbdo.dataType() == "boolean") {
        air_conditioner_status = fbdo.boolData();
        Serial.println("air_conditioner_status: " + air_conditioner_status);
      }
      if (fbdo.boolData() == false) Serial.println("fbdo false.");
      if (air_conditioner_status == false) Serial.println("air_conditioner_status false.");
     
    }
    else {
      Serial.println(fbdo.errorReason());
    }
    digitalWrite(ledPin, air_conditioner_status);
    
if (Firebase.ready() && signupOK && (millis() - sendDataPrevMillis > 15000 || sendDataPrevMillis == 0)){
  
}
    
  if (Firebase.ready() && signupOK && (millis() - sendDataPrevMillis > 15000 || sendDataPrevMillis == 0)){
    sendDataPrevMillis = millis();
    // put temperature
    if (Firebase.RTDB.setInt(&fbdo, "storage1/temperature", random(-20,20))){
      Serial.println("PASSED");
      Serial.println("PATH: " + fbdo.dataPath());
      Serial.println("TYPE: " + fbdo.dataType());
    //  Serial.println("DATA: " + fbdo.to<int>());
    }
    else {
      Serial.println("FAILED");
      Serial.println("REASON: " + fbdo.errorReason());
    }
    
    // put humidity
    if (Firebase.RTDB.setFloat(&fbdo, "storage1/humidity", 0.23 + random(50,90))){
      Serial.println("PASSED");
      Serial.println("PATH: " + fbdo.dataPath());
      Serial.println("TYPE: " + fbdo.dataType());
    }
    else {
      Serial.println("FAILED");
      Serial.println("REASON: " + fbdo.errorReason());
    }

    //put air_conditioner_status
    if (Firebase.RTDB.setBool(&fbdo, "storage1/air_conditioner_status", air_conditioner_status)){
      Serial.println("PASSED");
      Serial.println("PATH: " + fbdo.dataPath());
      Serial.println("TYPE: " + fbdo.dataType());
    }
    else {
      Serial.println("FAILED");
      Serial.println("REASON: " + fbdo.errorReason());
    }
  }
  
}
