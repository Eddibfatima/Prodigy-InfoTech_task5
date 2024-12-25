const apiKey = '54a57bc234ad752a4f59e59cd372201d'; 

// Fetch weather by city name
async function getWeatherByCity(city) {
const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
fetchWeatherData(url);
}

// Fetch weather by user's location
async function getWeatherByLocation(lat, lon) {
const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
fetchWeatherData(url);
}

// Common function to fetch weather data and handle the response
async function fetchWeatherData(url) {
try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === 200) {
    displayWeather(data);
    } else {
    alert('Could not fetch weather data. Please try again.');
    }
} catch (error) {
    console.error('Error fetching weather data:', error);
    alert('An error occurred while fetching weather data.');
}
}

// Display weather details
function displayWeather(data) {
document.getElementById('city-name').textContent = `Weather in ${data.name}`;
document.getElementById('weather-description').textContent = data.weather[0].description;
document.getElementById('temperature').textContent = data.main.temp;
document.getElementById('humidity').textContent = data.main.humidity;
document.getElementById('wind-speed').textContent = data.wind.speed;

document.getElementById('weather-display').style.display = 'block';
}

// Event listener for "Get Weather for My Location" button
document.getElementById('get-location-weather').addEventListener('click', () => {
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    getWeatherByLocation(lat, lon);
    }, () => {
    alert('Unable to retrieve your location. Please enable location services.');
    });
} else {
    alert('Geolocation is not supported by your browser.');
}
});

// Event listener for "Get Weather" button
document.getElementById('search-weather').addEventListener('click', () => {
const city = document.getElementById('city').value;
if (city) {
    getWeatherByCity(city);
} else {
    alert('Please enter a city name.');
}
});
