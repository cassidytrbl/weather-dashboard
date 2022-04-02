var cityNameInput = document.getElementById("citynameinput");
var submitButton = document.getElementById("submit");
var weatherApiKey = "63272ad5fdffaa171b73c47741075154";


function weatherData(coordData) {
  var lat = coordData.lat;
  var lon = coordData.lon;
  var weatherURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${weatherApiKey}`;

  fetch(weatherURL)
    .then(function (res) {
      return res.json();
    })
    .then(function (weatherData) {
      displayWeather(weatherData);
    })
    .catch(function (error) {
      console.log(error);
    });
}

function cityCoord() {
  var search = cityNameInput.value;
  var cordURL = `https://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=5&appid=${weatherApiKey}`;

  fetch(cordURL)
    .then(function (res) {
      return res.json();
    })
    .then(function (coordData) {
      weatherData(coordData[0]);
    })
    .catch(function (error) {
      console.log(error);
    });
}

function displayWeather(weatherData){
    // to use the data for your html doc use this syntax: weatherData.current.temp
    // and then element.textContent =  weatherData.current.temp
    // if the data is in an array do something like this: weatherData.daily[0].temp.max
}

submitButton.addEventListener("click", cityCoord);
