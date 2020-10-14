
class Weather {
    city;
    date;
    hour;
    temperature;
    condition;
    humidity;
    wind;
    url;
    children = [];

    addChild(child) {
        this.children.push(child);
    }

    getBackgroundUrl() {
        return backgrounds[this.condition];
    }
}

class WeatherChild {
    date;
    minTemperature;
    maxTemperature;
    url;
}

let backgrounds = {
    'Ensoleillé': 'weather_bg/sunny.jpg',
    'Nuit claire': 'weather_bg/night.jpg',
    'Ciel voilé': 'weather_bg/cloudy.jpg',
    'Nuit légèrement voilée': 'weather_bg/cloudy_night.jpg',
    'Faibles passages nuageux': 'weather_bg/cloudy_sunny.jpg',
    'Nuit bien dégagée': 'weather_bg/night.jpg',
    'Brouillard': 'weather_bg/foggy.jpg',
    'Stratus': 'weather_bg/cloudy.jpg',
    'Stratus se dissipant': 'weather_bg/cloudy.jpg',
    'Nuit claire et stratus': 'weather_bg/night.jpg',
    'Eclaircies': 'weather_bg/sunny.jpg',
    'Nuit nuageuse': 'weather_bg/cloudy_night.jpg',
    'Faiblement nuageux': 'weather_bg/cloudy_sunny.jpg',
    'Fortement nuageux': 'weather_bg/cloudy.jpg',
    'Averses de pluie faible': 'weather_bg/rainy.jpg',
    'Nuit avec averses': 'weather_bg/rainy_night.jpg',
    'Averses de pluie modérée': 'weather_bg/rainy.jpg',
    'Averses de pluie forte': 'weather_bg/rainy.jpg',
    'Couvert avec averses': 'weather_bg/rainy.jpg',
    'Pluie faible': 'weather_bg/rainy.jpg',
    'Pluie forte': 'weather_bg/rainy.jpg',
    'Pluie modérée': 'weather_bg/rainy.jpg',
    'Développement nuageux': 'weather_bg/cloudy.jpg',
    'Nuit avec développement nuageux': 'weather_bg/cloudy_night.jpg',
    'Faiblement orageux': 'weather_bg/stormy.jpg',
    'Nuit faiblement orageuse': 'weather_bg/stormy.jpg',
    'Orage modéré': 'weather_bg/stormy.jpg',
    'Fortement orageux': 'weather_bg/stormy.jpg',
    'Averses de neige faible': 'weather_bg/snowy.jpg',
    'Nuit avec averses de neige faible': 'weather_bg/snowy_night.jpg',
    'Neige faible': 'weather_bg/snowy.jpg',
    'Neige modérée': 'weather_bg/snowy.jpg',
    'Neige forte': 'weather_bg/snowy.jpg',
    'Pluie et neige mêlée faible': 'weather_bg/snowy.jpg',
    'Pluie et neige mêlée modérée': 'weather_bg/snowy.jpg',
    'Pluie et neige mêlée forte': 'weather_bg/snowy.jpg'
};
