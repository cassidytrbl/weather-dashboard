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
  console.log(weatherData);
  var timestamp = weatherData.current.dt;
  var time = new Date(timestamp * 1000).toLocaleDateString("en-US");
  document.getElementById("temp").textContent =
    "Temp: " + weatherData.current.temp;
  document.getElementById("time-zone").textContent =
    "Time Zone: " + weatherData.timezone;
  document.getElementById("humd").textContent =
    "Humidity: " + weatherData.current.humidity;
  document.getElementById("uv").textContent =
    "UV Index: " + weatherData.current.uvi;
  document.getElementById("wind").textContent =
    "Wind :" + weatherData.current.wind_speed;
  document.getElementById("time").textContent = "Time :" + time;
  assignValues(weatherData.daily[1], "One");
  assignValues(weatherData.daily[2], "Two");
  assignValues(weatherData.daily[3], "Three");
  assignValues(weatherData.daily[4], "Four");
  assignValues(weatherData.daily[5], "Five");
}

function assignValues(weatherData, day) {
  var timestamp = weatherData.dt;
  var time = new Date(timestamp * 1000).toLocaleDateString("en-US");
  document.getElementById("time" + day).textContent = "Time :" + time;
  document.getElementById("wind" + day).textContent =
    "Wind :" + weatherData.wind_speed;
  document.getElementById("humd" + day).textContent =
    "Humidity: " + weatherData.humidity;
  document.getElementById("temp" + day).textContent =
    "Temp: " + weatherData.temp.day;
}

submitButton.addEventListener("click", cityCoord);
cityButtons.forEach(setListenersForCityButtons);

function setListenersForCityButtons(element) {
  element.addEventListener("click", function () {
    cityNameInput.value = element.textContent;
    cityCoord();
  });
}
