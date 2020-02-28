let express = require('express');
let app = express();
let http = require('http').createServer(app);
let io = require('socket.io')(http);

app.use(express.static("./public"));

http.listen(3000, function(){
    console.log(`server is running at:
     http://localhost:3000`);
});

let five = require('johnny-five');
let arduino = new five.Board();
let temp;
let light_pin_led;
const { Board, Led } = require("johnny-five");
const board = new Board();

arduino.on('ready', function(){

    var gas = new five.Sensor("A0");

  gas.scale(0, 100).on("change", function() {
      console.log(this.value);
    if (this.value > 60) {
        console.log(this.value);

        board.on("ready", () => {
            const led = new Led(13);
            board.repl.inject({
              led
            });
          
            led.blink();
          });
    }
  });
    temp = new five.Thermometer({
        controller: 'LM35', 
        pin: 'A1',
        freq: 5000
    });


    temp.on('data', function(){
        io.sockets.emit('temp', this.celsius);
    })
})