async function fetchLatestWeather() {
    // Vi hämtar de senaste 3 dagarna för att vara säkra på att få färsk data
    const today = new Date();
    const aFewDaysAgo = new Date();
    aFewDaysAgo.setDate(today.getDate() - 3);

    const formatDate = (date) => date.toISOString().split('T')[0];
    
    const url = `https://archive-api.open-meteo.com/v1/archive?latitude=57.65&longitude=12.01&start_date=${formatDate(aFewDaysAgo)}&end_date=${formatDate(today)}&daily=temperature_2m_max,precipitation_sum&timezone=Europe%2FBerlin`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        // Plocka ut det sista elementet i listorna (senaste datan)
        const lastIndex = data.daily.temperature_2m_max.length - 1;
        const latestTemp = data.daily.temperature_2m_max[lastIndex];
        const latestRain = data.daily.precipitation_sum[lastIndex];
        const latestDate = data.daily.time[lastIndex];

        // Skicka till HTML
        document.getElementById('latest-temp').innerText = `${latestTemp}°C`;
        document.getElementById('latest-rain').innerText = `${latestRain} mm`;
        document.getElementById('weather-date').innerText = latestDate;

    } catch (error) {
        console.error("Kunde inte hämta senaste vädret:", error);
    }
}

fetchLatestWeather();

function updateStats() {
    // Hämta CPU-temp från din nyskapade JSON-fil
    fetch('cpu.json')
        .then(response => response.json())
        .then(data => {
            document.getElementById('cpu-display').innerText = `${data.temp}°C`;
        })
        .catch(err => console.log("Fetching CPU-temp..."));
}

// Kör direkt och sen var 30:e sekund
updateStats();
setInterval(updateStats, 30000);