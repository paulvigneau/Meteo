
function getCityFromLatLng(coords) {
    return new Promise((resolve, reject) => {
        fetch('https://api-adresse.data.gouv.fr/reverse/?lon=' + coords.lng + '&lat=' + coords.lat)
            .then((resp) => resp.json())
            .then((json) => {
                let city = json?.features[0]?.properties?.city;
                if (city)
                    resolve(city);
                else
                    reject('City not found');
            })
            .catch((error) => reject(error))
    });
}
