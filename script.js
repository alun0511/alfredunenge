async function fetchWeather() {
    const url = "https://archive-api.open-meteo.com/v1/archive?latitude=57.65&longitude=12.01&start_date=2024-05-07&end_date=2024-05-14&daily=temperature_2m_max,precipitation_sum&timezone=Europe%2FBerlin";
    // Tips: Du kan generera start/end datum dynamiskt med JS senare!
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log("Väderdata:", data.daily);
        // Här kan du sen mappa ut datan till din HTML
    } catch (error) {
        console.error("Kunde inte hämta väder:", error);
    }
}
fetchWeather();

function updateStats() {
    // Hämta CPU-temp från din nyskapade JSON-fil
    fetch('cpu.json')
        .then(response => response.json())
        .then(data => {
            document.getElementById('cpu-display').innerText = data.temp;
        })
        .catch(err => console.log("Väntar på CPU-data..."));
}

// Kör direkt och sen var 30:e sekund
updateStats();
setInterval(updateStats, 30000);