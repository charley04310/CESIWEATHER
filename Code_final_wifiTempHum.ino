#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClient.h>
#include <SHT21.h>
#include <LiquidCrystal_I2C.h>

// Variables
#define STASSID "Livebox-9BBC"
#define STAPSK  "YFNc6evoH3RZ26x4h5"
int lcdColumns = 16;
int lcdRows = 2;
LiquidCrystal_I2C lcd(0x27, lcdColumns, lcdRows);
SHT21 sht;
float temp;
float humidity;
String serverName = "http://92.167.119.186:8080/";


void setup() {
  Serial.begin(115200);

// Setup du LCD pour préparer l'écran LCD à un affichage
  lcd.init();                     
  lcd.backlight();

// Setup du WiFi pour montrer sa connexion réussie et avec l'adresse IP affiché
  WiFi.begin(STASSID, STAPSK);

  while (WiFi.status() != WL_CONNECTED) {
    delay(2000);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Connected! IP address: ");
  Serial.println(WiFi.localIP());
  lcd.clear();
  lcd.setCursor(0,1);
  lcd.print(WiFi.localIP());
  delay(5000);
}

void loop() {

// Température
temp = sht.getTemperature();
humidity = sht.getHumidity();

// Affichage des données de Température et d'Humidité sur le Moniteur Série
  Serial.print("Temp: ");			// print readings
  Serial.print(temp);
  Serial.print("Humidity: ");
  Serial.println(humidity);
  delay(3000);
  
// Affichage des données de Température et d'Humidité sur l'écran LCD
  lcd.clear();
  lcd.setCursor(0,0);
  lcd.print("Temp: ");
  lcd.print(temp);
  lcd.print(" C");
  lcd.setCursor(0,1);
  lcd.print("Hum : ");
  lcd.print(humidity);
  lcd.print(" %");
  delay(10000);
  lcd.clear();

// Requête HTTP
   if (WiFi.status() == WL_CONNECTED) {   // Check connection Wifi
    HTTPClient http;    // Declare object of class HTTPClient
      // Your Domain name with URL path or IP address with path
      http.begin(serverName);

      // Specify content-type header
      //http.addHeader("Content-Type", "application/x-www-form-urlencoded");
      // Data to send with HTTP POST
      //String httpRequestData = "api_key=tPmAT5Ab3j7F9&sensor=BME280&value1=24.25&value2=49.54&value3=1005.14";           
      // Send HTTP POST request
      //int httpResponseCode = http.POST(httpRequestData);
      
      // If you need an HTTP request with a content type: application/json, use the following:
      //http.addHeader("Content-Type", "application/json");
      //int httpResponseCode = http.POST("{\"api_key\":\"tPmAT5Ab3j7F9\",\"sensor\":\"BME280\",\"value1\":\"24.25\",\"value2\":\"49.54\",\"value3\":\"1005.14\"}");

      // If you need an HTTP request with a content type: text/plain
      http.addHeader("Content-Type", "application/json");
      int httpResponseCode = http.POST("Hello, World!");
     
      Serial.print("HTTP Response code: ");
      Serial.println(httpResponseCode);
      
    http.end();  // Close connection
   } 
   else {
    Serial.println("Error in WiFi connection"); // If, the connection isn't working, print in serial monitor this message
   }
  delay(30000);  // Send a request every 3 seconds
}
