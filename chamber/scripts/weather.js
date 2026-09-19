const weatherContainer = document.querySelector("#weather-content");
const apiKey = "e925e2088e406b5a6cccfeda77ef578f";
const latitude = 4.77742;
const longitude = 7.0134;

function createElement(tag, className, text) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text) element.textContent = text;
    return element;
}

function getLocalDate(timestamp, timezoneOffset) {
    return new Date((timestamp + timezoneOffset) * 1000);
}

function getThreeDayForecast(entries, timezoneOffset) {
    const currentDay = getLocalDate(Date.now() / 1000, timezoneOffset).toISOString().slice(0, 10);
    const days = new Map();

    entries.forEach((entry) => {
        const localDate = getLocalDate(entry.dt, timezoneOffset);
        const dateKey = localDate.toISOString().slice(0, 10);
        const hour = localDate.getUTCHours();

        if (dateKey === currentDay) return;
        const stored = days.get(dateKey);
        if (!stored || Math.abs(hour - 12) < Math.abs(stored.hour - 12)) {
            days.set(dateKey, { entry, hour, localDate });
        }
    });

    return Array.from(days.values()).slice(0, 3);
}

function displayWeather(current, forecast) {
    weatherContainer.replaceChildren();

    const currentBlock = createElement("div", "current-weather");
    const icon = document.createElement("img");
    icon.src = `https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`;
    icon.alt = current.weather[0].description;
    icon.width = 76;
    icon.height = 76;

    const summary = document.createElement("div");
    summary.append(
        createElement("p", "current-temperature", `${Math.round(current.main.temp)}°C`),
        createElement("p", "weather-description", current.weather[0].description)
    );
    currentBlock.append(icon, summary);

    const title = createElement("h3", "forecast-title", "Three-day forecast");
    const list = createElement("ul", "forecast-list");
    getThreeDayForecast(forecast.list, forecast.city.timezone).forEach(({ entry, localDate }) => {
        const item = document.createElement("li");
        const date = document.createElement("time");
        date.dateTime = localDate.toISOString().slice(0, 10);
        date.textContent = new Intl.DateTimeFormat("en-NG", {
            weekday: "short",
            day: "numeric",
            timeZone: "UTC"
        }).format(localDate);
        item.append(date, createElement("strong", "", `${Math.round(entry.main.temp)}°C`));
        list.append(item);
    });

    const source = createElement("p", "weather-source", "Weather data by ");
    const sourceLink = document.createElement("a");
    sourceLink.href = "https://openweathermap.org/";
    sourceLink.textContent = "OpenWeather";
    source.append(sourceLink);
    weatherContainer.append(currentBlock, title, list, source);
}

function displayWeatherError() {
    weatherContainer.replaceChildren(createElement("p", "error-message", "Live weather is temporarily unavailable."));
}

async function loadWeather() {
    if (!weatherContainer) return;
    if (!apiKey || apiKey.startsWith("REPLACE_")) {
        displayWeatherError();
        return;
    }

    const commonParameters = `lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
    const currentUrl = `https://api.openweathermap.org/data/2.5/weather?${commonParameters}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?${commonParameters}`;

    try {
        const [currentResponse, forecastResponse] = await Promise.all([
            fetch(currentUrl),
            fetch(forecastUrl)
        ]);

        if (!currentResponse.ok || !forecastResponse.ok) {
            throw new Error("Weather request failed");
        }

        const [currentData, forecastData] = await Promise.all([
            currentResponse.json(),
            forecastResponse.json()
        ]);
        displayWeather(currentData, forecastData);
    } catch (error) {
        displayWeatherError();
        console.error("Unable to load weather data:", error);
    }
}

loadWeather();
