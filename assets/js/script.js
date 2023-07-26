var apiKey = 'bcca9cde2077618db7f70b7605e37960';

var searchBtn = $('#search')
var pastCities = $('#past-cities')
var searchBox = $('#city-form')

function searchCities(evt) {
    evt.preventDefault();

    var city = searchBox.val();
    
    if (!city) {
        return;
    }
    console.log('a;lkjgf')
}

searchBtn.on('click', searchCities);