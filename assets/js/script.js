var searchElement = document.querySelector("#city-search");
var userInput = document.querySelector("#cityInput");
var historyContainer = document.querySelector("#search-history");
var history = JSON.parse(localStorage.getItem("history")) || [];
var apiKey = "3273be5ddae13e1b574c10140ba3a466";

var searchFunction = function (event) {
    var search = userInput.value.trim(); 

    if (search) {
        forecastInfo(search);
    }
    else {
        alert("Error please be sure to enter a valid city.");
    }

    event.preventDefault();
}

var forecastInfo = function (search) {
    // Add a feature to ask user if they prefer metric or imperial units
    var searchURL = "api.openweathermap.org/data/2.5/weather?q=" + search
        + "&units=imperial&appid=" + apiKey;
    fetch(searchURL)
        .then(response => response.json())
        .then(function (weatherInfo) {
            history.unshift(weatherInfo.name);
            localStorage.setItem("Search History", json.stringify(history));
            showHistory();
        })

    var searchLat = weatherInfo.coord.lat;
    var searchLon = weatherInfo.coord.lat;
    var uvSearchURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + searchLat 
        + "&lon=" + searchLon + "&exclude=minutely,hourly&appid=" + apiKey;
    fetch(uvSearchURL)
        .then(response => response.json)
        .then(function (weatherInfo) {
            var uvI = weatherInfo.value;
            if (uvI <= 2) {
                $(".badge-success").text("UV Index: " + uvI);
                $(".badge-success").show();
                $(".badge-warning").hide();
                $(".badge-danger").hide(); 
            }
            else {
                if (uvI > 2 && uvI <=7) {
                    $(".badge-warning").text("UV Index: " + uvI);
                    $(".badge-success").hide();
                    $(".badge-warning").show();
                    $(".badge-danger").hide(); 
                }
                else {
                    $(".badge-danger").text("UV Index: " + uvI);
                    $(".badge-success").hide();
                    $(".badge-warning").hide();
                    $(".badge-danger").show(); 
                }
            }
        })
    var now = moment().format("M/D/YYYY");

    $(".badge").display = "none";

    $(".cityInput").html("<h1>" + weatherInfo.name + " (" + now + ")" + "</h1>");
    $(".icon").attr("src", "http://openweathermap.org/img/w/" + weatherInfo.weather[0].icon
        + ".png");
    $(".temperatureResult").text("Temperature: " + Math.floor(weatherInfo.current.temp) + "° F")
    $(".humidityResult").text("Humidity: " + weatherInfo.current.humidity + "%");
    $(".windResult").text("Wind Speed: " + weatherInfo.current.wind_speed + " MPH")

    var fiveDayURL = "api.openweathermap.org/data/2.5/forecast?q=" + search + "&appid=" + apiKey;
    
}

function showHistory() {

}