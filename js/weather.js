const apiKey = "99aaa1bc27fe87812b109c08ec8e66ef";

// Ubicación fija de Sazón de Finca
const myLatLng = { lat: 10.356647, lng: -83.920565 };

function cargarClima() {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${myLatLng.lat}&lon=${myLatLng.lng}&appid=${apiKey}&units=metric&lang=es`;

    fetch(url)
        .then(res => res.json())
        .then(data => actualizarWidget(data))
        .catch(() => mostrarError("No se pudo obtener el clima."));
}

function actualizarWidget(data) {
    document.getElementById("weather-temp").textContent =
        Math.round(data.main.temp) + "°C";

    document.getElementById("weather-desc").textContent =
        data.weather[0].description;

    document.getElementById("weather-location").textContent =
        "Sazón de Finca, Guápiles, Costa Rica";
}

function mostrarError(msg) {
    document.getElementById("weather-temp").textContent = "--°C";
    document.getElementById("weather-desc").textContent = msg;
    document.getElementById("weather-location").textContent = "";
}

// cargar automáticamente
cargarClima();
