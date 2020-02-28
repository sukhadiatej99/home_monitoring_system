console.log("Linked up");

let socket = io.connect("http://localhost:3000");
let therm = document.querySelector("#thermometer");

socket.on('temp', function(temp){
	console.log(temp);
	therm.innerHTML = temp;
});