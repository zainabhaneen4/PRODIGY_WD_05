function getWeatherForecast() {
    const city = document.getElementById('cityInput').value;

    if (city) {
        const apiKey = 'bc7edb5fab11464be53145b73df45d7c';
        const forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
        const currentWeatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

        function getCurrentWeatherData() {
            return fetch(currentWeatherApiUrl)
                .then(response => response.json())
                .then(data => {
                    console.log('Current Weather Data:', data);
                    const locationName = data.name;
                    const locationInfo = document.getElementById('locationInfo');
                    locationInfo.innerHTML = `<h2>${locationName}</h2>`;
                });
        }

        function get5DayForecastData() {
            return fetch(forecastApiUrl)
                .then(response => response.json())
                .then(data => {
                    const weatherInfo = document.getElementById('weatherInfo');
                    weatherInfo.innerHTML = '';
                    for (let i = 0; i < data.list.length; i += 8) {
                        const forecast = data.list[i];
                        const date = new Date(forecast.dt_txt);
                        const day = date.toLocaleDateString('en-US', { weekday: 'long' });
                        const weatherDescription = forecast.weather[0].description;
                        let weatherImageUrl = '';
                        switch (weatherDescription.toLowerCase()) {
                            case 'scattered clouds':
                                weatherImageUrl = 'images/cloud.png';
                                break;
                            case 'few clouds':
                                weatherImageUrl = 'images/stormy.png';
                                break;
                            case 'broken clouds':
                                weatherImageUrl = 'images/scatter.jpg';
                                break;
                            case 'light rain':
                                weatherImageUrl = 'images/raining.png';
                                break;
                            case 'moderate rain':
                                weatherImageUrl = 'images/raining.png';
                                break;
                            case 'overcast clouds':
                                weatherImageUrl = 'images/cld.png';
                                break;
                            case 'clear sky':
                                weatherImageUrl = 'images/wind.png';
                                break;
                            case 'light snow':
                                weatherImageUrl = 'images/snowy.png';
                                break;
                            default:
                                weatherImageUrl = '';
                                break;
                        }

                        weatherInfo.innerHTML += `
                            <div class="forecast-day">
                                <h3>${day}</h3>
                                <p>Temperature: ${Math.round(forecast.main.temp - 273.15)}°C</p>
                                <p>Weather: ${weatherDescription}</p>
                                <p>Wind Speed: ${forecast.wind.speed} km/h</p>
                                <p>Humidity: ${forecast.main.humidity}%</p>
                                <img src="${weatherImageUrl}" alt="${weatherDescription} Image">
                            </div>
                        `;
                    }
                });
        }

        Promise.all([
            getCurrentWeatherData(),
            get5DayForecastData()
        ])
            .catch(error => {
                console.error('Error fetching data:', error);
            });

        return false; 
    } else {
        alert('Please enter a city name.');
        return false; 
    }
}
