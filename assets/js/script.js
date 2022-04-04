var cityNameInput = document.getElementById("citynameinput");
var submitButton = document.getElementById("submit");

var cityButtons = [
  document.getElementById("austin"),
  document.getElementById("chicago"),
  document.getElementById("new-york"),
  document.getElementById("orlando"),
  document.getElementById("san-francisco"),
  document.getElementById("seattle"),
  document.getElementById("denver"),
  document.getElementById("atlanta"),
];

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

function displayWeather(weatherData) {
  document.getElementById("time-zone").textContent =
    "Time Zone: " + weatherData.timezone;
}

submitButton.addEventListener("click", cityCoord);
cityButtons.forEach(setListenersForCityButtons);

function setListenersForCityButtons(element) {
  element.addEventListener("click", function () {
    cityNameInput.value = element.textContent;
    cityCoord();
  });
}
