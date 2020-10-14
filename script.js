let weather;

(function () {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
            let coords = { lat: position.coords.latitude, lng: position.coords.longitude }
            queryWeather(coords);
            initMap(coords, 11);
        }, () => {
            // Init map to default coords
            initMap();
        });
    }
    else {
        // Init map to default coords
        initMap();
    }
})();

async function queryWeather(coords) {
    // Get and set city name from coords
    await getCityFromLatLng(coords).then((city) => {
        document.querySelector('#city-name').value = city;
    }).catch(() => {
        document.querySelector('#city-name').value = '*ville inconnue*';
    });

    await fetch('https://prevision-meteo.ch/services/json/lat=' + coords.lat + 'lng=' + coords.lng)
        .then((resp) => resp.json())
        .then((json) => {
            if (!json.errors) {
                createWeather(json);
                displayWeather();
            }
        })
        .catch((error) => console.log(error));
}

function createWeather(json) {
    weather = new Weather();
    weather.city = document.querySelector('#city-name').value;
    weather.date = json.fcst_day_0.day_short;
    weather.hour = json.current_condition.hour;
    weather.temperature = json.current_condition.tmp;
    weather.condition = json.current_condition.condition;
    weather.humidity = json.current_condition.humidity;
    weather.wind = json.current_condition.wnd_spd;
    weather.url = json.current_condition.icon_big;

    for (let i = 1; i <= 4; i++) {
        let child = new WeatherChild();
        child.date = json['fcst_day_' + i].day_long;
        child.minTemperature = json['fcst_day_' + i].tmin;
        child.maxTemperature = json['fcst_day_' + i].tmax;
        child.url = json['fcst_day_' + i].icon;

        weather.addChild(child);
    }
}

function displayWeather() {
    document.querySelector('body').style.backgroundImage = 'url("' + weather.getBackgroundUrl() + '")';

    document.querySelector('#city').innerText = weather.city;
    document.querySelector('#date').innerText = weather.date + ', ' + weather.hour;
    document.querySelector('#temperature').innerText = weather.temperature;
    document.querySelector('#condition').innerText = weather.condition;
    document.querySelector('#humidity').childNodes[1].nodeValue = weather.humidity;
    document.querySelector('#wind').childNodes[1].nodeValue = weather.wind;

    // Condition image
    document.querySelector('#weather-image').setAttribute('src', weather.url);

    // Hour percentage
    let hour = weather.hour.split(':');
    let percentage = (hour[0] * 60 + hour[1]) / 1440;
    document.querySelector('#progressbar').style.width = percentage + '%';

    // Clear previous children
    document.querySelector('#next-days-tbody').innerHTML = '';

    // Display children
    for (let child of weather.children) {
        const tr = document.createElement('tr');

        const td_date = document.createElement('td');
        td_date.className = 'font-weight-normal align-middle';
        td_date.innerText = child.date;

        const td_temp = document.createElement('td');
        td_temp.className = 'float-right font-weight-normal';
        let temp =
        td_temp.insertAdjacentHTML('beforeend',
            `<p class="mb-1">${child.maxTemperature}&deg;
                    <span class="text-muted">/${child.minTemperature}&deg;
                    </span></p>`
        );

        const td_icon = document.createElement('td');
        td_icon.className = 'float-right mr-3';
        td_icon.insertAdjacentHTML('beforeend', `<img src="${child.url}" alt=""/>`);

        tr.append(td_date, td_temp, td_icon);
        document.querySelector('#next-days-tbody').appendChild(tr);
    }
}
