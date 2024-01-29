function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#current-city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");

  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon"/>`;
  temperatureElement.innerHTML = Math.round(temperature);

  getForecast(response.data.city);
}

function searchCity(city) {
  let apiKey = "t834a990953dfdo9d638f4cafb8d2a4b";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = searchInput.value;
  searchCity(searchInput.value);
}
let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Tokyo");

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wedsnesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "t834a990953dfdo9d638f4cafb8d2a4b";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `<div class= "weather-forecast-day">
        <span class="weather-forecas-date">${formatDay(day.time)} </span>
        <span class="forecast-icon"
        ><img
          src="${day.condition.icon_url}"/>
                </span>
        <span class="weather-forecast-temperatures">
              <span class="weather-forecast-temperatures-max"
                ><strong>${Math.round(day.temperature.maximum)}℃</strong></span
              >/
        <span class = "weather-forecast-temperatures-min" >${Math.round(
          day.temperature.minimum
        )}℃</span>
        </span>
      </div>`;
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}
displayForecast();
