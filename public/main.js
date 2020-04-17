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
		x.style.color = 'green';
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
	console.log(gasReading);
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
		x.style.color = 'green';
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

// socket.on('tempReading', function(tempReading){
// 	// console.log(tempReading);
// 	therm.innerHTML = tempReading;
		
// 		if(tempReading < 25) {
// 			x.style.color = 'green';
// 			document.querySelector("#warn").innerHTML = "Your house is safe.";
// 		}
// 		else if(tempReading >= 25 && tempReading < 40){
// 			x.style.color = 'yellow';
// 			document.querySelector("#warn").innerHTML = "Your House could be at risk";
// 		}
// 		else if(tempReading >= 40){
// 			x.style.color = 'Red';
// 			document.querySelector("#warn").innerHTML = "Your house is in danger";
// 		}
// });

// socket.on('smokeReading', function(smokeReading){
// 	// console.log(smokeReading);
// 	smoke.innerHTML = smokeReading;
// 	if(smokeReading < 25) {
// 		x.style.color = 'green';
// 		document.querySelector("#warn").innerHTML = "Your house is safe.";
// 	}
// 	else if(smokeReading >= 25 && smokeReading < 40){
// 		x.style.color = 'yellow';
// 		document.querySelector("#warn").innerHTML = "Your House could be at risk";
// 	}
// 	else if(smokeReading >= 40){
// 		x.style.color = 'Red';
// 		document.querySelector("#warn").innerHTML = "Your house is in danger";
// 	}
// });

// socket.on('humidityReading', function(humidityReading){
// 	// console.log(humidityReading);
// 	moist.innerHTML = humidityReading;
// 	if(humidityReading < 25) {
// 		x.style.color = 'green';
// 		document.querySelector("#warn").innerHTML = "Your house is safe.";
// 	}
// 	else if(humidityReading >= 25 && humidityReading < 40){
// 		x.style.color = 'yellow';
// 		document.querySelector("#warn").innerHTML = "Your House could be at risk";
// 	}
// 	else if(humidityReading >= 40){
// 		x.style.color = 'Red';
// 		document.querySelector("#warn").innerHTML = "Your house is in danger";
// 	}
// });

// function warning(tempReading, smokeReading, humidityReading){
// 	if(tempReading < 25 && smokeReading < 25 && humidityReading < 25) {
// 		x.style.color = 'green';
// 		document.querySelector("#warn").innerHTML = "Your house is safe.";
// 	}
// 	else if(tempReading >= 25 && tempReading < 40 && smokeReading >= 25 && smokeReading < 40 && humidityReading >= 25 && humidityReading < 40){
// 		x.style.color = 'yellow';
// 		document.querySelector("#warn").innerHTML = "Your House could be at risk";
// 	}
// 	else if(tempReading >= 40 && smokeReading >= 40 && humidityReading >= 40){
// 		x.style.color = 'yellow';
// 		document.querySelector("#warn").innerHTML = "Your House could be at risk";
// 	}
// }

// warning();


mapboxgl.accessToken = 'pk.eyJ1Ijoic3VrYWhkaWF0ZWo5OSIsImEiOiJjazczcnU4dHUwZzdrM2xwN3k0dXNydWFlIn0.COUcjjkpIgjgwiUopxldsA';

let map = new mapboxgl.Map({
	container: 'map',
	style: 'mapbox://styles/mapbox/streets-v11',
	center: [-96, 37.8],
	zoom: 1
});

map.addControl(
	new mapboxgl.GeolocateControl({
		positionOptions: {
			enableHighAccuracy: true
		},
		trackUserLocation: true
	})
)
