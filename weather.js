
const weather = document.querySelector(".js-weather");

const API_KEY = `888603eec9d3cf207f0d77ccb1f13180`;
const COORDS = `coords`;

function getWeather(lat, lng) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`)
        //데이터를 가져올 때 사용함
        //fetch(`https://~~~~~~~`);
        .then(function (response) {
            return response.json();
            //ja에서 무언가가 끝나기를 기다리는 방법은 .then사용하는 것
        })
        .then(function name(json) {
            const temperature = json.main.temp;
            const place = json.name;
            weather.innerText = `${temperature}°C  🌎${place}`;
        });
}

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError(params) {
    console.log("cant access geo location");
}

function askForCoords(params) {
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);//내 위치 읽는거
}

function loadCoords(params) {
    const loadedCoords = localStorage.getItem(COORDS);
    if (loadedCoords == null) {
        askForCoords();
    } else {
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}

function init(params) {
    loadCoords();
}
init();