$(document).ready(function () {

    //making array for the list of city
    var nameOfCity = [];
    console.log(nameOfCity);

    //making list of the city below search input,when enter in search field
    function renderlist() {

        var city = $("#newCity");
        city.empty();
        for (var i = 0; i < nameOfCity.length; i++) {
            var ulist = $("<ul>");

            ulist.addClass("list-group");
            ulist.attr("cityList", nameOfCity[i]);
            ulist.text(nameOfCity[i]);
            $("#newCity").append(ulist);
        }
    }
    //for local storage : showing last data when resfreshing,
    var storeData = JSON.parse(localStorage.getItem("key"));
    var localcity = $("#newCity");
    localcity.append("<ul>" + storeData + "</ul>");





    //click function;

    $("#run-search").on("click", function (event) {

        event.preventDefault();
        var searchItem = "";


        // alert("i am clicked");
        //capturing input field
        searchItem = $("#pwd").val().trim();
        //pushing search input into array
        nameOfCity.push(searchItem);
        //calling the renderlist which shows the list of search item.
        renderlist();
        console.log(searchItem);



        //query for daily weather
        var queryUrlBase = "https://api.openweathermap.org/data/2.5/weather?&appid=338c0f586b9c50338b849da24ff79609&units=imperial";
        //base query for five days forecast
        var queryFiveDays = "https://api.openweathermap.org/data/2.5/forecast?&Appid=338c0f586b9c50338b849da24ff79609&units=imperial";


        var newUrlDaily = queryUrlBase + "&q=" + searchItem;
        var newUrlForecast = queryFiveDays + "&q=" + searchItem;
        //ajax calling for daily weather
        $.ajax({
            url: newUrlDaily,
            method: "GET"
        }).then(function (data) {
            //storing data name: city name from the response: this is used for storing the data
            var citystoreName = localStorage.setItem("key", JSON.stringify(data.name));
            //appending the result from the calling ajax.
            var weathercard = $("#rowFirst").append("<div>");
            //before calling it should be empty
            weathercard.empty();

            var weatherName = weathercard.append("<p>");
            // converting ut time for date and time
            var sec = data.dt;
            var date = new Date(sec * 1000);
            var newTime = date.toLocaleTimeString();
            console.log(date, newTime);
            weatherName.append("<h3>" + data.name + " " + newTime + "<h3>");
            weatherName.append("<p>" + "Temperature: " + data.main.temp + "</p>");
            weatherName.append("<P>" + "Humidity: " + data.main.humidity + "</p>");
            weatherName.append("<p>" + "wind Speed: " + data.wind.speed + "</p>");
            ///calling ajax for uv index:
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
        //now on next ajax function , calling for 5 days forecast to display
        //start call for forecast
        $.ajax({
            url: newUrlForecast,
            method: "GET"
        }).then(function (forecast) {
            console.log(forecast);
            //var days=[0,8,16,24,32];//first i was trying to lope through this array.coz, we get 40 data from the ajax,in the interval of 3 hrs

            var forecastcard = $(".cardfirst");
            forecastcard.empty();

            for (i = 0; i < forecast.list.length; i++) {
                if (forecast.list[i].dt_txt.indexOf("18:00:00") !== -1) {
                    console.log(forecast.list[i].dt);
                    console.log(forecast)
                    console.log(forecast.list[i].main.temp);
                    console.log(forecast.list[i].main.humidity);


                    var utfiveday = new Date(forecast.list[i].dt * 1000);

                    var realfiveDate = utfiveday.toLocaleDateString();
                    console.log(realfiveDate);

                    var forecastcard = $(".cardfirst");

                    forecastcard.append("<div class=fiveDayColor>" + "<p>" + realfiveDate + "</p>" + `<img src="https://openweathermap.org/img/wn/${forecast.list[i].weather[0].icon}@2x.png">` + "<p>" + "Temperature: " + forecast.list[i].main.temp + "</p>" + "<p>" + "Humidity: " + forecast.list[i].main.humidity + "%" + "</p>" + "</div>")


                }


            }

        });
       
        $("#pwd").val("");//nothing will be in search item


    });




});



