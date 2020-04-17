console.log("Linked up");

let socket = io.connect("http://localhost:3000");
let therm1 = document.querySelector("#temp1");
let therm2 = document.querySelector("#temp2");
let therm3 = document.querySelector("#temp3");

let gas = document.querySelector("#somke")
let photo1 = document.querySelector("#light1");
let photo2 = document.querySelector("#light2");
let x = document.querySelector("#warn");

socket.on('tempReading', function(tempReading){
	console.log(tempReading);
	if(tempReading <= 30 )
	{
		therm1.innerHTML = tempReading + "°C";
		therm2.innerHTML = "";
		therm3.innerHTML = "";
	}
	else if(tempReading > 30 && tempReading <= 38 )
	{
		therm2.innerHTML = tempReading + "°C";
		therm1.innerHTML = "";
		therm3.innerHTML = "";
	}
	else if(tempReading > 38 )
	{
		therm3.innerHTML = tempReading + "°C";
		therm2.innerHTML = "";
		therm1.innerHTML = "";
	}
	if(tempReading < 30) {
		x.style.color = '#76ef40';
		document.querySelector("#warn").innerHTML = "Your house is safe.";
	}
	else if(tempReading >= 30 && tempReading < 38){
		x.style.color = 'yellow';
		document.querySelector("#warn").innerHTML = "Your House may be at risk";
	}
	else if(tempReading >= 38){
		x.style.color = 'Red';
		document.querySelector("#warn").innerHTML = "Your house is in danger";
	}
});

socket.on('gasReading', function(gasReading){
	// console.log(gasReading);
	var sr = Math.round(gasReading);
	//smoke.innerHTML = Math.round(gasReading);


	if(sr <= 27 )
	{
		smoke1.innerHTML = "Normal";
		smoke2.innerHTML = "";
		smoke3.innerHTML = "";
	}
	else if(sr > 27 && sr <= 32 )
	{
		smoke2.innerHTML = "High";
		smoke1.innerHTML = "";
		smoke3.innerHTML = "";
	}
	else if(sr > 32 )
	{
		smoke3.innerHTML = "Very High";
		smoke2.innerHTML = "";
		smoke1.innerHTML = "";
	}

	if(gasReading < 27) {
		x.style.color = '#76ef40';
		document.querySelector("#warn").innerHTML = "Your house is safe.";
	}
	else if(gasReading >= 27 && gasReading < 32){
		x.style.color = 'yellow';
		document.querySelector("#warn").innerHTML = "Your House may be at risk";
	}
	else if(gasReading >= 32){
		x.style.color = 'Red';
		document.querySelector("#warn").innerHTML = "Your house is in danger";
	}
});

socket.on('photoReading', function(photoReading){
	console.log("photo",photoReading);
	if(photoReading < 500 )
	{
		photo1.innerHTML = "Good";
		photo2.innerHTML = "";
	}
	else if(photoReading > 500 )
	{
		photo2.innerHTML = "Bad";
		photo1.innerHTML = "";
	}
});
