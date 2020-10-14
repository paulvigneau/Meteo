let map;
let marker;

function initMap(position = { lat: 46.232193, lng: 2.209667 }, zoom = 5) {
    if (map) {
        moveMap(position, zoom);
        return;
    }

    map = L.map('map').setView(position, zoom);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
            '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
    }).addTo(map);

    marker = L.marker([position.lat, position.lng]).addTo(map);

    map.on('move', () => {
        marker.setLatLng(map.getCenter());
    })

    map.on('moveend', () => {
        marker.setLatLng(map.getCenter());
        document.querySelector('#weather-here').classList.remove('hide');
    })

}

function moveMap(position, zoom) {
    map.setView(position, zoom);
}

function onClickWeatherHere() {
    document.querySelector('#weather-here').classList.add('hide');
    queryWeather({
        lat: map.getCenter().lat,
        lng: map.getCenter().lng
    });
}

