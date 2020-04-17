

var request=new XMLHttpRequest();

var news_request=new XMLHttpRequest();
console.log("here");
//request.open("GET", "//newsapi.org/v2/top-headlines?country=ca&category=health&apiKey=d0c2c5c1dc83496cb0003c93f931aeca", true);

// http://newsapi.org/v2/top-headlines?country=ca&category=health&apiKey=d0c2c5c1dc83496cb0003c93f931aeca


//self executing anonymous function
(function() {
    console.log("start");

    function showUser() {
        var url="http://newsapi.org/v2/top-headlines?country=ca&category=health&apiKey=d0c2c5c1dc83496cb0003c93f931aeca";
        console.log(url);

        fetch(url)
            .then(function(response) {
                return response.json();
            })
            .then(function(people) {
                console.log(people);
                console.log("ah?");



                for(var i=0;i<5;i++) {
                    var a=people.articles[i].title;
                    var b=people.articles[i].url;
                    var c=people.articles[i].urlToImage;
                    console.log(b);
                    document.querySelector('#news').innerHTML+=
                        '<ul id = "newslist">'+'<li>'+
                        '<img src="'+people.articles[i].urlToImage+'">'+
                        '<a href='+people.articles[i].url+'>'+people.articles[i].title+'</a>'+'</li>'+'</ul>'
                    console.log(a);
                }
            })
            .catch(function(error) {
                console.log(error);
            });
    }

    showUser();
})();
