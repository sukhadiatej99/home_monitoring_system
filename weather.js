
console.log("weather");

(function() {
    console.log("weather start");

    function showUser() {
        var url="http://api.openweathermap.org/data/2.5/weather?id=6058560&appid=00bd21889d416d99b717deab7866eb70";
        console.log(url);

        fetch(url)
            .then(function(response) {
                return response.json();
            })

            .then(function(info) {
                //console.log(info);
                console.log("oh?");

                var sky=info.weather[0].main;
                var des=info.weather[0].description;
                var temp=info.main.temp;

                // culc to C from Kelvin
                var c_temp=temp-273.15;
                console.log(c_temp);
                var round_temp=c_temp.toFixed(1);

                console.log(des);
                console.log(sky);

                var a=sky+round_temp;
                console.log("this is a");
                console.log(a);

                document.querySelector('#weather').innerHTML=
                    "Weather: "+sky+",       Temp: "+round_temp+" C";
            })

            .catch(function(error) {
                console.log(error);
            });
    }

    showUser();

})();
