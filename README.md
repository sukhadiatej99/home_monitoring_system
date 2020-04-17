# home_monitoring_system
This is a repo for Home Monitoring System IMS 

Smoke/gas detector.
Temperature sensor.
PhotoResistor.

When the smoke reaches to 20 then it will give alert to user it will turn the buzzer on and the light will be turned red.

It also has sms alert system in it with Twilio services.
If the temperature is more then 40 it will send sms alert to user.
If the gas reading is 20 then it will dens sms alert to user.

The whole readings will be refreshed after 10 seconds.

To install 

npm install

node index.js

Api of news and weather is also added to it,
live data from weather api and news api are being pulled.

It also has notification tab in it that will give notification on the page whether everything good on the page or not.
