// const API_KEY = 'your-openweathermap-api-key'; // Replace with your actual API key
const API_KEY = '1c3c7793907527875502baf7509da81f'; // Your actual API key
const DEMO_MODE = false; // Use real API data

// const DEMO_MODE = true; // Set to false when using real API key

const elements = {
    cityInput: document.getElementById('cityInput'),
    searchBtn: document.getElementById('searchBtn'),
    locationBtn: document.getElementById('locationBtn'),
    weatherCard: document.getElementById('weatherCard'),
    errorMessage: document.getElementById('errorMessage'),
    loading: document.getElementById('loading'),
    temperature: document.getElementById('temperature'),
    condition: document.getElementById('condition'),
    weatherIcon: document.getElementById('weatherIcon'),
    feelsLike: document.getElementById('feelsLike'),
    humidity: document.getElementById('humidity'),
    windSpeed: document.getElementById('windSpeed'),
    pressure: document.getElementById('pressure'),
    forecastTitle: document.getElementById('forecastTitle'),
    forecastGrid: document.getElementById('forecastGrid')
};

// Demo data for testing without API key
const demoData = {
    'london': {
        current: {
            name: 'London',
            main: { temp: 15, feels_like: 13, humidity: 72, pressure: 1013 },
            weather: [{ main: 'Clouds', description: 'overcast clouds' }],
            wind: { speed: 3.2 }
        },
        forecast: [
            { dt: Date.now()/1000, main: { temp: 16 }, weather: [{ main: 'Rain' }] },
            { dt: Date.now()/1000 + 86400, main: { temp: 18 }, weather: [{ main: 'Clear' }] },
            { dt: Date.now()/1000 + 172800, main: { temp: 14 }, weather: [{ main: 'Clouds' }] },
            { dt: Date.now()/1000 + 259200, main: { temp: 17 }, weather: [{ main: 'Clear' }] },
            { dt: Date.now()/1000 + 345600, main: { temp: 19 }, weather: [{ main: 'Clear' }] }
        ]
    },
    'new york': {
        current: {
            name: 'New York',
            main: { temp: 22, feels_like: 24, humidity: 65, pressure: 1018 },
            weather: [{ main: 'Clear', description: 'clear sky' }],
            wind: { speed: 2.1 }
        },
        forecast: [
            { dt: Date.now()/1000, main: { temp: 24 }, weather: [{ main: 'Clear' }] },
            { dt: Date.now()/1000 + 86400, main: { temp: 26 }, weather: [{ main: 'Clear' }] },
            { dt: Date.now()/1000 + 172800, main: { temp: 23 }, weather: [{ main: 'Clouds' }] },
            { dt: Date.now()/1000 + 259200, main: { temp: 21 }, weather: [{ main: 'Rain' }] },
            { dt: Date.now()/1000 + 345600, main: { temp: 25 }, weather: [{ main: 'Clear' }] }
        ]
    },
    'tokyo': {
        current: {
            name: 'Tokyo',
            main: { temp: 28, feels_like: 31, humidity: 78, pressure: 1008 },
            weather: [{ main: 'Rain', description: 'light rain' }],
            wind: { speed: 1.8 }
        },
        forecast: [
            { dt: Date.now()/1000, main: { temp: 27 }, weather: [{ main: 'Rain' }] },
            { dt: Date.now()/1000 + 86400, main: { temp: 29 }, weather: [{ main: 'Clouds' }] },
            { dt: Date.now()/1000 + 172800, main: { temp: 31 }, weather: [{ main: 'Clear' }] },
            { dt: Date.now()/1000 + 259200, main: { temp: 30 }, weather: [{ main: 'Clear' }] },
            { dt: Date.now()/1000 + 345600, main: { temp: 28 }, weather: [{ main: 'Clouds' }] }
        ]
    },
    'paris': {
        current: {
            name: 'Paris',
            main: { temp: 18, feels_like: 16, humidity: 68, pressure: 1015 },
            weather: [{ main: 'Clear', description: 'clear sky' }],
            wind: { speed: 2.8 }
        },
        forecast: [
            { dt: Date.now()/1000, main: { temp: 20 }, weather: [{ main: 'Clear' }] },
            { dt: Date.now()/1000 + 86400, main: { temp: 22 }, weather: [{ main: 'Clouds' }] },
            { dt: Date.now()/1000 + 172800, main: { temp: 19 }, weather: [{ main: 'Rain' }] },
            { dt: Date.now()/1000 + 259200, main: { temp: 21 }, weather: [{ main: 'Clear' }] },
            { dt: Date.now()/1000 + 345600, main: { temp: 23 }, weather: [{ main: 'Clear' }] }
        ]
    },
    'sydney': {
        current: {
            name: 'Sydney',
            main: { temp: 25, feels_like: 27, humidity: 60, pressure: 1020 },
            weather: [{ main: 'Clear', description: 'clear sky' }],
            wind: { speed: 3.5 }
        },
        forecast: [
            { dt: Date.now()/1000, main: { temp: 26 }, weather: [{ main: 'Clear' }] },
            { dt: Date.now()/1000 + 86400, main: { temp: 24 }, weather: [{ main: 'Clouds' }] },
            { dt: Date.now()/1000 + 172800, main: { temp: 27 }, weather: [{ main: 'Clear' }] },
            { dt: Date.now()/1000 + 259200, main: { temp: 23 }, weather: [{ main: 'Rain' }] },
            { dt: Date.now()/1000 + 345600, main: { temp: 28 }, weather: [{ main: 'Clear' }] }
        ]
    }
};

// Weather icon mapping function
function getWeatherIcon(condition) {
    const icons = {
        'Clear': '☀️',
        'Clouds': '☁️',
        'Rain': '🌧️',
        'Drizzle': '🌦️',
        'Snow': '❄️',
        'Thunderstorm': '⛈️',
        'Mist': '🌫️',
        'Fog': '🌫️',
        'Haze': '🌫️',
        'Smoke': '🌫️',
        'Dust': '🌫️',
        'Sand': '🌫️',
        'Ash': '🌫️',
        'Squall': '💨',
        'Tornado': '🌪️'
    };
    return icons[condition] || '🌤️';
}

// Background class mapping function
function getBackgroundClass(condition) {
    const backgrounds = {
        'Clear': 'clear',
        'Clouds': 'clouds',
        'Rain': 'rain',
        'Drizzle': 'rain',
        'Snow': 'snow',
        'Thunderstorm': 'thunderstorm',
        'Mist': 'mist',
        'Fog': 'mist',
        'Haze': 'mist',
        'Smoke': 'mist',
        'Dust': 'mist',
        'Sand': 'mist',
        'Ash': 'mist',
        'Squall': 'thunderstorm',
        'Tornado': 'thunderstorm'
    };
    return backgrounds[condition] || 'clouds';
}

// Error handling function
function showError(message) {
    elements.errorMessage.textContent = message;
    elements.errorMessage.classList.add('show');
    setTimeout(() => {
        elements.errorMessage.classList.remove('show');
    }, 5000);
}

// Loading state functions
function showLoading() {
    elements.loading.style.display = 'block';
    elements.weatherCard.classList.remove('show');
    elements.forecastTitle.style.display = 'none';
    elements.forecastGrid.innerHTML = '';
    elements.errorMessage.classList.remove('show');
}

function hideLoading() {
    elements.loading.style.display = 'none';
}

// Background update function
function updateBackground(condition) {
    // Remove all weather classes
    document.body.classList.remove('clear', 'clouds', 'rain', 'snow', 'thunderstorm', 'mist');
    // Add new weather class
    document.body.classList.add(getBackgroundClass(condition));
}

// Main weather display function
function displayWeather(data) {
    const { name, main, weather, wind } = data;
    const condition = weather[0].main;
    
    // Update weather information
    elements.temperature.textContent = `${Math.round(main.temp)}°C`;
    elements.condition.textContent = weather[0].description.charAt(0).toUpperCase() + weather[0].description.slice(1);
    elements.weatherIcon.textContent = getWeatherIcon(condition);
    elements.feelsLike.textContent = `${Math.round(main.feels_like)}°C`;
    elements.humidity.textContent = `${main.humidity}%`;
    elements.windSpeed.textContent = `${wind.speed} m/s`;
    elements.pressure.textContent = `${main.pressure} hPa`;
    
    // Update background and show weather card
    updateBackground(condition);
    elements.weatherCard.classList.add('show');
}

// Forecast display function
function displayForecast(forecastData) {
    elements.forecastGrid.innerHTML = '';
    elements.forecastTitle.style.display = 'block';

    forecastData.forEach((item, index) => {
        const date = new Date(item.dt * 1000);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        const condition = item.weather[0].main;

        const forecastCard = document.createElement('div');
        forecastCard.className = 'forecast-card';
        forecastCard.innerHTML = `
            <div class="forecast-day">${index === 0 ? 'Today' : dayName}</div>
            <div class="forecast-icon">${getWeatherIcon(condition)}</div>
            <div class="forecast-temp">${Math.round(item.main.temp)}°C</div>
            <div style="font-size: 0.9rem; opacity: 0.8; margin-top: 0.5rem;">${condition}</div>
        `;

        elements.forecastGrid.appendChild(forecastCard);

        // Animate forecast cards with delay
        setTimeout(() => {
            forecastCard.classList.add('show');
        }, index * 100);
    });
}

// API data fetching function
// async function fetchWeatherData(city) {
//     if (DEMO_MODE) {
//         // Simulate API delay
//         await new Promise(resolve => setTimeout(resolve, 1000));
        
//         const demoCity = demoData[city.toLowerCase()];
//         if (demoCity) {
//             return {
//                 current: demoCity.current,
//                 forecast: { list: demoCity.forecast }
//             };
//         } else {
//             throw new Error(`City "${city}" not found in demo data. Try: London, New York, Tokyo, Paris, or Sydney`);
//         }
//     }


async function fetchWeatherData(city) {
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;

    const [currentResponse, forecastResponse] = await Promise.all([
        fetch(currentWeatherUrl),
        fetch(forecastUrl)
    ]);

    if (!currentResponse.ok) {
        if (currentResponse.status === 404) {
            throw new Error('City not found. Please check the spelling and try again.');
        } else if (currentResponse.status === 401) {
            throw new Error('API key is invalid. Please check your API key.');
        } else {
            throw new Error('Failed to fetch weather data. Please try again later.');
        }
    }

    const currentData = await currentResponse.json();
    const forecastData = await forecastResponse.json();

    return {
        current: currentData,
        forecast: forecastData
    };
}

























    // Real API calls (uncomment when using actual API key)
    /*
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;

    const [currentResponse, forecastResponse] = await Promise.all([
        fetch(currentWeatherUrl),
        fetch(forecastUrl)
    ]);

    if (!currentResponse.ok) {
        if (currentResponse.status === 404) {
            throw new Error('City not found. Please check the spelling and try again.');
        } else if (currentResponse.status === 401) {
            throw new Error('API key is invalid. Please check your API key.');
        } else {
            throw new Error('Failed to fetch weather data. Please try again later.');
        }
    }

    const currentData = await currentResponse.json();
    const forecastData = await forecastResponse.json();

    return {
        current: currentData,
        forecast: forecastData
    };
    */

// Main search function
async function searchWeather(city) {
    if (!city.trim()) {
        showError('Please enter a city name');
        return;
    }

    showLoading();

    try {
        const { current, forecast } = await fetchWeatherData(city);
        displayWeather(current);
        
        // Filter forecast to get one per day (every 8th item for 3-hour intervals)
        const dailyForecast = forecast.list.filter((item, index) => index % 8 === 0).slice(0, 5);
        displayForecast(dailyForecast);
        
    } catch (error) {
        showError(error.message);
        console.error('Weather fetch error:', error);
    } finally {
        hideLoading();
    }
}

// Geolocation function
function getCurrentLocation() {
    if (!navigator.geolocation) {
        showError('Geolocation is not supported by this browser');
        return;
    }

    showLoading();

    navigator.geolocation.getCurrentPosition(
        async (position) => {
            try {
                const { latitude, longitude } = position.coords;
                
                if (DEMO_MODE) {
                    // In demo mode, use default city
                    showError('Demo mode: Using London as default location');
                    await searchWeather('London');
                    return;
                }

                // Real geolocation API call (uncomment when using actual API key)
                /*
                const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
                const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
                
                const [currentResponse, forecastResponse] = await Promise.all([
                    fetch(currentUrl),
                    fetch(forecastUrl)
                ]);
                
                if (!currentResponse.ok) {
                    throw new Error('Failed to get weather for your location');
                }
                
                const currentData = await currentResponse.json();
                const forecastData = await forecastResponse.json();
                
                displayWeather(currentData);
                const dailyForecast = forecastData.list.filter((item, index) => index % 8 === 0).slice(0, 5);
                displayForecast(dailyForecast);
                */
            } catch (error) {
                showError('Failed to get weather for your location');
                console.error('Geolocation weather error:', error);
            } finally {
                hideLoading();
            }
        },
        (error) => {
            hideLoading();
            let errorMessage = 'Unable to retrieve your location';
            
            switch(error.code) {
                case error.PERMISSION_DENIED:
                    errorMessage = 'Location access denied by user';
                    break;
                case error.POSITION_UNAVAILABLE:
                    errorMessage = 'Location information is unavailable';
                    break;
                case error.TIMEOUT:
                    errorMessage = 'Location request timed out';
                    break;
            }
            
            showError(errorMessage);
            console.error('Geolocation error:', error);
        },
        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 600000 // 10 minutes
        }
    );
}

// Input validation function
function validateInput(input) {
    const trimmedInput = input.trim();
    if (trimmedInput.length === 0) {
        return { valid: false, message: 'Please enter a city name' };
    }
    if (trimmedInput.length < 2) {
        return { valid: false, message: 'City name must be at least 2 characters long' };
    }
    if (!/^[a-zA-Z\s\-']+$/.test(trimmedInput)) {
        return { valid: false, message: 'City name can only contain letters, spaces, hyphens, and apostrophes' };
    }
    return { valid: true, value: trimmedInput };
}

// Event listeners
elements.searchBtn.addEventListener('click', () => {
    const validation = validateInput(elements.cityInput.value);
    if (validation.valid) {
        searchWeather(validation.value);
    } else {
        showError(validation.message);
    }
});

elements.cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const validation = validateInput(elements.cityInput.value);
        if (validation.valid) {
            searchWeather(validation.value);
        } else {
            showError(validation.message);
        }
    }
});

elements.locationBtn.addEventListener('click', getCurrentLocation);

// Clear input when clicked
elements.cityInput.addEventListener('focus', () => {
    elements.errorMessage.classList.remove('show');
});

// Auto-suggest cities (basic implementation)
const popularCities = ['London', 'New York', 'Tokyo', 'Paris', 'Sydney', 'Berlin', 'Mumbai', 'Cairo', 'Bangkok', 'Rome'];

elements.cityInput.addEventListener('input', (e) => {
    const input = e.target.value.toLowerCase();
    if (input.length > 1) {
        const suggestions = popularCities.filter(city => 
            city.toLowerCase().includes(input)
        );
        // You can implement a dropdown suggestion list here
        console.log('Suggestions:', suggestions);
    }
});

// Initialize app with default weather
window.addEventListener('load', () => {
    console.log('Weather App Loaded');
    console.log('Demo Mode:', DEMO_MODE);
    console.log('Available demo cities:', Object.keys(demoData).join(', '));
    
    // Load default weather
    searchWeather('London');
});

// Handle online/offline status
window.addEventListener('online', () => {
    console.log('Connection restored');
});

window.addEventListener('offline', () => {
    showError('No internet connection. Please check your network.');
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K to focus search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        elements.cityInput.focus();
    }
    
    // Escape to clear search
    if (e.key === 'Escape') {
        elements.cityInput.blur();
        elements.errorMessage.classList.remove('show');
    }
});

// Console helpers for debugging
console.log('🌤️ Weather App JavaScript Loaded');
console.log('Available functions:', {
    searchWeather: 'searchWeather(cityName)',
    getCurrentLocation: 'getCurrentLocation()',
    showError: 'showError(message)',
    getWeatherIcon: 'getWeatherIcon(condition)',
    updateBackground: 'updateBackground(condition)'
});

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        searchWeather,
        getCurrentLocation,
        getWeatherIcon,
        getBackgroundClass,
        validateInput
    };
}