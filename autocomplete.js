// Inspired of https://www.w3schools.com/howto/howto_js_autocomplete.asp

let cityTab = [];
let currentFocus;
let input_city = document.querySelector('#city-name');

input_city.addEventListener('input', function() {
    let val = this.value;

    closeList();

    if (!val)
        return false;

    currentFocus = -1;

    let div_values = document.createElement('div');
    div_values.setAttribute('id', 'autocomplete-list');
    div_values.setAttribute('class', 'autocomplete-items ml-3 mr-3');
    document.querySelector('.autocomplete').appendChild(div_values);

    fetch('https://geo.api.gouv.fr/communes?nom=' + val + '&fields=codesPostaux,nom,centre&boost=population&limit=5')
        .then((resp) => resp.json())
        .then((cities) => {
            cityTab = [];
            let cpt = 0
            for (let city of cities) {
                let div_city = document.createElement('div');

                div_city.innerHTML  = '<strong>' + city.nom.substring(0, val.length) + '</strong>';
                div_city.innerHTML += city.nom.substring(val.length) + ", " + city.codesPostaux[0];

                /* Insert an hidden input field that will hold the current city */
                cityTab[cpt] = {
                    name: city.nom,
                    lat: city.centre.coordinates[1],
                    lng: city.centre.coordinates[0]

                }
                div_city.innerHTML += '<input type=\'hidden\' value=\'' + city.nom + '\'>';
                div_city.innerHTML += '<input type=\'hidden\' value=\'' + city.centre.coordinates[1] + '\'>'; // Latitude
                div_city.innerHTML += '<input type=\'hidden\' value=\'' + city.centre.coordinates[0] + '\'>'; // Longitude

                // Click event on each city
                div_city.addEventListener('click', function() {
                    input_city.value = div_city.querySelectorAll('input')[0].value;
                    const coords = {
                        lat: parseFloat(div_city.querySelectorAll('input')[1].value),
                        lng: parseFloat(div_city.querySelectorAll('input')[2].value)
                    }
                    closeList();
                    initMap(coords, 11);
                    queryWeather(coords);
                });
                div_values.appendChild(div_city);

                cpt++;
            }
        })
        .catch((error) => console.log(error));
});

input_city.addEventListener('keydown', function(e) {
    let div_list = document.querySelector('.autocomplete');
    if (div_list)
        div_list = div_list.querySelectorAll('div.autocomplete-items > div');

    if (e.key === 'ArrowDown') { // Down
        currentFocus++;
        addActive(div_list);
    } else if (e.key === 'ArrowUp') { // Up
        currentFocus--;
        addActive(div_list);
    } else if (e.key === 'Enter') { // Enter
        e.preventDefault();
        if (currentFocus > -1 && div_list) {
            div_list[currentFocus].click();
        }
    }
});

function addActive(x) {
    if (!x)
        return false;

    removeActive(x);

    if (currentFocus >= x.length)
        currentFocus = 0;
    if (currentFocus < 0)
        currentFocus = (x.length - 1);

    x[currentFocus].classList.add("autocomplete-active");
}

function removeActive(x) {
    for (let i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
    }
}

function closeList() {
    let x = document.querySelector("#autocomplete-list");
    x?.parentNode.removeChild(x);
}

document.addEventListener("click", function () {
    closeList();
});
