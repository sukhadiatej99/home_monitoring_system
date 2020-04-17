let express = require('express');
let app = express();
let http = require('http').createServer(app);
// let Sensor = require('./models/sensor.js');
let io = require('socket.io')(http);
const accountSid = 'ACCOUNT_SID';
const authToken = 'AUTH_TOKEN';
const client = require('twilio')(accountSid, authToken);



app.use(express.static("./public"));

// var mongoose = require('mongoose');
// mongoose.connect('mongodb+srv://tejs:tej121232@cluster0-8sdw7.mongodb.net/hms?retryWrites=true&w=majority', function(err){
// 	if(err) {
// 		console.log('connection error:', err)
// 	} else {
// 		console.log('connection successful')
// 	}
// },{useNewUrlParser: true}
// );

// let db = mongoose.connect;

http.listen(3000, function(){
    console.log(`server is running at:
     http://localhost:3000`);
});

// const SerialPort = require('serialport');
// const Readline = SerialPort.parsers.Readline;
// const port = new SerialPort('COM8'); //Connect serial port to port COM3. Because my Arduino Board is connected on port COM3. See yours on Arduino IDE -> Tools -> Port
// const parser = port.pipe(new Readline({ delimiter: '\r\n' }));

// var n = 0;

// parser.on('data', (temp) => { //Read data
//     //console.log(temp);
//     var val = temp.split(",");
//     num++;
//     console.log(num);
//     if (num >= 2880) {// arduino is sending data after every 5 sec if recieved 2880 data sets that mean 4 hour has passed so saving data after every 4 in the data base.
//         num = 0;
//         let dat = new Sensor();
//         dat.temperature = val[0];
//         dat.gas = val[1];
//         dat.light = val[2];
//         dat.save(err => {
//             if (err) {
//                 console.log(err);
//             } else {
//                 console.log('sensor data is saved on database.')
//             }
//         });
// 	}
// 	var today = new Date();
// 	io.sockets.emit('temp', { date: today.getDate() + "-" + today.getMonth() + 1 + "-" + today.getFullYear(), time: (today.getHours()) + ":" + (today.getMinutes()), temp: val[0], ph: val[1], tbd: val[2] });
// });

let five = require('johnny-five');
let arduino = new five.Board();
let temp,photoresistor;
let light_pin_led;
const { Board, Led } = require("johnny-five");
const board = new Board()

arduino.on('ready', function(){

	const led = new Led.RGB({
		pins: {
		  red: 6,
		  green: 5,
		  blue: 3
		}
	  });

	  led.on();
  				led.color("#008000");

	var gas = new five.Sensor("A1");
	var alarm = new five.Piezo(9);


  	gas.scale(0, 100).on("change", function() {
		if (this.value > 20) {
			if (!alarm.isPlaying) {
			  alarm.frequency(five.Piezo.Notes.a5, 5000);
			  led.on();
  				led.color("#FF0000");
			}
			//this will send sms to the user if gas is more then 20
			client.messages
 			 .create({
     			body: 'Dangerous gas level',
     			from: 'FROM_NUMBER',
     			to: 'NUMBER_YOU_WANT_TO_SEND_MESSAGE'
   })
  .then(message => console.log(message.sid));
		}
			else
			{
				led.on();
  				led.color("#008000");
  				
			}
		  
      console.log(this.value);
	});
	temp = new five.Thermometer({
        controller: 'LM35', 
        pin: 'A0',
		freq: 5000
		
	});
	photoresistor = new five.Sensor({
		pin: "A2",
		freq: 5000
	  });


	temp.on('data', function(){

		if (this.celsius > 40) {
			if (!alarm.isPlaying) {
			  alarm.frequency(five.Piezo.Notes.a5, 5000);
			  led.on();
  				led.color("#FF0000");
			}
			//this will send sms to the user if the temperature is more then 40
			client.messages
			.create({
				body: 'Dangerous temperature level',
				from: 'FROM_NUMBER',
				to: 'NUMBER_YOU_WANT_TO_SEND_MESSAGE'
			  })
		}
			else
			{
				led.on();
  				led.color("#008000");
  				
			}

		console.log(this.celsius);
        io.sockets.emit('tempReading', this.celsius);
	})
	
	

	gas.on('data', function(){
        io.sockets.emit('gasReading', this.value);
	})
	photoresistor.on("data", function() {
		console.log(this.value);
		io.sockets.emit('photoReading', this.value);
	});

	//this will refresh all sensors after 10 seconds
	arduino.samplingInterval(10000);

});

