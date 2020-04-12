$(document).ready(function () {

    // for (var i = 0; i < localStorage.length; i++) {
    //     var city = localStorage.getItem(i);
    // }
//     init();
//     function init(){
         var storeData=JSON.parse(localStorage.getItem("key"));
         
console.log(storeData);
//     }
// function renterbutton(){

//     for (var i=0;i<localStorage.length;i++){
//         var nameCity=localStorage.getItem(data.name[i]);
//         console.log(nameCity);
//         var city=$(".card");
//         // var a=$("<button>");
//         // a.
//         city.append("<button>"+nameCity+"</button>");
//     }
    
// }
// for (var i=0;i<localStorage.length;i++){
//     var nameCity=localStorage.getItem(i);
//     var city=$(".card");
//     city.append("<p>"+nameCity+"</p>");
// }




    $("#run-search").on("click", function (event) {

        event.preventDefault();
        var searchItem="";
        
        // alert("i am clicked");
        searchItem = $("#pwd").val().trim();
        console.log(searchItem);
        // searchItem=localStorage;



        var queryUrlBase = "http://api.openweathermap.org/data/2.5/weather?&appid=338c0f586b9c50338b849da24ff79609&units=imperial";

        var queryFiveDays = "https://api.openweathermap.org/data/2.5/forecast?&Appid=338c0f586b9c50338b849da24ff79609&units=imperial";


        var newUrlDaily = queryUrlBase + "&q=" + searchItem;
        var newUrlForecast = queryFiveDays + "&q=" + searchItem;
        // keyCount = 0;
        $.ajax({
            url: newUrlDaily,
            method: "GET"
        }).then(function (data) {
            var cityList = $("#newCity").append("<div>")
            cityList.append("<h5>"+data.name+"</h5>");
            cityList.text(data.name);

             localStorage.setItem("key",JSON.stringify(data.name));

            // keyCount = keyCount + 1;//
            
            //for current weather
            var weathercard = $("#rowFirst").append("<div>");
            weathercard.empty();

            var weatherName = weathercard.append("<p>");
            // for date
            var sec = data.dt;
            var date = new Date(sec * 1000);
            var newTime = date.toLocaleTimeString();
            console.log(date, newTime);
            weatherName.append("<h3>" + data.name + " " + newTime + "<h3>");
            weatherName.append("<p>" + "Temperature: " + data.main.temp + "</p>");
            weatherName.append("<P>" + "Humidity: " + data.main.humidity + "</p>");
            weatherName.append("<p>" + "wind Speed: " + data.wind.speed + "</p>");

            //uv index url
            var uvURLBase = "https://api.openweathermap.org/data/2.5/uvi?"//
            var apiKey = "338c0f586b9c50338b849da24ff79609";
            var langitude = data.coord.lat;
            var longitude = data.coord.lon;

            $.ajax({
                url: uvURLBase + "appid=" + apiKey + "&lat=" + langitude + "&lon=" + longitude,
                method: "GET"
            }).then(function (response) {
                console.log(response);
                console.log(response.value);

                weatherName.append("<p>" + "UV-index: " + response.value);
            });



            console.log(data);

            console.log(data.name);
            console.log(data.main.temp);
            console.log(data.main.humidity);
            console.log(data.wind.speed);
            console.log(data.dt);


        })
        //start call for forecast
        $.ajax({
            url: newUrlForecast,
            method: "GET"
        }).then(function (forecast) {
            console.log(forecast);
            //var days=[0,8,16,24,32];
            for (i = 0; i < forecast.list.length; i++) {
                if (forecast.list[i].dt_txt.indexOf("18:00:00") !== -1) {
                    console.log(forecast.list[i].dt);
                    console.log(forecast)
                    console.log(forecast.list[i].main.temp);
                    console.log(forecast.list[i].main.humidity);


                    var utfiveday=new Date(forecast.list[i].dt*1000);
                    // console.log("five day date"+utfiveday);
                    var realfiveDate = utfiveday.toLocaleDateString();
                    console.log(realfiveDate);
                    
                    var forecastcard = $(".cardfirst");
                    //  forecastcard.empty();
                    forecastcard.append("<div class=fiveDayColor>" + "<p>" + realfiveDate + "</p>" + `<img src="https://openweathermap.org/img/wn/${forecast.list[i].weather[0].icon}@2x.png">` + "<p>" + "Temperature: " + forecast.list[i].main.temp + "</p>" + "<p>" + "Humidity: " + forecast.list[i].main.humidity + "%" + "</p>" + "</div>")
                }

            }

        });

        // renterbutton();




    });




});



