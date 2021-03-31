var searchElement = document.querySelector("#city-search");
var userInput = document.querySelector("#cityInput");
var historyContainer = document.querySelector("#search-history");
var history = JSON.parse(localStorage.getItem("history")) || [];

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
    var searchURL = "api.openweathermap.org/data/2.5/weather?q=" + search + 
}